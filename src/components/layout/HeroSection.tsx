// ─────────────────────────────────────────────────────────────
//  components/layout/HeroSection.tsx
//  Cabecera editorial con métricas globales,
//  contadores animados y diseño espacioso.
// ─────────────────────────────────────────────────────────────
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface HeroSectionProps {
  completedCount: number;
  totalCount: number;
  totalRegions: number;
  accentColor: string;
  activeRegionName?: string;
}

export function HeroSection({
  completedCount,
  totalCount,
  totalRegions,
  accentColor,
}: HeroSectionProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="relative pt-8 sm:pt-14 pb-10 sm:pb-14 text-center max-w-5xl mx-auto">
      {/* Título de la web con acento dinámico */}
      <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-fg tracking-tight leading-[1.1] mb-6">
        El Gran Compendio de{' '}
        <span
          className="inline-block transition-colors duration-500 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accentColor}, var(--fg))`,
          }}
        >
          Misiones de Mundo
        </span>
      </h1>

      {/* Subtítulo ajustado por el usuario */}
      <p className="text-fg-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal mb-10">
        Rastrea cada encargo, descubre los misterios ocultos de las siete naciones
        y completa tu viaje por Teyvat.
      </p>

      {/* Grid de métricas en tarjetas de cristal con contadores animados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-surface-raised/75 border border-border-subtle backdrop-blur-md text-left transition-all duration-300 hover:border-border-subtle/80 hover:-translate-y-0.5">
          <span className="text-xs uppercase font-bold tracking-wider text-fg-subtle block mb-2">
            Misiones Listadas
          </span>
          <div className="text-2xl sm:text-3xl font-black text-fg">
            <AnimatedCounter value={totalCount} />
          </div>
          <span className="text-[11px] text-fg-subtle mt-1 block">Catálogo verificado</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised/75 border border-border-subtle backdrop-blur-md text-left transition-all duration-300 hover:border-border-subtle/80 hover:-translate-y-0.5">
          <span className="text-xs uppercase font-bold tracking-wider text-fg-subtle block mb-2">
            Completadas
          </span>
          <div className="text-2xl sm:text-3xl font-black" style={{ color: accentColor }}>
            <AnimatedCounter value={completedCount} />
          </div>
          <span className="text-[11px] text-fg-subtle mt-1 block">Guardado en tiempo real</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised/75 border border-border-subtle backdrop-blur-md text-left transition-all duration-300 hover:border-border-subtle/80 hover:-translate-y-0.5">
          <span className="text-xs uppercase font-bold tracking-wider text-fg-subtle block mb-2">
            Progreso Global
          </span>
          <div className="text-2xl sm:text-3xl font-black text-fg">
            <AnimatedCounter value={pct} suffix="%" />
          </div>
          <span className="text-[11px] text-fg-subtle mt-1 block">De la odisea de Teyvat</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-raised/75 border border-border-subtle backdrop-blur-md text-left transition-all duration-300 hover:border-border-subtle/80 hover:-translate-y-0.5">
          <span className="text-xs uppercase font-bold tracking-wider text-fg-subtle block mb-2">
            Naciones Activas
          </span>
          <div className="text-2xl sm:text-3xl font-black text-fg">
            <AnimatedCounter value={totalRegions} />
          </div>
          <span className="text-[11px] text-fg-subtle mt-1 block">Desde Mondstadt a Natlan</span>
        </div>
      </div>
    </section>
  );
}
