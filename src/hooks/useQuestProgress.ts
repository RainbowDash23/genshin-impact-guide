// ─────────────────────────────────────────────────────────────
//  hooks/useQuestProgress.ts
//  Maneja el estado de "completado" con localStorage.
//
//  localStorage es un diccionario clave-valor del navegador.
//  Persiste aunque cierres la pestaña, pero es por dispositivo.
//  Guardamos los IDs completados como JSON: "[1, 5, 12]"
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'genshin-quest-progress';

function loadFromStorage(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function saveToStorage(ids: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useQuestProgress() {
  const [completed, setCompleted] = useState<Set<number>>(loadFromStorage);

  const toggle = useCallback((id: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (id: number) => completed.has(id),
    [completed]
  );

  const resetRegion = useCallback((questIds: number[]) => {
    setCompleted(prev => {
      const next = new Set(prev);
      questIds.forEach(id => next.delete(id));
      saveToStorage(next);
      return next;
    });
  }, []);

  return { completed, toggle, isCompleted, resetRegion };
}
