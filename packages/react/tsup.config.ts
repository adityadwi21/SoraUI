/// <reference types="node" />
import { defineConfig } from 'tsup';
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/button/button.tsx',
    'src/components/input/input.tsx',
    'src/components/label/label.tsx',
    'src/components/card/card.tsx',
    'src/components/badge/badge.tsx',
    'src/components/textarea/textarea.tsx',
    'src/components/separator/separator.tsx',
    'src/components/skeleton/skeleton.tsx',
    'src/components/typography/typography.tsx',
    'src/components/tooltip/tooltip.tsx',
    'src/components/popover/popover.tsx',
    'src/components/tabs/tabs.tsx',
    'src/components/accordion/accordion.tsx',
    'src/components/dialog/dialog.tsx',
    'src/components/dropdown/dropdown.tsx',
    'src/components/select/select.tsx',
    'src/components/toast/toast.tsx',
    'src/components/calendar/calendar.tsx',
    'src/components/date-picker/date-picker.tsx',
    'src/components/combobox/combobox.tsx',
    'src/components/file-uploader/file-uploader.tsx',
    'src/components/data-table/data-table.tsx',
    'src/components/checkbox/checkbox.tsx',
    'src/components/radio-group/radio-group.tsx',
    'src/components/switch/switch.tsx',
    'src/components/slider/slider.tsx',
    'src/components/input-otp/input-otp.tsx',
    'src/components/number-input/number-input.tsx',
    'src/components/breadcrumb/breadcrumb.tsx',
    'src/components/navigation-menu/navigation-menu.tsx',
    'src/components/menubar/menubar.tsx',
    'src/components/pagination/pagination.tsx',
    'src/components/stepper/stepper.tsx',
    'src/components/command-palette/command-palette.tsx',
    'src/components/alert-dialog/alert-dialog.tsx',
    'src/components/drawer/drawer.tsx',
    'src/components/hover-card/hover-card.tsx',
    'src/components/context-menu/context-menu.tsx',
    'src/components/progress/progress.tsx',
    'src/components/avatar/avatar.tsx',
    'src/components/collapsible/collapsible.tsx',
    'src/components/timeline/timeline.tsx',
    'src/components/statistic/statistic.tsx',
    'src/components/tree-view/tree-view.tsx',
    'src/theme/theme-provider.tsx',
    'src/theme/theme-scope.tsx',
    'src/theme/use-theme.ts',
  ],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
  },
  clean: false,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  external: ['react', 'react-dom', '@soraui/core', '@soraui/hooks'],
  minify: false,
  banner: {
    js: "'use client';",
  },
  async onSuccess() {
    await copyFile(
      join(__dirname, 'src/styles.css'),
      join(__dirname, 'dist/styles.css')
    );
    await copyFile(
      join(__dirname, 'src/styles.css'),
      join(__dirname, 'dist/index.css')
    );
  },
});