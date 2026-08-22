import { loadCanonicalRegistry } from '../registry/adapter';

export function handleGetContext(params: { task?: 'build' | 'debug' | 'migrate' | 'compose' | undefined } = {}) {
  const registry = loadCanonicalRegistry();

  return {
    ecosystem: 'SoraUI',
    version: registry.version,
    registryVersion: registry.registryVersion,
    description: 'The lightweight, accessible UI ecosystem for modern web apps.',
    catalog: {
      totalComponents: registry.components.length,
      totalBlocks: registry.blocks.length,
      totalTemplates: registry.templates.length,
      totalThemes: registry.themes.length,
    },
    principles: [
      'Own Your UI: Copy-paste or package-based installation.',
      '3-Layer Tokens: Primitive (--sora-*) -> Semantic (--ui-*) -> Component (--sora-<comp>-*).',
      'Zero-Runtime CSS: CSS custom properties with native [data-theme] cascade.',
      'UI-Only Blocks: Presentation, local validation UI, accessibility, and callbacks (no coupled backend/API logic).',
      'Nested Subtrees: <ThemeScope theme="..."> enables scoped theme zones with zero parent re-render.',
    ],
    rules: {
      noHardcodedColors: 'Always use var(--ui-*) semantic tokens or theme presets. Never hardcode hex/rgb/hsl colors.',
      noBackendLogicInBlocks: 'Keep blocks UI-only with onSubmit/onAction callbacks.',
      accessibleIcons: 'Icon-only buttons must have aria-label.',
    },
    taskGuidance: params.task
      ? getTaskGuidance(params.task)
      : 'Use soraui_search to discover components/blocks, soraui_inspect_* to inspect contracts, and soraui_compose_recipe to generate deterministic layouts.',
  };
}

function getTaskGuidance(task: 'build' | 'debug' | 'migrate' | 'compose'): string {
  switch (task) {
    case 'build':
      return 'Start by selecting a template or composing blocks. Wrap your app with <ThemeProvider defaultTheme="sky"> and import @soraui/react/styles.';
    case 'compose':
      return 'Use soraui_compose_recipe for deterministic patterns or combine Level 1-2 primitives with <Card>, <Button>, and <ThemeScope>.';
    case 'migrate':
      return 'Map Radix/shadcn primitives directly to SoraUI equivalents. Replace Tailwind utility colors with --ui-* CSS custom properties.';
    case 'debug':
      return 'Use soraui_validate_composition to detect token violations, boundary leaks, or missing accessibility attributes in your JSX.';
  }
}
