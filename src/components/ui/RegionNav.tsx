// ─────────────────────────────────────────────────────────────
//  components/ui/RegionNav.tsx
//  Navegación horizontal entre regiones.
//  Muestra el emblema de la región, su nombre y conteo.
//  Recibe `accents` con el color ya ajustado al tema activo.
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

export function RegionNav({ regions, activeId, completedByRegion, accents, onSelect }: RegionNavProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-thin">
      {regions.map(r => {
        const isActive = r.id === activeId;
        const done = completedByRegion[r.id] ?? 0;
        const total = r.quests.length;
        const accent = accents[r.id] ?? r.color;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            onPointerEnter={() => preloadRegionBackground(r.id)}
            onFocus={() => preloadRegionBackground(r.id)}
            aria-current={isActive ? 'true' : undefined}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm
                       whitespace-nowrap border transition-all duration-200 flex-shrink-0 group
                       bg-surface-raised backdrop-blur-sm"
            style={isActive
              ? { backgroundColor: accent + '1f', borderColor: accent + '73', color: accent }
              : { borderColor: 'var(--border-subtle)', color: 'var(--fg-subtle)' }}
          >
            {/* Emblema de la región */}
            <img
              src={r.emblem}
              alt={r.name}
              className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              style={isActive ? { filter: `drop-shadow(0 0 4px ${accent}60)` } : {}}
            />
            <span>{r.name}</span>
            {/* Progreso mini */}
            {done > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{ backgroundColor: accent + '2b', color: accent }}
              >
                {done}/{total}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
