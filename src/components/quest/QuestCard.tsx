// ─────────────────────────────────────────────────────────────
//  components/quest/QuestCard.tsx
//  Tarjeta individual de misión con acabados de alta costura.
//  Diseño minimalista con generoso espacio en blanco, bordes con
//  resplandor elemental al interactuar, tipografía cuidada y
//  conmutador táctil de estado.
// ─────────────────────────────────────────────────────────────
import { CheckCircle2, Circle, MapPin, ArrowUpRight, Lock } from 'lucide-react';
import type { Quest } from '../../types/quest';

interface QuestCardProps {
  quest: Quest;
  color: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onOpen: (quest: Quest) => void;
}

export function QuestCard({ quest, color, completed, onToggle, onOpen }: QuestCardProps) {
  const hasPrereq = quest.requirements && quest.requirements !== 'Ninguno' && quest.requirements !== 'Ninguna';

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-3xl border transition-all duration-300
                 ${
                   completed
                     ? 'bg-surface-sunken/65 border-border-subtle/80 opacity-85'
                     : 'bg-surface-raised/85 hover:bg-surface-raised border-border-subtle hover:-translate-y-1.5 shadow-sm hover:shadow-2xl'
                 }`}
      style={
        !completed
          ? {
              boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
          : undefined
      }
    >
      {/* Resplandor superior en hover que responde al elemento de la región */}
      <div
        className="absolute inset-x-0 -top-px h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      {/* Contenido principal — Clic abre el modal informativo */}
      <div
        onClick={() => onOpen(quest)}
        className="p-6 sm:p-7 flex-1 flex flex-col gap-3.5 cursor-pointer text-left"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(quest);
          }
        }}
      >
        {/* Cabecera de la tarjeta: Sub-zona + Toggle rápido de completado */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl border"
              style={{
                backgroundColor: color + '14',
                color: color,
                borderColor: color + '30',
              }}
            >
              {quest.zone}
            </span>

            {hasPrereq && (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-fg-subtle px-2 py-0.5 rounded-lg bg-surface-sunken border border-border-subtle/60"
                title="Tiene requisitos previos"
              >
                <Lock size={10} />
                Prerrequisito
              </span>
            )}
          </div>

          {/* Botón de toggle de completado accesible e independiente */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onToggle(quest.id);
            }}
            aria-label={completed ? `Marcar ${quest.name} como pendiente` : `Marcar ${quest.name} como completada`}
            className="p-1 rounded-xl transition-transform duration-200 hover:scale-120 active:scale-90 cursor-pointer"
            title={completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {completed ? (
              <CheckCircle2 size={22} style={{ color }} className="drop-shadow-sm" />
            ) : (
              <Circle
                size={22}
                className="text-fg-subtle/60 group-hover:text-fg-subtle transition-colors"
              />
            )}
          </button>
        </div>

        {/* Título de la misión */}
        <h3
          className={`font-display font-bold text-base sm:text-lg leading-snug transition-colors ${
            completed ? 'text-fg-subtle line-through decoration-fg-subtle/40' : 'text-fg group-hover:text-fg'
          }`}
        >
          {quest.name}
        </h3>

        {/* Ubicación en Teyvat */}
        <div className="flex items-center gap-1.5 text-fg-subtle text-xs mt-auto pt-1">
          <MapPin size={13} className="flex-shrink-0" style={{ color: !completed ? color : undefined }} />
          <span className="truncate">{quest.location}</span>
        </div>
      </div>

      {/* Pie de tarjeta sutil: enlace a detalles completos */}
      <div
        onClick={() => onOpen(quest)}
        className="px-6 sm:px-7 py-3.5 border-t border-border-subtle/70 bg-surface-sunken/40 flex items-center justify-between text-xs font-semibold cursor-pointer rounded-b-3xl transition-colors group-hover:bg-surface-sunken/80"
      >
        <span className={completed ? 'text-fg-subtle' : 'text-fg-muted group-hover:text-fg'}>
          {completed ? 'Completada' : 'Ver guía detallada'}
        </span>
        <div className="flex items-center gap-1 text-fg-subtle group-hover:text-fg transition-colors">
          <span className="text-[11px] font-medium hidden sm:inline">Detalles</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
