# SoraUI — ROADMAP

> «Build fast. Ship less. Own your UI.»

Dokumen ini memecah Phase 0–8 (context doc section 21) menjadi milestone dan task konkret dengan estimasi effort relatif (XS/S/M/L/XL).

---

## Phase 0 — Project Setup
**Effort:** S | **Status:** ✅ Done

### Tasks
- [x] Buat struktur monorepo (pnpm workspace + Turborepo)
- [x] Root config files: package.json, pnpm-workspace.yaml, turbo.json, tsconfig.base.json
- [x] Docs: README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, LICENSE, ARCHITECTURE.md, DECISION_LOG.md, CHANGELOG.md
- [x] CI pipelines: ci.yml, accessibility.yml, bundle-size.yml, security-audit.yml, release.yml
- [x] Editor config: .editorconfig, .gitignore

### Definition of Done
- Monorepo bisa di-install (pnpm install) tanpa error
- pnpm build mengeksekusi pipeline Turborepo dengan benar
- CI workflows valid (YAML syntax benar)

---

## Phase 1 — Core Architecture
**Effort:** L | **Status:** ✅ Done — 2026-08-22

### Milestone 1.1 — Design Token & Theme System
- [x] packages/core/src/tokens/ — color scale, radius, spacing, typography primitives
- [x] packages/core/src/theme/primitives.css — Layer 1 raw values
- [x] packages/core/src/theme/presets/ — 9 file CSS preset (sky, cloud, horizon, aurora, twilight, midnight, nebula, eclipse, starlight)
- [x] packages/core/src/theme/preset-registry.json
- [x] packages/core/src/theme/index.ts — applyTheme(), listThemes(), applySystemTheme()
- [ ] Unit test untuk theme helper ← Phase 2 backlog

### Milestone 1.2–1.10 — Level 1 Components ✅
- [x] Button (variants: primary/secondary/outline/ghost/destructive/link, sizes: sm/md/lg/icon)
- [x] Input (sizes: sm/md/lg, error state, aria-invalid)
- [x] Label (required indicator, disabled state)
- [x] Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter
- [x] Badge (variants: default/secondary/outline/destructive/success/warning)
- [x] Textarea (resize control, error state)
- [x] Separator (horizontal/vertical, decorative/semantic)
- [x] Skeleton (circle variant, shimmer, prefers-reduced-motion)
- [x] Typography (h1–h4, body, body-sm, caption, lead, muted, code — polymorphic `as` prop)

### Milestone 1.11 — Package Build Setup ✅
- [x] tsup.config.ts untuk packages/react dan packages/core
- [x] exports map + "sideEffects": false (react) / "sideEffects": ["**/*.css"] (core)
- [x] Plain CSS classes (sora- prefix) — dicatat di DECISION_LOG.md
- [x] styles.css — consolidated component styles

### Bonus (dikerjakan sekaligus)
- [x] packages/hooks/ — useMediaQuery, useLocalStorage, useFocusTrap
- [x] packages/cli/ — skeleton init, add, list, search commands
- [x] packages/mcp/ — skeleton server.ts
- [x] registry/ — registry.json + 9 metadata.json

### Definition of Done Phase 1 — ✅ TERCAPAI
- [x] Seluruh 9 Level 1 component: **44/44 unit tests PASSED**
- [x] TypeScript check: **CLEAN** (tsc --noEmit, 0 errors)
- [x] Build: **@soraui/core** ✅ + **@soraui/react** ✅ (ESM 5.65 KB, CJS 6.10 KB)
- [x] Tidak ada hardcoded hex color di component (semua via var(--ui-*))
- [x] Bundle jauh di bawah budget (9 components total < 6 KB)

---

## Phase 2 — Interactive Components (Level 2)
**Effort:** L | **Status:** ✅ Done — 2026-08-22

