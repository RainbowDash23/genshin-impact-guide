// ─────────────────────────────────────────────────────────────
//  App.tsx — Componente raíz
//  Orquesta todos los demás componentes y hooks.
//  El estado que necesitan múltiples hijos vive aquí.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import { ALL_REGIONS } from './data/regions/index';
import { Header }     from './components/layout/Header';
import { Footer }     from './components/layout/Footer';
import { RegionNav }  from './components/ui/RegionNav';
import { FilterBar }  from './components/ui/FilterBar';
import { QuestCard }  from './components/quest/QuestCard';
import { QuestModal } from './components/quest/QuestModal';
import { useQuestFilter }   from './hooks/useQuestFilter';
import { useQuestProgress } from './hooks/useQuestProgress';
import type { Quest } from './types/quest';
import './index.css';

export default function App() {
  const [activeId, setActiveId]           = useState(ALL_REGIONS[0].id);
  const [selected, setSelected]           = useState<Quest | null>(null);
  const { toggle, isCompleted, resetRegion } = useQuestProgress();

  const region = ALL_REGIONS.find(r => r.id === activeId)!;
  const { search, zone, filtered, setSearch, setZone, reset } = useQuestFilter(region.quests);

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
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        completedCount={globalStats.done}
        totalCount={globalStats.total}
        accentColor={region.color}
      />

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <RegionNav
          regions={ALL_REGIONS}
          activeId={activeId}
          completedByRegion={completedByRegion}
          onSelect={handleRegionChange}
        />

        {/* Panel de región */}
        <div
          className="rounded-2xl border p-6 mb-8"
          style={{ backgroundColor: region.color + '07', borderColor: region.color + '25' }}
        >
          <div className="flex items-start gap-5">
            <img
              src={region.emblem}
              alt={region.name}
              className="w-16 h-16 object-contain flex-shrink-0"
              style={{ filter: `drop-shadow(0 0 12px ${region.color}40)` }}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-black leading-tight" style={{ color: region.color }}>
                {region.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">{region.description}</p>

              {/* Sub-zonas */}
              <div className="flex flex-wrap gap-2 mt-4">
                {region.zones.map(z => (
                  <span key={z} className="text-xs px-2.5 py-1 rounded-md font-medium border"
                    style={{ backgroundColor: region.color + '10', color: region.accentColor, borderColor: region.color + '25' }}>
                    {z}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-5 pt-5 border-t border-gray-800/40">
                <Stat value={region.quests.length} label="Total" color={region.color} />
                <Stat value={regionDone} label="Completadas" color={region.color} />
                <Stat value={region.quests.length - regionDone} label="Pendientes" color={region.color} />
                {regionDone > 0 && (
                  <button
                    onClick={() => resetRegion(region.quests.map(q => q.id))}
                    className="ml-auto text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2"
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
          color={region.color}
          visible={filtered.length}
          total={region.quests.length}
          onSearch={setSearch}
          onZone={setZone}
          onReset={reset}
        />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(q => (
              <QuestCard
                key={q.id}
                quest={q}
                color={region.color}
                completed={isCompleted(q.id)}
                onToggle={toggle}
                onOpen={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg font-bold">Sin resultados</p>
            <p className="text-gray-700 text-sm mt-1">Intenta con otros términos o zonas.</p>
            <button onClick={reset} className="mt-4 text-sm underline underline-offset-2" style={{ color: region.color }}>
              Limpiar filtros
            </button>
          </div>
        )}
      </main>

      <Footer />

      <QuestModal
        quest={selected}
        color={region.color}
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
      <p className="text-gray-600 text-xs mt-1">{label}</p>
    </div>
  );
}
