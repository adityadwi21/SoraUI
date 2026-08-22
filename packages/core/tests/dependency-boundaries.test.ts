import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function getFilesRecursively(dir: string, extension: string = '.ts'): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, extension));
    } else if (file.endsWith(extension)) {
      results.push(filePath);
    }
  }
  return results;
}

describe('Phase 10.5B — Architectural Dependency Boundary Audit', () => {
  const rootDir = path.resolve(__dirname, '../../../');
  const coreSrc = path.join(rootDir, 'packages/core/src');
  const hooksSrc = path.join(rootDir, 'packages/hooks/src');
  const cliSrc = path.join(rootDir, 'packages/cli/src');

  it('@soraui/core has 0 imports of React or ReactDOM', () => {
    const coreFiles = getFilesRecursively(coreSrc);
    expect(coreFiles.length).toBeGreaterThan(0);

    for (const file of coreFiles) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(/from\s+['"]react['"]/);
      expect(content).not.toMatch(/from\s+['"]react-dom['"]/);
      expect(content).not.toMatch(/import\s+['"]react['"]/);
    }
  });

  it('@soraui/core package.json has 0 React runtime dependencies', () => {
    const corePkgPath = path.join(rootDir, 'packages/core/package.json');
    const pkg = JSON.parse(fs.readFileSync(corePkgPath, 'utf8'));
    const allDeps = {
      ...(pkg.dependencies || {}),
      ...(pkg.peerDependencies || {}),
    };

    expect(allDeps['react']).toBeUndefined();
    expect(allDeps['react-dom']).toBeUndefined();
  });

  it('@soraui/hooks does not import any UI components', () => {
    const hooksFiles = getFilesRecursively(hooksSrc);
    expect(hooksFiles.length).toBeGreaterThan(0);

    for (const file of hooksFiles) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(/from\s+['"]@soraui\/react['"]/);
      expect(content).not.toMatch(/from\s+['"]\.\.\/components/);
    }
  });

  it('soraui CLI has 0 React runtime dependencies', () => {
    const cliPkgPath = path.join(rootDir, 'packages/cli/package.json');
    const pkg = JSON.parse(fs.readFileSync(cliPkgPath, 'utf8'));
    const allDeps = {
      ...(pkg.dependencies || {}),
      ...(pkg.peerDependencies || {}),
    };

    expect(allDeps['react']).toBeUndefined();
    expect(allDeps['react-dom']).toBeUndefined();

    const cliFiles = getFilesRecursively(cliSrc);
    for (const file of cliFiles) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(/^import\s+.*from\s+['"]react['"]/m);
      expect(content).not.toMatch(/^import\s+.*from\s+['"]react-dom['"]/m);
    }
  });
});