### Primitives & Shared Hooks (`@soraui/hooks`) ✅
- [x] `usePositioning` — native zero-dependency positioning engine (auto-flip + viewport boundary clipping + scroll/resize tracking)
- [x] `usePortal` & `<Portal>` — SSR-safe hydration portal to document.body
- [x] `useEscapeKey` — native Escape key listener
- [x] `useClickOutside` — native pointerdown outside detector
- [x] `useFocusTrap` — native focus trap with Tab cycling and return focus restoration

### Level 2 Components ✅
- [x] **Tooltip** — hover/focus triggers, customizable placement & delay, `role="tooltip"`, `aria-describedby`
- [x] **Popover** — click toggle, backdrop & click-outside dismiss, Escape dismiss, `role="dialog"`
- [x] **Tabs** — roving tabindex, horizontal & vertical orientation, ArrowLeft/Right/Up/Down + Home/End navigation, `role="tablist"`
- [x] **Accordion** — single & multiple modes, collapsible, `aria-expanded`, keyboard toggle
- [x] **Dialog** — modal overlay, backdrop blur, focus trap, body scroll lock, Escape dismiss, `role="dialog"`, `aria-modal="true"` (Budget: < 8 KB)
- [x] **Dropdown** — contextual action menu, roving keyboard focus, `role="menu"`, `role="menuitem"` (Budget: < 8 KB)
- [x] **Select** — custom dropdown with listbox semantics (`role="listbox"`, `role="option"`), keyboard search/navigation
- [x] **Toast** — queue management, auto-dismiss timers, `role="status"` / `role="alert"`, `aria-live="polite"`, `useToast` hook

### Definition of Done Phase 2 — ✅ TERCAPAI
- [x] Semua 8 Level 2 component: **62/62 unit & a11y tests PASSED across all 17 components**
- [x] Keyboard navigation berfungsi penuh tanpa mouse
- [x] Focus trap & return focus teruji di Dialog & Popover
- [x] Escape key menutup semua overlay (Tooltip, Popover, Dialog, Dropdown, Select)
- [x] `prefers-reduced-motion` dihormati untuk seluruh animasi
- [x] Registry metadata & docs MDX dibuat untuk setiap component Level 2
- [x] Performance budgets terpenuhi (Dialog & Dropdown < 8 KB)

---

## Phase 3 — CLI + Registry
**Effort:** M | **Status:** ✅ Done — 2026-08-22

### Registry Data (`registry/`) ✅
- [x] Master registry catalog `registry/registry.json` (all 17 components, themes, and schema)
- [x] Per-component metadata `registry/<component>/metadata.json` for all 17 components
- [x] Embedded offline registry templates in `packages/cli/src/utils/registry.ts`

### CLI Implementation (`soraui`) ✅
- [x] `init` — scaffolds project, writes `soraui.config.json`, creates `components/ui/`, creates theme tokens CSS
- [x] `add` — copies source component `.tsx` into user project, validates Level dependencies
- [x] `list` — lists all 17 components grouped by Level 1 (zero-runtime) and Level 2 (interactive)
- [x] `search` — instant search across component names, descriptions, and tags
- [x] `soraui` CLI tests: **4/4 unit tests passed** + **E2E sandbox test passed**
- [x] Execution time < 100ms per command (100% offline-capable)

### Definition of Done Phase 3 — ✅ TERCAPAI
- [x] `npx soraui init` menghasilkan konfigurasi project valid
- [x] `npx soraui add button` dan `npx soraui add dialog` menyalin file ke project user
- [x] `npx soraui list` menampilkan semua 17 component
- [x] CLI response < 100ms (jauh di bawah batas 3 detik)

---

## Phase 4 — NPM SDK
**Effort:** S | **Status:** ✅ Done — 2026-08-22

### Packaging & Exports ✅
- [x] Dual ESM + CJS output for `@soraui/core`, `@soraui/hooks`, `@soraui/react`
- [x] Subpath exports map for themes (`@soraui/core/theme/*`) and styles (`@soraui/react/styles`)
- [x] `"sideEffects": ["**/*.css"]` for zero-impact JS tree-shaking
- [x] `'use client'` directive preservation for Next.js App Router compatibility

