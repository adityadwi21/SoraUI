# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-rc.1] - 2026-08-22

### Phase 14A: Public NPM RC Publication — COMPLETED & LIVE
- **Public NPM Distribution**:
  - Published all 5 packages to the public npm registry under the `@soraui/*` scope with `rc` dist-tag:
    - `@soraui/core@0.1.0-rc.1` (Design tokens & 9 space theme presets)
    - `@soraui/hooks@0.1.0-rc.1` (Accessible React primitives & focus/portal hooks)
    - `@soraui/react@0.1.0-rc.1` (44 accessible UI components, zero-runtime CSS)
    - `@soraui/cli@0.1.0-rc.1` (Official CLI generator & template installer via `npx @soraui/cli`)
    - `@soraui/mcp@0.1.0-rc.1` (Model Context Protocol stdio server with 11 tools)
  - Configured `"publishConfig": { "access": "public", "tag": "rc" }` across all package manifests.
  - Verified package authenticity, tarball integrity, and zero monorepo leakage on npmjs.com.

### Phase 13: Public Developer Experience, Consumer Validation & Release Readiness (RC1) — LOCKED

- **13A — Package & Tarball Integrity (Zero Monorepo Leakage)**:
  - Standardized NPM manifest publishing metadata across all 5 publishable packages (`@soraui/core`, `@soraui/hooks`, `@soraui/react`, `soraui`, `@soraui/mcp`).
  - Automated tarball leakage scanner (`scripts/check-package-leakage.mjs`) verifying 0 instances of `workspace:`, `file:`, `../../`, and local path leakage across unpacked `.tgz` archives.
  - Standalone tarball installation smoke test (`scripts/test-package-tarballs.mjs`) proving clean compilation in an external isolated tempdir.
- **13B — Measurable Developer Onboarding Acceptance**:
  - Deterministic time-to-first-success acceptance criteria: blank app ➔ tarball installation ➔ single-line CSS import ➔ pre-hydration theme initialization ➔ production build with 0 warnings/errors.
- **13C — Backward-Compatible CLI & Generator Hardening**:
  - Embedded canonical registry directly into CLI distribution with zero registry drift.
  - Multi-component addition (`npx soraui add <component...>`) with recursive dependency graph resolution.
  - Added `npx soraui add block <id>` and `npx soraui add theme <id>`.
  - Added `--dry-run` simulation flag and deterministic `--overwrite` handling.
- **13D — Real Consumer Validation Fixtures & Browser Runtime Safety**:
  - Created 3 production-grade fixtures under `examples/` (`examples/nextjs-app`, `examples/vite-react-app`, `examples/ai-generated-app`).
  - Automated test runner (`scripts/test-consumer-fixtures.mjs`) verifying tarball installation, typechecking, production build, server startup, and Playwright browser smoke test with 0 `console.error`, 0 `pageerror`, and 0 unhandled exceptions.
- **13E — Task-Oriented Documentation Platform**:
  - Enriched `apps/docs` with dedicated Model Context Protocol (MCP) and Semantic Versioning policy guides.
- **13F — Unified Master Release Candidate Gate (`pnpm verify:rc`)**:
  - Single canonical verification command executing the 8-step pipeline in ~94s.
  - Emits machine-readable `artifacts/release/rc-report.json` and `artifacts/release/rc-summary.txt`.

## [0.1.0] - 2026-08-22


