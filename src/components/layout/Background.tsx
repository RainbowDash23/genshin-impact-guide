// ─────────────────────────────────────────────────────────────
//  components/layout/Background.tsx
//  Capa de fondo de la página con sistema de doble capa (crossfade)
//  ultra-fluido y precarga en GPU para eliminar cualquier parpadeo.
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { BACKGROUNDS, LIGHT_BACKGROUND } from '../../assets/index';
import { preloadImage } from '../../lib/backgroundPreloader';
import type { ResolvedTheme } from '../../types/theme';

interface BackgroundProps {
  regionId: string;
  theme: ResolvedTheme;
}

interface Layer {
  id: number;
  src: string;
  opacity: number;
}

export function Background({ regionId, theme }: BackgroundProps) {
  const targetSrc = theme === 'light' ? LIGHT_BACKGROUND : BACKGROUNDS[regionId] ?? LIGHT_BACKGROUND;

  const idCounter = useRef(1);
  const targetSrcRef = useRef(targetSrc);
  targetSrcRef.current = targetSrc;

  const lastRenderedSrcRef = useRef(targetSrc);

  // La capa inicial siempre comienza con opacidad 1 para asegurar
  // que el fondo de la región inicial (Mondstadt) se muestre de inmediato al entrar
  const [layers, setLayers] = useState<Layer[]>(() => [
    {
      id: 1,
      src: targetSrc,
      opacity: 1,
    },
  ]);

  // Transición suave de capas al cambiar de región o de tema
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (targetSrc === lastRenderedSrcRef.current) {
      // Garantiza que la capa actual esté siempre en opacidad 1
      setLayers(prev =>
        prev.map(l => (l.src === targetSrc && l.opacity < 1 ? { ...l, opacity: 1 } : l))
      );
      return;
    }

    preloadImage(targetSrc).then(() => {
      if (!active || targetSrcRef.current !== targetSrc) return;

      lastRenderedSrcRef.current = targetSrc;
      const newLayerId = ++idCounter.current;
      const newLayer: Layer = {
        id: newLayerId,
        src: targetSrc,
        opacity: 0,
      };

      // Colocamos la nueva capa arriba de la anterior con opacidad 0
      setLayers(prev => {
        if (prev.length > 0 && prev[prev.length - 1].src === targetSrc) {
          return prev;
        }
        return [...prev, newLayer];
      });

      // Animamos la opacidad a 1 en el siguiente frame de renderizado del navegador
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!active) return;
          setLayers(prev =>
            prev.map(layer =>
              layer.id === newLayerId ? { ...layer, opacity: 1 } : layer
            )
          );
        });
      });

      // Cuando la animación finaliza (700ms), removemos capas previas inferiores
      timer = setTimeout(() => {
        if (!active) return;
        setLayers(prev => {
          const idx = prev.findIndex(layer => layer.id === newLayerId);
          if (idx <= 0) return prev;
          return prev.slice(idx);
        });
      }, 750);
    });

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [targetSrc]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Capas de imagen compuestas en GPU para cross-dissolve a 60/120fps */}
      {layers.map(layer => (
        <div
          key={layer.id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${layer.src}")`,
            opacity: layer.opacity,
            transition: 'opacity 700ms cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Velo del tema: garantiza legibilidad y contraste óptimo */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: 'var(--scrim)' }}
      />
    </div>
  );
}
