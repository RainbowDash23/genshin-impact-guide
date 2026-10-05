// ─────────────────────────────────────────────────────────────
//  App.tsx — Componente raíz
//  Orquesta todos los demás componentes y hooks.
//  El estado que necesitan múltiples hijos vive aquí.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import { ALL_REGIONS } from './data/regions/index';
import { Header }     from './components/layout/Header';
import { Footer }     from './components/layout/Footer';
import { Background } from './components/layout/Background';
import { RegionNav }  from './components/ui/RegionNav';
import { FilterBar }  from './components/ui/FilterBar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { QuestCard }  from './components/quest/QuestCard';
import { QuestModal } from './components/quest/QuestModal';
import { useQuestFilter }   from './hooks/useQuestFilter';
import { useQuestProgress } from './hooks/useQuestProgress';
import { useTheme }         from './hooks/useTheme';
import { useProgressivePagination } from './hooks/useProgressivePagination';
import { readableAccent }   from './lib/color';
import type { Quest } from './types/quest';
import './index.css';

export default function App() {
  const [activeId, setActiveId]           = useState(ALL_REGIONS[0].id);
  const [selected, setSelected]           = useState<Quest | null>(null);
  const { toggle, isCompleted, resetRegion } = useQuestProgress();
  const { mode, resolved, setMode }       = useTheme();

  const region = ALL_REGIONS.find(r => r.id === activeId)!;
  const { search, zone, filtered, setSearch, setZone, reset } = useQuestFilter(region.quests);

  const { visibleCount, hasMore, remainingCount, loadMore, resetPagination } =
    useProgressivePagination({
      totalItems: filtered.length,
      resetDependencies: [activeId, search, zone],
    });

  const visibleQuests = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  // Acento de cada región ajustado al tema activo. Sobre fondo
  // claro los colores originales no mantienen contraste, así que
  // se deriva una variante legible sin tocar el dato de la región.
  const accents = useMemo(
    () => Object.fromEntries(ALL_REGIONS.map(r => [r.id, readableAccent(r.color, resolved)])),
    [resolved],
  );
  const accent = accents[region.id] ?? region.color;
  const zoneAccent = readableAccent(region.accentColor, resolved);

  // Conteo global de completadas para el header
  const globalStats = useMemo(() => {
    const total = ALL_REGIONS.reduce((s, r) => s + r.quests.length, 0);
    const done  = ALL_REGIONS.reduce((s, r) => s + r.quests.filter(q => isCompleted(q.id)).length, 0);
    return { total, done };
  }, [isCompleted]);

  // Completadas por región para la nav
  const completedByRegion = useMemo(() => {
    return Object.fromEntries(
      ALL_REGIONS.map(r => [r.id, r.quests.filter(q => isCompleted(q.id)).length])
    );
  }, [isCompleted]);

  const regionDone = completedByRegion[activeId] ?? 0;

  function handleRegionChange(id: string) {
    setActiveId(id);
    reset();
  }

  return (
    <div className="min-h-screen text-fg">
      <Background regionId={activeId} theme={resolved} />

      <Header
        completedCount={globalStats.done}
        totalCount={globalStats.total}
        accentColor={accent}
      >
        <ThemeToggle mode={mode} accentColor={accent} onChange={setMode} />
      </Header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <RegionNav
          regions={ALL_REGIONS}
          activeId={activeId}
          completedByRegion={completedByRegion}
          accents={accents}
          onSelect={handleRegionChange}
        />

        {/* Panel de región */}
        <div
          className="rounded-2xl border border-border-subtle bg-surface-raised backdrop-blur-md p-6 mb-8"
          style={{
            borderColor: accent + '38',
            // El tinte se pinta como background-image para que se
            // componga sobre el color de superficie translúcido.
            backgroundImage: `linear-gradient(${accent}14, ${accent}14)`,
          }}
        >
          <div className="flex items-start gap-5">
            <img
              src={region.emblem}
              alt={region.name}
              width={64}
              height={64}
              decoding="async"
              className="w-16 h-16 object-contain flex-shrink-0"
              style={{ filter: `drop-shadow(0 0 12px ${accent}40)` }}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-black leading-tight" style={{ color: accent }}>
                {region.name}
              </h2>
              <p className="text-fg-muted text-sm mt-1 leading-relaxed">{region.description}</p>

              {/* Sub-zonas */}
              <div className="flex flex-wrap gap-2 mt-4">
                {region.zones.map(z => (
                  <span
                    key={z}
                    className="text-xs px-2.5 py-1 rounded-md font-medium border"
                    style={{ backgroundColor: accent + '1a', color: zoneAccent, borderColor: accent + '38' }}
                  >
                    {z}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-5 pt-5 border-t border-border-subtle">
                <Stat value={region.quests.length} label="Total" color={accent} />
                <Stat value={regionDone} label="Completadas" color={accent} />
                <Stat value={region.quests.length - regionDone} label="Pendientes" color={accent} />
                {regionDone > 0 && (
                  <button
                    onClick={() => {
                      resetRegion(region.quests.map(q => q.id));
                      resetPagination();
                    }}
                    className="ml-auto text-xs text-fg-subtle hover:text-fg transition-colors underline underline-offset-2"
                  >
                    Reiniciar progreso
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <FilterBar
          search={search}
          zone={zone}
          zones={region.zones}
          color={accent}
          visible={visibleQuests.length}
          total={filtered.length}
          onSearch={setSearch}
          onZone={setZone}
          onReset={reset}
        />

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleQuests.map(q => (
                <QuestCard
                  key={q.id}
                  quest={q}
                  color={accent}
                  completed={isCompleted(q.id)}
                  onToggle={toggle}
                  onOpen={setSelected}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  aria-label={`Cargar más misiones (${remainingCount} restantes)`}
                  className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl font-bold text-sm
                             bg-surface-raised backdrop-blur-sm border border-border-subtle
                             text-fg hover:border-current transition-all duration-200 shadow-sm
                             hover:shadow flex items-center justify-center gap-2"
                  style={{ borderColor: accent + '50' }}
                >
                  Cargar más misiones ({remainingCount} restantes)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-fg-muted text-lg font-bold">Sin resultados</p>
            <p className="text-fg-subtle text-sm mt-1">Intenta con otros términos o zonas.</p>
            <button onClick={reset} className="mt-4 text-sm underline underline-offset-2" style={{ color: accent }}>
              Limpiar filtros
            </button>
          </div>
        )}
      </main>

      <Footer />

      <QuestModal
        quest={selected}
        color={accent}
        regionName={region.name}
        completed={selected ? isCompleted(selected.id) : false}
        onToggle={toggle}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <p className="text-xl font-black leading-none" style={{ color }}>{value}</p>
      <p className="text-fg-subtle text-xs mt-1">{label}</p>
    </div>
  );
}