### Added
- **Monorepo & CI/CD (Phase 0)**: Turborepo + pnpm workspaces with automated pipelines for CI, accessibility, bundle size budgeting, and security audits.
- **Core Architecture & Tokens (Phase 1)**: 3-layer CSS variable token architecture, 9 space/sky-themed preset themes (`sky`, `cloud`, `horizon`, `aurora`, `twilight`, `midnight`, `nebula`, `eclipse`, `starlight`), and `@soraui/core` theme utilities.
- **Level 1 Zero-Runtime Components (Phase 1)**:
  - `Button`: 6 variants, 4 sizes, loading spinner, full a11y focus ring.
  - `Input`: 3 sizes, error states, `aria-invalid`.
  - `Label`: Form label with required indicators and disabled states.
  - `Card`: Composable `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
  - `Badge`: 6 status/color variants (`default`, `secondary`, `outline`, `destructive`, `success`, `warning`).
  - `Textarea`: Multi-line text input with custom resize and error states.
  - `Separator`: Semantic or decorative horizontal and vertical dividers.
  - `Skeleton`: Shimmer loading placeholder respecting `prefers-reduced-motion`.
  - `Typography`: Polymorphic typography with 10 heading, body, lead, code, and caption variants.
- **Interactive Level 2 Components (Phase 2)**:
  - `Tooltip`: Hover/focus triggers, placement, and `aria-describedby` linking.
  - `Popover`: Floating panel with click toggle, click-outside, and Escape dismiss.
  - `Tabs`: Roving tabindex keyboard navigation, horizontal/vertical orientations.
  - `Accordion`: Single/multiple expansion with collapsible animations.
  - `Dialog`: Modal overlay with focus trap, backdrop blur, scroll lock, and Escape dismiss (< 8 KB).
  - `Dropdown`: Contextual action menu with keyboard roving focus and item actions (< 8 KB).
  - `Select`: Accessible dropdown listbox with keyboard search and group support.
  - `Toast`: Multi-item queue notification system with auto-dismiss timers and `useToast` hook.
- **Internal Primitives (`@soraui/hooks`)**:
  - `usePositioning`: Hand-rolled native zero-dependency positioning engine with collision auto-flip.
  - `usePortal` & `<Portal>`: SSR-safe hydration portal.
  - `useFocusTrap`: Native Tab cycling and return focus restoration.
  - `useEscapeKey`: Native Escape keydown listener.
  - `useClickOutside`: Native pointerdown outside detector.
- **CLI & Registry Distribution (Phase 3)**:
  - `soraui init`: Project scaffolding and theme setup.
  - `soraui add <component>`: Source-code distribution directly into consumer apps.
  - `soraui list`: Registry browser grouped by component level.
  - `soraui search <query>`: Instant offline fuzzy search.
  - 100% offline-first local bundled registry (< 65ms execution time).
- **Advanced Level 3 Components (Phase 5)**:
  - `Calendar`: Month grid calendar with date selection, keyboard arrow navigation, and min/max limits.
  - `DatePicker`: Input field with floating calendar popover and clear button.
  - `Combobox`: Autocomplete search input with dynamic filtering and listbox popup.
  - `FileUploader`: Drag-and-drop file upload zone with file queue and size validation.
  - `DataTable`: Lightweight sortable, filterable, and paginated table with row selection.
- **Theme Builder App (Phase 6)**:
  - Interactive theme builder in `apps/theme-builder` with 9 preset themes and custom color pickers.
  - Real-time WCAG 2.1 contrast checker engine (`contrast.ts`) with AAA/AA compliance badges.
  - Live interactive component showcase preview.
  - Pure CSS theme exporter for `:root { --ui-... }` tokens.
- **Component Expansion (Phase 7 — 22 New Primitives, Total 44 Components)**:
  - Form Primitives: `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `InputOTP`, `NumberInput`.
  - Navigation Primitives: `Breadcrumb`, `NavigationMenu`, `Menubar`, `Pagination`, `Stepper`, `CommandPalette`.
  - Feedback, Overlays & Data Display: `AlertDialog`, `Drawer`, `HoverCard`, `ContextMenu`, `Progress`, `Avatar`, `Collapsible`, `Timeline`, `Statistic`, `TreeView`.
  - 100% test coverage with 125/125 tests passing across 47 test suites.
  - Zero external runtime dependencies added.
