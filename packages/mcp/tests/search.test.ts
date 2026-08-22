import { describe, it, expect } from 'vitest';
import { handleSearch } from '../src/index';

describe('Phase 11 — MCP Deterministic Search Scoring', () => {
  it('exact match returns score 100 with matchedBy: "exact"', () => {
    const res = handleSearch({ query: 'button' });
    expect(res.totalFound).toBeGreaterThan(0);
    const first = res.results[0];
    expect(first.name).toBe('button');
    expect(first.score).toBe(100);
    expect(first.matchedBy).toBe('exact');
  });

  it('prefix match returns score 80 with matchedBy: "prefix"', () => {
    const res = handleSearch({ query: 'date-' });
    expect(res.totalFound).toBeGreaterThan(0);
    const match = res.results.find((r) => r.id === 'date-picker');
    expect(match).toBeDefined();
    expect(match?.score).toBe(80);
    expect(match?.matchedBy).toBe('prefix');
  });

  it('category filter returns matching blocks with category match', () => {
    const res = handleSearch({ query: 'auth', kind: 'blocks' });
    expect(res.totalFound).toBeGreaterThan(0);
    const loginForm = res.results.find((r) => r.id === 'login-form');
    expect(loginForm).toBeDefined();
    expect(loginForm?.category).toBe('auth');
  });

  it('deterministic sort: results sorted by score DESC, then name ASC', () => {
    const res = handleSearch({ query: 'a', limit: 10 });
    for (let i = 1; i < res.results.length; i++) {
      const prev = res.results[i - 1];
      const curr = res.results[i];
      if (prev.score === curr.score) {
        expect(prev.name.localeCompare(curr.name)).toBeLessThanOrEqual(0);
      } else {
        expect(prev.score).toBeGreaterThan(curr.score);
      }
    }
  });
});
