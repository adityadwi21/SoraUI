import { defineConfig } from 'tsup';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts', 'src/tokens/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  minify: false,
  async onSuccess() {
    // Copy all theme presets to dist
    const srcPresetsDir = 'src/theme/presets';
    const destPresetsDir = 'dist/theme/presets';
    await mkdir(destPresetsDir, { recursive: true });

    if (existsSync(srcPresetsDir)) {
      const files = await readdir(srcPresetsDir);
      for (const file of files) {
        if (file.endsWith('.css')) {
          await copyFile(join(srcPresetsDir, file), join(destPresetsDir, file));
        }
      }
    }

    // Copy primitives.css and any other root theme CSS
    const primitivesSrc = 'src/theme/primitives.css';
    if (existsSync(primitivesSrc)) {
      await copyFile(primitivesSrc, 'dist/theme/primitives.css');
    }
  },
});