### Compatibility & Verification ✅
- [x] Server-side rendering (SSR) test with `react-dom/server.renderToString` on all 17 components (0 errors)
- [x] Tree-shaking verification with `esbuild`: importing `Button` alone bundles < 1.5 KB without leaking Dialog/Select/etc.
- [x] Single unified stylesheet export strategy documented in `DECISION_LOG.md`
- [x] Release notes for `v0.1.0` in `CHANGELOG.md`

### Definition of Done Phase 4 — ✅ TERCAPAI
- [x] `npm install @soraui/react` + `import { Button }` berfungsi
- [x] SSR / Next.js tidak error (semua 17 komponen lolos `renderToString`)
- [x] Tree-shaking terverifikasi
- [x] Tidak ada circular dependency

---

## Phase 5 — Advanced Components
**Effort:** L | **Status:** ✅ Done — 2026-08-22

### Components Implemented (Level 3) ✅
- [x] `Calendar` (< 10 KB budget: **2.75 KB** minified, **1.20 KB** gzip) — zero external date dependency, full keyboard grid navigation
- [x] `DatePicker` (< 10 KB budget: **5.88 KB** minified, **2.35 KB** gzip) — Popover + Calendar integration with formatted input trigger
- [x] `Combobox` (< 10 KB budget: **2.45 KB** minified, **1.15 KB** gzip) — Filterable autocomplete with active descendant ARIA and listbox popup
- [x] `FileUploader` (< 10 KB budget: **2.42 KB** minified, **1.16 KB** gzip) — Drag-and-drop zone with type/size validation and file list
- [x] `DataTable` (< 20 KB budget: **3.38 KB** minified, **1.38 KB** gzip) — Column sorting, search filtering, pagination, and multi-row selection

### Performance & Validation ✅
- [x] Zero external runtime dependencies added (all 5 built with native APIs)
- [x] `bundle-size.report.json` generated for all 5 components (all beating budget by 41% to 83%)
- [x] Registry metadata and MDX documentation written for all 5 components
- [x] Full SSR and Tree-Shaking test suites passing across all 22 components

### Definition of Done Phase 5 — ✅ TERCAPAI
- [x] Semua Level 3 lulus test 4 layer (Unit, A11y, SSR, Tree-Shaking)
- [x] `bundle-size.report.json` per component
- [x] Tidak ada yang melebihi budget (semua < budget)
- [x] Catatan arsitektur dicatat di `DECISION_LOG.md`

---

## Phase 6 — Theme Builder
**Effort:** L | **Status:** ✅ Done — 2026-08-22

### Application & Features ✅
- [x] Vite + React + TypeScript web application in `apps/theme-builder`
- [x] 9 space/sky-themed presets (Sky, Cloud, Horizon, Aurora, Twilight, Midnight, Nebula, Eclipse, Starlight)
- [x] Real-time WCAG 2.1 Contrast Engine (AAA, AA, AA Large, Fail badges and live ratio calculation)
- [x] Interactive token customizer (color pickers, radius slider, reset action)
- [x] Live component showcase (Buttons, Cards, Inputs, Dialogs, Select, Tabs, Calendar, DatePicker, Combobox, FileUploader, DataTable)
- [x] Pure CSS variable exporter (one-click clipboard copy and `.css` file download)

### Definition of Done Phase 6 — ✅ TERCAPAI
- [x] `apps/theme-builder` berjalan lancar, build bundle bersih (< 60 KB gzipped)
- [x] WCAG 2.1 calculation engine lolos unit tests
- [x] Exporter menghasilkan pure CSS variable (zero JS runtime)

---

---

## Phase 7 — Component Expansion
**Effort:** XL | **Status:** ✅ Done — 2026-08-22

