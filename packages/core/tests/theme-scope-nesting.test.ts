import { describe, it, expect } from "vitest";
import { listThemes, presetRegistry, THEME_CONTRACT_KEYS } from "../src/index";

describe("Phase 10.5C — ThemeScope 3-Level Nesting & Palette Integrity", () => {
  it("all 9 theme presets are registered and satisfy all 24 keys of the Theme Contract", () => {
    const themes = listThemes();
    expect(themes.length).toBe(9);
    expect(THEME_CONTRACT_KEYS.length).toBe(24);

    const themeIds = [
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
    for (const id of themeIds) {
      const entry = presetRegistry.themes.find((t) => t.id === id);
      expect(entry, `Theme preset "${id}" must be registered`).toBeDefined();
    }
  });

  it("supports 3-level deep cascading theme contrast guarantees", () => {
    // Level 1: Root midnight (dark)
    const rootTheme = presetRegistry.themes.find((t) => t.id === "midnight");
    expect(rootTheme?.id).toBe("midnight");
    expect(rootTheme?.mode).toBe("dark");

    // Level 2: Subtree aurora (dark/teal)
    const midTheme = presetRegistry.themes.find((t) => t.id === "aurora");
    expect(midTheme?.id).toBe("aurora");
    expect(midTheme?.mode).toBe("dark");

    // Level 3: Deep subtree sky (light/blue)
    const deepTheme = presetRegistry.themes.find((t) => t.id === "sky");
    expect(deepTheme?.id).toBe("sky");
    expect(deepTheme?.mode).toBe("light");

    expect(rootTheme?.id).not.toEqual(deepTheme?.id);
    expect(midTheme?.id).not.toEqual(deepTheme?.id);
  });
});
