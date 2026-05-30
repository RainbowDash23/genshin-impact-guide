// ─────────────────────────────────────────────────────────────
//  components/quest/QuestCard.tsx
//  Tarjeta individual de misión. Muestra el estado
//  de completado y llama a onClick para abrir el modal.
// ─────────────────────────────────────────────────────────────
import { CheckCircle2, Circle, MapPin, ChevronRight } from 'lucide-react';
import type { Quest } from '../../types/quest';

interface QuestCardProps {
  quest: Quest;
  color: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onOpen: (quest: Quest) => void;
}

export function QuestCard({ quest, color, completed, onToggle, onOpen }: QuestCardProps) {
  return (
    <div
      className={`group flex flex-col rounded-xl border transition-all duration-200
                  ${completed
                    ? 'bg-gray-900/40 border-gray-800/40'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20'}`}
    >
      {/* Body — abre el modal */}
      <button
        onClick={() => onOpen(quest)}
        className="flex-1 text-left p-5 flex flex-col gap-2.5"
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-md"
            style={{ backgroundColor: color + '15', color }}
          >
            {quest.zone}
          </span>
          <ChevronRight
            size={14}
            className="text-gray-600 flex-shrink-0 mt-0.5 group-hover:text-gray-400 transition-colors"
          />
        </div>

        <h3 className={`font-bold text-sm leading-snug transition-colors ${completed ? 'text-gray-500 line-through' : 'text-white'}`}>
          {quest.name}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
          <MapPin size={11} />
          <span className="truncate">{quest.location}</span>
        </div>
      </button>

      {/* Footer — toggle completado */}
      <div className="px-5 pb-4 pt-1 border-t border-gray-800/50 flex items-center justify-between">
        <span className={`text-xs font-medium ${completed ? 'text-gray-600' : 'text-gray-500'}`}>
          {completed ? 'Completada' : 'Ver detalles'}
        </span>
        <button
          onClick={() => onToggle(quest.id)}
          className="transition-colors hover:scale-110 active:scale-95 transition-transform"
          title={completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          {completed
            ? <CheckCircle2 size={18} style={{ color }} />
            : <Circle size={18} className="text-gray-700 hover:text-gray-500" />}
        </button>
      </div>
    </div>
  );
}
