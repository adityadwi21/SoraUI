import { getTheme, listItems } from '../registry/adapter';

export function handleInspectTheme(params: { id?: string | undefined } = {}) {
  if (!params.id) {
    const allThemes = listItems('themes');
    return {
      totalPresets: allThemes.length,
      availableThemes: allThemes,
      themeContractKeys: [
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
      headInitScriptGuidance: "Inject `getThemeInitScript({ defaultTheme: 'sky', defaultMode: 'system' })` into <head> to prevent FOUC.",
    };
  }

  const theme = getTheme(params.id);
  if (!theme) {
    throw new Error(`Theme preset "${params.id}" not found in SoraUI.`);
  }

  return {
    id: theme.id,
    label: theme.label,
    mode: theme.mode,
    default: theme.default || false,
    description: theme.description || `${theme.label} theme preset`,
    cssImport: `@soraui/core/theme/presets/${theme.id}.css`,
    usageExample: `<ThemeProvider defaultTheme="${theme.id}" defaultMode="${theme.mode}">\n  <App />\n</ThemeProvider>`,
    subtreeUsageExample: `<ThemeScope theme="${theme.id}">\n  <Card>Scoped ${theme.label} Area</Card>\n</ThemeScope>`,
  };
}
