// ─────────────────────────────────────────────────────────────
//  components/ui/ThemeToggle.tsx
//  Selector de tema: Claro / Sistema / Oscuro.
//  'Sistema' es el valor por defecto y sigue la preferencia del
//  SO en vivo. El botón activo se marca con aria-pressed.
// ─────────────────────────────────────────────────────────────
import { Sun, Monitor, Moon } from 'lucide-react';
import type { ThemeMode } from '../../types/theme';

interface ThemeToggleProps {
  mode: ThemeMode;
  accentColor: string;
  onChange: (mode: ThemeMode) => void;
}

const OPTIONS = [
  { value: 'light', Icon: Sun, title: 'Fondo blanco' },
  { value: 'system', Icon: Monitor, title: 'Tema del sistema' },
  { value: 'dark', Icon: Moon, title: 'Fondo oscuro' },
] as const;

export function ThemeToggle({ mode, accentColor, onChange }: ThemeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Tema de la página"
      className="flex items-center gap-1 rounded-lg border border-border-subtle
                 bg-surface-sunken p-1 backdrop-blur-sm"
    >
      {OPTIONS.map(({ value, Icon, title }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            title={title}
            aria-pressed={isActive}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold
                       transition-all duration-150"
            style={isActive
              ? { backgroundColor: accentColor + '26', color: accentColor }
              : { color: 'var(--fg-subtle)' }}
          >
            <Icon size={13} />
          </button>
        );
      })}
    </div>
  );
}
