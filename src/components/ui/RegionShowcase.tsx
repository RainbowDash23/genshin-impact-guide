// ─────────────────────────────────────────────────────────────
//  components/ui/RegionShowcase.tsx
//  Dossier editorial de la nación activa.
//  Presentación majestuosa con heráldica, descripción inmersiva,
//  chips de expedición de sub-zonas y panel estadístico reactivo.
// ─────────────────────────────────────────────────────────────
import { RotateCcw, Compass, MapPin } from 'lucide-react';
import type { Region } from '../../types/quest';
import { AnimatedCounter } from './AnimatedCounter';

interface RegionShowcaseProps {
  region: Region;
  accent: string;
  zoneAccent: string;
  completedCount: number;
  onSelectZone: (zone: string) => void;
  activeZone: string;
  onResetRegion: () => void;
}

export function RegionShowcase({
  region,
  accent,
  zoneAccent,
  completedCount,
  onSelectZone,
  activeZone,
  onResetRegion,
}: RegionShowcaseProps) {
  const total = region.quests.length;
  const pending = total - completedCount;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div
      className="relative rounded-3xl border border-border-subtle bg-surface-raised/85 backdrop-blur-xl p-6 sm:p-8 lg:p-10 mb-10 overflow-hidden shadow-xl transition-all duration-500"
      style={{
        borderColor: accent + '45',
        backgroundImage: `radial-gradient(circle at 100% 0%, ${accent}12 0%, transparent 60%)`,
      }}
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Cabecera heráldica y descripción */}
        <div className="flex flex-col sm:flex-row items-start gap-6 max-w-2xl">
          {/* Emblema regional con halo estelar (Above-The-Fold: decoding async sin lazy para LCP óptimo) */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-3 flex-shrink-0 border border-border-subtle/80 bg-surface-sunken/80 backdrop-blur-md shadow-md"
            style={{
              borderColor: accent + '50',
              boxShadow: `0 0 25px ${accent}25`,
            }}
          >
            <img
              src={region.emblem}
              alt={region.name}
              width={72}
              height={72}
              decoding="async"
              className="w-full h-full object-contain"
              style={{ filter: `drop-shadow(0 0 14px ${accent}60)` }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border"
                style={{
                  backgroundColor: accent + '18',
                  color: accent,
                  borderColor: accent + '40',
                }}
              >
                Nación de {region.element.toUpperCase()}
              </span>
              <span className="text-fg-subtle text-xs">· Territorio de Teyvat</span>
            </div>

            <h2
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none mb-3"
              style={{ color: accent }}
            >
              {region.name}
            </h2>

            <p className="text-fg-muted text-sm sm:text-base leading-relaxed font-light mb-5">
              {region.description}
            </p>

            {/* Sub-zonas de expedición (clicables para filtrar rápido) */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-fg-subtle block mb-2">
                Sub-zonas Explorables:
              </span>
              <div className="flex flex-wrap gap-2">
                {region.zones.map(z => {
                  const isCurrent = activeZone === z;
                  return (
                    <button
                      key={z}
                      onClick={() => onSelectZone(isCurrent ? 'all' : z)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'shadow-sm font-semibold scale-105'
                          : 'hover:bg-surface-sunken/80'
                      }`}
                      style={{
                        backgroundColor: isCurrent ? accent + '2e' : accent + '12',
                        color: zoneAccent,
                        borderColor: isCurrent ? accent + '80' : accent + '30',
                      }}
                      title={`Filtrar misiones de ${z}`}
                    >
                      <MapPin size={11} />
                      {z}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Panel de estadísticas de la región */}
        <div className="lg:w-80 flex flex-col gap-4 p-6 rounded-2xl border border-border-subtle bg-surface-sunken/70 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-fg-subtle flex items-center gap-1.5">
              <Compass size={13} style={{ color: accent }} />
              Estado de la Nación
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: accent + '1c', color: accent }}
            >
              {pct}% Completada
            </span>
          </div>

          {/* Barra de progreso de la región */}
          <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden border border-border-subtle/40 p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                backgroundColor: accent,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-subtle">
            <div>
              <div className="text-xl sm:text-2xl font-black text-fg">
                <AnimatedCounter value={total} />
              </div>
              <p className="text-fg-subtle text-[11px] font-medium">Totales</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black" style={{ color: accent }}>
                <AnimatedCounter value={completedCount} />
              </div>
              <p className="text-fg-subtle text-[11px] font-medium">Hechas</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-fg-muted">
                <AnimatedCounter value={pending} />
              </div>
              <p className="text-fg-subtle text-[11px] font-medium">Pendientes</p>
            </div>
          </div>

          {completedCount > 0 && (
            <div className="pt-2 border-t border-border-subtle flex justify-end">
              <button
                type="button"
                onClick={onResetRegion}
                className="text-xs text-fg-subtle hover:text-fg transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
              >
                <RotateCcw size={12} />
                Reiniciar progreso de {region.name}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
