// ─────────────────────────────────────────────────────────────
//  assets/index.ts
//  Centraliza todos los imports de imágenes.
//  Vite convierte estos paths en URLs optimizadas al compilar.
//  Agregar una imagen nueva = solo agregar una línea aquí.
// ─────────────────────────────────────────────────────────────
import mondstadtEmblem from './regions/mondstadt.png';
import liyueEmblem     from './regions/liyue.png';
import inazumaEmblem   from './regions/inazuma.png';
import sumeruEmblem    from './regions/sumeru.png';
import fontaineEmblem  from './regions/fontaine.png';
import natlanEmblem    from './regions/natlan.png';

export const EMBLEMS: Record<string, string> = {
  mondstadt: mondstadtEmblem,
  liyue:     liyueEmblem,
  inazuma:   inazumaEmblem,
  sumeru:    sumeruEmblem,
  fontaine:  fontaineEmblem,
  natlan:    natlanEmblem,
};
