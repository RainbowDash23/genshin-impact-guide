// ─────────────────────────────────────────────────────────────
//  App.tsx — Componente raíz
//  Orquesta la navegación entre las siete naciones de Teyvat,
//  el catálogo de misiones, filtros de alta precisión,
//  persistencia local en tiempo real y transiciones cinematográficas.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo, useCallback } from 'react';
import { ALL_REGIONS } from './data/regions/index';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/layout/HeroSection';
import { Footer } from './components/layout/Footer';
import { Background } from './components/layout/Background';
import { RegionNav } from './components/ui/RegionNav';
import { RegionShowcase } from './components/ui/RegionShowcase';
import { FilterBar, type StatusFilter } from './components/ui/FilterBar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { QuestCard } from './components/quest/QuestCard';
import { QuestModal } from './components/quest/QuestModal';
import { useQuestFilter } from './hooks/useQuestFilter';
import { useQuestProgress } from './hooks/useQuestProgress';
import { useTheme } from './hooks/useTheme';
import { useProgressivePagination } from './hooks/useProgressivePagination';
import { readableAccent } from './lib/color';
import type { Quest } from './types/quest';
import { SearchX, ChevronDown } from 'lucide-react';
import './index.css';

export default function App() {
  const [activeId, setActiveId] = useState(ALL_REGIONS[0].id);
  const [selected, setSelected] = useState<Quest | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const { toggle, isCompleted, resetRegion } = useQuestProgress();
  const { mode, resolved, setMode } = useTheme();

  const region = ALL_REGIONS.find(r => r.id === activeId) ?? ALL_REGIONS[0];
  const { search, zone, filtered, setSearch, setZone, reset } = useQuestFilter(region.quests);

  // Filtro adicional por estado de misión (Todas / Pendientes / Completadas)
  const statusFiltered = useMemo(() => {
    if (statusFilter === 'pending') {
      return filtered.filter(q => !isCompleted(q.id));
    }
    if (statusFilter === 'completed') {
      return filtered.filter(q => isCompleted(q.id));
    }
    return filtered;
  }, [filtered, statusFilter, isCompleted]);

  // Carga progresiva responsiva (12 en móvil/tablet, 18 en desktop)
  const { visibleCount, hasMore, remainingCount, loadMore, resetPagination } =
    useProgressivePagination({
      totalItems: statusFiltered.length,
      resetDependencies: [activeId, search, zone, statusFilter],
    });

  const visibleQuests = useMemo(
    () => statusFiltered.slice(0, visibleCount),
    [statusFiltered, visibleCount],
  );

  // Acento legible para cada región según el tema activo
  const accents = useMemo(
    () => Object.fromEntries(ALL_REGIONS.map(r => [r.id, readableAccent(r.color, resolved)])),
    [resolved],
  );
  const accent = accents[region.id] ?? region.color;
  const zoneAccent = readableAccent(region.accentColor, resolved);

  // Estadísticas globales de Teyvat
  const globalStats = useMemo(() => {
    const total = ALL_REGIONS.reduce((s, r) => s + r.quests.length, 0);
    const done = ALL_REGIONS.reduce(
      (s, r) => s + r.quests.filter(q => isCompleted(q.id)).length,
      0,
    );
    return { total, done };
  }, [isCompleted]);

  // Estadísticas por región individual
  const completedByRegion = useMemo(() => {
    return Object.fromEntries(
      ALL_REGIONS.map(r => [r.id, r.quests.filter(q => isCompleted(q.id)).length]),
    );
  }, [isCompleted]);

  const regionDone = completedByRegion[activeId] ?? 0;

  const handleRegionChange = useCallback((id: string) => {
    setActiveId(id);
    reset();
    setStatusFilter('all');
  }, [reset]);

  const handleResetAll = useCallback(() => {
    reset();
    setStatusFilter('all');
    resetPagination();
  }, [reset, resetPagination]);

  return (
    <div className="min-h-screen text-fg flex flex-col selection:bg-fg selection:text-surface">
      {/* Sistema de fondo ultra-optimizado con doble capa crossfade en GPU */}
      <Background regionId={activeId} theme={resolved} />

      {/* Header fijo con desenfoque de cristal y marca prémium */}
      <Header
        completedCount={globalStats.done}
        totalCount={globalStats.total}
        accentColor={accent}
      >
        <ThemeToggle mode={mode} accentColor={accent} onChange={setMode} />
      </Header>

      {/* Contenedor principal con amplio espacio en blanco */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">

        {/* Cabecera Hero de estilo agencia con hueco reservado para vídeo */}
        <HeroSection
          completedCount={globalStats.done}
          totalCount={globalStats.total}
          totalRegions={ALL_REGIONS.length}
          accentColor={accent}
          activeRegionName={region.name}
        />

        {/* Barra de navegación de reinos (Atlas de Teyvat) */}
        <RegionNav
          regions={ALL_REGIONS}
          activeId={activeId}
          completedByRegion={completedByRegion}
          accents={accents}
          onSelect={handleRegionChange}
        />

        {/* Dossier de la nación activa */}
        <RegionShowcase
          region={region}
          accent={accent}
          zoneAccent={zoneAccent}
          completedCount={regionDone}
          onSelectZone={setZone}
          activeZone={zone}
          onResetRegion={() => {
            resetRegion(region.quests.map(q => q.id));
            resetPagination();
          }}
        />

        {/* Consola de búsqueda, filtros de estado y sub-zonas */}
        <FilterBar
          search={search}
          zone={zone}
          zones={region.zones}
          color={accent}
          visible={visibleQuests.length}
          total={statusFiltered.length}
          onSearch={setSearch}
          onZone={setZone}
          onReset={handleResetAll}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
        />

        {/* Catálogo de tarjetas de misión */}
        {statusFiltered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

            {/* Expansión incremental accesible de misiones */}
            {hasMore && (
              <div className="mt-12 flex justify-center pb-6">
                <button
                  type="button"
                  onClick={loadMore}
                  aria-label={`Cargar más misiones (${remainingCount} restantes)`}
                  className="min-h-[48px] px-8 py-3.5 rounded-2xl font-bold text-sm
                             bg-surface-raised/90 backdrop-blur-md border border-border-subtle
                             text-fg hover:border-current transition-all duration-300 shadow-md
                             hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer
                             hover:-translate-y-0.5 active:scale-95"
                  style={{
                    borderColor: accent + '60',
                    boxShadow: `0 8px 24px -6px ${accent}25`,
                  }}
                >
                  <span>Cargar más misiones ({remainingCount} restantes)</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Estado vacío de alta fidelidad */
          <div className="text-center py-24 px-6 rounded-3xl border border-border-subtle bg-surface-raised/60 backdrop-blur-md max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-sunken flex items-center justify-center border border-border-subtle text-fg-subtle">
              <SearchX size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-fg mb-2">
              Sin misiones encontradas
            </h3>
            <p className="text-fg-subtle text-sm leading-relaxed mb-6">
              No hay coincidencias para los filtros o el término de búsqueda actual en{' '}
              <strong className="text-fg">{region.name}</strong>.
            </p>
            <button
              type="button"
              onClick={handleResetAll}
              className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: accent + '1f',
                borderColor: accent + '60',
                color: accent,
              }}
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </main>

      {/* Pie de página con créditos oficiales y estética editorial */}
      <Footer />

      {/* Códice / Modal de misión interactivo */}
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
