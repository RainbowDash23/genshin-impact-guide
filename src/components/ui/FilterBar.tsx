// ─────────────────────────────────────────────────────────────
//  components/ui/FilterBar.tsx
//  Barra de búsqueda + filtro por sub-zona.
// ─────────────────────────────────────────────────────────────
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  search: string;
  zone: string;
  zones: string[];
  color: string;
  visible: number;
  total: number;
  onSearch: (v: string) => void;
  onZone: (v: string) => void;
  onReset: () => void;
}

export function FilterBar({ search, zone, zones, color, visible, total, onSearch, onZone, onReset }: FilterBarProps) {
  const hasFilter = search !== '' || zone !== 'all';

  return (
    <div className="space-y-3 mb-8">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar misión o ubicación..."
            className="w-full bg-surface-raised backdrop-blur-sm border border-border-subtle
                       text-fg placeholder:text-fg-subtle
                       rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
            onFocus={e  => (e.target.style.borderColor = color)}
            onBlur={e   => (e.target.style.borderColor = '')}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-fg-muted bg-surface-raised backdrop-blur-sm
                        border border-border-subtle px-3 py-2.5 rounded-lg whitespace-nowrap">
          {visible} / {total}
        </div>
        {hasFilter && (
          <button
            onClick={onReset}
            aria-label="Limpiar filtros"
            className="p-2.5 rounded-lg bg-surface-raised backdrop-blur-sm border border-border-subtle
                       text-fg-subtle hover:text-fg transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', ...zones].map(z => {
          const isActive = zone === z;
          return (
            <button
              key={z}
              onClick={() => onZone(z)}
              aria-pressed={isActive}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                         bg-surface-raised backdrop-blur-sm"
              style={isActive
                ? { backgroundColor: color + '2b', borderColor: color + '73', color }
                : { borderColor: 'var(--border-subtle)', color: 'var(--fg-subtle)' }}
            >
              {z === 'all' ? 'Todas las zonas' : z}
            </button>
          );
        })}
      </div>
    </div>
  );
}
