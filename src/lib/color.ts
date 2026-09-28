// ─────────────────────────────────────────────────────────────
//  lib/color.ts
//  Utilidades de color para los acentos de región.
//  Los colores de región son los originales del juego, pensados
//  para fondo oscuro. Sobre un tema claro muchos de ellos no
//  llegan a 3:1 de contraste, así que se derivan variantes
//  legibles en lugar de cambiar el color fuente de la región.
// ─────────────────────────────────────────────────────────────
import type { ResolvedTheme } from '../types/theme';

function clamp(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw.split('').map(c => c + c).join('')
      : raw.padEnd(6, '0').slice(0, 6);
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function mix(hex: string, target: [number, number, number], amount: number): string {
  const rgb = hexToRgb(hex);
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${rgb
    .map((channel, i) => toHex(clamp(channel + (target[i] - channel) * amount)))
    .join('')}`;
}

const INK = '#0f172a';
const LIGHT = '#ffffff';

/**
 * Devuelve el acento de la región guaranteeing contraste con el
 * fondo del tema. En oscuro se realza hacia el blanco; en claro
 * se oscurece hacia el ink para no quedar washed out.
 */
export function readableAccent(hex: string, theme: ResolvedTheme): string {
  return theme === 'light' ? mix(hex, hexToRgb(INK), 0.5) : mix(hex, hexToRgb(LIGHT), 0.14);
}
