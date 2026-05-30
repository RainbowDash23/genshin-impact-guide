// ─────────────────────────────────────────────────────────────
//  data/regions/index.ts
//  Punto de entrada único para todos los datos de regiones.
//  Para añadir una región nueva solo crea su archivo
//  y agrégala al array ALL_REGIONS. Nada más cambia.
// ─────────────────────────────────────────────────────────────
import { mondstadt } from './mondstadt';
import { liyue }     from './liyue';
import { inazuma }   from './inazuma';
import { sumeru }    from './sumeru';
import { fontaine }  from './fontaine';
import { natlan }    from './natlan';
import type { Region } from '../../types/quest';

export const ALL_REGIONS: Region[] = [
  mondstadt,
  liyue,
  inazuma,
  sumeru,
  fontaine,
  natlan,
];

export { mondstadt, liyue, inazuma, sumeru, fontaine, natlan };
