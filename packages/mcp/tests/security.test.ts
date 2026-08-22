import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 11 — MCP Security & Read-Only Sandboxing', () => {
  const mcpSrcDir = path.resolve(__dirname, '../src');

  function getAllTsFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getAllTsFiles(fullPath));
      } else if (entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  it('contains 0 shell execution calls (execSync, spawn, exec, execFile)', () => {
    const files = getAllTsFiles(mcpSrcDir);
    const forbiddenExecution = /\b(execSync|spawnSync|child_process|execFile)\b/;

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(forbiddenExecution);
    }
  });

  it('contains 0 mutating filesystem write calls (writeFileSync, writeFile, mkdirSync, unlinkSync, rmSync)', () => {
    const files = getAllTsFiles(mcpSrcDir);
    const forbiddenWrites = /\b(writeFileSync|mkdirSync|unlinkSync|rmSync|writeFile\s*\(|mkdir\s*\()/;

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(forbiddenWrites);
    }
  });

  it('contains 0 outbound network imports or fetch calls', () => {
    const files = getAllTsFiles(mcpSrcDir);
    const forbiddenNetwork = /^import\s+.*(axios|https|http|node-fetch)|require\(['"](axios|https|http)['"]\)|^\s*fetch\s*\(/m;

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content).not.toMatch(forbiddenNetwork);
    }
  });
});
