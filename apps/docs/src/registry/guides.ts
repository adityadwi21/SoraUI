import type { GuideDoc } from './types';

export const GUIDE_DOCS: GuideDoc[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    category: 'Getting Started',
    description: 'The philosophy of SoraUI: Build fast. Ship less. Own your UI.',
  },
  {
    id: 'installation',
    title: 'Installation',
    category: 'Getting Started',
    description: 'How to install and configure SoraUI via CLI and framework setups.',
  },
  {
    id: 'theming',
    title: 'Theming',
    category: 'Theming',
    description: '3-layer design tokens, ThemeProvider, ThemeScope, and 9 space presets.',
  },
  {
    id: 'cli-reference',
    title: 'CLI',
    category: 'CLI & Tooling',
    description: 'Comprehensive guide to soraui init, add, list, and search commands.',
  },
  {
    id: 'mcp-guide',
    title: 'Skills & MCP',
    category: 'AI & Tooling',
    description: 'AI coding agent tools, Model Context Protocol (MCP), and Cursor integration.',
  },
  {
    id: 'changelog',
    title: 'Changelog',
    category: 'Getting Started',
    hasDotBadge: true,
    description: 'Latest updates, releases, and announcements for the SoraUI ecosystem.',
  },
];

