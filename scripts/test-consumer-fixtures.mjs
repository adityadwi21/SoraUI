/**
 * Phase 13D & 13B — Real Consumer Validation Fixtures & Browser Runtime Smoke Test
 *
 * Validates full consumer lifecycle across Next.js, Vite SPA, and AI-generated apps:
 * 1. Installs from freshly packed .tgz tarballs in isolated environments outside monorepo.
 * 2. Runs typecheck & production build.
 * 3. Starts production servers on dynamic ports.
 * 4. Executes Playwright browser smoke tests asserting:
 *    - HTML renders properly.
 *    - Interactive elements (tabs, dialogs, forms, theme switch) work.
 *    - 0 console.error
 *    - 0 pageerror
 *    - 0 unhandled exceptions.
 */
import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import net from 'net';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PACKAGES = [
  { name: '@soraui/core', dir: path.join(ROOT_DIR, 'packages/core') },
  { name: '@soraui/hooks', dir: path.join(ROOT_DIR, 'packages/hooks') },
  { name: '@soraui/react', dir: path.join(ROOT_DIR, 'packages/react') },
  { name: '@soraui/cli', dir: path.join(ROOT_DIR, 'packages/cli') },
  { name: '@soraui/mcp', dir: path.join(ROOT_DIR, 'packages/mcp') },
];


const FIXTURES = [
  {
    name: 'examples/nextjs-app',
    title: 'Next.js App Router (SSR & Hydration)',
    dir: path.join(ROOT_DIR, 'examples/nextjs-app'),
    startCommand: ['pnpm', 'exec', 'next', 'start', '-p'],
    isNext: true,
  },
  {
    name: 'examples/vite-react-app',
    title: 'Vite React SPA (Tree-Shaking & Client Runtime)',
    dir: path.join(ROOT_DIR, 'examples/vite-react-app'),
    startCommand: ['pnpm', 'exec', 'vite', 'preview', '--port'],
    isNext: false,
  },
  {
    name: 'examples/ai-generated-app',
    title: 'AI/MCP Recipe Composed App',
    dir: path.join(ROOT_DIR, 'examples/ai-generated-app'),
    startCommand: ['pnpm', 'exec', 'vite', 'preview', '--port'],
    isNext: false,
  },
];


async function getAvailablePort() {
  return new Promise((resolve, reject) => {
    // Generate port in safe high range 31000 - 39000
    const candidatePort = 31000 + Math.floor(Math.random() * 8000);
    const srv = net.createServer();
    srv.listen(candidatePort, '127.0.0.1', () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', () => {
      // Retry once if collision
      getAvailablePort().then(resolve).catch(reject);
    });
  });
}


