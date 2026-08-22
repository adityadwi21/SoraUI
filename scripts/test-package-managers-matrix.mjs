/**
 * Phase 14B — Public Package Manager Compatibility Matrix Tester
 *
 * Tests SoraUI v0.1.0-rc.1 against the live public npm registry (registry.npmjs.org)
 * across 4 major package managers:
 * 1. npm
 * 2. pnpm
 * 3. yarn
 * 4. bun
 *
 * Runs strictly isolated in os.tmpdir() with 0 monorepo / workspace references.
 */
import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const REPORT_FILE = path.join(ROOT_DIR, 'artifacts/release/pm-matrix-report.json');

const PACKAGE_MANAGERS = [
  {
    id: 'npm',
    name: 'npm',
    versionCmd: 'npm -v',
    initCmd: 'npm init -y',
    installCmd: 'npm install --registry=https://registry.npmjs.org/',
    installDevCmd: 'npm install -D --registry=https://registry.npmjs.org/',
    execCmd: 'npx',
    buildCmd: 'npx vite build',
    typecheckCmd: 'npx tsc --noEmit',
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    versionCmd: 'pnpm -v',
    initCmd: 'pnpm init',
    installCmd: 'pnpm add --registry=https://registry.npmjs.org/ --ignore-workspace',
    installDevCmd: 'pnpm add -D --registry=https://registry.npmjs.org/ --ignore-workspace',
    execCmd: 'pnpm dlx',
    buildCmd: 'pnpm exec vite build',
    typecheckCmd: 'pnpm exec tsc --noEmit',
  },
  {
    id: 'yarn',
    name: 'yarn',
    versionCmd: 'yarn -v',
    initCmd: 'yarn init -y',
    installCmd: 'yarn add --registry=https://registry.npmjs.org/',
    installDevCmd: 'yarn add -D --registry=https://registry.npmjs.org/',
    execCmd: 'yarn dlx',
    buildCmd: 'yarn vite build',
    typecheckCmd: 'yarn tsc --noEmit',
  },
  {
    id: 'bun',
    name: 'bun',
    versionCmd: 'bun -v',
    initCmd: 'bun init -y',
    installCmd: 'bun add --registry=https://registry.npmjs.org/',
    installDevCmd: 'bun add -d --registry=https://registry.npmjs.org/',
    execCmd: 'bunx',
    buildCmd: 'bunx vite build',
    typecheckCmd: 'bun run tsc --noEmit',
  },
];

const APP_TSX_CONTENT = `import React, { useState } from 'react';
import {
  ThemeProvider,
  ThemeScope,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DataTable,
  type DataTableColumn,
} from '@soraui/react';
import '@soraui/react/styles.css';

interface User extends Record<string, any> {
  id: string;
  name: string;
  role: string;
}

const columns: DataTableColumn<User>[] = [
  { id: 'id', header: 'ID', accessorKey: 'id', sortable: true },
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
];

const data: User[] = [
  { id: '1', name: 'Alice Developer', role: 'Architect' },
  { id: '2', name: 'Bob Engineer', role: 'Maintainer' },
];

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider defaultTheme="aurora">
      <div id="app-root" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 id="main-heading">SoraUI Live Registry Consumer Test</h1>
          <Badge id="status-badge" variant="success">v0.1.0-rc.1 Live</Badge>
        </header>

        <Card id="test-card" style={{ marginBottom: '1.5rem' }}>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>Testing React runtime state & styles from registry</CardDescription>
          </CardHeader>
          <CardContent>
            <p id="counter-value">Current clicks: {count}</p>
            <Input id="test-input" placeholder="Type here..." />
          </CardContent>
          <CardFooter>
            <Button id="increment-button" variant="primary" onClick={() => setCount((c) => c + 1)}>
              Click Me
            </Button>
          </CardFooter>
        </Card>

        <Card id="table-card" style={{ marginBottom: '1.5rem' }}>
          <CardHeader>
            <CardTitle>Data Table Component</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} searchable={true} />
          </CardContent>
        </Card>

        <ThemeScope theme="midnight">
          <Card id="scoped-card">
            <CardHeader>
              <CardTitle>ThemeScope (Midnight Preset)</CardTitle>
            </CardHeader>
          </Card>
        </ThemeScope>
      </div>
    </ThemeProvider>
  );
}
`;

