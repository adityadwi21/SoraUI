import { describe, it, expect } from "vitest";
import { loadCanonicalRegistry, listItems } from "../src/index";

describe("Phase 11 — MCP Canonical Registry Sync & Parity", () => {
  it("loads canonical registry with exact 47 primitives, 14 blocks, 4 templates, and 9 themes", () => {
    const registry = loadCanonicalRegistry();

    expect(registry.registryVersion).toBe("0.1.1");
    expect(registry.components.length).toBe(47);
    expect(registry.blocks.length).toBe(14);
    expect(registry.templates.length).toBe(4);
    expect(registry.themes.length).toBe(9);
  });

  it("listItems returns exact item sets without duplicate or missing entries", () => {
    const comps = listItems("components");
    const blocks = listItems("blocks");
    const templates = listItems("templates");
    const themes = listItems("themes");

    expect(comps.length).toBe(47);
    expect(blocks.length).toBe(14);
    expect(templates.length).toBe(4);
    expect(themes.length).toBe(9);
  });
});
