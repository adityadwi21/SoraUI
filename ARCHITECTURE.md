# SoraUI — Architecture Overview

> Complete architectural specification for the SoraUI component construction ecosystem.

---

## 🏛️ Core Principles

1. **CSS-First** — If visual behavior or responsive layout can be accomplished with CSS custom properties or native browser APIs, JavaScript is avoided.
2. **Minimal Runtime** — JavaScript is reserved for interactive behavior, focus management, and keyboard accessibility.
3. **Own Your UI** — Source code distribution via CLI allows developers to take full ownership of component source code.
4. **Canonical Registry as Single Source of Truth** — CLI, Documentation Platform, Tests, and MCP Server all consume the exact same `registry/registry.json`.
5. **Deterministic Composition** — Recipes and blocks are pure UI compositions with decoupled consumer callbacks and zero embedded backend/API coupling.
6. **Token-Driven 3-Layer Styling** — Zero hardcoded hex/rgb/hsl colors. All components consume `--ui-*` semantic tokens.

---

## 📦 Monorepo Structure

```text
soraui/
├── apps/
│   ├── docs/           # Documentation platform, live ThemeScope preview engine, instant search (⌘K)
│   └── theme-builder/  # Visual theme editor, real-time contrast checker, and token exporter
│
├── packages/
│   ├── core/           # 3-layer tokens, 24-key Theme Contract, 9 presets, zero-FOUC init script
│   ├── hooks/          # A11y & interaction hooks (focus trap, roving index, escape key, portal)
│   ├── react/          # 44 primitives, 14 blocks, 4 templates, <ThemeProvider>, <ThemeScope>
│   ├── cli/            # `soraui` CLI (init, add, list, search, diff) with cycle detection
│   ├── icons/          # Minimal SVG icon primitives
│   └── mcp/            # Model Context Protocol (MCP) server for AI coding agents
│
└── registry/           # Single Canonical Source of Truth
    └── registry.json   # Comprehensive catalog of 44 components, 14 blocks, 4 templates, 9 themes
```

---

## 🎨 Theme Architecture (3 Layers)

```text
Layer 1 — Primitive Tokens   (Raw scale values, never used by components directly)
  --sora-blue-500: #0ea5e9;

Layer 2 — Semantic Tokens    (24-key Theme Contract, switched per preset/mode)
  --ui-primary, --ui-background, --ui-foreground, --ui-muted, --ui-border, --ui-ring, --ui-radius

Layer 3 — Component Tokens   (Per-component scoped customizations)
  --sora-button-radius: var(--ui-radius);
```

**Theme Scoping**: `<ThemeScope theme="aurora">` enables isolated themed subtrees in pure CSS with zero parent component re-renders.

---

## 🧩 Component Catalog (44 Primitives)

| Level | Characteristics | Components |
|---|---|---|
| **Level 1** | Zero/minimal JS runtime, pure CSS tokens | `Button`, `Input`, `Label`, `Card`, `Badge`, `Textarea`, `Separator`, `Skeleton`, `Typography`, `Checkbox`, `Switch`, `NumberInput`, `Breadcrumb`, `Pagination`, `Stepper`, `Progress`, `Avatar`, `Collapsible`, `Timeline`, `Statistic` |
| **Level 2** | Interactive with keyboard & focus hooks | `Dialog`, `Dropdown`, `Popover`, `Tooltip`, `Tabs`, `Accordion`, `Toast`, `Select`, `RadioGroup`, `Slider`, `InputOTP`, `NavigationMenu`, `Menubar`, `CommandPalette`, `AlertDialog`, `Drawer`, `HoverCard`, `ContextMenu`, `TreeView` |
| **Level 3** | Advanced composite components | `DataTable`, `Combobox`, `DatePicker`, `Calendar`, `FileUploader` |

---

## 🧱 Production Blocks (14 Blocks) & Templates (4 Templates)

- **Authentication (Auth)**: `LoginForm`, `RegisterForm`, `ForgotPasswordForm`, `OTPVerification`
- **Dashboard**: `DashboardShell`, `MetricGrid`, `DataTableBlock`
- **Marketing**: `HeroSection`, `FeatureGrid`, `PricingTable`, `FAQSection`, `FooterSection`
- **Forms & Settings**: `MultiStepWizard`, `SettingsForm`
- **Full-Page Templates**: `LoginPageTemplate`, `DashboardPageTemplate`, `SaaSLandingPageTemplate`, `SettingsPageTemplate`

---

## 🤖 AI-Native Interface (Model Context Protocol)

`@soraui/mcp` provides a structured, read-only capability layer over stdio JSON-RPC 2.0:
- **Discovery**: `soraui_get_context`, `soraui_search`, `soraui_list`
- **Inspection**: `soraui_inspect_component`, `soraui_inspect_block`, `soraui_inspect_template`, `soraui_inspect_theme`
- **Composition**: `soraui_compose_recipe` (v1.0 deterministic JSX), `soraui_get_install_commands`
- **Validation**: `soraui_resolve_dependencies`, `soraui_validate_composition` (Static analyzer for `SORA-TOKEN-001`, `SORA-BOUNDARY-001`, `SORA-A11Y-001`)
- **Resources**: `soraui://registry/*`, `soraui://themes`, `soraui://guidelines`
- **Prompts**: `scaffold-page`, `build-custom-block`

---

## 🔒 Security & Distribution Boundary

1. **Read-Only MCP Server**: Zero shell execution, zero filesystem writes, zero network calls.
2. **CSS Global Pollution Shield**: Zero bare tag selectors (`body`, `button`, `input`, `*`, `.card`) in distribution stylesheets; 100% scoped under `.sora-*` and `[data-theme]`.
3. **Tarball Hygiene**: Distribution archives (`.tgz`) contain only `dist/`, `package.json`, `README.md`, `LICENSE`, and `styles.css` without `src/`, `tests/`, or workspace leaks.
