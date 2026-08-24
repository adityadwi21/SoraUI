import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 10.5D — Granular Bundle Size & Tree-Shaking Budget Contract', () => {
  const reactDist = path.resolve(__dirname, '../dist');
  const coreDist = path.resolve(__dirname, '../../core/dist');
  const hooksDist = path.resolve(__dirname, '../../hooks/dist');

  it('compiled dist files exist after build', () => {
    const jsFile = path.join(reactDist, 'index.js');
    const dtsFile = path.join(reactDist, 'index.d.ts');
    const cssFile = fs.existsSync(path.join(reactDist, 'styles.css'))
      ? path.join(reactDist, 'styles.css')
      : path.join(reactDist, 'index.css');

    expect(fs.existsSync(jsFile), 'dist/index.js must exist').toBe(true);
    expect(fs.existsSync(dtsFile), 'dist/index.d.ts must exist').toBe(true);
    expect(fs.existsSync(cssFile), 'dist css must exist').toBe(true);
  });

  it('@soraui/core ESM satisfies budget (< 15 KB)', () => {
    const coreJs = path.join(coreDist, 'index.js');
    if (fs.existsSync(coreJs)) {
      const stats = fs.statSync(coreJs);
      const sizeKB = stats.size / 1024;
      expect(sizeKB).toBeLessThan(15);
    }
  });

  it('@soraui/hooks ESM satisfies budget (< 15 KB)', () => {
    const hooksJs = path.join(hooksDist, 'index.js');
    if (fs.existsSync(hooksJs)) {
      const stats = fs.statSync(hooksJs);
      const sizeKB = stats.size / 1024;
      expect(sizeKB).toBeLessThan(15);
    }
  });

  it('@soraui/react full ESM satisfies budget (< 200 KB)', () => {
    const jsFile = path.join(reactDist, 'index.js');
    const stats = fs.statSync(jsFile);
    const sizeKB = stats.size / 1024;

    // React package containing 44 primitives, 14 blocks, and 4 templates
    expect(sizeKB).toBeLessThan(200);
  });

  it('consolidated css stylesheet satisfies size budget (< 60 KB)', () => {
    const cssFile = fs.existsSync(path.join(reactDist, 'styles.css'))
      ? path.join(reactDist, 'styles.css')
      : path.join(reactDist, 'index.css');
    const stats = fs.statSync(cssFile);
    const sizeKB = stats.size / 1024;

    // Zero-runtime styles for all 44 components, 14 blocks, and 4 templates
    expect(sizeKB).toBeLessThan(60);
  });

  it('tree-shaking verification: Button entry does NOT bundle heavy components', () => {
    const buttonFile = path.join(reactDist, 'components/button/button.js');
    if (fs.existsSync(buttonFile)) {
      const content = fs.readFileSync(buttonFile, 'utf8');
      expect(content).not.toContain('sora-calendar');
      expect(content).not.toContain('sora-data-table');
      expect(content).not.toContain('sora-command-palette');
      expect(content).not.toContain('sora-date-picker');
      expect(content).not.toContain('LoginPageTemplate');
    }
  });
});
