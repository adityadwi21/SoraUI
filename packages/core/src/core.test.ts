// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import {
  listThemes,
  getDefaultTheme,
  applyTheme,
  applyMode,
  getCurrentTheme,
  getThemeInitScript,
  colorScale,
  spacing,
  radius,
  cx,
  THEME_CONTRACT_KEYS,
  validateTheme,
  exportThemeToCSS,
  exportThemeToJSON,
  exportThemeToTailwind,
} from "./index";

describe("@soraui/core — Token & Theme Engine", () => {
  const validTheme: Record<string, string> = {
    "--ui-background": "#ffffff",
    "--ui-foreground": "#000000",
    "--ui-card": "#ffffff",
    "--ui-card-foreground": "#000000",
    "--ui-popover": "#ffffff",
    "--ui-popover-foreground": "#000000",
    "--ui-primary": "#0ea5e9",
    "--ui-primary-foreground": "#ffffff",
    "--ui-secondary": "#f0f9ff",
    "--ui-secondary-foreground": "#075985",
    "--ui-muted": "#f0f9ff",
    "--ui-muted-foreground": "#0369a1",
    "--ui-accent": "#e0f2fe",
    "--ui-accent-foreground": "#0284c7",
    "--ui-destructive": "#ef4444",
    "--ui-destructive-foreground": "#ffffff",
    "--ui-success": "#10b981",
    "--ui-success-foreground": "#ffffff",
    "--ui-warning": "#f59e0b",
    "--ui-warning-foreground": "#ffffff",
    "--ui-border": "#bae6fd",
    "--ui-input": "#bae6fd",
    "--ui-ring": "#0ea5e9",
    "--ui-radius": "0.5rem",
  };

  it("registers all 9 sky/space theme presets", () => {
    const themes = listThemes();
    expect(themes).toHaveLength(9);

    const themeIds = themes.map((t) => t.id);
    expect(themeIds).toEqual(
      expect.arrayContaining([
        "sky",
        "midnight",
        "aurora",
        "twilight",
        "cloud",
        "horizon",
        "nebula",
        "eclipse",
        "starlight",
      ]),
    );
  });

  it("retrieves default light and dark themes correctly", () => {
    expect(getDefaultTheme("light").id).toBe("sky");
    expect(getDefaultTheme("dark").id).toBe("midnight");
  });

  it("exports valid design token scales", () => {
    expect(colorScale["sora-sky-500"]).toBe("#0ea5e9");
    expect(spacing["4"]).toBe("1rem");
    expect(radius.md).toBe("0.375rem");
  });

  it("merges class names with cx utility", () => {
    expect(cx("sora-btn", false, null, "sora-btn--primary")).toBe(
      "sora-btn sora-btn--primary",
    );
  });

  describe("validateTheme", () => {
    it("passes for complete valid Theme Contract", () => {
      const res = validateTheme(validTheme);
      expect(res.valid).toBe(true);
      expect(res.errors).toHaveLength(0);
    });

    it("returns error when required Theme Contract keys are missing", () => {
      const incomplete = { ...validTheme };
      delete incomplete["--ui-background"];
      delete incomplete["--ui-primary"];

      const res = validateTheme(incomplete);
      expect(res.valid).toBe(false);
      expect(res.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "missing_key",
            key: "--ui-background",
          }),
          expect.objectContaining({ type: "missing_key", key: "--ui-primary" }),
        ]),
      );
    });

    it("returns error when referencing non-existent semantic token", () => {
      const invalidRef = {
        ...validTheme,
        "--ui-primary": "var(--ui-nonexistent-token)",
      };

      const res = validateTheme(invalidRef);
      expect(res.valid).toBe(false);
      expect(res.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "invalid_reference",
            key: "--ui-primary",
          }),
        ]),
      );
    });

    it("detects and rejects circular token references with full chain", () => {
      const circularTheme = {
        ...validTheme,
        "--ui-primary": "var(--ui-accent)",
        "--ui-accent": "var(--ui-secondary)",
        "--ui-secondary": "var(--ui-primary)",
      };

      const res = validateTheme(circularTheme);
      expect(res.valid).toBe(false);
      const circularErr = res.errors.find(
        (e) => e.type === "circular_reference",
      );
      expect(circularErr).toBeDefined();
      expect(circularErr?.chain).toEqual([
        "--ui-primary",
        "--ui-accent",
        "--ui-secondary",
        "--ui-primary",
      ]);
    });

    it("returns warning for non-standard token names", () => {
      const withCustom = {
        ...validTheme,
        customKey: "10px",
      };

      const res = validateTheme(withCustom);
      expect(res.valid).toBe(true);
      expect(res.warnings).toHaveLength(1);
      expect(res.warnings[0]?.type).toBe("unknown_token");
    });
  });

  describe("Exporters", () => {
    it("exportThemeToCSS generates valid standalone and default CSS selectors", () => {
      const defaultCss = exportThemeToCSS(validTheme, {
        themeId: "sky",
        isDefault: true,
      });
      expect(defaultCss).toContain(':root,\n[data-theme="sky"] {');
      expect(defaultCss).not.toContain(":root [data-theme");
      expect(defaultCss).toContain("--ui-background: #ffffff;");

      const scopedCss = exportThemeToCSS(validTheme, {
        themeId: "midnight",
        isDefault: false,
      });
      expect(scopedCss).toContain('[data-theme="midnight"] {');
      expect(scopedCss).not.toContain(":root");

      const modeCss = exportThemeToCSS(validTheme, {
        themeId: "sky",
        mode: "dark",
      });
      expect(modeCss).toContain('[data-theme="sky"][data-mode="dark"] {');
    });

    it("exportThemeToJSON produces DTCG compliant structure", () => {
      const json = exportThemeToJSON(validTheme, { name: "Sky Theme" });
      expect(json.$name).toBe("Sky Theme");
      expect(json.color.primary).toEqual({
        $type: "color",
        $value: "#0ea5e9",
      });
      expect(json.dimension.radius).toEqual({
        $type: "dimension",
        $value: "0.5rem",
      });
    });

    it("exportThemeToTailwind produces clean config object with zero runtime dependencies", () => {
      const tw = exportThemeToTailwind(validTheme);
      expect(tw.theme.extend.colors.primary).toBe("var(--ui-primary)");
      expect(tw.theme.extend.borderRadius.radius).toBe("var(--ui-radius)");
    });
  });

  describe("DOM Theme Scoping & FOUC Script", () => {
    beforeEach(() => {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.removeAttribute("data-mode");
    });

    it("applies theme and mode to root and queries correctly", () => {
      applyTheme("midnight");
      applyMode("dark");

      expect(document.documentElement.getAttribute("data-theme")).toBe(
        "midnight",
      );
      expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
      expect(getCurrentTheme()).toBe("midnight");
    });

    it("queries scoped theme from nested subtree element", () => {
      const container = document.createElement("div");
      container.setAttribute("data-theme", "sky");
      const child = document.createElement("div");
      container.appendChild(child);
      document.body.appendChild(container);

      expect(getCurrentTheme(child)).toBe("sky");
      document.body.removeChild(container);
    });

    it("generates non-empty FOUC prevention script", () => {
      const script = getThemeInitScript({
        defaultTheme: "sky",
        defaultMode: "system",
      });
      expect(script).toContain("localStorage.getItem");
      expect(script).toContain("data-theme");
      expect(script).toContain("data-mode");
    });
  });
});
