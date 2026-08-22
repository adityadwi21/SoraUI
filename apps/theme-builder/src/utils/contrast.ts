export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type WCAGLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail';

export interface ContrastResult {
  ratio: number;
  ratioFormatted: string;
  level: WCAGLevel;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
}

/**
 * Parses a hex color (e.g. #fff, #ffffff) or rgb/hsl string into RGB components.
 */
export function parseColorToRGB(colorStr: string): RGB | null {
  const str = colorStr.trim().toLowerCase();

  // 1. Hex 3-digit or 6-digit
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0]! + hex[0]!, 16);
      const g = parseInt(hex[1]! + hex[1]!, 16);
      const b = parseInt(hex[2]! + hex[2]!, 16);
      return { r, g, b };
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
  }

  // 2. rgb(r, g, b)
  const rgbMatch = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/.exec(str);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]!, 10),
      g: parseInt(rgbMatch[2]!, 10),
      b: parseInt(rgbMatch[3]!, 10),
    };
  }

  // 3. hsl(h, s%, l%)
  const hslMatch = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/.exec(str);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]!, 10) / 360;
    const s = parseInt(hslMatch[2]!, 10) / 100;
    const l = parseInt(hslMatch[3]!, 10) / 100;

    if (s === 0) {
      const val = Math.round(l * 255);
      return { r: val, g: val, b: val };
    }

    const hue2rgb = (p: number, q: number, t: number) => {
      let temp = t;
      if (temp < 0) temp += 1;
      if (temp > 1) temp -= 1;
      if (temp < 1 / 6) return p + (q - p) * 6 * temp;
      if (temp < 1 / 2) return q;
      if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
      r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      g: Math.round(hue2rgb(p, q, h) * 255),
      b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    };
  }

  return null;
}

/**
 * Calculates WCAG relative luminance of an sRGB color.
 * Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getRelativeLuminance(rgb: RGB): number {
  const { r, g, b } = rgb;
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0]! + 0.7152 * a[1]! + 0.0722 * a[2]!;
}

/**
 * Calculates contrast ratio between two colors (1:1 to 21:1).
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 */
export function calculateContrast(color1: string, color2: string): ContrastResult {
  const rgb1 = parseColorToRGB(color1) || { r: 255, g: 255, b: 255 };
  const rgb2 = parseColorToRGB(color2) || { r: 0, g: 0, b: 0 };

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const ratioFormatted = `${ratio.toFixed(2)}:1`;

  const passesAAA = ratio >= 7.0;
  const passesAA = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;

  let level: WCAGLevel = 'Fail';
  if (passesAAA) level = 'AAA';
  else if (passesAA) level = 'AA';
  else if (passesAALarge) level = 'AA Large';

  return {
    ratio,
    ratioFormatted,
    level,
    passesAA,
    passesAAA,
    passesAALarge,
  };
}