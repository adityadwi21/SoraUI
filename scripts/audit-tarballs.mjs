import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

console.log('\n📦 SoraUI Phase 10.5F — Package Tarball & Distribution Audit\n');

const rootDir = process.cwd();
const tempPackDir = path.join(os.tmpdir(), `soraui-tarballs-${Date.now()}`);
fs.mkdirSync(tempPackDir, { recursive: true });

const packages = [
  { name: '@soraui/core', dir: 'packages/core', allowCss: false },
  { name: '@soraui/hooks', dir: 'packages/hooks', allowCss: false },
  { name: '@soraui/react', dir: 'packages/react', allowCss: true },
  { name: '@soraui/cli', dir: 'packages/cli', allowCss: false },

  { name: '@soraui/mcp', dir: 'packages/mcp', allowCss: false },
];

let allPassed = true;

for (const pkg of packages) {
  const pkgDir = path.join(rootDir, pkg.dir);
  console.log(`Auditing tarball for ${pkg.name}...`);

  try {
    // Run pnpm pack
    const packOutput = execSync(`pnpm pack --pack-destination "${tempPackDir}"`, {
      cwd: pkgDir,
      encoding: 'utf8',
    }).trim();

    const lines = packOutput.split('\n');
    const tarballFileName = lines[lines.length - 1].trim();
    const tarballPath = path.isAbsolute(tarballFileName)
      ? tarballFileName
      : path.join(tempPackDir, path.basename(tarballFileName));

    if (!fs.existsSync(tarballPath)) {
      throw new Error(`Tarball not found at ${tarballPath}`);
    }

    // List tarball contents using tar -tf
    const listOutput = execSync(`tar -tf "${tarballPath}"`, { encoding: 'utf8' });
    const files = listOutput.split('\n').map((f) => f.trim()).filter(Boolean);

    console.log(`  ✓ Created tarball: ${path.basename(tarballPath)} (${files.length} files)`);

    // Verify required files
    const hasPkgJson = files.some((f) => f.endsWith('package.json'));
    const hasDist = files.some((f) => f.includes('dist/'));
    const hasReadme = files.some((f) => f.toLowerCase().endsWith('readme.md'));
    const hasLicense = files.some((f) => f.toLowerCase().endsWith('license'));

    if (!hasPkgJson) throw new Error(`Missing package.json in ${pkg.name} tarball`);
    if (!hasDist) throw new Error(`Missing dist/ in ${pkg.name} tarball`);
    if (!hasReadme) throw new Error(`Missing README.md in ${pkg.name} tarball`);
    if (!hasLicense) throw new Error(`Missing LICENSE in ${pkg.name} tarball`);

    // Verify forbidden files
    for (const f of files) {
      if (f.startsWith('package/src/')) {
        throw new Error(`Forbidden file included in ${pkg.name}: ${f} (src/ must not be packaged)`);
      }
      if (f.startsWith('package/tests/')) {
        throw new Error(`Forbidden file included in ${pkg.name}: ${f} (tests/ must not be packaged)`);
      }
      if (f.includes('.env')) {
        throw new Error(`Forbidden .env file in ${pkg.name}: ${f}`);
      }
      if (f.includes('tsconfig')) {
        throw new Error(`Forbidden tsconfig in ${pkg.name}: ${f}`);
      }
    }

    console.log(`  ✓ Contents allowlist verified: dist, README, LICENSE, package.json (no src/ or tests/ leak)`);
  } catch (err) {
    console.error(`  ❌ Error auditing ${pkg.name}:`, err.message);
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('\n❌ Tarball audit failed.');
  process.exit(1);
} else {
  console.log('\n✅ All package tarballs passed contents and hygiene audit!\n');
}