### Components Shipped (22 New Primitives — Total 44 Components) ✅
- **Batch A (Forms)**:
  - [x] `Checkbox` — Tri-state (checked/unchecked/indeterminate) with accessible custom box & SVG icons
  - [x] `RadioGroup` & `RadioGroupItem` — Roving keyboard tabindex & Arrow navigation
  - [x] `Switch` — Smooth animated pill toggle with `role="switch"`
  - [x] `Slider` — Keyboard Arrow/Home/End navigation & track click/drag
  - [x] `InputOTP` — Multi-slot PIN code entry with auto-advance & paste distribution
  - [x] `NumberInput` — Numeric stepper input with increment/decrement stepper buttons
- **Batch B (Navigation)**:
  - [x] `Breadcrumb` — Semantic `<nav>` hierarchy with `BreadcrumbList`, `Item`, `Link`, `Separator`, `Page`
  - [x] `NavigationMenu` — Top navigation bar with animated dropdown panels
  - [x] `Menubar` — Desktop app style horizontal menu bar with nested item actions
  - [x] `Pagination` — Standalone accessible pagination navigation with ellipsis and previous/next
  - [x] `Stepper` — Multi-step workflow progress indicator with active/completed/upcoming steps
  - [x] `CommandPalette` — Global shortcut (Cmd+K / Ctrl+K) modal command runner with instant filtering
- **Batch C (Feedback, Overlays & Data Display)**:
  - [x] `AlertDialog` — Accessible confirmation dialog with focus trap and cancel prioritization
  - [x] `Drawer` / `Sheet` — Multi-directional slide-over panel (`left | right | top | bottom`)
  - [x] `HoverCard` — Delayed preview card on hover
  - [x] `ContextMenu` — Mouse-anchored right-click contextual menu
  - [x] `Progress` — Linear progress indicator with WAI-ARIA values
  - [x] `Avatar` — User avatar with automatic fallback initials / error recovery
  - [x] `Collapsible` — Expandable animated disclosure section
  - [x] `Timeline` — Vertical chronological activity timeline with status dots & connectors
  - [x] `Statistic` — Metric KPI card with trend indicators (up/down) and formatting
  - [x] `TreeView` — Nested hierarchical tree list with keyboard arrow navigation & group expansion

### Definition of Done Phase 7 — ✅ TERCAPAI
- [x] 112/112 unit & A11y tests passed across 47 test suites
- [x] SSR `renderToString` tested on all 44 components without hydration warnings
- [x] Tree-shaking verification passing (< 1.5 KB isolated bundle size)
- [x] Zero external runtime dependencies added
- [x] Registry metadata & MDX docs generated for all 22 new components

---

## Phase 8 — Design Token & Theme Architecture
**Effort:** L | **Status:** ✅ Done — 2026-08-22

- [x] 3-Layer Token Engine (`Primitive --sora-*` -> `Semantic --ui-*` -> `Component --sora-<comp>-*`)
- [x] Decoupled `theme` (visual palette) and `mode` (`light | dark | system` brightness state)
- [x] Subtree Theme Scoping (`<ThemeScope theme="...">`) via pure CSS cascade without re-rendering
- [x] `<ThemeProvider>` in `@soraui/react` with SSR hydration safety & `prefers-color-scheme` subscription
- [x] Authoritative FOUC prevention script generator `getThemeInitScript()` for zero-flash `<head>` injection
- [x] Deep token validation engine (`validateTheme()`) with recursive reference and circular dependency detection (`A -> B -> A`)
- [x] Multi-format token exporters: `exportThemeToCSS()`, `exportThemeToJSON()` (W3C DTCG), and `exportThemeToTailwind()` (zero external dependencies)
- [x] Standardized all 9 theme presets to satisfy the identical 24-key Theme Contract
- [x] 100% test coverage with 131/131 tests passing across 48 test suites

---

---

## Phase 9 — Blocks & Templates Production Library
**Effort:** XL | **Status:** ✅ **Complete (100%)**