- **Design Token & Theme Architecture (Phase 8)**:
  - Formalized 3-Layer Token System: Layer 1 (`--sora-*` primitive scales), Layer 2 (`--ui-*` semantic Theme Contract), Layer 3 (`--sora-<comp>-*` component defaults).
  - Multi-Dimension Theme State: decoupled `theme` (visual palette), `mode` (`light | dark | system`), and `resolvedMode` (`light | dark`).
  - Implemented `<ThemeProvider>` in `@soraui/react` with SSR hydration reconciliation, zero-FOUC support, and `prefers-color-scheme` subscription.
  - Implemented `<ThemeScope theme="...">` for nested, localized subtree theming via pure CSS cascade.
  - Added authoritative pre-hydration script generator `getThemeInitScript()` for zero-FOUC `<head>` injection.
  - Added deep token schema validator `validateTheme()` with recursive reference checking and circular dependency detection (`A -> B -> A`).
  - Added multi-format token exporters: `exportThemeToCSS()`, `exportThemeToJSON()` (W3C DTCG), and `exportThemeToTailwind()` (zero external dependencies).
  - Standardized all 9 theme presets to satisfy the identical 24-key Theme Contract.
  - **Blocks & Templates Architecture & Production Library (Phase 9)**:
  - **Phase 9A — Block Standards, Registry Schema & CLI Dependency Resolution**:
    - Defined type-safe `BlockMetadata` and `TemplateMetadata` schemas.
    - Versioned registry schema (`registry.schema.json`) with isolated namespaces: `components`, `blocks`, and `templates`.
    - Deterministic dependency resolution (`Template -> Blocks -> Components -> Tokens`) with automated circular dependency detection.
  - **Phase 9B — Production Block Library (Zero External Runtime Dependencies)**:
    - Authentication Blocks: `LoginForm` (with social provider slots, validation, remember me), `RegisterForm` (with password strength indicator and terms checkbox), `ForgotPasswordForm` (with recovery feedback), `OTPVerification` (with `InputOTP` integration).
    - Dashboard Blocks: `DashboardShell` (responsive collapsible sidebar, topbar, and user profile menu), `MetricGrid` (data-driven 4-column KPI cards with pure CSS/SVG trend indicators), `DataTableBlock` (interactive shell with search filtering, selection, bulk actions, and pagination).
    - Marketing Blocks: `HeroSection` (token-driven ambient radial glow and CTA actions), `FeatureGrid` (multi-column responsive cards), `PricingTable` (monthly/annual switch toggle and feature checklist), `FAQSection` (collapsible accordion), `FooterSection` (brand identity, newsletter subscription, navigation columns).
    - Forms & Settings Blocks: `MultiStepWizard` (multi-step progress flow with `Stepper`), `SettingsForm` (tabbed account and security preferences).
  - **Full Page Templates**:
    - `LoginPageTemplate`: 2-column split-screen authentication page layout with testimonial quote.
    - `DashboardPageTemplate`: Full dashboard screen composing `DashboardShell`, `MetricGrid`, and `DataTableBlock`.
    - `SaaSLandingPageTemplate`: Full SaaS landing page composing `HeroSection`, `FeatureGrid`, `PricingTable`, `FAQSection`, and `FooterSection`.
    - `SettingsPageTemplate`: Full account settings page integrating `DashboardShell` and `SettingsForm`.
  - **Design System & Quality Standards**:
    - 100% token-driven: all block styles strictly consume `--ui-*` and `--sora-*` tokens with 0 hardcoded colors.
    - Full `<ThemeScope>` compatibility for nested subtrees across all 9 theme presets.
    - 151/151 unit and integration tests passing across 49 test suites (16/16 Turbo tasks green).
- **Documentation Platform & Developer Experience (Phase 10)**:
  - **Documentation Platform (`apps/docs`)**:
    - Vite-powered, responsive developer platform with isolated `<ThemeScope>` previews and instant viewport switcher (Desktop `100%`, Tablet `768px`, Mobile `375px`).
    - Canonical Documentation Registry (`apps/docs/src/registry/`): single source of truth for 44 primitive components, 14 production blocks, 4 full-page templates, 9 theme presets, and 8 framework/theming guides.
    - Automated registry consistency validation test suite (`apps/docs/tests/registry-validation.test.ts`) guaranteeing 100% sync between `registry.json` and documentation entries with zero orphans or duplicates.
  - **Interactive Documentation**:
    - 44 Primitive Component Pages: Live previews, copy-paste snippets (CLI vs NPM), prop reference tables, keyboard interaction matrices, WAI-ARIA roles, CSS tokens, and direct GitHub source links.
    - 14 Production Block Pages: Interactive previews, UI-only boundary matrix ("SoraUI Handles" vs "Your App Handles"), dependency badges, and CLI installation commands.
    - 4 Full-Page Template Pages: Interactive live previews, composed block lists, and complete layout source code.
    - Interactive Multi-Theme Playground (`/playground`): Real-time root theme selector and nested `<ThemeScope>` card simulator demonstrating pure CSS cascade theming.
  - **Instant Search**: Client-side modal search index (`⌘K` / `Ctrl+K`) with keyboard arrow navigation covering all components, blocks, templates, themes, and guides.
  - **Core Guides**: "Own Your UI" manifesto, Installation & CLI workflows, 3-Layer Theming Architecture, 9 Presets Gallery, Next.js App/Pages Router setup (RSC boundaries & zero-FOUC init script), Vite SPA setup, and migration mappings from Radix UI & shadcn/ui.
  - **Bundle Size Budget**: Verified package budget assertions (< 200 KB total unminified ESM, < 60 KB consolidated CSS stylesheet) via `packages/react/tests/bundle-size.test.ts`.
  - **Full Pipeline Verification**: 19/19 Turbo tasks green across all packages and applications.