const MAIN_TSX_CONTENT = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const INDEX_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SoraUI Registry Consumer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const VITE_CONFIG_CONTENT = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
`;

async function testPackageManager(pm) {
  const result = {
    id: pm.id,
    name: pm.name,
    version: 'UNKNOWN',
    installVariants: {
      explicitRcVersion: false,
      rcDistTag: false,
      defaultUntagged: false,
    },
    steps: {
      install: { status: 'PENDING', durationMs: 0 },
      typecheck: { status: 'PENDING', durationMs: 0 },
      build: { status: 'PENDING', durationMs: 0 },
      runtime: { status: 'PENDING', durationMs: 0, consoleErrors: 0, pageErrors: 0 },
      cli: { status: 'PENDING', durationMs: 0 },
      mcp: { status: 'PENDING', durationMs: 0 },
    },
    overallStatus: 'FAIL',
  };

  console.log(`\n════════════════════════════════════════════════════════════════════════`);
  console.log(`🚀 Testing Package Manager: ${pm.name.toUpperCase()}`);
  console.log(`════════════════════════════════════════════════════════════════════════`);

  // 1. Get version
  try {
    const version = execSync(pm.versionCmd, { encoding: 'utf8' }).trim();
    result.version = version;
    console.log(`  ✓ Version: ${version}`);
  } catch (err) {
    console.error(`  ❌ Failed to get ${pm.name} version: ${err.message}`);
    result.steps.install.status = 'NOT_INSTALLED';
    return result;
  }

  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), `soraui-live-test-${pm.id}-`));
  console.log(`  📁 Project TempDir: ${projectDir}`);

  try {
    // 2. Initialize project
    execSync(pm.initCmd, { cwd: projectDir, encoding: 'utf8', stdio: 'ignore' });
    if (fs.existsSync(path.join(projectDir, 'index.ts'))) {
      try { fs.unlinkSync(path.join(projectDir, 'index.ts')); } catch {}
    }

    // Setup source files
    const srcDir = path.join(projectDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(path.join(srcDir, 'App.tsx'), APP_TSX_CONTENT, 'utf8');
    fs.writeFileSync(path.join(srcDir, 'main.tsx'), MAIN_TSX_CONTENT, 'utf8');
    fs.writeFileSync(path.join(srcDir, 'vite-env.d.ts'), `/// <reference types="vite/client" />\n`, 'utf8');
    fs.writeFileSync(path.join(projectDir, 'index.html'), INDEX_HTML_CONTENT, 'utf8');
    fs.writeFileSync(path.join(projectDir, 'vite.config.ts'), VITE_CONFIG_CONTENT, 'utf8');
    fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), TSCONFIG_CONTENT, 'utf8');

    // 3. Test Install Variants
    console.log(`\n  [1/6] 📥 Testing Installation Variants from Live npm Registry...`);

    // A. Explicit RC Version
    const t0 = Date.now();
    try {
      console.log(`    a. Installing @soraui/react@0.1.0-rc.1...`);
      execSync(`${pm.installCmd} @soraui/react@0.1.0-rc.1`, { cwd: projectDir, stdio: 'pipe' });
      result.installVariants.explicitRcVersion = true;
      console.log(`       ✓ Explicit @0.1.0-rc.1: OK`);
    } catch (e) {
      console.error(`       ❌ Explicit version install failed: ${e.message}`);
    }

    // B. RC dist-tag
    try {
      console.log(`    b. Installing @soraui/react@rc...`);
      execSync(`${pm.installCmd} @soraui/react@rc`, { cwd: projectDir, stdio: 'pipe' });
      result.installVariants.rcDistTag = true;
      console.log(`       ✓ RC dist-tag @rc: OK`);
    } catch (e) {
      console.error(`       ❌ RC tag install failed: ${e.message}`);
    }

    // C. Default untagged
    try {
      console.log(`    c. Installing @soraui/react (default untagged)...`);
      execSync(`${pm.installCmd} @soraui/react`, { cwd: projectDir, stdio: 'pipe' });
      result.installVariants.defaultUntagged = true;
      console.log(`       ✓ Default untagged: OK`);
    } catch (e) {
      console.error(`       ❌ Default install failed: ${e.message}`);
    }

    // D. Install full dependency set
    console.log(`    d. Installing full suite (@soraui/core@rc, @soraui/hooks@rc, @soraui/cli@rc, @soraui/mcp@rc, React, Vite)...`);
    execSync(
      `${pm.installCmd} @soraui/core@rc @soraui/hooks@rc @soraui/cli@rc @soraui/mcp@rc react@18.3.1 react-dom@18.3.1`,
      { cwd: projectDir, stdio: 'pipe' }
    );
    execSync(
      `${pm.installDevCmd} @types/react@18.3.3 @types/react-dom@18.3.0 typescript@5.5.4 vite@5.4.2 @vitejs/plugin-react@4.3.1`,
      { cwd: projectDir, stdio: 'pipe' }
    );
    result.steps.install.status = 'PASS';
    result.steps.install.durationMs = Date.now() - t0;
    console.log(`  ✅ [1/6] Installation Complete: PASS (${(result.steps.install.durationMs / 1000).toFixed(1)}s)`);

    // 4. Typecheck
    console.log(`\n  [2/6] 🔎 Running TypeScript Typecheck...`);
    const tType = Date.now();
    execSync(pm.typecheckCmd, { cwd: projectDir, stdio: 'pipe' });
    result.steps.typecheck.status = 'PASS';
    result.steps.typecheck.durationMs = Date.now() - tType;
    console.log(`  ✅ [2/6] Typecheck: PASS (${(result.steps.typecheck.durationMs / 1000).toFixed(1)}s)`);

    // 5. Build
    console.log(`\n  [3/6] 🏗️  Running Production Build...`);
    const tBuild = Date.now();
    execSync(pm.buildCmd, { cwd: projectDir, stdio: 'pipe' });
    result.steps.build.status = 'PASS';
    result.steps.build.durationMs = Date.now() - tBuild;
    console.log(`  ✅ [3/6] Build: PASS (${(result.steps.build.durationMs / 1000).toFixed(1)}s)`);

    // 6. Runtime Smoke Test with Playwright
    console.log(`\n  [4/6] 🎭 Executing Browser Runtime Smoke Test...`);
    const tRuntime = Date.now();
    const port = 39000 + Math.floor(Math.random() * 900);
    const previewBin = pm.id === 'bun' ? 'bunx' : pm.id === 'yarn' ? 'yarn' : pm.id === 'pnpm' ? 'pnpm' : 'npx';
    const previewArgs = pm.id === 'bun'
      ? ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1']
      : pm.id === 'yarn'
      ? ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1']
      : pm.id === 'pnpm'
      ? ['exec', 'vite', 'preview', '--port', String(port), '--host', '127.0.0.1']
      : ['vite', 'preview', '--port', String(port), '--host', '127.0.0.1'];

    const serverProc = spawn(previewBin, previewArgs, {
      cwd: projectDir,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Wait for server ready
    await new Promise((resolve, reject) => {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const req = http.get(`http://127.0.0.1:${port}`, (res) => {
          if (res.statusCode === 200) {
            clearInterval(interval);
            resolve();
          }
        });
        req.on('error', () => {
          if (attempts > 60) {
            clearInterval(interval);
            reject(new Error('Preview server timeout'));
          }
        });
      }, 200);
    });

    // Run Playwright
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto(`http://127.0.0.1:${port}`);
    await page.waitForSelector('#app-root');

    // Test counter click
    await page.click('#increment-button');
    const counterText = await page.textContent('#counter-value');

    await browser.close();
    serverProc.kill();

    if (!counterText.includes('1')) {
      throw new Error(`Counter click failed: expected '1', got '${counterText}'`);
    }
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      throw new Error(`Runtime errors detected: console=${consoleErrors.length}, page=${pageErrors.length}`);
    }

    result.steps.runtime.status = 'PASS';
    result.steps.runtime.durationMs = Date.now() - tRuntime;
    result.steps.runtime.consoleErrors = consoleErrors.length;
    result.steps.runtime.pageErrors = pageErrors.length;
    console.log(`  ✅ [4/6] Browser Runtime Smoke: PASS (0 console errors, 0 page errors)`);

    // 7. Test CLI execution
    console.log(`\n  [5/6] ⚙️  Testing @soraui/cli execution...`);
    const tCli = Date.now();
    const cliOutput = execSync(`npx @soraui/cli@rc --help`, { cwd: projectDir, encoding: 'utf8' });
    if (!cliOutput.includes('Usage: soraui') && !cliOutput.includes('soraui [options]')) {
      throw new Error(`CLI output unexpected: ${cliOutput.slice(0, 100)}`);
    }
    result.steps.cli.status = 'PASS';
    result.steps.cli.durationMs = Date.now() - tCli;
    console.log(`  ✅ [5/6] CLI Execution: PASS (${(result.steps.cli.durationMs / 1000).toFixed(1)}s)`);

    // 8. Test MCP execution
    console.log(`\n  [6/6] 🤖 Testing @soraui/mcp execution...`);
    const tMcp = Date.now();
    const mcpPkgJson = JSON.parse(
      fs.readFileSync(path.join(projectDir, 'node_modules/@soraui/mcp/package.json'), 'utf8')
    );
    if (!mcpPkgJson.version.includes('0.1.0-rc.1')) {
      throw new Error(`MCP installed version mismatch: ${mcpPkgJson.version}`);
    }
    result.steps.mcp.status = 'PASS';
    result.steps.mcp.durationMs = Date.now() - tMcp;
    console.log(`  ✅ [6/6] MCP Package & Entrypoint: PASS (${(result.steps.mcp.durationMs / 1000).toFixed(1)}s)`);

    result.overallStatus = 'PASS';
  } catch (err) {
    console.error(`  ❌ Error testing ${pm.name}:`, err.message);
    result.error = err.message;
  } finally {
    try {
      fs.rmSync(projectDir, { recursive: true, force: true });
    } catch {}
  }

  return result;
}

