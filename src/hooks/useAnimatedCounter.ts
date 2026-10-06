// ─────────────────────────────────────────────────────────────
//  hooks/useAnimatedCounter.ts
//  Hook de animación numérica fluida (count-up/down)
//  con curva de aceleración suave y respeto a prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(targetValue: number, duration = 800): number {
  const [displayValue, setDisplayValue] = useState<number>(targetValue);
  const startValueRef = useRef<number>(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Si el usuario prefiere movimiento reducido, saltamos directo al valor
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetValue);
      return;
    }

    const startValue = displayValue;
    startValueRef.current = startValue;
    startTimeRef.current = null;

    if (startValue === targetValue) return;

    function step(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Curva easeOutExpo para sensación ágil y prémium
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startValue + (targetValue - startValue) * eased);

      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    }

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration]);

  return displayValue;
}
