// ─────────────────────────────────────────────────────────────
//  components/ui/AnimatedCounter.tsx
//  Componente que proyecta números con animación fluida
//  y formato numérico consistente.
// ─────────────────────────────────────────────────────────────
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  value,
  duration = 800,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const animatedValue = useAnimatedCounter(value, duration);

  return (
    <span className={`inline-block tabular-nums font-feature-settings-tnum ${className}`}>
      {prefix}
      {animatedValue}
      {suffix}
    </span>
  );
}
