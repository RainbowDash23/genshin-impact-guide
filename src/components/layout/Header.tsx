// ─────────────────────────────────────────────────────────────
//  components/layout/Header.tsx
//  Barra superior fija. Recibe el color activo como prop
//  para sincronizarse visualmente con la región seleccionada.
// ─────────────────────────────────────────────────────────────
import { Map } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  accentColor: string;
}

export function Header({ completedCount, totalCount, accentColor }: HeaderProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800/60">
      <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Map size={18} style={{ color: accentColor }} />
          <span className="font-black text-white text-base tracking-tight">Genshin Quest Guide</span>
          <span className="hidden sm:block text-gray-600 text-xs">· Misiones de Mundo</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{completedCount} / {totalCount}</span>
          <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: accentColor }}
            />
          </div>
          <span className="text-gray-400 font-semibold">{pct}%</span>
        </div>
      </div>
    </header>
  );
}
