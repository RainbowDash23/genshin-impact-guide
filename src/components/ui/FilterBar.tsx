// ─────────────────────────────────────────────────────────────
//  components/ui/FilterBar.tsx
//  Consola de búsqueda y filtrado de alta gama.
//  Diseño minimalista con mucho espacio, buscador tipo Spotlight,
//  selector de zonas de expedición y filtro rápido de estado.
// ─────────────────────────────────────────────────────────────
import { Search, X, SlidersHorizontal, CheckCircle2, Clock, Layers } from 'lucide-react';

export type StatusFilter = 'all' | 'pending' | 'completed';

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
  statusFilter?: StatusFilter;
  onStatusFilter?: (status: StatusFilter) => void;
}

export function FilterBar({
  search,
  zone,
  zones,
  color,
  visible,
  total,
  onSearch,
  onZone,
  onReset,
  statusFilter = 'all',
  onStatusFilter,
}: FilterBarProps) {
  const hasFilter = search !== '' || zone !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-4 mb-10">
      {/* Barra superior de controles: Buscador + Filtro de estado + Contador */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Buscador de estilo Spotlight */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none transition-colors"
          />
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar por nombre, zona o ubicación en Teyvat..."
            className="w-full bg-surface-raised/85 backdrop-blur-md border border-border-subtle
                       text-fg placeholder:text-fg-subtle/80
                       rounded-2xl pl-11 pr-10 py-3.5 text-sm focus:outline-none transition-all duration-200
                       shadow-sm hover:border-border-subtle/80"
            style={{
              borderColor: search ? color + '80' : undefined,
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch('')}
              aria-label="Borrar búsqueda"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-fg-subtle hover:text-fg hover:bg-surface-sunken transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Pestañas de estado rápido (Todas / Pendientes / Completadas) */}
        {onStatusFilter && (
          <div
            role="group"
            aria-label="Filtro por estado de misión"
            className="flex items-center gap-1 p-1 rounded-2xl border border-border-subtle bg-surface-raised/75 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => onStatusFilter('all')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-surface shadow-sm text-fg'
                  : 'text-fg-subtle hover:text-fg'
              }`}
            >
              <Layers size={13} />
              Todas
            </button>

            <button
              type="button"
              onClick={() => onStatusFilter('pending')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'pending'
                  ? 'bg-surface shadow-sm text-fg'
                  : 'text-fg-subtle hover:text-fg'
              }`}
            >
              <Clock size={13} />
              Pendientes
            </button>

            <button
              type="button"
              onClick={() => onStatusFilter('completed')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'completed'
                  ? 'bg-surface shadow-sm text-fg'
                  : 'text-fg-subtle hover:text-fg'
              }`}
            >
              <CheckCircle2 size={13} style={statusFilter === 'completed' ? { color } : undefined} />
              Completadas
            </button>
          </div>
        )}

        {/* Indicador de conteo y botón de reseteo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-fg-muted bg-surface-raised/80 backdrop-blur-md border border-border-subtle px-4 py-3 rounded-2xl whitespace-nowrap shadow-sm">
            <span className="text-fg font-black">{visible}</span> de {total} misiones
          </div>

          {hasFilter && (
            <button
              type="button"
              onClick={onReset}
              aria-label="Limpiar todos los filtros"
              className="p-3 rounded-2xl bg-surface-raised/80 backdrop-blur-md border border-border-subtle
                         text-fg-subtle hover:text-fg hover:border-border-subtle/80 transition-all shadow-sm cursor-pointer"
              title="Limpiar todos los filtros"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Píldoras de selección de sub-zonas */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-fg-subtle flex items-center gap-1 mr-1 flex-shrink-0">
          <SlidersHorizontal size={12} />
          Zona:
        </span>

        {['all', ...zones].map(z => {
          const isActive = zone === z;
          return (
            <button
              key={z}
              type="button"
              onClick={() => onZone(z)}
              aria-pressed={isActive}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'shadow-sm font-bold scale-[1.02]'
                  : 'border-border-subtle text-fg-subtle hover:text-fg hover:border-border-subtle/80 bg-surface-raised/50'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: color + '22',
                      borderColor: color + '80',
                      color: color,
                    }
                  : undefined
              }
            >
              {z === 'all' ? 'Todas las zonas' : z}
            </button>
          );
        })}
      </div>
    </div>
  );
}