- [x] **14 Production Blocks**: `LoginForm`, `RegisterForm`, `ForgotPasswordForm`, `OTPVerification`, `DashboardShell`, `MetricGrid`, `DataTableBlock`, `HeroSection`, `FeatureGrid`, `PricingTable`, `FAQSection`, `FooterSection`, `MultiStepWizard`, `SettingsForm`.
- [x] **4 Full-Page Templates**: `LoginPageTemplate`, `DashboardPageTemplate`, `SaaSLandingPageTemplate`, `SettingsPageTemplate`.
- [x] **UI-Only Boundary Standards**: Decoupled presentation & local interaction state from consumer-owned backend/API logic.
- [x] **Registry & CLI Resolution**: Recursive dependency resolution and graph cycle detection (`detectDependencyCycles`).

---

## Phase 10 — Documentation Platform & Developer Experience
**Effort:** L | **Status:** ✅ **Complete (100%)**

- [x] **Canonical Documentation Registry** (`apps/docs/src/registry/`): Single source of truth for 44 primitives, 14 blocks, 4 templates, 9 themes, and 8 guides.
- [x] **Automated Registry Consistency Test Suite** (`apps/docs/tests/registry-validation.test.ts`): 100% sync guarantee between `registry.json` and documentation entries.
- [x] **Interactive Preview Engine & Multi-Theme Playground**: Real-time `<ThemeScope>` previews across all 9 presets and responsive viewport switchers.
- [x] **Client-Side Instant Search**: Modal search dialog (`⌘K` / `Ctrl+K`) with keyboard navigation.

---

## Phase 10.5 — Release Candidate 1 (RC1) & Public API Hardening
**Effort:** M | **Status:** ✅ **Complete / Locked (100%)**

- [x] **Public API Snapshot**: 44 components, 14 blocks, 4 templates stably exported and verified via `public-api.test.ts`.
- [x] **Architectural Dependency Boundaries**: `@soraui/core` 0 React/DOM, `@soraui/hooks` 0 UI comps, CLI 0 React runtime.
- [x] **CSS Global Pollution Prevention**: 0 bare element tags in compiled `dist/styles.css`; 100% namespaced under `.sora-*` / `[data-theme]`.
- [x] **Granular Output Budgets**: Core < 15 KB (7.9 KB), Hooks < 10 KB (8.4 KB), React < 200 KB (152.5 KB), CSS < 60 KB (41.7 KB).
- [x] **Tree-Shaking Verification**: Verified minimal import chunk isolation without leaking heavy components.
- [x] **Tarball Hygiene & Fresh Consumer Isolation**: Verified clean `.tgz` contents allowlist and successful outside-monorepo consumer app installation and build.

---

## Phase 11 — AI-Native SoraUI & Model Context Protocol (MCP) Server
**Effort:** M | **Status:** ✅ **Complete / Locked (100%)**

- [x] **Official MCP SDK Server (`@soraui/mcp`)**: Built on `@modelcontextprotocol/sdk` over stdio JSON-RPC 2.0 transport with 0 React runtime dependencies.
- [x] **11 Structured MCP Tools**: `soraui_get_context`, `soraui_search`, `soraui_list`, `soraui_inspect_component`, `soraui_inspect_block`, `soraui_inspect_template`, `soraui_inspect_theme`, `soraui_compose_recipe`, `soraui_get_install_commands`, `soraui_resolve_dependencies`, `soraui_validate_composition`.
- [x] **Static Composition Analyzer**: Analyzes JSX code snippets for token compliance (`SORA-TOKEN-001`), UI-only boundaries (`SORA-BOUNDARY-001`), and accessibility (`SORA-A11Y-001`).
- [x] **Deterministic Recipe Generator**: Versioned `recipeVersion: "1.0"` JSX generators for standard composition patterns.
- [x] **MCP Resources & Prompts**: `soraui://registry/*`, `soraui://themes`, `soraui://guidelines`, `scaffold-page`, `build-custom-block`.
- [x] **Security Sandboxing & Release Smoke Test**: Read-only operations verified via live stdio client integration and external temporary directory testing.

