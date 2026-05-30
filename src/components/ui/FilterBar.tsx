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
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar misión o ubicación..."
            className="w-full bg-gray-900 border border-gray-800 text-white placeholder-gray-600
                       rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
            onFocus={e  => (e.target.style.borderColor = color)}
            onBlur={e   => (e.target.style.borderColor = '')}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-900 border border-gray-800 px-3 py-2.5 rounded-lg whitespace-nowrap">
          {visible} / {total}
        </div>
        {hasFilter && (
          <button onClick={onReset} className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-500 hover:text-white transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', ...zones].map(z => (
          <button
            key={z}
            onClick={() => onZone(z)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
            style={zone === z
              ? { backgroundColor: color + '20', borderColor: color + '60', color }
              : { backgroundColor: 'transparent', borderColor: '#1f2937', color: '#4b5563' }}
          >
            {z === 'all' ? 'Todas las zonas' : z}
          </button>
        ))}
      </div>
    </div>
  );
}
