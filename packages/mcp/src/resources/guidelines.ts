export function getGuidelinesResource() {
  const markdown = `# SoraUI Architecture & Composition Guidelines

## 1. Own Your UI
SoraUI components and blocks are designed to be copied directly into your application codebase or imported from \`@soraui/react\`.

## 2. 3-Layer Design Tokens
All components strictly consume CSS variables without hardcoded hex/rgb colors:
- **Layer 1: Primitive Tokens** (\`--sora-*\`)
- **Layer 2: Semantic Tokens** (\`--ui-*\`)
- **Layer 3: Component Tokens** (\`--sora-<comp>-*\`)

## 3. UI-Only Boundaries for Blocks
SoraUI blocks handle layout, responsive presentation, accessibility, and local validation visual feedback.
Network requests, database queries, and business logic remain in consumer application space.

## 4. Scoped Theming
Use \`<ThemeScope theme="aurora">\` to create isolated themed subtrees with zero parent re-renders and guaranteed contrast.
`;

  return {
    uri: 'soraui://guidelines',
    mimeType: 'text/markdown',
    text: markdown,
  };
}
