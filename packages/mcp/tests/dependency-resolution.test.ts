import { describe, it, expect } from 'vitest';
import { handleResolveDependencies } from '../src/index';

describe('Phase 11 — MCP Dependency Graph Resolution', () => {
  it('resolves flat unique primitive component dependencies for blocks', () => {
    const deps = handleResolveDependencies({ id: 'metric-grid', kind: 'block' });
    expect(deps.resolvedComponents).toContain('card');
    expect(deps.resolvedComponents).toContain('statistic');
    // Ensure no duplicates
    const unique = Array.from(new Set(deps.resolvedComponents));
    expect(deps.resolvedComponents.length).toBe(unique.length);
  });

  it('resolves recursive dependencies for page templates down to primitives', () => {
    const tmplDeps = handleResolveDependencies({ id: 'saas-landing-page', kind: 'template' });
    expect(tmplDeps.resolvedBlocks).toContain('hero-section');
    expect(tmplDeps.resolvedBlocks).toContain('pricing-table');
    expect(tmplDeps.resolvedComponents).toContain('button');
    expect(tmplDeps.resolvedComponents).toContain('badge');
  });

  it('throws helpful error on non-existent catalog items', () => {
    expect(() => handleResolveDependencies({ id: 'unknown-non-existent-comp' })).toThrowError(/not found in canonical registry/);
  });
});
