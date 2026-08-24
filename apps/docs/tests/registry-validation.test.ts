import { describe, it, expect } from "vitest";
import { COMPONENT_DOCS } from "../src/registry/components";
import { BLOCK_DOCS } from "../src/registry/blocks";
import { TEMPLATE_DOCS } from "../src/registry/templates";
import { THEME_DOCS } from "../src/registry/themes";
import registryJson from "../../../registry/registry.json";

describe("Phase 10 — Docs Registry Consistency & Validation", () => {
  it("every component in canonical registry.json has a valid documentation entry", () => {
    expect(registryJson.components.length).toBe(47);
    expect(COMPONENT_DOCS.length).toBe(47);

    for (const comp of registryJson.components) {
      const doc = COMPONENT_DOCS.find((c) => c.id === comp.name);
      expect(
        doc,
        `Missing documentation entry for registered component: ${comp.name}`,
      ).toBeDefined();
      expect(doc?.description.length).toBeGreaterThan(10);
      expect(doc?.examples.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every block in canonical registry.json has a valid documentation entry", () => {
    expect(registryJson.blocks.length).toBe(14);
    expect(BLOCK_DOCS.length).toBe(14);

    for (const block of registryJson.blocks) {
      const doc = BLOCK_DOCS.find((b) => b.id === block.id);
      expect(
        doc,
        `Missing documentation entry for registered block: ${block.id}`,
      ).toBeDefined();
      expect(doc?.boundaryExplanation.soraHandles.length).toBeGreaterThan(0);
      expect(doc?.boundaryExplanation.consumerHandles.length).toBeGreaterThan(
        0,
      );
    }
  });

  it("every template in canonical registry.json has a valid documentation entry", () => {
    expect(registryJson.templates.length).toBe(4);
    expect(TEMPLATE_DOCS.length).toBe(4);

    for (const tpl of registryJson.templates) {
      const doc = TEMPLATE_DOCS.find((t) => t.id === tpl.id);
      expect(
        doc,
        `Missing documentation entry for registered template: ${tpl.id}`,
      ).toBeDefined();
      expect(doc?.blocks.length).toBeGreaterThan(0);
    }
  });

  it("theme documentation satisfies all 9 presets", () => {
    expect(THEME_DOCS.length).toBe(9);
    const themeIds = THEME_DOCS.map((t) => t.id);
    expect(themeIds).toEqual([
      "sky",
      "cloud",
      "horizon",
      "aurora",
      "twilight",
      "midnight",
      "nebula",
      "eclipse",
      "starlight",
    ]);
  });

  it("has no duplicate IDs across any documentation registry section", () => {
    const allIds = [
      ...COMPONENT_DOCS.map((c) => `comp-${c.id}`),
      ...BLOCK_DOCS.map((b) => `block-${b.id}`),
      ...TEMPLATE_DOCS.map((t) => `template-${t.id}`),
      ...THEME_DOCS.map((th) => `theme-${th.id}`),
    ];
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });
});