async function waitForHttp(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await new Promise((resolve) => {
        const req = http.get(url, (res) => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
        req.on('error', () => resolve(false));
        req.setTimeout(1500, () => {
          req.destroy();
          resolve(false);
        });
      });
      if (res) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout waiting for HTTP server at ${url}`);
}

function copyDirSync(src, dest) {

  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') {
      continue;
    }
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function run() {
  console.log('\n🚀 [Phase 13D] Running Real Consumer Validation Fixtures & Browser Smoke...\n');

  const tempPackDir = fs.mkdtempSync(path.join(os.tmpdir(), 'soraui-fixtures-pack-'));
  const tempFixturesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'soraui-fixtures-run-'));

  const results = [];
  let browser = null;

  try {
    // 1. Pack all 5 packages to .tgz
    console.log('📦 Packing all SoraUI packages to .tgz archives...');
    const tarballPaths = {};
    for (const pkg of PACKAGES) {
      const packOutput = execSync(`pnpm pack --pack-destination "${tempPackDir}"`, {
        cwd: pkg.dir,
        encoding: 'utf8',
      }).trim();
      const lastLine = packOutput.split('\n').pop().trim();
      tarballPaths[pkg.name] = path.isAbsolute(lastLine) ? lastLine : path.join(tempPackDir, lastLine);
    }

    browser = await chromium.launch({ headless: true });

    // 2. Test each fixture
    for (const fixture of FIXTURES) {
      console.log(`\n────────────────────────────────────────────────────────────────────────`);
      console.log(`  Validating Fixture: ${fixture.title}`);
      console.log(`────────────────────────────────────────────────────────────────────────`);

      const targetDir = path.join(tempFixturesDir, path.basename(fixture.dir));
      copyDirSync(fixture.dir, targetDir);

      // Rewrite package.json to point to local tarballs
      const pkgJsonPath = path.join(targetDir, 'package.json');
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      pkgJson.dependencies['@soraui/core'] = `file:${tarballPaths['@soraui/core']}`;
      pkgJson.dependencies['@soraui/hooks'] = `file:${tarballPaths['@soraui/hooks']}`;
      pkgJson.dependencies['@soraui/react'] = `file:${tarballPaths['@soraui/react']}`;
      pkgJson.pnpm = {
        overrides: {
          '@soraui/core': `file:${tarballPaths['@soraui/core']}`,
          '@soraui/hooks': `file:${tarballPaths['@soraui/hooks']}`,
        },
      };
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2), 'utf8');

      // A. Install
      console.log('  1/5 📥 Installing dependencies from .tgz tarballs...');
      execSync('pnpm install --no-frozen-lockfile --ignore-workspace', {
        cwd: targetDir,
        stdio: 'inherit',
      });

      // B. Typecheck
      console.log('  2/5 🔎 Running TypeScript typecheck...');
      try {
        execSync('pnpm run typecheck', {
          cwd: targetDir,
          stdio: 'inherit',
        });
      } catch (err) {
        console.error(`Typecheck failed in ${fixture.name}`);
        throw err;
      }

      // C. Build
      console.log('  3/5 🏗️  Running production build...');
      try {
        execSync('pnpm run build', {
          cwd: targetDir,
          stdio: 'inherit',
        });
      } catch (err) {
        console.error(`Build failed in ${fixture.name}`);
        throw err;
      }


      // D. Start production server
      const port = await getAvailablePort();
      console.log(`  4/5 🌐 Starting production server on port ${port}...`);

      const cmd = fixture.isNext
        ? `npx next start -p ${port} -H 127.0.0.1`
        : `npx vite preview --port ${port} --host 127.0.0.1 --strictPort`;

      const serverProc = spawn(cmd, {
        cwd: targetDir,
        shell: true,
        stdio: 'pipe',
      });

      let serverLogs = '';
      serverProc.stdout?.on('data', (d) => { serverLogs += d.toString(); });
      serverProc.stderr?.on('data', (d) => { serverLogs += d.toString(); });

      const serverUrl = `http://127.0.0.1:${port}`;
      let serverError = null;

      try {
        await waitForHttp(serverUrl, 30000);
        console.log(`      ✓ Server is responding at ${serverUrl}`);


        // E. Browser Smoke Test
        console.log('  5/5 🎭 Executing Playwright browser smoke test...');
        const page = await browser.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        page.on('pageerror', (err) => {
          pageErrors.push(err.message);
        });

        await page.goto(serverUrl, { waitUntil: 'networkidle' });

        // Specific interactions per fixture
        if (fixture.isNext) {
          // Verify root heading and badge
          await page.waitForSelector('h1');
          await page.waitForSelector('#system-badge');
          // Click dialog trigger
          await page.click('#open-dialog-btn');
          await page.waitForSelector('#modal-title');
          // Click dialog close
          await page.click('#close-dialog-btn');
          // Click theme toggle
          await page.click('#theme-toggle-btn');
        } else if (fixture.name.includes('vite-react-app')) {
          // Verify title
          await page.waitForSelector('#app-title');
          // Switch tabs
          await page.click('#tab-trigger-settings');
          await page.waitForSelector('#tab-content-settings');
          // Switch theme
          await page.click('#toggle-theme-btn');
        } else if (fixture.name.includes('ai-generated-app')) {
          // Verify badge
          await page.waitForSelector('#ai-status-badge');
          // Fill login form
          await page.fill('#user-email', 'tester@soraui.dev');
          await page.locator('label[for="remember-me"]').click();
          await page.click('#submit-auth-btn');
          await page.waitForSelector('#auth-success-msg');
        }



        await page.close();

        // Evaluate errors (filter benign favicon or browser extension noise if any)
        const relevantConsoleErrors = consoleErrors.filter(
          (err) => !err.includes('favicon') && !err.includes('Failed to load resource: net::ERR_CONNECTION_REFUSED')
        );

        const passed = relevantConsoleErrors.length === 0 && pageErrors.length === 0;

        results.push({
          name: fixture.name,
          title: fixture.title,
          typecheck: true,
          build: true,
          serverStarted: true,
          consoleErrors: relevantConsoleErrors,
          pageErrors,
          passed,
        });

        if (passed) {
          console.log(`  ✅ ${fixture.title}: PASSED (0 console errors, 0 page errors)`);
        } else {
          console.error(`  ❌ ${fixture.title}: FAILED with errors:`, {
            consoleErrors: relevantConsoleErrors,
            pageErrors,
          });
        }
      } catch (err) {
        serverError = err;
        results.push({
          name: fixture.name,
          title: fixture.title,
          typecheck: true,
          build: true,
          serverStarted: false,
          error: err.message,
          passed: false,
        });
        console.error(`  ❌ ${fixture.title} server execution failed:`, err.message);
        if (serverLogs) {
          console.error(`     Server output was:\n${serverLogs.trim()}`);
        }
      } finally {

        // Kill the server process and tree
        if (serverProc && serverProc.pid) {
          try {
            if (process.platform === 'win32') {
              execSync(`taskkill /pid ${serverProc.pid} /T /F`, { stdio: 'ignore' });
            } else {
              serverProc.kill('SIGTERM');
            }
          } catch {}
        }
      }
    }

    console.log('\n────────────────────────────────────────────────────────────────────────');
    console.log('  REAL CONSUMER VALIDATION SUMMARY');
    console.log('────────────────────────────────────────────────────────────────────────');
    for (const r of results) {
      const icon = r.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${icon} ${r.title.padEnd(50)} [Install ➔ Build ➔ Runtime Smoke]`);
    }
    console.log('────────────────────────────────────────────────────────────────────────\n');

    const totalFailed = results.filter((r) => !r.passed).length;
    if (totalFailed > 0) {
      console.error(`❌ [Phase 13D Failed] ${totalFailed} consumer fixtures failed verification.\n`);
      process.exit(1);
    } else {
      console.log('✅ [Phase 13D Passed] All 3 consumer fixtures verified end-to-end with 0 runtime errors!\n');
    }
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    try {
      fs.rmSync(tempPackDir, { recursive: true, force: true });
      fs.rmSync(tempFixturesDir, { recursive: true, force: true });
    } catch {}
  }
}

run().catch((err) => {
  console.error('Fatal error in consumer fixture test:', err);
  process.exit(1);
});
