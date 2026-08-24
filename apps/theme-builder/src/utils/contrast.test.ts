import { describe, it, expect } from "vitest";
import { parseColorToRGB, calculateContrast } from "./contrast";

describe("WCAG Contrast Engine", () => {
  it("parses hex, rgb, and hsl strings correctly", () => {
    expect(parseColorToRGB("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseColorToRGB("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseColorToRGB("rgb(14, 165, 233)")).toEqual({
      r: 14,
      g: 165,
      b: 233,
    });
    expect(parseColorToRGB("hsl(0, 0%, 100%)")).toEqual({
      r: 255,
      g: 255,
      b: 255,
    });
  });

  it("calculates perfect 21:1 contrast for black and white", () => {
    const result = calculateContrast("#000000", "#ffffff");
    expect(result.ratio).toBeCloseTo(21, 1);
    expect(result.level).toBe("AAA");
    expect(result.passesAA).toBe(true);
    expect(result.passesAAA).toBe(true);
  });

  it("calculates correct contrast ratio for SoraUI Sky blue against white", () => {
    // Sky blue (#0ea5e9) against white (#ffffff)
    const result = calculateContrast("#0ea5e9", "#ffffff");
    expect(result.ratio).toBeGreaterThan(2.5);
    expect(result.passesAALarge).toBe(false); // Sky blue on white needs dark text or darker shade for small text
  });

  it("verifies AAA compliance on high contrast dark theme", () => {
    // White text (#ffffff) on dark background (#09090b)
    const result = calculateContrast("#ffffff", "#09090b");
    expect(result.ratio).toBeGreaterThan(15);
    expect(result.level).toBe("AAA");
  });
});
