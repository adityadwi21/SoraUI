import { describe, it, expect } from "vitest";
import { handleComposeRecipe } from "../src/index";

describe("Phase 11 — MCP Deterministic Recipe Composition", () => {
  it('same input produces identical deterministic recipe output with recipeVersion: "1.0"', () => {
    const run1 = handleComposeRecipe({
      recipe: "dashboard",
      theme: "nebula",
      mode: "dark",
    });
    const run2 = handleComposeRecipe({
      recipe: "dashboard",
      theme: "nebula",
      mode: "dark",
    });

    expect(run1.recipeVersion).toBe("1.0");
    expect(run1.generatedCode).toBe(run2.generatedCode);
    expect(run1.requiredComponents).toEqual(run2.requiredComponents);
    expect(run1.requiredBlocks).toEqual(run2.requiredBlocks);
  });

  it("all 4 standard recipes generate valid and themed code snippets", () => {
    const patterns = [
      "auth_flow",
      "dashboard",
      "saas_landing",
      "settings_tabs",
    ] as const;

    for (const pattern of patterns) {
      const res = handleComposeRecipe({
        recipe: pattern,
        theme: "aurora",
        mode: "dark",
      });
      expect(res.recipeVersion).toBe("1.0");
      expect(res.generatedCode).toContain("ThemeProvider");
      expect(res.generatedCode).toContain("aurora");
    }
  });
});
