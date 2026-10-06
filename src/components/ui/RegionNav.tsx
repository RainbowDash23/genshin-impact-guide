// ─────────────────────────────────────────────────────────────
//  components/ui/RegionNav.tsx
//  Navegador de alta costura entre las regiones de Teyvat.
//  Diseño estilo atlas de reinos con emblemas nítidos,
//  anillos de progreso por nación y respuesta táctil prémium.
// ─────────────────────────────────────────────────────────────
import type { Region } from '../../types/quest';
import { preloadRegionBackground } from '../../lib/backgroundPreloader';

interface RegionNavProps {
  regions: Region[];
  activeId: string;
  completedByRegion: Record<string, number>;
  accents: Record<string, string>;
  onSelect: (id: string) => void;
}

export function RegionNav({
  regions,
  activeId,
  completedByRegion,
  accents,
  onSelect,
}: RegionNavProps) {
  return (
    <div className="relative mb-10">
      {/* Contenedor con barra de desplazamiento oculta y soporte de arrastre/touch */}
      <nav
        aria-label="Selección de Naciones de Teyvat"
        className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none"
      >
        {regions.map(r => {
          const isActive = r.id === activeId;
          const done = completedByRegion[r.id] ?? 0;
          const total = r.quests.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const accent = accents[r.id] ?? r.color;

          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              onPointerEnter={() => preloadRegionBackground(r.id)}
              onFocus={() => preloadRegionBackground(r.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl border text-sm
                         transition-all duration-300 flex-shrink-0 cursor-pointer text-left
                         ${isActive
                  ? 'shadow-lg scale-[1.02] bg-surface-raised backdrop-blur-md'
                  : 'bg-surface-raised/60 hover:bg-surface-raised/90 border-border-subtle hover:border-border-subtle/80 hover:-translate-y-0.5'
                }`}
              style={
                isActive
                  ? {
                    borderColor: accent + '80',
                    boxShadow: `0 8px 24px -6px ${accent}33`,
                  }
                  : undefined
              }
            >
              {/* Emblema regional con halo */}
              <div
                className="relative w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: isActive ? accent + '1f' : 'transparent',
                }}
              >
                <img
                  src={r.emblem}
                  alt={r.name}
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 object-contain flex-shrink-0 transition-all duration-300"
                  style={
                    isActive
                      ? {
                        filter: `drop-shadow(0 0 8px ${accent}80)`,
                        transform: 'scale(1.08)',
                      }
                      : { opacity: 0.85 }
                  }
                />
              </div>

              {/* Nombre y progreso */}
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-bold tracking-tight text-sm transition-colors ${isActive ? 'text-fg' : 'text-fg-muted group-hover:text-fg'
                      }`}
                  >
                    {r.name}
                  </span>

                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
                  <span>
                    {done}/{total} misiones
                  </span>
                  {done > 0 && (
                    <span
                      className="font-semibold text-[10px] px-1 rounded"
                      style={{
                        backgroundColor: accent + '18',
                        color: accent,
                      }}
                    >
                      {pct}%
                    </span>
                  )}
                </div>
              </div>

              {/* Barra inferior activa */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
