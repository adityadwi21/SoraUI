/**
 * SoraUI Design Tokens (3-Layer Architecture)
 *
 * Layer 1 — Primitive tokens (raw scale values, prefixed with --sora-*)
 * Layer 2 — Semantic tokens (Theme Contract, prefixed with --ui-*)
 * Layer 3 — Component tokens (component defaults, prefixed with --sora-<comp>-*)
 */

// ==========================================
// Layer 1: Primitive Palettes & Scales
// ==========================================

export const colorScale = {
  // Sky blues
  "sora-sky-50": "#f0f9ff",
  "sora-sky-100": "#e0f2fe",
  "sora-sky-200": "#bae6fd",
  "sora-sky-300": "#7dd3fc",
  "sora-sky-400": "#38bdf8",
  "sora-sky-500": "#0ea5e9",
  "sora-sky-600": "#0284c7",
  "sora-sky-700": "#0369a1",
  "sora-sky-800": "#075985",
  "sora-sky-900": "#0c4a6e",

  // Indigo
  "sora-indigo-50": "#eef2ff",
  "sora-indigo-100": "#e0e7ff",
  "sora-indigo-200": "#c7d2fe",
  "sora-indigo-300": "#a5b4fc",
  "sora-indigo-400": "#818cf8",
  "sora-indigo-500": "#6366f1",
  "sora-indigo-600": "#4f46e5",
  "sora-indigo-700": "#4338ca",
  "sora-indigo-800": "#3730a3",
  "sora-indigo-900": "#312e81",

  // Violet / Nebula
  "sora-violet-50": "#f5f3ff",
  "sora-violet-100": "#ede9fe",
  "sora-violet-400": "#a78bfa",
  "sora-violet-500": "#8b5cf6",
  "sora-violet-600": "#7c3aed",
  "sora-violet-800": "#5b21b6",
  "sora-violet-900": "#4c1d95",

  // Teal / Aurora
  "sora-teal-50": "#f0fdf4",
  "sora-teal-300": "#5eead4",
  "sora-teal-400": "#2dd4bf",
  "sora-teal-500": "#14b8a6",
  "sora-teal-600": "#0d9488",
  "sora-teal-900": "#134e4a",
  "sora-teal-950": "#0a1f1c",

  // Amber / Starlight
  "sora-amber-200": "#fde68a",
  "sora-amber-300": "#fcd34d",
  "sora-amber-400": "#fbbf24",
  "sora-amber-500": "#f59e0b",

  // Orange / Horizon
  "sora-orange-100": "#fed7aa",
  "sora-orange-200": "#fdba74",
  "sora-orange-300": "#fb923c",
  "sora-orange-400": "#f97316",
  "sora-orange-800": "#7c2d12",
  "sora-orange-900": "#431407",

  // Fuchsia
  "sora-fuchsia-300": "#f0abfc",
  "sora-fuchsia-400": "#e879f9",
  "sora-fuchsia-500": "#d946ef",
  "sora-fuchsia-600": "#c026d3",
  "sora-fuchsia-900": "#701a75",

  // Zinc (neutrals)
  "sora-zinc-50": "#fafafa",
  "sora-zinc-100": "#f4f4f5",
  "sora-zinc-200": "#e4e4e7",
  "sora-zinc-300": "#d4d4d8",
  "sora-zinc-400": "#a1a1aa",
  "sora-zinc-500": "#71717a",
  "sora-zinc-600": "#52525b",
  "sora-zinc-700": "#3f3f46",
  "sora-zinc-800": "#27272a",
  "sora-zinc-900": "#18181b",
  "sora-zinc-950": "#09090b",

  // Absolute
  "sora-white": "#ffffff",
  "sora-black": "#000000",
} as const;

export const spacing = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
} as const;

export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  DEFAULT: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
  },
} as const;

// ==========================================
// Layer 2: Theme Contract (Semantic Tokens)
// ==========================================

export const THEME_CONTRACT_KEYS = [
  "--ui-background",
  "--ui-foreground",
  "--ui-card",
  "--ui-card-foreground",
  "--ui-popover",
  "--ui-popover-foreground",
  "--ui-primary",
  "--ui-primary-foreground",
  "--ui-secondary",
  "--ui-secondary-foreground",
  "--ui-muted",
  "--ui-muted-foreground",
  "--ui-accent",
  "--ui-accent-foreground",
  "--ui-destructive",
  "--ui-destructive-foreground",
  "--ui-success",
  "--ui-success-foreground",
  "--ui-warning",
  "--ui-warning-foreground",
  "--ui-border",
  "--ui-input",
  "--ui-ring",
  "--ui-radius",
] as const;

export type ThemeContractKey = (typeof THEME_CONTRACT_KEYS)[number];

export type ThemeContract = Record<ThemeContractKey, string>;

// Token Types
export interface PrimitiveToken {
  name: string;
  value: string;
  category: "color" | "spacing" | "radius" | "typography";
}

export interface SemanticToken {
  name: ThemeContractKey;
  value: string;
  description?: string;
}

export interface ComponentToken {
  name: string;
  value: string;
  component: string;
  description?: string;
}

export type ColorScale = typeof colorScale;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Typography = typeof typography;
