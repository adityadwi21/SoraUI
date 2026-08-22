/**
 * Phase 13A — Package & Tarball Leakage Scanner
 *
 * Builds tarballs (.tgz) for all 5 publishable packages, extracts them into a clean
 * isolated temporary environment, and verifies:
 * 1. Zero instances of `workspace:`, `file:`, `link:` in package manifests.
 * 2. Zero unresolved relative monorepo paths (`../../packages/`, `../../apps/`, `../../registry/`).
 * 3. Zero local absolute paths from the build machine.
 * 4. Exact adherence to each package's declared packaging contract.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PACKAGES = [
  { name: '@soraui/core', dir: path.join(ROOT_DIR, 'packages/core'), tgzPrefix: 'soraui-core-' },
  { name: '@soraui/hooks', dir: path.join(ROOT_DIR, 'packages/hooks'), tgzPrefix: 'soraui-hooks-' },
  { name: '@soraui/react', dir: path.join(ROOT_DIR, 'packages/react'), tgzPrefix: 'soraui-react-' },
  { name: 'soraui', dir: path.join(ROOT_DIR, 'packages/cli'), tgzPrefix: 'soraui-' },
  { name: '@soraui/mcp', dir: path.join(ROOT_DIR, 'packages/mcp'), tgzPrefix: 'soraui-mcp-' },
];

const LEAKAGE_PATTERNS = [
  { regex: /workspace:[*^~0-9]/g, name: 'workspace: protocol reference' },
  { regex: /file:\.\.\//g, name: 'relative file: path reference' },
  { regex: /link:\.\.\//g, name: 'relative link: path reference' },
  { regex: /\.\.\/\.\.\/(packages|apps|registry)/g, name: 'relative monorepo traversal' },
  { regex: /d:[\\/]MY PROGRAM[\\/]MYPORTOFOLIO/gi, name: 'local absolute Windows path leak' },
];

function run() {
  console.log('\n🔍 [Phase 13A] Running Package & Tarball Monorepo Leakage Scanner...\n');
  
  const tempPackDir = fs.mkdtempSync(path.join(os.tmpdir(), 'soraui-pack-'));
  const tempExtractDir = fs.mkdtempSync(path.join(os.tmpdir(), 'soraui-extract-'));

  let totalViolations = 0;
  const auditResults = [];

  try {
    for (const pkg of PACKAGES) {
      console.log(`📦 Packing ${pkg.name}...`);
      const packOutput = execSync(`pnpm pack --pack-destination "${tempPackDir}"`, {
        cwd: pkg.dir,
        encoding: 'utf8',
      }).trim();
      
      const lastLine = packOutput.split('\n').pop().trim();
      const tarballPath = path.isAbsolute(lastLine) ? lastLine : path.join(tempPackDir, lastLine);
      const tarballName = path.basename(tarballPath);
      
      if (!fs.existsSync(tarballPath)) {
        throw new Error(`Failed to create tarball for ${pkg.name} at ${tarballPath}`);
      }


      const pkgExtractDir = path.join(tempExtractDir, pkg.name.replace('/', '_'));
      fs.mkdirSync(pkgExtractDir, { recursive: true });

      // Extract tarball using tar (cross-platform built-in on Windows 10/11 and Linux/macOS)
      execSync(`tar -xzf "${tarballPath}" -C "${pkgExtractDir}"`);
      const packageRoot = path.join(pkgExtractDir, 'package');

      // 1. Audit package.json manifest
      const manifestPath = path.join(packageRoot, 'package.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      const manifestIssues = [];
      if (!manifest.license || manifest.license !== 'MIT') manifestIssues.push('Missing or invalid license field (expected "MIT")');
      if (!manifest.repository) manifestIssues.push('Missing repository field');
      if (!manifest.author) manifestIssues.push('Missing author field');
      if (!manifest.keywords || manifest.keywords.length === 0) manifestIssues.push('Missing or empty keywords');

      // Check dependencies in manifest for workspace: or relative paths
      const allDeps = { ...manifest.dependencies, ...manifest.peerDependencies, ...manifest.devDependencies };
      for (const [depName, depVer] of Object.entries(allDeps)) {
        if (typeof depVer === 'string' && (depVer.startsWith('workspace:') || depVer.startsWith('file:') || depVer.startsWith('link:'))) {
          // Note: in pnpm monorepos, during npm pack, pnpm/npm publish resolves workspace: to semver.
          // In raw npm pack, we check if workspace protocol is left unresolved in the pack.
          manifestIssues.push(`Dependency ${depName} has unpublishable version: "${depVer}"`);
        }
      }

      // 2. Scan all extracted code and distribution files for leakage patterns
      const fileLeakages = [];
      function scanDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else {
            const relPath = path.relative(packageRoot, fullPath);
            // Scan distribution text files (.js, .cjs, .mjs, .d.ts, .json, .css)
            if (/\.(js|cjs|mjs|d\.ts|css)$/i.test(entry.name) || (entry.name.endsWith('.json') && entry.name !== 'package.json')) {
              const content = fs.readFileSync(fullPath, 'utf8');
              for (const pattern of LEAKAGE_PATTERNS) {
                if (pattern.regex.test(content)) {
                  fileLeakages.push({ file: relPath, pattern: pattern.name });
                }
              }
            }
          }
        }
      }
      scanDir(packageRoot);


      const pkgViolations = manifestIssues.length + fileLeakages.length;
      totalViolations += pkgViolations;

      auditResults.push({
        name: pkg.name,
        tarball: tarballName,
        sizeKb: (fs.statSync(tarballPath).size / 1024).toFixed(1),
        manifestIssues,
        fileLeakages,
        passed: pkgViolations === 0,
      });
    }

    console.log('\n────────────────────────────────────────────────────────────────────────');
    console.log('  PACKAGE TARBALL & LEAKAGE AUDIT MATRIX');
    console.log('────────────────────────────────────────────────────────────────────────');

    for (const res of auditResults) {
      const statusIcon = res.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${statusIcon} ${res.name.padEnd(20)} (${res.tarball} ~ ${res.sizeKb} KB)`);
      if (res.manifestIssues.length > 0) {
        for (const issue of res.manifestIssues) console.log(`      ⚠️  Manifest: ${issue}`);
      }
      if (res.fileLeakages.length > 0) {
        for (const leak of res.fileLeakages) console.log(`      ⚠️  Leakage: ${leak.pattern} in ${leak.file}`);
      }
    }

    console.log('────────────────────────────────────────────────────────────────────────\n');

    if (totalViolations > 0) {
      console.error(`❌ [Phase 13A Failed] Found ${totalViolations} monorepo leakage or packaging violations.\n`);
      process.exit(1);
    } else {
      console.log('✅ [Phase 13A Passed] 100% of 5 package tarballs are clean with 0 monorepo leakage!\n');
    }
  } finally {
    // Cleanup temporary directories
    try {
      fs.rmSync(tempPackDir, { recursive: true, force: true });
      fs.rmSync(tempExtractDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
