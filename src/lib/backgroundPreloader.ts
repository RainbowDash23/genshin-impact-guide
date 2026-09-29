// ─────────────────────────────────────────────────────────────
//  lib/backgroundPreloader.ts
//  Precarga y pre-decodificación en GPU de imágenes de fondo.
//  Evita parpadeos y retrasos en la carga inicial y transiciones.
// ─────────────────────────────────────────────────────────────
import { BACKGROUNDS, LIGHT_BACKGROUND, EMBLEMS } from '../assets/index';

const decodedCache = new Set<string>();
const inFlight = new Map<string, Promise<void>>();

/**
 * Verifica si una imagen ya está completamente descargada y disponible en caché.
 */
export function isImageLoaded(src: string): boolean {
  if (!src) return false;
  if (decodedCache.has(src)) return true;

  if (typeof window !== 'undefined') {
    const probe = new Image();
    probe.src = src;
    if (probe.complete && probe.naturalWidth > 0) {
      decodedCache.add(src);
      return true;
    }
  }
  return false;
}

/**
 * Descarga y pre-decodifica una imagen usando la API `decode()`.
 * La decodificación en la GPU fuera del hilo principal garantiza que
 * al mostrarse en pantalla no haya saltos, pausas ni frames en blanco.
 */
export function preloadImage(src: string): Promise<void> {
  if (!src) return Promise.resolve();
  if (decodedCache.has(src)) return Promise.resolve();

  const existing = inFlight.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    const markDone = () => {
      decodedCache.add(src);
      inFlight.delete(src);
      resolve();
    };

    if (img.complete && img.naturalWidth > 0) {
      markDone();
      return;
    }

    if (typeof img.decode === 'function') {
      img.decode()
        .then(markDone)
        .catch(() => {
          if (img.complete) {
            markDone();
          } else {
            img.onload = markDone;
            img.onerror = markDone;
          }
        });
    } else {
      (img as HTMLImageElement).onload = markDone;
      (img as HTMLImageElement).onerror = markDone;
    }
  });

  inFlight.set(src, promise);
  return promise;
}

/**
 * Precarga el fondo específico de una región.
 */
export function preloadRegionBackground(regionId: string): void {
  const src = BACKGROUNDS[regionId];
  if (src) {
    preloadImage(src);
  }
}

/**
 * Inicia la precarga de todos los fondos y emblemas en segundo plano.
 * Prioriza el fondo inicial activo según el tema.
 */
export function preloadAllBackgrounds(prioritySrc?: string): void {
  if (typeof window === 'undefined') return;

  if (prioritySrc) {
    preloadImage(prioritySrc);
  }

  const otherUrls = [
    LIGHT_BACKGROUND,
    ...Object.values(BACKGROUNDS),
  ].filter(url => url !== prioritySrc);

  const loadOthers = () => {
    otherUrls.forEach(url => preloadImage(url));
    // También precargar emblemas para que los cambios de región sean instantáneos
    Object.values(EMBLEMS).forEach(url => preloadImage(url));
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadOthers, { timeout: 1500 });
  } else {
    setTimeout(loadOthers, 100);
  }
}

// Auto-precarga inmediata al evaluar el módulo:
// Detecta el tema guardado en localStorage o el preferido del sistema y lanza
// la precarga antes de que React termine de montar la vista inicial.
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('gqg:theme');
    const isDark = raw === 'dark' || (raw !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const initialSrc = isDark ? BACKGROUNDS['mondstadt'] : LIGHT_BACKGROUND;
    if (initialSrc) {
      preloadImage(initialSrc);
    }
    preloadAllBackgrounds(initialSrc);
  } catch {
    preloadAllBackgrounds();
  }
}
