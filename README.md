# SoraUI

> **Build fast. Ship less. Own your UI.**

SoraUI is an open-source, lightweight UI construction system for modern JavaScript and TypeScript applications. It provides accessible, responsive, token-driven components and blocks that can either be installed as an NPM SDK or copied directly into your project via CLI, backed by a canonical registry and official Model Context Protocol (MCP) server for AI coding agents.

---

## 🌌 Features

- **44 Accessible Primitives** — Level 1 zero-runtime CSS components up to Level 3 interactive primitives (WAI-ARIA, keyboard navigation, focus management).
- **14 Production Blocks & 4 Page Templates** — UI-only compound blocks and layouts for Authentication, Dashboards, Marketing, and Settings.
- **3-Layer Design Token Engine** — Primitive (`--sora-*`) → Semantic (`--ui-*`) → Component (`--sora-<comp>-*`) with zero hardcoded colors.
- **9 Space-Themed Presets & ThemeScope** — Pure CSS cascading themes (`Sky`, `Cloud`, `Horizon`, `Aurora`, `Twilight`, `Midnight`, `Nebula`, `Eclipse`, `Starlight`) with isolated `<ThemeScope>` subtrees.
- **AI-Native MCP Server (`@soraui/mcp`)** — 11 structured JSON-Schema-driven tools, static composition analysis, resources, and prompt templates for Claude Desktop, Cursor, Gemini, and Copilot.
- **Zero-FOUC & SSR Ready** — Seamless Next.js App/Pages Router and Vite SPA support with server-side init scripts.
- **Ultra-Lightweight & Tree-Shakeable** — Core < 8 KB, Hooks < 9 KB, Consolidated CSS < 42 KB.

---

## 🎨 Themes

| Theme | Mode | Description |
|---|---|---|
| **Sky** | Light | Clean blue sky — default light theme |
| **Cloud** | Light | Soft white and neutral cloud tones |
| **Horizon** | Light | Warm sunset transition colors |
| **Aurora** | Dark | Vibrant teal and emerald aurora |
| **Twilight** | Dark | Deep dusk indigo and purple |
| **Midnight** | Dark | Minimal dark with indigo accents — default dark theme |
| **Nebula** | Dark | Purple and magenta deep-space nebula |
| **Eclipse** | Dark | High-contrast pitch black with golden accent |
| **Starlight** | Dark | Dark navy with radiant star highlights |

---

## 🚀 Getting Started

### 1. Via CLI (Source Distribution — "Own Your UI")

```bash
# Initialize SoraUI in your project
npx soraui init

# Add primitive components
npx soraui add button dialog data-table

# Add production blocks
npx soraui add block login-form metric-grid

# Add full-page templates
npx soraui add template dashboard-page
```

### 2. Via NPM SDK

```bash
npm install @soraui/react @soraui/core @soraui/hooks
```

```tsx
import React from 'react';
import { ThemeProvider, ThemeScope, Button, Card, LoginForm } from '@soraui/react';
import '@soraui/react/styles';

export default function App() {
  return (
    <ThemeProvider defaultTheme="midnight" defaultMode="dark">
      <main style={{ padding: '2rem' }}>
        <LoginForm onSubmit={(data) => console.log('Login:', data)} />
      </main>
    </ThemeProvider>
  );
}
```

---

## 🤖 AI Coding Agents (Model Context Protocol)

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
- `soraui_compose_recipe`: Deterministic recipe generator (v1.0) for standard full-page flows.
- `soraui_validate_composition`: Static composition analyzer detecting hardcoded colors (`SORA-TOKEN-001`), backend coupling (`SORA-BOUNDARY-001`), and accessibility oversights (`SORA-A11Y-001`).

---

## 📦 Monorepo Architecture

```text
soraui/
├── apps/
│   ├── docs/           # Documentation Platform & Interactive ThemeScope Playground
│   └── theme-builder/  # Visual token editor, WCAG contrast analyzer, and preset exporter
│
├── packages/
│   ├── core/           # Design tokens, 24-key Theme Contract, preset stylesheets
│   ├── hooks/          # A11y & interaction hooks (focus trap, roving index, escape key)
│   ├── react/          # 44 primitives, 14 blocks, 4 templates, ThemeProvider, ThemeScope
│   ├── cli/            # `soraui` CLI for source code distribution & dependency resolution
│   ├── icons/          # Minimal SVG icon primitives
│   └── mcp/            # Model Context Protocol stdio server for AI coding agents
│
└── registry/           # Single Canonical Source of Truth (registry.json)
```

---

## 🛠️ Development & Pipeline

```bash
# Install dependencies
pnpm install

# Build all packages & apps
pnpm build

# Run comprehensive test suites
pnpm test

# Run TypeScript typechecks
pnpm typecheck

# Full Turborepo pipeline verification
pnpm turbo run build typecheck test
```

---

## 📄 License

[MIT](./LICENSE) © SoraUI Contributors
