// ─────────────────────────────────────────────────────────────
//  components/ui/ThemeToggle.tsx
//  Selector de tema de alta gama: Claro / Sistema / Oscuro.
//  Diseño de cápsula de cristal con retroalimentación háptica visual.
// ─────────────────────────────────────────────────────────────
import { Sun, Monitor, Moon } from 'lucide-react';
import type { ThemeMode } from '../../types/theme';

interface ThemeToggleProps {
  mode: ThemeMode;
  accentColor: string;
  onChange: (mode: ThemeMode) => void;
}

const OPTIONS = [
  { value: 'light', Icon: Sun, label: 'Claro' },
  { value: 'system', Icon: Monitor, label: 'Auto' },
  { value: 'dark', Icon: Moon, label: 'Oscuro' },
] as const;

export function ThemeToggle({ mode, accentColor, onChange }: ThemeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Selector de tema visual"
      className="flex items-center gap-0.5 sm:gap-1 rounded-2xl border border-border-subtle
                 bg-surface-sunken/70 p-0.5 sm:p-1 backdrop-blur-md shadow-sm"
    >
      {OPTIONS.map(({ value, Icon, label }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            title={`Tema ${label}`}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold
                       transition-all duration-200 cursor-pointer ${
                         isActive
                           ? 'shadow-sm text-fg font-bold bg-surface-raised'
                           : 'text-fg-subtle hover:text-fg hover:bg-surface-raised/40'
                       }`}
            style={
              isActive
                ? {
                    color: accentColor,
                    borderColor: accentColor + '40',
                  }
                : undefined
            }
          >
            <Icon size={14} className={isActive ? 'scale-110' : ''} />
            <span className="hidden sm:inline text-[11px]">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
