import type { GuideDoc } from './types';

export const GUIDE_DOCS: GuideDoc[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    category: 'Getting Started',
    description: 'The philosophy of SoraUI — Build fast. Ship less. Own your UI.',
  },
  {
    id: 'installation',
    title: 'Installation & CLI',
    category: 'Getting Started',
    description: 'How to install and configure SoraUI via CLI and npm package.',
  },
  {
    id: 'theming',
    title: 'Theming & Tokens',
    category: 'Theming',
    description: '3-layer design tokens, ThemeProvider, ThemeScope, and zero-FOUC initialization.',
  },
  {
    id: 'theme-presets',
    title: 'Theme Presets Gallery',
    category: 'Theming',
    description: 'Explore the 9 space and atmosphere inspired theme presets.',
  },
  {
    id: 'cli-reference',
    title: 'CLI Command Reference',
    category: 'CLI & Tooling',
    description: 'Comprehensive guide to soraui init, add, list, and search commands.',
  },
  {
    id: 'nextjs',
    title: 'Next.js Integration',
    category: 'Frameworks',
    description: 'App Router RSC boundaries, Pages Router, and streaming SSR guidelines.',
  },
  {
    id: 'vite',
    title: 'Vite & SPA Integration',
    category: 'Frameworks',
    description: 'Fast single-page application setup with Vite and React.',
  },
  {
    id: 'migration',
    title: 'Migration from Radix & shadcn',
    category: 'Migration',
    description: 'How to transition your components and styles to SoraUI.',
  },
  {
    id: 'mcp-guide',
    title: 'Model Context Protocol (MCP)',
    category: 'AI & Tooling',
    description: 'AI integration setup for Cursor, Claude Desktop, and Gemini CLI.',
  },
  {
    id: 'semver',
    title: 'Semantic Versioning & Policy',
    category: 'Governance',
    description: 'Release channels, public API stability, and deprecation lifecycle.',
  },
];

