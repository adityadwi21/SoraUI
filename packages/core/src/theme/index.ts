/**
 * SoraUI Theme Engine
 *
 * Provides utilities for applying and querying themes.
 * All themes work via CSS variables on the data-theme attribute.
 * No JS runtime required for visual rendering — only for theme switching.
 */

import presetRegistry from './preset-registry.json';

export type ThemeId =
  | 'sky'
  | 'cloud'
  | 'horizon'
  | 'aurora'
  | 'twilight'
  | 'midnight'
  | 'nebula'
  | 'eclipse'
  | 'starlight'
  | (string & {});

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedThemeMode = 'light' | 'dark';

export interface ThemeEntry {
  id: ThemeId;
  label: string;
  mode: 'light' | 'dark';
  default?: boolean;
  description: string;
}

export interface ThemeInitScriptOptions {
  storageKey?: string;
  modeStorageKey?: string;
  defaultTheme?: string;
  defaultMode?: ThemeMode;
}

/**
 * Generates an inline JavaScript script for <head> injection that initializes
 * data-theme and data-mode before paint, completely eliminating FOUC (Flash of Unstyled Content).
 */
export function getThemeInitScript(options: ThemeInitScriptOptions = {}): string {
  const {
    storageKey = 'soraui-theme',
    modeStorageKey = 'soraui-mode',
    defaultTheme = 'sky',
    defaultMode = 'system',
  } = options;

  return `(function(){try{var t=localStorage.getItem('${storageKey}')||'${defaultTheme}';var m=localStorage.getItem('${modeStorageKey}')||'${defaultMode}';var rm=m==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):m;var el=document.documentElement;el.setAttribute('data-theme',t);el.setAttribute('data-mode',rm);}catch(e){}})();`;
}

/**
 * Apply a theme by setting the data-theme attribute on any target DOM element.
 */
export function applyTheme(themeId: string, element: HTMLElement = document.documentElement): void {
  element.setAttribute('data-theme', themeId);
}

/**
 * Apply a mode by setting the data-mode attribute on any target DOM element.
 */
export function applyMode(mode: ResolvedThemeMode, element: HTMLElement = document.documentElement): void {
  element.setAttribute('data-mode', mode);
}

/**
 * Get the currently active theme ID from a DOM element (or closest parent scope).
 */
export function getCurrentTheme(element: HTMLElement = document.documentElement): string | null {
  const scopedEl = element.closest('[data-theme]');
  return scopedEl ? scopedEl.getAttribute('data-theme') : element.getAttribute('data-theme');
}

/**
 * List all available theme presets.
 */
export function listThemes(): ThemeEntry[] {
  return presetRegistry.themes as ThemeEntry[];
}

/**
 * Get the default theme for a given mode.
 */
export function getDefaultTheme(mode: 'light' | 'dark'): ThemeEntry {
  const defaultTheme = presetRegistry.themes.find(
    (t) => t.mode === mode && t.default === true
  ) as ThemeEntry | undefined;

  if (!defaultTheme) {
    return mode === 'light'
      ? ({ id: 'sky', label: 'Sky', mode: 'light', default: true, description: 'Default light theme' } as ThemeEntry)
      : ({ id: 'midnight', label: 'Midnight', mode: 'dark', default: true, description: 'Default dark theme' } as ThemeEntry);
  }

  return defaultTheme;
}

/**
 * Apply the system preferred theme (respects prefers-color-scheme).
 */
export function applySystemTheme(element: HTMLElement = document.documentElement): string {
  const prefersDark = typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const themeId = prefersDark ? 'midnight' : 'sky';
  applyTheme(themeId, element);
  applyMode(prefersDark ? 'dark' : 'light', element);
  return themeId;
}

export { presetRegistry };

