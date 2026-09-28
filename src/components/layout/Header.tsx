// ─────────────────────────────────────────────────────────────
//  components/layout/Header.tsx
//  Barra superior fija. Recibe el color activo como prop
//  para sincronizarse visualmente con la región seleccionada.
//  `children` es el slot donde se monta el selector de tema.
// ─────────────────────────────────────────────────────────────
import type { ReactNode } from 'react';
import { Map } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  accentColor: string;
  children?: ReactNode;
}

export function Header({ completedCount, totalCount, accentColor, children }: HeaderProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-surface-raised backdrop-blur-md border-b border-border-subtle">
      <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Map size={18} style={{ color: accentColor }} className="flex-shrink-0" />
          <span className="font-black text-fg text-base tracking-tight truncate">Genshin Quest Guide</span>
          <span className="hidden sm:block text-fg-subtle text-xs whitespace-nowrap">· Misiones de Mundo</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-sm flex-shrink-0">
          {children}
          <span className="text-fg-muted hidden sm:inline">{completedCount} / {totalCount}</span>
          <div className="w-24 h-1.5 bg-surface-sunken rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: accentColor }}
            />
          </div>
          <span className="text-fg-muted font-semibold">{pct}%</span>
        </div>
      </div>
    </header>
  );
}
