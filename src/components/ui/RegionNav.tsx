// ─────────────────────────────────────────────────────────────
//  components/ui/RegionNav.tsx
//  Navegación horizontal entre regiones.
//  Muestra el emblema de la región, su nombre y conteo.
// ─────────────────────────────────────────────────────────────
import type { Region } from '../../types/quest';

interface RegionNavProps {
  regions: Region[];
  activeId: string;
  completedByRegion: Record<string, number>;
  onSelect: (id: string) => void;
}

export function RegionNav({ regions, activeId, completedByRegion, onSelect }: RegionNavProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 mb-8 scrollbar-thin">
      {regions.map(r => {
        const isActive = r.id === activeId;
        const done = completedByRegion[r.id] ?? 0;
        const total = r.quests.length;
        return (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm
                       whitespace-nowrap border transition-all duration-200 flex-shrink-0 group"
            style={isActive
              ? { backgroundColor: r.color + '15', borderColor: r.color + '60', color: r.color }
              : { backgroundColor: 'transparent', borderColor: '#1f2937', color: '#6b7280' }}
          >
            {/* Emblema de la región */}
            <img
              src={r.emblem}
              alt={r.name}
              className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              style={isActive ? { filter: `drop-shadow(0 0 4px ${r.color}60)` } : {}}
            />
            <span>{r.name}</span>
            {/* Progreso mini */}
            {done > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={{ backgroundColor: r.color + '20', color: r.color }}
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
