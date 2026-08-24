/**
 * Phase 12I — Docs Contract Regression
 *
 * Bidirectional invariant:
 *   Registry → Docs : Every registry entry has a documentation page
 *   Docs → Registry : Every documentation entry points to a valid registry ID
 *
 * Extending the Phase 10 validation with bidirectional checks and reverse orphan detection.
 */
import { describe, it, expect } from "vitest";
import { COMPONENT_DOCS } from "../src/registry/components";
import { BLOCK_DOCS } from "../src/registry/blocks";
import { TEMPLATE_DOCS } from "../src/registry/templates";
import { THEME_DOCS } from "../src/registry/themes";
import registryJson from "../../../registry/registry.json";

// ──────────────────────────────────────────────────────────────────────────────
// 12I — Bidirectional Docs ↔ Registry Contracts
// ──────────────────────────────────────────────────────────────────────────────

describe("12I — Contract: Docs ↔ Registry (bidirectional)", () => {
  // Forward: Registry → Docs
  it("Every component in registry.json has a documentation entry (Registry → Docs)", () => {
    for (const comp of registryJson.components) {
      const doc = COMPONENT_DOCS.find((c) => c.id === comp.name);
      expect(
        doc,
        `Missing docs entry for registry component "${comp.name}" — add to COMPONENT_DOCS`,
      ).toBeDefined();
    }
  });

  // Reverse: Docs → Registry (orphan check)
  it("Every COMPONENT_DOCS entry points to a valid registry ID (Docs → Registry)", () => {
    for (const doc of COMPONENT_DOCS) {
      const regEntry = registryJson.components.find((c) => c.name === doc.id);
      expect(
        regEntry,
        `COMPONENT_DOCS entry "${doc.id}" has no corresponding entry in registry.json — orphaned documentation`,
      ).toBeDefined();
    }
  });

  // Forward: Registry → Docs
  it("Every block in registry.json has a documentation entry (Registry → Docs)", () => {
    for (const block of registryJson.blocks) {
      const doc = BLOCK_DOCS.find((b) => b.id === block.id);
      expect(
        doc,
        `Missing docs entry for registry block "${block.id}" — add to BLOCK_DOCS`,
      ).toBeDefined();
    }
  });

  // Reverse: Docs → Registry (orphan check)
  it("Every BLOCK_DOCS entry points to a valid registry ID (Docs → Registry)", () => {
    for (const doc of BLOCK_DOCS) {
      const regEntry = registryJson.blocks.find((b) => b.id === doc.id);
      expect(
        regEntry,
        `BLOCK_DOCS entry "${doc.id}" has no corresponding entry in registry.json — orphaned documentation`,
      ).toBeDefined();
    }
  });

  // Forward: Registry → Docs
  it("Every template in registry.json has a documentation entry (Registry → Docs)", () => {
    for (const tpl of registryJson.templates) {
      const doc = TEMPLATE_DOCS.find((t) => t.id === tpl.id);
      expect(
        doc,
        `Missing docs entry for registry template "${tpl.id}" — add to TEMPLATE_DOCS`,
      ).toBeDefined();
    }
  });

  // Reverse: Docs → Registry (orphan check)
  it("Every TEMPLATE_DOCS entry points to a valid registry ID (Docs → Registry)", () => {
    for (const doc of TEMPLATE_DOCS) {
      const regEntry = registryJson.templates.find((t) => t.id === doc.id);
      expect(
        regEntry,
        `TEMPLATE_DOCS entry "${doc.id}" has no corresponding entry in registry.json — orphaned documentation`,
      ).toBeDefined();
    }
  });

  // Theme docs are fixed: verify all 9 are present in both directions
  it("All 9 themes present in THEME_DOCS (bidirectional with registry.json)", () => {
    const registryThemeIds = registryJson.themes.map((t) => t.id).sort();
    const docThemeIds = THEME_DOCS.map((t) => t.id).sort();

    expect(docThemeIds).toEqual(registryThemeIds);
  });

  // Structural integrity
  it("No duplicate IDs within COMPONENT_DOCS", () => {
    const ids = COMPONENT_DOCS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("No duplicate IDs within BLOCK_DOCS", () => {
    const ids = BLOCK_DOCS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Every component doc has at minimum 1 usage example and a non-trivial description", () => {
    for (const doc of COMPONENT_DOCS) {
      expect(
        doc.examples?.length ?? 0,
        `COMPONENT_DOCS entry "${doc.id}" must have at least 1 usage example`,
      ).toBeGreaterThanOrEqual(1);
      expect(
        (doc.description ?? "").length,
        `COMPONENT_DOCS entry "${doc.id}" must have a description of > 10 characters`,
      ).toBeGreaterThan(10);
    }
  });
});