- **Release Candidate & Public API Audit (Phase 10.5 — RC1 Locked)**:
  - **Public API Snapshot ([public-api.test.ts](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/packages/react/tests/public-api.test.ts))**:
    - Strictly verified 44/44 primitives, 14/14 blocks, and 4/4 templates exported by name from `@soraui/react` matching canonical `registry.json`.
  - **Architectural Dependency Boundaries ([dependency-boundaries.test.ts](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/packages/core/tests/dependency-boundaries.test.ts))**:
    - `@soraui/core` verified 100% free of React imports, ReactDOM imports, and runtime browser API calls.
    - `@soraui/hooks` verified UI-independent (no component imports).
    - `soraui` CLI verified 100% free of React runtime dependencies.
  - **CSS Global Pollution & Namespacing Audit ([css-pollution.test.ts](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/packages/react/tests/css-pollution.test.ts))**:
    - Validated 0 un-namespaced bare global element selectors (`body`, `button`, `input`, `*`, `.container`, `.card`) in compiled `dist/styles.css`.
    - All rules strictly scoped under `.sora-*`, `[data-theme]`, `[data-sora]`, or `:root`.
  - **Granular Bundle Budgets & Tree-Shaking Contract ([bundle-size.test.ts](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/packages/react/tests/bundle-size.test.ts))**:
    - `@soraui/core` ESM: < 15 KB (actual: ~7.9 KB).
    - `@soraui/hooks` ESM: < 10 KB (actual: ~8.4 KB).
    - `@soraui/react` full ESM: < 200 KB (actual: ~152 KB).
    - Stylesheet `dist/styles.css`: < 60 KB (actual: ~41.7 KB).
    - Verified tree-shaking: importing `{ Button }` does not bundle `Calendar`, `DataTable`, `Dialog`, etc.
  - **CLI 44 Primitives & 14 Blocks Sync**:
    - Updated `ALL_COMPONENTS` in CLI registry to all 44 primitives with deterministic dependency resolution.
  - **Package Tarball & Open-Source Hygiene ([audit-tarballs.mjs](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/scripts/audit-tarballs.mjs))**:
    - Verified tarball allowlists for all 4 packages (Core, Hooks, React, CLI): packaged exclusively with `dist/`, `package.json`, `README.md`, `LICENSE`, `styles.css`.
    - 0 leakage of `src/`, `tests/`, `coverage/`, `.env`, or workspace internal paths.
  - **Fresh Consumer Project E2E Simulation ([test-consumer-e2e.mjs](file:///d:/MY%20PROGRAM/MYPORTOFOLIO/SoraUI/soraui/scripts/test-consumer-e2e.mjs))**:
    - Created isolated consumer application in `/tmp` installing only `.tgz` tarballs outside the monorepo.
    - Verified clean installation, Vite production build, `<ThemeScope>` nesting, and zero workspace leakage.
- **AI-Native SoraUI & Model Context Protocol (MCP) Server (Phase 11 — Complete & Locked)**:
  - **Official MCP SDK Server (`@soraui/mcp`)**:
    - Built on `@modelcontextprotocol/sdk` (v1.30+) implementing JSON-RPC 2.0 stdio transport with zero runtime React dependencies.
    - Read-only consumer of `registry/registry.json` and `@soraui/core` design token contract (0 duplicated metadata).
  - **11 Structured, Schema-Driven MCP Tools**:
    - `soraui_get_context`: Rapid ecosystem onboarding returning version, 44/14/4/9 catalog counts, and core architectural rules.
    - `soraui_search`: Deterministic scoring search (`exact=100`, `prefix=80`, `alias=60`, `category=30`, `tag=20`, `desc=10`; sorted `score DESC, name ASC`) with match reasoning.
    - `soraui_list`: Filtered listing of catalog items across components, blocks, templates, and themes.
    - `soraui_inspect_component`: Complete specification including props table, WAI-ARIA roles, keyboard keys, CSS tokens, and examples.
    - `soraui_inspect_block`: UI-Only Boundary Matrix ("SoraUI Handles" vs "Consumer Handles"), compound slots, and dependencies.
    - `soraui_inspect_template`: Full layout structure, composed block hierarchy, and source code.
    - `soraui_inspect_theme`: 24-key Theme Contract values, color scales, light/dark mode configuration, and anti-FOUC `<head>` init script.
    - `soraui_compose_recipe`: Deterministic recipe generator (`recipeVersion: "1.0"`) for `auth_flow`, `dashboard`, `saas_landing`, and `settings_tabs` with `<ThemeProvider>` / `<ThemeScope>` wrapping and decoupled callback placeholders.
    - `soraui_get_install_commands`: Shell install commands for CLI (`npx soraui add ...`) and NPM (`npm install @soraui/react ...`) without shell execution.
    - `soraui_resolve_dependencies`: Full recursive dependency graph resolver with circular dependency detection.
    - `soraui_validate_composition`: Static composition analyzer with diagnostic severities (`error`, `warning`, `info`) and Rule IDs (`SORA-TOKEN-001`, `SORA-BOUNDARY-001`, `SORA-A11Y-001`).
  - **MCP Resources & Prompt Templates**:
    - Resources: `soraui://registry` (and subpaths `/components`, `/blocks`, `/templates`), `soraui://themes`, `soraui://guidelines`.
    - Prompts: `scaffold-page`, `build-custom-block`.
  - **Strict Security Sandboxing**:
    - Read-only runtime: 0 shell executions, 0 filesystem mutations, 0 outbound network calls, and path traversal protection.
  - **Full Test Suite & Pipeline Verification**:
    - 11 MCP test suites passing 100% (46/46 tests in `packages/mcp/tests/`).
- **Quality, A11y & Performance Hardening (Phase 12 — COMPLETE & LOCKED)**:
  - **12A — Accessibility Automation (`axe-core`)**:
    - Automated structural accessibility testing for all 44 primitives with 0 critical/serious violations.
    - Verified proper ARIA attribute forwarding across complex inputs (`Slider`, `InputOTP`, `FileUploader`).
    - Resolved nested-interactive accessibility violations in `FileUploader` without altering public component API.
  - **12B — Theme Contrast Matrix (9 Themes × 11 Token Pairs = 99 Checks)**:
    - Built automated contrast validation parser verifying WCAG 2.1 AA ratios (≥4.5:1 for normal text, ≥3:1 for UI components) dynamically computed from CSS preset token definitions (zero hardcoded color assertions).
    - Hardened and audited all 9 theme presets (`sky`, `cloud`, `horizon`, `aurora`, `twilight`, `midnight`, `nebula`, `eclipse`, `starlight`) for 100% full AA compliance.
  - **12C — Keyboard & Focus Hardening**:
    - Focus trap verification for `Dialog` and `AlertDialog` with Escape key dismissal and trigger focus restoration.
    - Roving tabindex validation for `Tabs` and `RadioGroup`.
  - **12D — Performance & Memory Benchmarks (Regression Gate)**:
    - `DataTable` Observed Benchmark (1,000 rows): Initial render p50: 4.3ms, p95: 19.0ms (recorded as baseline; enforced via >20% regression threshold).
    - `TreeView` Observed Benchmark (5 levels, 364 nodes): Initial render p50: 0.8ms, p95: 2.3ms.
    - Memory leak hard gate: 0 dangling listeners on unmount for `useClickOutside` and `useEscapeKey`.
    - Maintained Phase 10.5 bundle budgets (Core < 15 KB, Hooks < 10 KB, React < 200 KB, CSS < 60 KB) as continuous CI regression gates.

  - **12E — SSR & Hydration Correctness**:
    - Server-side rendering verified with 0 React hydration mismatch console errors across all 44 primitives + `ThemeProvider` & `ThemeScope`.
    - FOUC prevention Playwright browser test verifying `data-theme` pre-hydration and `--ui-background` computed style resolution across all 9 presets.
  - **12F — Cross-Browser Compatibility (Chromium / Firefox / WebKit)**:
    - Verified cross-browser rendering and interaction for high-risk components (`Dialog`, `Select`, `Tabs`, `Tooltip`, `ThemeScope`).
    - Explicit verification status: **Chromium / Firefox / WebKit verified** (WebKit browser engine baseline).
  - **12G — Visual Regression Testing (`maxDiffPixels: 50`)**:
    - Configured Playwright native visual regression with `toHaveScreenshot()` and explicit `maxDiffPixels: 50` threshold across Desktop (1280px) and Mobile (375px) viewports.
    - Snapshot tests for critical primitives (`Button`, `Input`, `Card`, `Badge`, `Dialog`, `DataTable`) and `ThemeScope` nested isolation across 9 themes.
  - **12H — Runtime & Unmount Safety**:
    - Verified 0 `console.error` / `console.warn` after unmount for 15 high-risk interactive components.
    - Validated complete DOM cleanup for `Dialog` portal nodes on unmount.
  - **12I — Bidirectional MCP & Registry Contract Regression**:
    - Verified bidirectional parity between Registry ↔ MCP, Registry ↔ Docs, Registry ↔ CLI, and Public API exports.
    - 0 orphaned documentation or MCP entries; deterministic recipe generation verified.
  - **Full Pipeline Verification**:
    - 21/21 Turborepo tasks green across the monorepo.
    - Packaged MCP server release smoke test verified over live isolated stdio transport (`scripts/test-mcp-smoke.mjs`).




