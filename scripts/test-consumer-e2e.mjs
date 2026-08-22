import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

console.log('\n🚀 SoraUI Phase 10.5G — Fresh Consumer E2E Isolation & Tree-Shaking Test\n');

const rootDir = process.cwd();
const tempBase = path.join(os.tmpdir(), `soraui-consumer-e2e-${Date.now()}`);
const tarballDir = path.join(tempBase, 'tarballs');
const consumerDir = path.join(tempBase, 'fresh-app');

fs.mkdirSync(tarballDir, { recursive: true });
fs.mkdirSync(consumerDir, { recursive: true });

try {
  console.log('1. Packing packages into standalone .tgz tarballs...');

  const packPkg = (dir) => {
    const output = execSync(`pnpm pack --pack-destination "${tarballDir}"`, {
      cwd: path.join(rootDir, dir),
      encoding: 'utf8',
    }).trim();
    const lines = output.split('\n');
    return path.join(tarballDir, path.basename(lines[lines.length - 1].trim()));
  };

  const coreTarball = packPkg('packages/core');
  const hooksTarball = packPkg('packages/hooks');
  const reactTarball = packPkg('packages/react');
  const cliTarball = packPkg('packages/cli');

  console.log('  ✓ Packed Core:', path.basename(coreTarball));
  console.log('  ✓ Packed Hooks:', path.basename(hooksTarball));
  console.log('  ✓ Packed React:', path.basename(reactTarball));
  console.log('  ✓ Packed CLI:', path.basename(cliTarball));

  console.log('\n2. Scaffolding isolated consumer application outside monorepo...');

  // Consumer package.json referencing ONLY the packed .tgz files
  const consumerPackageJson = {
    name: 'fresh-soraui-consumer',
    version: '1.0.0',
    type: 'module',
    scripts: {
      build: 'vite build',
    },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      '@soraui/core': `file:${coreTarball.replace(/\\/g, '/')}`,
      '@soraui/hooks': `file:${hooksTarball.replace(/\\/g, '/')}`,
      '@soraui/react': `file:${reactTarball.replace(/\\/g, '/')}`,
      soraui: `file:${cliTarball.replace(/\\/g, '/')}`,
    },
    pnpm: {
      overrides: {
        '@soraui/core': `file:${coreTarball.replace(/\\/g, '/')}`,
        '@soraui/hooks': `file:${hooksTarball.replace(/\\/g, '/')}`,
        '@soraui/react': `file:${reactTarball.replace(/\\/g, '/')}`,
        soraui: `file:${cliTarball.replace(/\\/g, '/')}`,
      },
    },
    devDependencies: {
      '@types/react': '^18.3.3',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.1',
      typescript: '^5.5.4',
      vite: '^5.4.2',
    },
  };

  fs.writeFileSync(
    path.join(consumerDir, 'package.json'),
    JSON.stringify(consumerPackageJson, null, 2),
    'utf8'
  );

  fs.writeFileSync(
    path.join(consumerDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
        },
        include: ['src'],
      },
      null,
      2
    ),
    'utf8'
  );

  fs.writeFileSync(
    path.join(consumerDir, 'vite.config.ts'),
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(consumerDir, 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SoraUI Consumer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'utf8'
  );

  fs.mkdirSync(path.join(consumerDir, 'src'), { recursive: true });

  fs.writeFileSync(
    path.join(consumerDir, 'src/main.tsx'),
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Badge,
  ThemeProvider,
  ThemeScope,
  LoginForm,
} from '@soraui/react';
import '@soraui/react/styles';
import '@soraui/core/theme/presets/midnight.css';

function App() {
  return (
    <ThemeProvider defaultTheme="sky">
      <div style={{ padding: '2rem' }}>
        <Badge variant="primary">Consumer Test App</Badge>
        <Card>
          <CardHeader>
            <CardTitle>SoraUI Fresh Consumer Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter consumer data..." />
            <Button variant="primary" style={{ marginTop: '1rem' }}>
              Submit
            </Button>
          </CardContent>
        </Card>

        {/* Subtree Theme Scope test */}
        <ThemeScope theme="midnight">
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--ui-background)', color: 'var(--ui-foreground)' }}>
            <h3>Midnight Subtree</h3>
            <LoginForm onSubmit={(data) => console.log(data)} />
          </div>
        </ThemeScope>
      </div>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
    'utf8'
  );

  console.log('\n3. Installing dependencies in fresh consumer app via pnpm...');
  execSync('pnpm install --no-frozen-lockfile', {
    cwd: consumerDir,
    stdio: 'inherit',
  });

  console.log('\n4. Building fresh consumer app with Vite...');
  execSync('pnpm run build', {
    cwd: consumerDir,
    stdio: 'inherit',
  });

  const distDir = path.join(consumerDir, 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Vite build dist/ folder was not generated');
  }

  const distFiles = fs.readdirSync(distDir);
  console.log('  ✓ Production build output generated:', distFiles.join(', '));

  console.log('\n5. Testing Tree-Shaking isolation in minimal consumer entry...');
  fs.writeFileSync(
    path.join(consumerDir, 'src/button-only.tsx'),
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@soraui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Button variant="primary">Minimal Button Only</Button>
);
`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(consumerDir, 'index-minimal.html'),
    `<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
    <script type="module" src="/src/button-only.tsx"></script>
  </body>
</html>
`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(consumerDir, 'vite.config.minimal.ts'),
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-minimal',
    rollupOptions: {
      input: 'index-minimal.html',
    },
  },
});
`,
    'utf8'
  );

  execSync('npx vite build --config vite.config.minimal.ts', {
    cwd: consumerDir,
    stdio: 'inherit',
  });

  const minimalAssetsDir = path.join(consumerDir, 'dist-minimal/assets');
  const assetFiles = fs.readdirSync(minimalAssetsDir);
  const jsBundle = assetFiles.find((f) => f.endsWith('.js'));
  const jsBundleContent = fs.readFileSync(path.join(minimalAssetsDir, jsBundle), 'utf8');

  console.log('  ✓ Minimal Button-only bundle size:', (jsBundleContent.length / 1024).toFixed(2), 'KB');

  // Assert tree-shaking: heavy components must NOT be present
  const forbiddenHeavyStrings = [
    'sora-calendar',
    'sora-data-table',
    'sora-command-palette',
    'sora-date-picker',
    'LoginPageTemplate',
    'DashboardPageTemplate',
    'SaaSLandingPageTemplate',
  ];

  for (const str of forbiddenHeavyStrings) {
    if (jsBundleContent.includes(str)) {
      throw new Error(`Tree-shaking failure: Minimal Button bundle contains heavy token "${str}"`);
    }
  }

  console.log('  ✓ Tree-shaking contract verified: 0 heavy components leaked into minimal bundle!');

  console.log('\n✅ Phase 10.5G — Fresh Consumer E2E Simulation 100% Succeeded!\n');
} catch (err) {
  console.error('\n❌ Fresh Consumer E2E Test Failed:', err.message);
  process.exit(1);
} finally {
  // Cleanup temp directory
  try {
    fs.rmSync(tempBase, { recursive: true, force: true });
  } catch (e) {}
}
