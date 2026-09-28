// ─────────────────────────────────────────────────────────────
//  types/theme.ts
//  Modo de tema elegido por el usuario y tema ya resuelto.
//  'system' sigue la preferencia del SO; 'light' y 'dark' la fijan.
// ─────────────────────────────────────────────────────────────

/** Opción que el usuario puede seleccionar. */
export type ThemeMode = 'system' | 'light' | 'dark';

/** Tema efectivo tras resolver 'system'. Es lo que lee el CSS. */
export type ResolvedTheme = Exclude<ThemeMode, 'system'>;
