// ─────────────────────────────────────────────────────────────
//  components/layout/Background.tsx
//  Capa de fondo de la página: imagen + velo de legibilidad.
//  El tema claro usa una sola imagen (Citlali) para todas las
//  regiones; el oscuro usa una por región. Se reinicia la
//  animación con `key` para que el cambio entre fondos se
//  note como un cross-fade y no como un salto.
// ─────────────────────────────────────────────────────────────
import { BACKGROUNDS, LIGHT_BACKGROUND } from '../../assets/index';
import type { ResolvedTheme } from '../../types/theme';

interface BackgroundProps {
  regionId: string;
  theme: ResolvedTheme;
}

export function Background({ regionId, theme }: BackgroundProps) {
  const src = theme === 'light' ? LIGHT_BACKGROUND : BACKGROUNDS[regionId] ?? LIGHT_BACKGROUND;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        key={src}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${src}")`, animation: 'backgroundFade .5s ease-out' }}
      />
      {/* Velo del tema: garantiza contraste sin tapar el arte. */}
      <div className="absolute inset-0" style={{ background: 'var(--scrim)' }} />
    </div>
  );
}
