# SoraUI

> **Build fast. Ship less. Own your UI.**

SoraUI is an open-source, lightweight UI construction system for modern JavaScript and TypeScript applications. It provides accessible, responsive, token-driven components and blocks that can either be installed as an NPM SDK or copied directly into your project via CLI, backed by a canonical registry and official Model Context Protocol (MCP) server for AI coding agents.

---

## Features

- **47 Accessible Primitives**: Level 1 zero-runtime CSS components up to Level 3 interactive primitives (WAI-ARIA, keyboard navigation, focus management).
- **14 Production Blocks & 4 Page Templates**: UI-only compound blocks and layouts for Authentication, Dashboards, Marketing, and Settings.
- **Universal `lucide-react` Iconography**: Clean, lightweight icons integrated across all components, blocks, and templates.
- **3-Layer Design Token Engine**: Primitive (`--sora-*`) -> Semantic (`--ui-*`) -> Component (`--sora-<comp>-*`) with zero hardcoded colors.
- **9 Space-Themed Presets & ThemeScope**: Pure CSS cascading themes (`Sky`, `Cloud`, `Horizon`, `Aurora`, `Twilight`, `Midnight`, `Nebula`, `Eclipse`, `Starlight`) with isolated `<ThemeScope>` subtrees.
- **AI-Native MCP Server (`@soraui/mcp`)**: 11 structured JSON-Schema-driven tools, static composition analysis, resources, and prompt templates for Claude Desktop, Cursor, Gemini, and Copilot.
- **Zero-FOUC & SSR Ready**: Seamless Next.js App/Pages Router, Vite SPA, Laravel Inertia, React Router v7, and Astro support.
- **Ultra-Lightweight & Tree-Shakeable**: Core < 8 KB, Hooks < 9 KB, Consolidated CSS < 42 KB.

---

## Themes

| Theme         | Mode  | Description                                           |
| ------------- | ----- | ----------------------------------------------------- |
| **Sky**       | Light | Clean blue sky (default light theme)                  |
| **Cloud**     | Light | Soft white and neutral cloud tones                    |
| **Horizon**   | Light | Warm sunset transition colors                         |
| **Aurora**    | Dark  | Vibrant teal and emerald aurora                       |
| **Twilight**  | Dark  | Deep dusk indigo and purple                           |
| **Midnight**  | Dark  | Minimal dark with indigo accents (default dark theme) |
| **Nebula**    | Dark  | Purple and magenta deep-space nebula                  |
| **Eclipse**   | Dark  | High-contrast pitch black with golden accent          |
| **Starlight** | Dark  | Dark navy with radiant star highlights                |

---

## Getting Started

### 1. Via CLI (Source Distribution: "Own Your UI")

```bash
# Initialize SoraUI in your project
npx @soraui/cli init

# Add primitive components
npx @soraui/cli add button dialog data-table

# Add production blocks
npx @soraui/cli add block login-form metric-grid

# Add full-page templates
npx @soraui/cli add template dashboard-page
```

### 2. Via NPM SDK

```bash
# Install core package, primitives, hooks, and Lucide icons
npm install @soraui/react @soraui/core @soraui/hooks lucide-react
```

```tsx
import React from "react";
import { ThemeProvider, ThemeScope, Button, Card } from "@soraui/react";
import "@soraui/react/styles.css";

export default function App() {
  return (
    <ThemeProvider defaultTheme="midnight" defaultMode="dark">
      <main style={{ padding: "2rem" }}>
        <Card>
          <h1>Hello SoraUI!</h1>
          <Button variant="primary">Click Me</Button>
        </Card>
      </main>
    </ThemeProvider>
  );
}
```

---

## AI Coding Agents (Model Context Protocol)

Connect SoraUI to Claude Desktop, Cursor, or Gemini:

```json
{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp"]
    }
  }
}
```

Tools available to your agent:

- `soraui_get_context`: Rapid ecosystem overview & architectural guidelines.
- `soraui_search`: Deterministic scoring search across all components, blocks, and templates.
- `soraui_inspect_component` / `soraui_inspect_block`: Full prop tables, WAI-ARIA roles, and boundary rules.
- `soraui_compose_recipe`: Deterministic recipe generator for standard full-page flows.
- `soraui_validate_composition`: Static composition analyzer detecting hardcoded colors (`SORA-TOKEN-001`), backend coupling (`SORA-BOUNDARY-001`), and accessibility oversights (`SORA-A11Y-001`).

---

## Monorepo Packages

| Package                             | Purpose                                                | Version |
| ----------------------------------- | ------------------------------------------------------ | ------- |
| [`@soraui/core`](./packages/core)   | Tokens, 24-key Theme Contract, CSS Presets             | `0.1.1` |
| [`@soraui/hooks`](./packages/hooks) | A11y & interaction primitives (focus trap, escape key) | `0.1.1` |
| [`@soraui/react`](./packages/react) | 47 primitives, 14 blocks, 4 templates, ThemeProvider   | `0.1.1` |
| [`@soraui/cli`](./packages/cli)     | CLI code generator & dependency resolver               | `0.1.1` |
| [`@soraui/mcp`](./packages/mcp)     | Official Model Context Protocol stdio server           | `0.1.1` |

---

## Monorepo Architecture

```text
soraui/
├── apps/
│   ├── docs/           # Documentation Platform & Interactive ThemeScope Playground
│   └── theme-builder/  # Visual token editor, WCAG contrast analyzer, and preset exporter
│
├── packages/
│   ├── core/           # Design tokens, 24-key Theme Contract, preset stylesheets
│   ├── hooks/          # A11y & interaction hooks (focus trap, roving index, escape key)
│   ├── react/          # 47 primitives, 14 blocks, 4 templates, ThemeProvider, ThemeScope
│   ├── cli/            # @soraui/cli code generator & dependency resolution
│   └── mcp/            # Model Context Protocol stdio server for AI coding agents
│
└── registry/           # Single Canonical Source of Truth (registry.json)
```

---

## Development & Testing Suites

```bash
# Install dependencies
pnpm install

# Build all packages & apps
pnpm build

# Run unit tests across all packages
pnpm test

# Run TypeScript typechecks
pnpm typecheck

# Phase 14D: Real Developer Adoption Benchmark (T0 -> T4 across npm, pnpm, yarn, bun)
pnpm test:adoption-benchmark

# Phase 14B: Multi-Package Manager Matrix (npm, pnpm, yarn, bun)
pnpm test:pm-matrix

# Phase 14C: Live MCP stdio Protocol & 11 Tool Validation
pnpm test:ai-agent-mcp
```

---

## License

[MIT](./LICENSE) © SoraUI Contributors
