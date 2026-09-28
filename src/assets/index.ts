// ─────────────────────────────────────────────────────────────
//  assets/index.ts
//  Centraliza todos los imports de imágenes.
//  Vite convierte estos paths en URLs optimizadas al compilar.
//  Agregar una imagen nueva = solo agregar una línea aquí.
//
//  assets/regions/     → emblemas (PNG con transparencia)
//  assets/backgrounds/ → fondos de página (WebP, tema oscuro)
// ─────────────────────────────────────────────────────────────
import mondstadtEmblem from './regions/mondstadt.png';
import liyueEmblem     from './regions/liyue.png';
import inazumaEmblem   from './regions/inazuma.png';
import sumeruEmblem    from './regions/sumeru.png';
import fontaineEmblem  from './regions/fontaine.png';
import natlanEmblem    from './regions/natlan.png';

import mondstadtBg from './backgrounds/venti.webp';
import liyueBg     from './backgrounds/zhongli.webp';
import inazumaBg   from './backgrounds/raiden.webp';
import sumeruBg    from './backgrounds/nahida.webp';
import fontaineBg  from './backgrounds/furina.webp';
import natlanBg    from './backgrounds/mavuika.webp';
import citlaliBg  from './backgrounds/citlali.webp';

export const EMBLEMS: Record<string, string> = {
  mondstadt: mondstadtEmblem,
  liyue:     liyueEmblem,
  inazuma:   inazumaEmblem,
  sumeru:    sumeruEmblem,
  fontaine:  fontaineEmblem,
  natlan:    natlanEmblem,
};

/** Fondo del tema oscuro: una imagen por región. */
export const BACKGROUNDS: Record<string, string> = {
  mondstadt: mondstadtBg,
  liyue:     liyueBg,
  inazuma:   inazumaBg,
  sumeru:    sumeruBg,
  fontaine:  fontaineBg,
  natlan:    natlanBg,
};

/** Fondo del tema claro: una sola imagen para todas las regiones. */
export const LIGHT_BACKGROUND = citlaliBg;
