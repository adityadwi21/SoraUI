# @soraui/cli

> Official Command Line Interface for SoraUI: Add accessible components, production blocks, and page templates directly into your codebase.

---

## ⚡ Quick Start

### Initialize SoraUI in your project

```bash
# Using npx
npx @soraui/cli init

# Or using pnpm dlx
pnpm dlx @soraui/cli init

# Or scaffold a new project with preconfigured template
pnpm dlx @soraui/cli init -t next
pnpm dlx @soraui/cli init -t vite
```

---

## 🧩 Adding Components & Blocks

### Add UI Primitives
```bash
npx @soraui/cli add button
npx @soraui/cli add dialog select card tabs
```

### Add Production Blocks
```bash
npx @soraui/cli add block login-form
npx @soraui/cli add block metric-grid
npx @soraui/cli add block dashboard-shell
```

### Add Full-Page Templates
```bash
npx @soraui/cli add template dashboard-page
npx @soraui/cli add template auth-page
```

---

## 🔍 Discovery Commands

### List all available items
```bash
npx @soraui/cli list
```

### Search registry
```bash
npx @soraui/cli search auth
npx @soraui/cli search modal
```

---

## 🎨 Options & Flags

| Flag | Description |
|---|---|
| `-t, --template <name>` | Scaffold a preconfigured template (`next`, `vite`, `start`, `react-router`, `astro`) |
| `-o, --overwrite` | Overwrite existing files without prompt |
| `-y, --yes` | Skip confirmation prompts and use default settings |
| `--path <dir>` | Custom output directory for components |

---

## 📄 License

MIT © 2026 SoraUI Contributors
