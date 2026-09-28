// ─────────────────────────────────────────────────────────────
//  components/quest/QuestModal.tsx
//  Modal de detalle de una misión.
//  useEffect con cleanup evita memory leaks en event listeners.
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

export function QuestModal({ quest, color, regionName, completed, onToggle, onClose }: QuestModalProps) {
  useEffect(() => {
    if (!quest) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface-raised backdrop-blur-xl border border-border-subtle rounded-2xl
                      shadow-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto flex flex-col"
           style={{ animation: 'fadeIn .18s ease-out' }}>

        {/* Header */}
        <div className="sticky top-0 bg-surface-raised border-b border-border-subtle px-6 py-4
                        flex items-start justify-between gap-4 z-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color }}>
              {regionName} · Misión de Mundo
            </p>
            <h2 className="text-lg font-black text-fg leading-tight">{quest.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-fg-subtle hover:text-fg transition-colors flex-shrink-0 mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Ubicación + Zona */}
          <div className="grid grid-cols-2 gap-3">
            <InfoBlock icon={<MapPin size={13} />} label="Ubicación" value={quest.location} />
            <InfoBlock icon={<Map size={13} />} label="Sub-zona" value={quest.zone} />
          </div>

          {/* Requisitos */}
          <Section icon={<Lock size={14} />} label="Requisitos previos" color={color}>
            <p className="text-fg-muted text-sm leading-relaxed bg-surface-sunken border
                          border-border-subtle rounded-lg p-4">
              {quest.requirements}
            </p>
          </Section>

          {/* Detalles */}
          <Section icon={<ScrollText size={14} />} label="Cómo completarla" color={color}>
            <p className="text-fg-muted text-sm leading-relaxed">{quest.details}</p>
          </Section>

          {/* Toggle completado */}
          <button
            onClick={() => onToggle(quest.id)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border
                       font-semibold text-sm transition-all"
            style={completed
              ? { backgroundColor: color + '1f', borderColor: color + '59', color }
              : { borderColor: 'var(--border-subtle)', color: 'var(--fg-subtle)' }}
          >
            {completed
              ? <><CheckCircle2 size={16} /> Completada — clic para desmarcar</>
              : <><Circle size={16} /> Marcar como completada</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-surface-sunken border border-border-subtle rounded-lg p-3">
      <div className="flex items-center gap-1.5 text-fg-subtle text-xs uppercase font-bold tracking-wider mb-1.5">
        {icon} {label}
      </div>
      <p className="text-fg text-sm font-medium leading-snug">{value}</p>
    </div>
  );
}

function Section({ icon, label, color, children }: { icon: React.ReactNode; label: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-subtle">
        <span style={{ color }}>{icon}</span>
        <h3 className="text-sm font-bold text-fg-muted">{label}</h3>
      </div>
      {children}
    </div>
  );
}
