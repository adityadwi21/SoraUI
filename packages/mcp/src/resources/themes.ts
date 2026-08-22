import { loadCanonicalRegistry } from '../registry/adapter';

export function getThemesResource() {
  const registry = loadCanonicalRegistry();

  const themeContract = {
    totalPresets: registry.themes.length,
    presets: registry.themes,
    contractKeys: [
      '--ui-background',
      '--ui-foreground',
      '--ui-card',
      '--ui-card-foreground',
      '--ui-popover',
      '--ui-popover-foreground',
      '--ui-primary',
      '--ui-primary-foreground',
      '--ui-secondary',
      '--ui-secondary-foreground',
      '--ui-muted',
      '--ui-muted-foreground',
      '--ui-accent',
      '--ui-accent-foreground',
      '--ui-destructive',
      '--ui-destructive-foreground',
      '--ui-border',
      '--ui-input',
      '--ui-ring',
      '--ui-radius',
      '--ui-font-sans',
      '--ui-font-mono',
      '--ui-shadow-sm',
      '--ui-shadow-md',
    ],
  };

  return {
    uri: 'soraui://themes',
    mimeType: 'application/json',
    text: JSON.stringify(themeContract, null, 2),
  };
}
