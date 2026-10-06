// ─────────────────────────────────────────────────────────────
//  components/quest/QuestModal.tsx
//  Modal de detalle de misión de alta fidelidad.
//  Diseño estilo códice de expedición con desenfoque profundo,
//  tarjetas de parámetros, guía paso a paso y atajos de teclado.
// ─────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { X, MapPin, Map, Lock, ScrollText, CheckCircle2, Circle } from 'lucide-react';
import type { Quest } from '../../types/quest';

interface QuestModalProps {
  quest: Quest | null;
  color: string;
  regionName: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onClose: () => void;
}

export function QuestModal({
  quest,
  color,
  regionName,
  completed,
  onToggle,
  onClose,
}: QuestModalProps) {
  useEffect(() => {
    if (!quest) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [quest, onClose]);

  if (!quest) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quest-modal-title"
    >
      <div
        className="bg-surface-raised/95 backdrop-blur-2xl border border-border-subtle rounded-3xl
                   shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col transition-all"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 40px -10px ${color}20`,
          borderColor: color + '40',
        }}
      >
        {/* Cabecera del Códice */}
        <div className="sticky top-0 bg-surface-raised/95 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 py-5 flex items-start justify-between gap-4 z-10">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: color + '18',
                  color: color,
                  borderColor: color + '40',
                }}
              >
                {regionName}
              </span>
              <span className="text-fg-subtle text-xs">· Bitácora de Aventura</span>
            </div>
            <h2
              id="quest-modal-title"
              className="font-display font-black text-xl sm:text-2xl text-fg leading-tight"
            >
              {quest.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-2 rounded-xl text-fg-subtle hover:text-fg hover:bg-surface-sunken border border-transparent hover:border-border-subtle transition-all cursor-pointer flex items-center gap-1 text-xs"
              title="Cerrar (Esc)"
            >
              <span className="hidden sm:inline text-[10px] font-bold text-fg-subtle border border-border-subtle px-1.5 py-0.5 rounded">
                ESC
              </span>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cuerpo del Códice */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tarjetas de Parámetros: Ubicación y Sub-zona */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-surface-sunken/80 border border-border-subtle rounded-2xl p-4 flex items-start gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: color + '18', color }}
              >
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-fg-subtle block mb-1">
                  Ubicación Inicial
                </span>
                <p className="text-fg font-semibold text-sm leading-snug">{quest.location}</p>
              </div>
            </div>

            <div className="bg-surface-sunken/80 border border-border-subtle rounded-2xl p-4 flex items-start gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: color + '18', color }}
              >
                <Map size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-fg-subtle block mb-1">
                  Sub-zona de Teyvat
                </span>
                <p className="text-fg font-semibold text-sm leading-snug">{quest.zone}</p>
              </div>
            </div>
          </div>

          {/* Requisitos Previos */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-subtle">
              <Lock size={14} style={{ color }} />
              Requisitos Previos y Activación
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-sunken/60 border border-border-subtle text-fg-muted text-sm leading-relaxed">
              {quest.requirements || 'No requiere misiones ni condiciones previas particulares.'}
            </div>
          </div>

          {/* Guía Paso a Paso / Detalles */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg-subtle">
              <ScrollText size={14} style={{ color }} />
              Guía de Resolución y Objetivos
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-sunken/40 border border-border-subtle text-fg-muted text-sm leading-relaxed space-y-3 font-normal">
              <p>{quest.details}</p>
            </div>
          </div>

          {/* Botón de Acción Principal: Conmutar Estado */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onToggle(quest.id)}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base border transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                completed
                  ? 'border-border-subtle text-fg bg-surface-sunken hover:bg-surface-sunken/80'
                  : 'text-fg font-black shadow-lg hover:scale-[1.01]'
              }`}
              style={
                !completed
                  ? {
                      backgroundColor: color + '22',
                      borderColor: color + '80',
                      boxShadow: `0 8px 24px -4px ${color}33`,
                    }
                  : undefined
              }
            >
              {completed ? (
                <>
                  <CheckCircle2 size={20} style={{ color }} />
                  Misión Completada — Haz clic para marcar como pendiente
                </>
              ) : (
                <>
                  <Circle size={20} className="text-fg-subtle" />
                  Marcar Misión como Completada
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