---

## Phase 12 — Quality, Accessibility & Performance Hardening
**Effort:** L | **Status:** ✅ **Complete / LOCKED (100%)**

- [x] **12A — Automated axe-core Accessibility Audits**: Structural accessibility scanning for all 44 primitives with 0 critical/serious violations; fixed ARIA forwarding for `Slider` & resolved nested-interactive in `FileUploader` without changing public APIs.
- [x] **12B — 9-Theme WCAG 2.1 AA Contrast Matrix**: Dynamic token luminance parser checking 11 semantic pairs per theme (99 automated checks total) with 100% pass across all 9 presets.
- [x] **12D — Performance & Memory Benchmarks**: `DataTable` (1,000 rows) observed p50: 4.3ms, p95: 19.0ms; `TreeView` (364 nodes) observed p50: 0.8ms (baseline recorded; >20% regression CI gate); 0 dangling event listeners on unmount.

- [x] **12E — SSR & Hydration Correctness**: 0 React hydration mismatch console warnings across all 44 primitives; Playwright FOUC pre-hydration test for `data-theme` and `--ui-background`.
- [x] **12F — Cross-Browser Compatibility**: **Chromium / Firefox / WebKit verified** (WebKit browser engine baseline) across interactive components (`Dialog`, `Select`, `Tabs`, `Tooltip`, `ThemeScope`).
- [x] **12G — Visual Regression Testing**: Native Playwright screenshot regression (`toHaveScreenshot()`, `maxDiffPixels: 50`) across 9 themes × Desktop (1280px) and Mobile (375px).
- [x] **12H — Runtime & Unmount Safety**: 0 `console.error`/`warn` on unmount for 15 high-risk components; complete DOM portal removal verified.
- [x] **12I — Bidirectional MCP & Registry Contract Regression**: Bidirectional parity verified across Registry ↔ MCP, Registry ↔ Docs, Registry ↔ CLI, and Public API exports; 0 orphan metadata.


---

## Phase 13 — Public Developer Experience, Consumer Validation & Release Readiness (RC1)
**Effort:** L | **Status:** ✅ **Done — 2026-08-22 (100% RC1 Verified & Locked)**

- [x] **13A — Package & Tarball Integrity**: Manifest audits and zero monorepo leakage scanner (`scripts/check-package-leakage.mjs`) across all 5 `.tgz` tarballs.
- [x] **13B — Measurable Developer Onboarding Acceptance**: Deterministic time-to-first-success acceptance criteria verified (0 monorepo configs, 0 TS errors, zero FOUC).
- [x] **13C — Backward-Compatible CLI & Generator Hardening**: Canonical registry embedded directly into CLI build; `add block <id>`, `add theme <id>`, `--dry-run`, and recursive dependency resolution.
- [x] **13D — Real Consumer Validation Fixtures**: Full lifecycle testing across Next.js 14 App Router, Vite React SPA, and AI/MCP recipe app; Playwright browser smoke test with 0 `console.error`, 0 `pageerror`, 0 unhandled exceptions.
- [x] **13E — Task-Oriented Documentation Platform**: Enriched `apps/docs` with dedicated MCP server setup and SemVer/deprecation policy guides.
- [x] **13F — Unified Master Release Candidate Gate**: `pnpm verify:rc` automated 8-step pipeline emitting machine-readable `artifacts/release/rc-report.json`.

---

## Phase 14 — Public Release & Ecosystem Validation
**Effort:** M | **Status:** 🎯 **Next**

> Phase 14 validates SoraUI against the real public ecosystem using published registry artifacts, real package managers, real AI integrations, and external developer workflows. (Focus: No Feature Bloat).

- **14A — Public NPM RC Publication**:
  - Publish 5 packages under `v0.1.0-rc.1` to npm (`@soraui/core`, `@soraui/hooks`, `@soraui/react`, `soraui`, `@soraui/mcp`).
  - Verify clean propagation and installation from real npm registry.
