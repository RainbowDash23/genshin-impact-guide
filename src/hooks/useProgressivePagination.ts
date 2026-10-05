// ─────────────────────────────────────────────────────────────
//  hooks/useProgressivePagination.ts
//  Gestiona la carga progresiva de elementos en lotes para
//  reducir la densidad inicial de nodos en el DOM.
//  Ajusta el tamaño de lote según el breakpoint (12 en móvil/tablet,
//  18 en escritorio) y expone controles de carga y reinicio.
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseProgressivePaginationOptions {
  totalItems: number;
  resetDependencies?: readonly unknown[];
}

export interface UseProgressivePaginationReturn {
  visibleCount: number;
  batchSize: number;
  hasMore: boolean;
  remainingCount: number;
  loadMore: () => void;
  resetPagination: () => void;
}

const DESKTOP_QUERY = '(min-width: 1024px)';
const DESKTOP_BATCH = 18;
const MOBILE_BATCH = 12;

function getBatchSize(): number {
  if (typeof window === 'undefined') return MOBILE_BATCH;
  return window.matchMedia(DESKTOP_QUERY).matches ? DESKTOP_BATCH : MOBILE_BATCH;
}

export function useProgressivePagination({
  totalItems,
  resetDependencies,
}: UseProgressivePaginationOptions): UseProgressivePaginationReturn {
  const [batchSize, setBatchSize] = useState<number>(getBatchSize);
  const [visibleCount, setVisibleCount] = useState<number>(getBatchSize);

  // Escucha cambios en el media query de escritorio para actualizar el lote
  // sin contraer los elementos ya desplegados.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setBatchSize(e.matches ? DESKTOP_BATCH : MOBILE_BATCH);
    };

    mql.addEventListener('change', handleChange);
    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  // Reinicio explícito de la paginación al tamaño de lote inicial
  const resetPagination = useCallback(() => {
    setVisibleCount(getBatchSize());
  }, []);

  // Vigila las dependencias de reinicio (región, búsqueda, zona)
  // y restaura la paginación al lote inicial cuando alguno de sus valores cambie.
  const prevDepsRef = useRef<readonly unknown[] | undefined>(resetDependencies);

  useEffect(() => {
    if (!resetDependencies) return;

    const prevDeps = prevDepsRef.current;
    const hasChanged =
      !prevDeps ||
      prevDeps.length !== resetDependencies.length ||
      resetDependencies.some((dep, i) => !Object.is(dep, prevDeps[i]));

    if (hasChanged) {
      setVisibleCount(getBatchSize());
    }
    prevDepsRef.current = resetDependencies;
  }, [resetDependencies]);

  // Carga un lote adicional conservando la posición de desplazamiento
  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + batchSize);
  }, [batchSize]);

  // Valores derivados puros
  const hasMore = visibleCount < totalItems;
  const remainingCount = Math.max(0, totalItems - visibleCount);

  return {
    visibleCount,
    batchSize,
    hasMore,
    remainingCount,
    loadMore,
    resetPagination,
  };
}
