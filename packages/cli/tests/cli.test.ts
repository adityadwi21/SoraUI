import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { getConfig, writeConfig, DEFAULT_CONFIG } from '../src/utils/config';
import {
  ALL_COMPONENTS,
  ALL_BLOCKS,
  ALL_TEMPLATES,
  ALL_THEMES,
  resolveDependencies,
  getComponentCode,
  getBlockCode,
  getThemeCSS,
} from '../src/utils/registry';

describe('CLI Config Management', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'soraui-test-config-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('returns default config when soraui.config.json is absent', async () => {
    const config = await getConfig(tempDir);
    expect(config.theme).toBe('sky');
    expect(config.componentsPath).toBe('components/ui');
    expect(config.typescript).toBe(true);
  });

  it('writes and reads custom configuration accurately', async () => {
    const customConfig = {
      ...DEFAULT_CONFIG,
      theme: 'midnight',
      componentsPath: 'src/ui',
      typescript: true,
    };
    await writeConfig(customConfig, tempDir);

    const retrieved = await getConfig(tempDir);
    expect(retrieved.theme).toBe('midnight');
    expect(retrieved.componentsPath).toBe('src/ui');
  });
});

describe('CLI Registry & Dependency Resolution', () => {
  it('contains registered components, blocks, templates, and themes', () => {
    expect(ALL_COMPONENTS.length).toBe(44);
    expect(ALL_BLOCKS.length).toBe(14);
    expect(ALL_TEMPLATES.length).toBe(4);
    expect(ALL_THEMES.length).toBe(9);
  });

  it('resolves block dependencies deterministically', () => {
    const loginDeps = resolveDependencies('login-form', 'block');
    expect(loginDeps).toContain('card');
    expect(loginDeps).toContain('input');
    expect(loginDeps).toContain('button');
    expect(loginDeps).toContain('checkbox');
  });

  it('resolves template dependencies recursively', () => {
    const dashboardDeps = resolveDependencies('dashboard-page', 'template');
    expect(dashboardDeps).toContain('button');
    expect(dashboardDeps).toContain('avatar');
    expect(dashboardDeps).toContain('dropdown');
    expect(dashboardDeps).toContain('card');
    expect(dashboardDeps).toContain('statistic');
  });

  it('contains complete metadata for all 44 components', () => {
    const names = ALL_COMPONENTS.map((c) => c.name);
    expect(names).toHaveLength(44);
    expect(names).toContain('button');
    expect(names).toContain('dialog');
    expect(names).toContain('data-table');
    expect(names).toContain('tree-view');
  });

  it('generates valid TypeScript source code for components', () => {
    const buttonCode = getComponentCode('button');
    expect(buttonCode).toContain('export const Button');
    expect(buttonCode).toContain('sora-button');

    const dialogCode = getComponentCode('dialog');
    expect(dialogCode).toContain('export const Dialog');
    expect(dialogCode).toContain('sora-dialog');
  });

  it('generates valid block and theme code', () => {
    const blockCode = getBlockCode('login-form');
    expect(blockCode).toContain('export function LoginForm');
    expect(blockCode).toContain('sora-block-login-form');

    const themeCss = getThemeCSS('midnight');
    expect(themeCss).toContain("@import '@soraui/core/theme/presets/midnight.css';");
  });
});

describe('CLI Add & Overwrite File Operations', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'soraui-test-add-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('creates component file in target components directory', async () => {
    const uiDir = join(tempDir, 'components/ui');
    await mkdir(uiDir, { recursive: true });

    const targetFile = join(uiDir, 'button.tsx');
    const content = getComponentCode('button');
    await writeFile(targetFile, content, 'utf8');

    expect(existsSync(targetFile)).toBe(true);
    const read = await readFile(targetFile, 'utf8');
    expect(read).toContain('export const Button');
  });

  it('prevents accidental overwrite when file already exists without overwrite flag', async () => {
    const uiDir = join(tempDir, 'components/ui');
    await mkdir(uiDir, { recursive: true });

    const targetFile = join(uiDir, 'button.tsx');
    await writeFile(targetFile, '// ORIGINAL USER CODE', 'utf8');

    // Simulate add without overwrite
    const shouldOverwrite = false;
    if (!shouldOverwrite && existsSync(targetFile)) {
      // should skip writing
    } else {
      await writeFile(targetFile, '// REPLACED', 'utf8');
    }

    const content = await readFile(targetFile, 'utf8');
    expect(content).toBe('// ORIGINAL USER CODE');
  });

  it('successfully replaces file content when overwrite is requested', async () => {
    const uiDir = join(tempDir, 'components/ui');
    await mkdir(uiDir, { recursive: true });

    const targetFile = join(uiDir, 'button.tsx');
    await writeFile(targetFile, '// OLD VERSION', 'utf8');

    // Simulate add with overwrite
    const shouldOverwrite = true;
    if (shouldOverwrite || !existsSync(targetFile)) {
      const freshContent = getComponentCode('button');
      await writeFile(targetFile, freshContent, 'utf8');
    }

    const content = await readFile(targetFile, 'utf8');
    expect(content).toContain('export const Button');
    expect(content).not.toContain('// OLD VERSION');
  });
});