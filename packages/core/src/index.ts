/**
 * @soraui/core — Main entry point
 *
 * Exports theme engine, design tokens, and core utilities.
 * CSS files (primitives, presets) must be imported separately.
 */

// Theme engine
export {
  applyTheme,
  applyMode,
  getCurrentTheme,
  listThemes,
  getDefaultTheme,
  applySystemTheme,
  getThemeInitScript,
  presetRegistry,
} from './theme/index';

export type {
  ThemeId,
  ThemeMode,
  ResolvedThemeMode,
  ThemeEntry,
  ThemeInitScriptOptions,
} from './theme/index';

// Design tokens (JS values & Theme Contract)
export {
  colorScale,
  spacing,
  radius,
  typography,
  THEME_CONTRACT_KEYS,
} from './tokens/index';

export type {
  ColorScale,
  Spacing,
  Radius,
  Typography,
  ThemeContractKey,
  ThemeContract,
  PrimitiveToken,
  SemanticToken,
  ComponentToken,
} from './tokens/index';

// Token Validator & Exporters
export { validateTheme } from './tokens/validator';
export type {
  ThemeValidationError,
  ThemeValidationWarning,
  ValidationResult,
} from './tokens/validator';

export {
  exportThemeToCSS,
  exportThemeToJSON,
  exportThemeToTailwind,
} from './tokens/exporters';
export type {
  CSSExportOptions,
  TailwindExportOptions,
} from './tokens/exporters';

// Core utilities
export { cx, isBrowser } from './utils/index';