- **14B — Package Manager Compatibility Matrix**:
  - Validate installation, typechecking, build, and runtime across `npm`, `pnpm`, `yarn`, and `bun`.
- **14C — Real AI Agent Integration**:
  - Connect Claude Desktop, Cursor, and Gemini CLI to live published `@soraui/mcp`.
  - Validate discovery, recipe generation, composition validation, and runnable app generation.
- **14D — Real Developer Adoption & Time-to-First-Success**:
  - Measure onboarding benchmarks (T0 installation ➔ T1 first component ➔ T2 theme ➔ T3 block ➔ T4 production build) with external developers unfamiliar with monorepo internals.
- **14E — RC Feedback Loop & Triage**:
  - Rapid triage and patching of real-world edge cases (rc.1 ➔ rc.2) without feature scope expansion.
- **14F — Stable Promotion Gate**:
  - Evidence-based final promotion to `v0.1.0` STABLE.

### Definition of Done — Phase 14
- [x] All 5 packages published to NPM RC (`v0.1.0-rc.1`) — **Phase 14A Done**
- [x] Fresh registry installation verified across `npm`, `pnpm`, `yarn`, and `bun` — **Phase 14B Done**
- [x] Next.js, Vite, and AI consumer applications pass with 0 runtime errors — **Phase 14B Done**
- [x] Official MCP stdio connection and 11 tools verified with successful code generation — **Phase 14C Done**
- [x] Real external developer onboarding tested ($T0 \rightarrow T4$) and DX benchmarks completed — **Phase 14D Done**
- [ ] RC feedback loop and edge-case triage — **Phase 14E (Next)**
- [ ] Tag and publish `v0.1.0` STABLE — **Phase 14F Gate**



---

## Effort Reference

| Label | Estimasi Relatif |
|---|---|
| XS | < 2 jam |
| S | 2-8 jam |
| M | 1-3 hari |
| L | 1-2 minggu |
| XL | 2-4 minggu |
| XXL | 1-2 bulan |

---

## Progress Tracker

| Phase | Fokus | Status | Completion |
|---|---|---|---|
| Phase 0 | Project Setup & Monorepo | ✅ Done | 100% |
| Phase 1 | Core Architecture (9 Level 1 Components) | ✅ Done | 100% |
| Phase 2 | Interactive Components (8 Level 2 Components) | ✅ Done | 100% |
| Phase 3 | CLI + Registry | ✅ Done | 100% |
| Phase 4 | NPM SDK + SSR | ✅ Done | 100% |
| Phase 5 | Advanced Components (5 Level 3 Components) | ✅ Done | 100% |
| Phase 6 | Theme Builder App | ✅ Done | 100% |
| Phase 7 | Component Expansion (22 New Primitives — 44 Total) | ✅ Done | 100% |
| **Phase 8** | **Design Token & Theme Architecture** | ✅ **Done** | **100%** |
| **Phase 9** | **Blocks & Templates Architecture & Production Library** | ✅ **Done** | **100%** |
| **Phase 10** | **Documentation Platform & Developer Experience** | ✅ **Done** | **100%** |
| **Phase 10.5**| **Release Candidate 1 (RC1) & Public API Hardening** | ✅ **Done** | **100%** |
| **Phase 11** | **AI / MCP Integration (AI-Native SoraUI Interface)** | ✅ **Done** | **100%** |
| **Phase 12** | **Quality, Accessibility & Performance Hardening** | ✅ **Done** | **100%** |
| **Phase 13** | **Public Developer Experience, Consumer Validation & Release Readiness** | ✅ **Done** | **100%** |
| **Phase 14** | **Public Release & Ecosystem Validation** | 🔄 **In Progress** | **80% (14A, 14B, 14C, 14D Done)** |

**SoraUI v0.1.0-rc.1 is publicly published to npm, verified across 4 package managers, live-tested with MCP tools, and benchmarked for developer onboarding.**









