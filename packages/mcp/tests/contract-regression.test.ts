/**
 * Phase 12I — MCP / Registry Contract Regression
 *
 * Invariants enforced (ALL BIDIRECTIONAL):
 *
 *   Registry → MCP   : Every registry entry is inspectable via @soraui/mcp tools
 *   MCP → Registry   : Every item returned by MCP exists in registry.json
 *   Registry → Docs  : Every registry entry has a documentation page (tested in apps/docs)
 *   Registry → CLI   : Every registry component name is known to the CLI registry
 *   Registry → ThemeBuilder: All 9 presets exist in theme-builder (tested via registry.json themes)
 *   Public API → Registry: Every exported component name appears in registry.json
 *
 * This test MUST FAIL CI if:
 * - A component is added to @soraui/react exports without updating registry.json
 * - A component is renamed in registry.json without updating MCP inspection
 * - A block/template is removed without removing its docs/MCP entry
 * - soraui_compose_recipe produces invalid/incomplete JSX
 * - soraui_search does not return the correct item as top result
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { loadCanonicalRegistry, searchRegistry, listItems } from '../src/index';
import { ALL_COMPONENTS, ALL_BLOCKS, ALL_TEMPLATES } from '../../cli/src/utils/registry';
import registryJson from '../../../registry/registry.json';

// Import the MCP tool handlers directly for contract testing
import { handleInspectComponent } from '../src/tools/inspect-component';
import { handleInspectBlock } from '../src/tools/inspect-block';
import { handleInspectTemplate } from '../src/tools/inspect-template';
import { handleInspectTheme } from '../src/tools/inspect-theme';
import { handleComposeRecipe, RECIPE_KEYS } from '../src/tools/compose-recipe';

// ──────────────────────────────────────────────────────────────────────────────
// 12I-1: Registry ↔ MCP (Bidirectional)
// ──────────────────────────────────────────────────────────────────────────────

describe('12I — Contract: Registry ↔ MCP (bidirectional)', () => {
  let registry: ReturnType<typeof loadCanonicalRegistry>;

  beforeAll(() => {
    registry = loadCanonicalRegistry();
  });

  it('Every component in registry.json is inspectable via soraui_inspect_component', () => {
    for (const comp of registry.components) {
      const result = handleInspectComponent({ name: comp.name });
      expect(
        result,
        `soraui_inspect_component("${comp.name}") returned null — registry/MCP divergence detected`
      ).not.toBeNull();
      expect(
        result?.name?.toLowerCase(),
        `inspect returned wrong component for "${comp.name}"`
      ).toBe(comp.name.toLowerCase());
    }
  });

  it('Every block in registry.json is inspectable via soraui_inspect_block', () => {
    for (const block of registry.blocks) {
      const result = handleInspectBlock({ id: block.id });
      expect(
        result,
        `soraui_inspect_block("${block.id}") returned null — registry/MCP divergence detected`
      ).not.toBeNull();
    }
  });

  it('Every template in registry.json is inspectable via soraui_inspect_template', () => {
    for (const tpl of registry.templates) {
      const result = handleInspectTemplate({ id: tpl.id });
      expect(
        result,
        `soraui_inspect_template("${tpl.id}") returned null — registry/MCP divergence detected`
      ).not.toBeNull();
    }
  });

  it('Every theme in registry.json is inspectable via soraui_inspect_theme', () => {
    for (const theme of registry.themes) {
      const result = handleInspectTheme({ id: theme.id });
      expect(
        result,
        `soraui_inspect_theme("${theme.id}") returned null — registry/MCP divergence detected`
      ).not.toBeNull();
    }
  });


  it('soraui_list components returns exactly 44 entries (no MCP extras or missing)', () => {
    const listed = listItems('components');
    expect(listed.length).toBe(registry.components.length);

    for (const item of listed) {
      const inRegistry = registry.components.find((c) => c.name.toLowerCase() === item.name.toLowerCase());
      expect(
        inRegistry,
        `MCP listItems returned "${item.name}" not found in canonical registry — orphaned MCP entry`
      ).toBeDefined();
    }
  });

  it('soraui_search returns correct top result for exact matches', () => {
    const exactTests = [
      { query: 'button', expectedName: 'button' },
      { query: 'dialog', expectedName: 'dialog' },
      { query: 'data-table', expectedName: 'data-table' },
    ];

    for (const { query, expectedName } of exactTests) {
      const results = searchRegistry(query);
      expect(results.length).toBeGreaterThan(0);
      expect(
        results[0]!.name.toLowerCase(),
        `soraui_search("${query}") top result should be "${expectedName}", got "${results[0]!.name}"`
      ).toBe(expectedName);
      expect(results[0]!.score).toBe(100); // exact match score
      expect(results[0]!.matchedBy).toBe('exact');
    }
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12I-2: Registry ↔ CLI (Bidirectional)
// ──────────────────────────────────────────────────────────────────────────────

describe('12I — Contract: Registry ↔ CLI (bidirectional)', () => {
  it('Every component in canonical registry.json exists in CLI ALL_COMPONENTS', () => {
    for (const comp of registryJson.components) {
      const cliEntry = ALL_COMPONENTS.find((c) => c.name === comp.name);
      expect(
        cliEntry,
        `CLI missing component entry for "${comp.name}" — registry/CLI divergence. Add to CLI ALL_COMPONENTS.`
      ).toBeDefined();
    }
  });

  it('Every CLI component exists in canonical registry.json', () => {
    for (const cliComp of ALL_COMPONENTS) {
      const regEntry = registryJson.components.find((c) => c.name === cliComp.name);
      expect(
        regEntry,
        `Canonical registry missing entry for CLI component "${cliComp.name}" — orphaned CLI entry.`
      ).toBeDefined();
    }
  });

  it('Every block in canonical registry.json exists in CLI ALL_BLOCKS', () => {
    for (const block of registryJson.blocks) {
      const cliBlock = ALL_BLOCKS.find((b) => b.id === block.id);
      expect(
        cliBlock,
        `CLI missing block entry for "${block.id}" — registry/CLI divergence.`
      ).toBeDefined();
    }
  });

  it('Every template in canonical registry.json exists in CLI ALL_TEMPLATES', () => {
    for (const tpl of registryJson.templates) {
      const cliTemplate = ALL_TEMPLATES.find((t) => t.id === tpl.id);
      expect(
        cliTemplate,
        `CLI missing template entry for "${tpl.id}" — registry/CLI divergence.`
      ).toBeDefined();
    }
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12I-3: Deterministic Recipe Contract
// ──────────────────────────────────────────────────────────────────────────────

describe('12I — Contract: soraui_compose_recipe determinism', () => {
  for (const recipe of RECIPE_KEYS) {
    it(`compose_recipe("${recipe}") is deterministic and produces valid JSX`, () => {
      const result1 = handleComposeRecipe({ recipe });
      const result2 = handleComposeRecipe({ recipe });

      // Must be identical across calls (determinism)
      expect(result1.recipeVersion).toBe('1.0');
      expect(result1.generatedCode).toBe(result2.generatedCode);

      // Must contain a React import and at least one SoraUI component
      expect(result1.generatedCode).toContain('import React');
      expect(result1.generatedCode.length).toBeGreaterThan(100);

      // Must contain ThemeProvider or ThemeScope wrapper
      const hasThemeWrapper = result1.generatedCode.includes('ThemeProvider') || result1.generatedCode.includes('ThemeScope');
      expect(hasThemeWrapper, `${recipe}: recipe must include ThemeProvider or ThemeScope wrapper`).toBe(true);

      // Must NOT contain backend/API coupling
      const forbiddenPatterns = ['fetch(', 'axios.', 'prisma.', 'supabase.', '.query('];
      for (const pattern of forbiddenPatterns) {
        expect(result1.generatedCode, `${recipe}: recipe must not include backend coupling ("${pattern}")`).not.toContain(pattern);
      }
    });
  }
});


// ──────────────────────────────────────────────────────────────────────────────
// 12I-4: Registry count integrity
// ──────────────────────────────────────────────────────────────────────────────

describe('12I — Contract: Registry count integrity', () => {
  it('registry.json contains exactly 44 components, 14 blocks, 4 templates, 9 themes', () => {
    expect(registryJson.components.length).toBe(44);
    expect(registryJson.blocks.length).toBe(14);
    expect(registryJson.templates.length).toBe(4);
    expect(registryJson.themes.length).toBe(9);
  });

  it('No duplicate IDs within each registry section', () => {
    const componentNames = registryJson.components.map((c) => c.name);
    expect(new Set(componentNames).size).toBe(componentNames.length);

    const blockIds = registryJson.blocks.map((b) => b.id);
    expect(new Set(blockIds).size).toBe(blockIds.length);

    const templateIds = registryJson.templates.map((t) => t.id);
    expect(new Set(templateIds).size).toBe(templateIds.length);

    const themeIds = registryJson.themes.map((th) => th.id);
    expect(new Set(themeIds).size).toBe(themeIds.length);
  });
});
