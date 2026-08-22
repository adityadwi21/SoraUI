import { describe, it, expect } from 'vitest';
import { getRegistryResource } from '../src/resources/registry';
import { getThemesResource } from '../src/resources/themes';
import { getGuidelinesResource } from '../src/resources/guidelines';

describe('Phase 11 — MCP Resources', () => {
  it('reads soraui://registry full and subpath resources', () => {
    const full = getRegistryResource();
    expect(full.uri).toBe('soraui://registry');
    expect(full.mimeType).toBe('application/json');
    const parsed = JSON.parse(full.text);
    expect(parsed.components.length).toBe(44);

    const compsSubpath = getRegistryResource('components');
    expect(compsSubpath.uri).toBe('soraui://registry/components');
    const parsedComps = JSON.parse(compsSubpath.text);
    expect(parsedComps.components.length).toBe(44);
  });

  it('reads soraui://themes resource with 24-key Theme Contract', () => {
    const themesRes = getThemesResource();
    expect(themesRes.uri).toBe('soraui://themes');
    const parsed = JSON.parse(themesRes.text);
    expect(parsed.totalPresets).toBe(9);
    expect(parsed.contractKeys.length).toBe(24);
  });

  it('reads soraui://guidelines markdown resource', () => {
    const guideRes = getGuidelinesResource();
    expect(guideRes.uri).toBe('soraui://guidelines');
    expect(guideRes.mimeType).toBe('text/markdown');
    expect(guideRes.text).toContain('Own Your UI');
    expect(guideRes.text).toContain('3-Layer Design Tokens');
  });
});
