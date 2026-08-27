import type { GuideDoc } from "./types";

export const GUIDE_DOCS: GuideDoc[] = [
  {
    id: "introduction",
    title: "Introduction",
    category: "Getting Started",
    description:
      "The philosophy of SoraUI: Build fast. Ship less. Own your UI.",
  },
  {
    id: "installation",
    title: "Installation",
    category: "Getting Started",
    description:
      "How to install and configure SoraUI via CLI and framework setups.",
  },
  {
    id: "theming",
    title: "Theming",
    category: "Theming",
    description:
      "3-layer design tokens, ThemeProvider, ThemeScope, and 9 space presets.",
  },
  {
    id: "cli-reference",
    title: "CLI",
    category: "Getting Started",
    description:
      "Comprehensive guide to soraui init, add, list, and search commands.",
  },
  {
    id: "migration",
    title: "Migration Guide",
    category: "Getting Started",
    description:
      "Step-by-step migration guide from Tailwind CSS, Radix UI, and Shadcn UI.",
  },
  {
    id: "skills",
    title: "Skills",
    category: "Getting Started",
    description:
      "Give your AI assistant deep knowledge of SoraUI components, patterns, and best practices.",
  },
  {
    id: "mcp-guide",
    title: "MCP Server",
    category: "Getting Started",
    description:
      "Connect Cursor, Claude Desktop, and Gemini CLI to SoraUI via Model Context Protocol.",
  },
  {
    id: "changelog",
    title: "Changelog",
    category: "Getting Started",
    hasDotBadge: true,
    description:
      "Latest updates, releases, and announcements for the SoraUI ecosystem.",
  },
];
