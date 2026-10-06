// ─────────────────────────────────────────────────────────────
//  components/layout/Header.tsx
//  Barra superior fija de alta gama con efecto de cristal satinado,
//  identidad de marca renovada, seguimiento numérico animado
//  y controles temáticos.
// ─────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  accentColor: string;
  children?: ReactNode;
}

export function Header({ completedCount, totalCount, accentColor, children }: HeaderProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 transition-colors duration-300">
      {/* Barra principal con efecto de vidrio flotante */}
      <div className="border-b border-border-subtle bg-surface-raised/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">

          {/* Logotipo e Identidad de Marca */}
          <div className="flex items-center gap-3.5 min-w-0 group cursor-default">
            <div
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-border-subtle
                         bg-surface-sunken/80 shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              style={{
                boxShadow: `0 0 20px -4px ${accentColor}33`,
              }}
            >
              {/* Icono de astrolabio/brújula con aura reactiva */}
              <Compass
                size={22}
                className="transition-transform duration-500 group-hover:rotate-45"
                style={{ color: accentColor }}
              />

            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-fg text-sm sm:text-base lg:text-lg tracking-tight sm:tracking-wider truncate">
                  GENSHIN QUEST GUIDE
                </span>

              </div>
              <span className="text-fg-subtle text-xs tracking-wide hidden sm:block">
                Compendio de Misiones de Mundo
              </span>
            </div>
          </div>

          {/* Métricas de Progreso y Controles */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            {/* Medidor de maestría global */}
            <div className="hidden sm:flex items-center gap-3 bg-surface-sunken/60 border border-border-subtle px-3.5 py-1.5 rounded-xl">
              <div className="text-right">
                <div className="text-[11px] font-medium text-fg-subtle leading-tight">
                  Progreso Global
                </div>
                <div className="text-xs font-bold text-fg flex items-center justify-end gap-1">
                  <AnimatedCounter value={completedCount} />
                  <span className="text-fg-subtle font-normal">/ {totalCount}</span>
                </div>
              </div>

              {/* Barra de progreso de cristal */}
              <div className="w-20 lg:w-28 h-2 bg-surface rounded-full overflow-hidden border border-border-subtle/50 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: accentColor,
                    boxShadow: `0 0 10px ${accentColor}`,
                  }}
                />
              </div>

              <div
                className="text-xs font-black px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: accentColor + '20', color: accentColor }}
              >
                <AnimatedCounter value={pct} suffix="%" />
              </div>
            </div>

            {/* Ranura del selector de tema */}
            {children}
          </div>

        </div>
      </div>
    </header>
  );
}
