import { describe, it, expect } from 'vitest';
import {
  handleGetContext,
  handleSearch,
  handleList,
  handleInspectComponent,
  handleInspectBlock,
  handleInspectTemplate,
  handleInspectTheme,
  handleComposeRecipe,
  handleGetInstallCommands,
  handleResolveDependencies,
  handleValidateComposition,
} from '../src/index';

describe('Phase 11 — 11 MCP Tool Handlers Execution', () => {
  it('1. soraui_get_context returns full ecosystem context', () => {
    const ctx = handleGetContext();
    expect(ctx.ecosystem).toBe('SoraUI');
    expect(ctx.catalog.totalComponents).toBe(44);
    expect(ctx.catalog.totalBlocks).toBe(14);
    expect(ctx.catalog.totalTemplates).toBe(4);
    expect(ctx.catalog.totalThemes).toBe(9);
    expect(ctx.principles.length).toBeGreaterThan(0);
  });

  it('2. soraui_search finds components and blocks', () => {
    const searchRes = handleSearch({ query: 'dialog' });
    expect(searchRes.totalFound).toBeGreaterThan(0);
    expect(searchRes.results.some((r) => r.id === 'dialog')).toBe(true);
  });

  it('3. soraui_list lists items accurately', () => {
    const listRes = handleList({ kind: 'blocks', category: 'marketing' });
    expect(listRes.items.length).toBeGreaterThan(0);
    expect(listRes.items.every((b) => (b as any).category === 'marketing')).toBe(true);
  });

  it('4. soraui_inspect_component returns full prop/a11y contract', () => {
    const comp = handleInspectComponent({ name: 'button' });
    expect(comp.name).toBe('button');
    expect(comp.level).toBe(1);
    expect(comp.installation.cli).toBe('npx soraui add button');
    expect(comp.installation.npm).toContain('Button');
  });

  it('5. soraui_inspect_block returns UI-only boundary matrix', () => {
    const block = handleInspectBlock({ id: 'login-form' });
    expect(block.id).toBe('login-form');
    expect(block.boundaryExplanation.soraHandles.length).toBeGreaterThan(0);
    expect(block.boundaryExplanation.consumerHandles.length).toBeGreaterThan(0);
  });

  it('6. soraui_inspect_template returns full template source', () => {
    const tmpl = handleInspectTemplate({ id: 'dashboard-page' });
    expect(tmpl.id).toBe('dashboard-page');
    expect(tmpl.blocks).toContain('dashboard-shell');
    expect(tmpl.blocks).toContain('metric-grid');
  });

  it('7. soraui_inspect_theme returns 24-key Theme Contract and preset details', () => {
    const theme = handleInspectTheme({ id: 'aurora' });
    expect(theme.id).toBe('aurora');
    expect(theme.mode).toBe('dark');
    expect(theme.cssImport).toContain('aurora.css');

    const allThemes = handleInspectTheme();
    expect((allThemes as any).themeContractKeys.length).toBe(24);
  });

  it('8. soraui_compose_recipe produces deterministic JSX with recipeVersion 1.0', () => {
    const recipe = handleComposeRecipe({ recipe: 'auth_flow', theme: 'midnight', mode: 'dark' });
    expect(recipe.recipeVersion).toBe('1.0');
    expect(recipe.pattern).toBe('auth_flow');
    expect(recipe.generatedCode).toContain('<ThemeProvider defaultTheme="midnight" defaultMode="dark">');
    expect(recipe.generatedCode).toContain('<LoginForm');
  });

  it('9. soraui_get_install_commands generates CLI & NPM commands without shell execution', () => {
    const cliRes = handleGetInstallCommands({ target: 'metric-grid', type: 'block', method: 'cli' });
    expect(cliRes.command).toBe('npx soraui add block metric-grid');

    const npmRes = handleGetInstallCommands({ target: 'metric-grid', type: 'block', method: 'npm' });
    expect(npmRes.command).toContain('npm install @soraui/react');
  });

  it('10. soraui_resolve_dependencies computes full dependency graph', () => {
    const deps = handleResolveDependencies({ id: 'login-page', kind: 'template' });
    expect(deps.resolvedComponents).toContain('button');
    expect(deps.resolvedComponents).toContain('input');
    expect(deps.resolvedBlocks).toContain('login-form');
  });

  it('11. soraui_validate_composition detects violations and outputs diagnostic report', () => {
    const report = handleValidateComposition({ code: '<div style={{ color: "#ff0000" }}><Button size="icon" /></div>' });
    expect(report.valid).toBe(false);
    expect(report.errorsCount).toBeGreaterThan(0);
    expect(report.diagnostics.some((d) => d.rule === 'SORA-TOKEN-001')).toBe(true);
    expect(report.diagnostics.some((d) => d.rule === 'SORA-A11Y-001')).toBe(true);
  });
});
