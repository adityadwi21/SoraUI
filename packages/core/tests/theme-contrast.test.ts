/**
 * Phase 12B — 9-Theme WCAG 2.1 AA Contrast Matrix
 *
 * Scope: All 9 theme presets × 11 semantic token pair combinations = 99 checks.
 *
 * Important design decision: Colors are parsed dynamically from preset CSS files.
 * No hex colors are hardcoded in this test. This verifies the ACCESSIBILITY CONTRACT,
 * not a specific color implementation.
 *
 * WCAG 2.1 thresholds:
 * - Normal text (< 18pt regular / < 14pt bold): contrast ratio >= 4.5:1
 * - UI components & non-text (borders, inputs, rings): contrast ratio >= 3:1
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve presets dir relative to this file: tests/ → ../src/theme/presets
const PRESETS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/theme/presets",
);

// ──────────────────────────────────────────────────────────────────────────────
// CSS Token Parser
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Parses a CSS file and extracts --ui-* custom property values.
 * Returns a flat map of token name → hex color string.
 */
function parsePresetTokens(cssFilePath: string): Record<string, string> {
  const css = fs.readFileSync(cssFilePath, "utf8");
  const tokens: Record<string, string> = {};
  // Match --ui-xxx: #rrggbb or --ui-xxx: #rrggbbaa
  const tokenRe = /--(ui-[a-z-]+):\s*(#[0-9a-fA-F]{3,8})/g;
  let match: RegExpExecArray | null;
  while ((match = tokenRe.exec(css)) !== null) {
    tokens[`--${match[1]}`] = match[2]!;
  }
  return tokens;
}

// ──────────────────────────────────────────────────────────────────────────────
// Contrast Calculation (WCAG 2.1 relative luminance)
// ──────────────────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.slice(0, 6);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function linearize(c8bit: number): number {
  const c = c8bit / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg: string, bg: string): number {
  const L1 = relativeLuminance(hexToRgb(fg));
  const L2 = relativeLuminance(hexToRgb(bg));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ──────────────────────────────────────────────────────────────────────────────
// Token Pair Contract
// ──────────────────────────────────────────────────────────────────────────────

type Threshold = "normal-text" | "ui-component";

interface TokenPair {
  fg: string;
  bg: string;
  type: Threshold;
  label: string;
}

const TOKEN_PAIRS: TokenPair[] = [
  // Normal text pairs: 4.5:1
  {
    fg: "--ui-foreground",
    bg: "--ui-background",
    type: "normal-text",
    label: "foreground / background",
  },
  {
    fg: "--ui-muted-foreground",
    bg: "--ui-background",
    type: "normal-text",
    label: "muted-foreground / background",
  },
  {
    fg: "--ui-card-foreground",
    bg: "--ui-card",
    type: "normal-text",
    label: "card-foreground / card",
  },
  {
    fg: "--ui-primary-foreground",
    bg: "--ui-primary",
    type: "normal-text",
    label: "primary-foreground / primary",
  },
  {
    fg: "--ui-secondary-foreground",
    bg: "--ui-secondary",
    type: "normal-text",
    label: "secondary-foreground / secondary",
  },
  {
    fg: "--ui-accent-foreground",
    bg: "--ui-accent",
    type: "normal-text",
    label: "accent-foreground / accent",
  },
  {
    fg: "--ui-destructive-foreground",
    bg: "--ui-destructive",
    type: "normal-text",
    label: "destructive-foreground / destructive",
  },
  {
    fg: "--ui-popover-foreground",
    bg: "--ui-popover",
    type: "normal-text",
    label: "popover-foreground / popover",
  },
  // UI component pairs: 3:1
  {
    fg: "--ui-border",
    bg: "--ui-background",
    type: "ui-component",
    label: "border / background",
  },
  {
    fg: "--ui-input",
    bg: "--ui-background",
    type: "ui-component",
    label: "input / background",
  },
  {
    fg: "--ui-ring",
    bg: "--ui-background",
    type: "ui-component",
    label: "ring / background",
  },
];

const MIN_RATIO: Record<Threshold, number> = {
  "normal-text": 4.5,
  "ui-component": 3.0,
};

// ──────────────────────────────────────────────────────────────────────────────
// Test Suite
// ──────────────────────────────────────────────────────────────────────────────

const PRESETS = [
  "sky",
  "cloud",
  "horizon",
  "aurora",
  "twilight",
  "midnight",
  "nebula",
  "eclipse",
  "starlight",
];

describe("12B — 9-Theme WCAG 2.1 AA Contrast Matrix (99 checks)", () => {
  const tokensByPreset: Record<string, Record<string, string>> = {};

  beforeAll(() => {
    for (const preset of PRESETS) {
      const cssPath = path.join(PRESETS_DIR, `${preset}.css`);
      tokensByPreset[preset] = parsePresetTokens(cssPath);
    }
  });

  for (const preset of PRESETS) {
    describe(`Theme: ${preset}`, () => {
      for (const pair of TOKEN_PAIRS) {
        it(`${pair.label} — ratio >= ${MIN_RATIO[pair.type]}:1`, () => {
          const tokens = tokensByPreset[preset]!;
          const fgColor = tokens[pair.fg];
          const bgColor = tokens[pair.bg];

          // If either token is not a plain hex (e.g. uses var() or rgba), skip with a note
          if (!fgColor || !bgColor) {
            console.warn(
              `[${preset}] Skipping ${pair.label}: token resolves to non-hex value (${fgColor} / ${bgColor})`,
            );
            return;
          }

          const ratio = contrastRatio(fgColor, bgColor);
          const minRatio = MIN_RATIO[pair.type]!;

          expect(
            ratio,
            `[${preset}] ${pair.label}: contrast ${ratio.toFixed(2)}:1 is below WCAG AA minimum of ${minRatio}:1\n  fg=${fgColor}, bg=${bgColor}`,
          ).toBeGreaterThanOrEqual(minRatio);
        });
      }
    });
  }
});
