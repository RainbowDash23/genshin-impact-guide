// ─────────────────────────────────────────────────────────────
//  hooks/useTheme.ts
//  Tema de la página: system (por defecto) / light / dark.
//  Persiste la elección en localStorage, sigue los cambios de
//  preferencia del SO mientras el modo sea 'system' y publica
//  el tema resuelto en <html data-theme> para que el CSS reaccione.
// ─────────────────────────────────────────────────────────────
import { useCallback, useEffect, useState } from 'react';
import type { ResolvedTheme, ThemeMode } from '../types/theme';

const STORAGE_KEY = 'gqg:theme';
const QUERY = '(prefers-color-scheme: dark)';

const MODES: ThemeMode[] = ['system', 'light', 'dark'];

function readStoredMode(): ThemeMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(raw as ThemeMode) ? (raw as ThemeMode) : 'system';
  } catch {
    // localStorage bloqueado (modo privado, iframes): se usa system.
    return 'system';
  }
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia(QUERY).matches ? 'dark' : 'light';
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);

  // Escucha cambios de preferencia del SO. Importante para que el
  // modo 'system' reaccione si el usuario cambia de tema en vivo.
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved: ResolvedTheme = mode === 'system' ? system : mode;

  // Publica el tema resuelto. El CSS lee este atributo.
  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }, [resolved]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin persistencia el tema igual funciona, solo no se recuerda.
    }
  }, []);

  return { mode, resolved, setMode };
}