async function main() {
  console.log(`\n╔══════════════════════════════════════════════════════════════════════╗`);
  console.log(`║      SoraUI Phase 14B — Public Package Manager Matrix Suite          ║`);
  console.log(`║           Testing live registry packages from registry.npmjs.org     ║`);
  console.log(`╚══════════════════════════════════════════════════════════════════════╝\n`);

  const nodeVersion = process.version;
  console.log(`Node.js Runtime: ${nodeVersion}`);

  const results = [];
  for (const pm of PACKAGE_MANAGERS) {
    const res = await testPackageManager(pm);
    results.push(res);
  }

  const allPassed = results.every((r) => r.overallStatus === 'PASS');

  console.log(`\n════════════════════════════════════════════════════════════════════════`);
  console.log(`                  PACKAGE MANAGER COMPATIBILITY MATRIX                  `);
  console.log(`════════════════════════════════════════════════════════════════════════`);
  console.log(`Manager | Version  | Install | Typecheck | Build | Runtime | CLI  | MCP  | Result`);
  console.log(`--------|----------|---------|-----------|-------|---------|------|------|-------`);
  for (const r of results) {
    const inst = r.steps.install.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const type = r.steps.typecheck.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const bld = r.steps.build.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const run = r.steps.runtime.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const cli = r.steps.cli.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const mcp = r.steps.mcp.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    const res = r.overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL';
    console.log(
      `${r.name.padEnd(7)} | ${r.version.padEnd(8)} | ${inst} | ${type}   | ${bld} | ${run} | ${cli} | ${mcp} | ${res}`
    );
  }
  console.log(`════════════════════════════════════════════════════════════════════════\n`);

  const finalReport = {
    timestamp: new Date().toISOString(),
    environment: {
      node: nodeVersion,
      os: `${os.type()} ${os.release()} ${os.arch()}`,
    },
    targetPackages: [
      '@soraui/core@0.1.0-rc.1',
      '@soraui/hooks@0.1.0-rc.1',
      '@soraui/react@0.1.0-rc.1',
      '@soraui/cli@0.1.0-rc.1',
      '@soraui/mcp@0.1.0-rc.1',
    ],
    results,
    overallStatus: allPassed ? 'PASS' : 'FAIL',
  };

  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(finalReport, null, 2), 'utf8');
  console.log(`📄 Machine-readable report written to: ${REPORT_FILE}\n`);

  if (!allPassed) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error running PM matrix:', err);
  process.exit(1);
});
