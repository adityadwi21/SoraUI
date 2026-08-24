# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-24

### Phase 14G: Documentation Platform Redesign, Universal Lucide Iconography & Multi-Framework Guides (COMPLETED)

- **Universal `lucide-react` Icon Migration**:
  - Replaced all ad-hoc unicode symbols, emojis, and raw SVG paths with `lucide-react` icons across the entire monorepo:
    - Primitives: `Accordion` (`ChevronDown`), `Select` (`ChevronDown`, `Check`), `Combobox` (`Check`), `Statistic` (`TrendingUp`, `TrendingDown`), `NumberInput` (`ChevronUp`, `ChevronDown`), `Stepper` (`Check`), `DataTable` (`ArrowUp`, `ArrowDown`, `ArrowUpDown`), `Checkbox` (`Check`, `Minus`), `Calendar` (`ChevronLeft`, `ChevronRight`), `DatePicker` (`Calendar`, `X`), `Toast` (`X`), `FileUploader` (`UploadCloud`, `X`), `Pagination` (`ChevronLeft`, `ChevronRight`, `MoreHorizontal`), `Breadcrumb` (`ChevronRight`), and `TreeView` (`ChevronDown`, `ChevronRight`).
    - Blocks & Templates: `MetricGrid` (`TrendingUp`, `TrendingDown`), `PricingTable` (`Check`), `FooterSection` (`Check`), `SettingsForm` (`Check`).
    - Docs & Manual Sources: `BlockPage`, `TemplatePage`, `manual-source.ts`, `PackageManagerBlock`, `ViewportSwitcher`, `CodeBlock`.
- **Viewport Switcher & Preview Toolbar Overhaul**:
  - Removed obsolete Tablet mode; refined to a clean dual-mode switcher (`Desktop` and `Mobile`).
  - Viewport switcher positioned in the exact horizontal center of the preview toolbar (`.docs-preview-toolbar-center`).
- **Expandable Code Block Redesign**:
  - Introduced expandable code blocks with language badge indicators (`TS`, `JS`, `CSS`, `JSON`, `SH`), lowercase filenames, high-contrast top Expand toggle, and bottom gradient fade overlay with a centered rounded Expand button.
- **Dedicated Framework Guides**:
  - Added comprehensive step-by-step guides for Next.js, Vite, Laravel Inertia React, React Router v7 / Remix, Astro Island architecture, and Manual pure React setup.
- **Full Docs UI/UX Overhaul (`apps/docs`)**:
  - Redesigned `docs-layout.tsx` with a modern 3-column layout (Sidebar 240px + Content + Sticky TOC 230px) that is fully responsive and edge-to-edge.
  - Standardized Copy Page markdown and quick navigation header actions across all documentation pages.
- **Dark Mode Instant Toggle (0ms Lag Fix)**:
  - Removed global 280ms transition on background switches; dark mode now toggles with 0ms latency and sharp instant contrast.
- **Select & Dropdown Portal Theme Fix**:
  - Fixed `SelectContent` and `DropdownContent` dark mode to inherit `data-theme` and `data-mode` from trigger context, rendering correct dark backgrounds without white flash.
- **Build Status**: `pnpm build`: 8/8 tasks successful. `tsc --noEmit`: 0 errors monorepo-wide.

## [0.1.0-rc.2] - 2026-08-22

### Phase 14E: RC Feedback Triage & Hardening (COMPLETED)
- **Public Repository Metadata Synchronization**:
  - Updated repository and homepage URLs across all package manifests (`@soraui/core`, `@soraui/hooks`, `@soraui/react`, `@soraui/cli`, `@soraui/mcp`) and docs to `https://github.com/adityadwi21/SoraUI.git`.
  - Published live to public NPM registry under `--tag rc --access public`.
- **Ecosystem & Build Verification**:
  - Verified 100% build success and typecheck across all 5 packages.
  - Zero breaking changes to public APIs.

## [0.1.0-rc.1] - 2026-08-22

### Phase 14D: Real Developer Adoption Benchmark (T0 -> T4) (COMPLETED)
- **Deterministic Out-of-the-Box Onboarding Suite**:
  - Automated developer adoption benchmark (`scripts/test-developer-adoption-benchmark.mjs` / `pnpm test:adoption-benchmark`) simulating end-to-end onboarding from blank project to production runtime in isolated OS temporary directories.
  - Measured milestones across 4 package managers (`npm`, `pnpm`, `yarn`, `bun`) and the official CLI:
    - **T0 (Project Init)**: Clean Vite + React + TS project created in 0.1s - 0.7s.
    - **T1 (Registry Installation)**: `@soraui/react@0.1.0-rc.1`, `@soraui/core@rc`, `@soraui/hooks@rc` installed directly from `registry.npmjs.org` in 0.4s - 4.8s.
    - **T2 (First Primitive)**: `<Button />` + zero-runtime CSS import compiled & typechecked in 0.1s - 1.3s.
    - **T3 (Realistic UI)**: `<ThemeProvider />`, `<ThemeScope />`, `Card`, `Input`, `Dialog`, `DataTable` multi-component composition typechecked with zero errors in 0.1s - 1.3s.
    - **T4 (Production Build & Browser Smoke)**: Bundled via Vite and validated via Playwright headless browser with **0 console errors, 0 page errors, 0 unhandled rejections** in 1.8s - 3.3s.
  - Overall Total Onboarding Time: **npm (11.2s)**, **pnpm (7.5s)**, **yarn (9.1s)**, **bun (2.6s)**, **CLI (3.9s)**.
  - Emitted machine-readable benchmark report: `artifacts/release/adoption-benchmark-report.json`.

### Phase 14C: Real AI Coding Agent & MCP Live Protocol Validation (COMPLETED)

- **Live MCP stdio Protocol & 11 Tool Verification**:
  - Live stdio validation runner (`scripts/test-ai-agent-mcp-validation.mjs` / `pnpm test:ai-agent-mcp`) connecting directly to the public `@soraui/mcp@0.1.0-rc.1` npm package (`npx -y @soraui/mcp@0.1.0-rc.1`) using the official Model Context Protocol (MCP) Client SDK.
  - Successfully verified all 11 MCP tools: `soraui_get_context`, `soraui_search`, `soraui_list`, `soraui_inspect_component`, `soraui_inspect_block`, `soraui_inspect_template`, `soraui_inspect_theme`, `soraui_compose_recipe`, `soraui_get_install_commands`, `soraui_resolve_dependencies`, `soraui_validate_composition`.
  - Executed 6 realistic AI coding agent scenarios (Context onboarding, component inspection, token/theme queries, block dependency resolution, JSX recipe generation & static audit, CLI install command generation) with 100% PASS.
  - Transparently audited host agent installation status: Claude Desktop (`NOT AVAILABLE`), Cursor (`NOT AVAILABLE`), Gemini CLI (`NOT AVAILABLE`), Official MCP Reference Host (`PASS`).
  - Emitted machine-readable matrix report: `artifacts/release/ai-agent-matrix-report.json`.

### Phase 14B: Package Manager Compatibility Matrix (npm, pnpm, yarn, bun) (COMPLETED)

- **Live Registry Multi-Package Manager Matrix**:
  - Automated compatibility test suite (`scripts/test-package-managers-matrix.mjs` / `pnpm test:pm-matrix`) validating all 5 packages installed directly from `registry.npmjs.org` in isolated OS tempdirs.
  - Successfully verified installation variants (`@0.1.0-rc.1`, `@rc`, default untagged), TypeScript compilation (`tsc --noEmit`), Vite production bundling (`vite build`), Playwright browser runtime smoke testing (0 console/page errors), CLI live execution (`npx @soraui/cli@rc --help`), and MCP package entrypoints.
  - 100% PASS across all 4 major package managers:
    - **npm** (v11.6.2): 100% PASS
    - **pnpm** (v9.7.0): 100% PASS
    - **yarn** (v1.22.22): 100% PASS
    - **bun** (v1.4.0): 100% PASS
  - Emitted machine-readable matrix report: `artifacts/release/pm-matrix-report.json`.

### Phase 14A: Public NPM RC Publication (COMPLETED & LIVE)

- **Public NPM Distribution**:
  - Published all 5 packages to the public npm registry under the `@soraui/*` scope with `rc` dist-tag:
    - `@soraui/core@0.1.0-rc.1` (Design tokens & 9 space theme presets)
    - `@soraui/hooks@0.1.0-rc.1` (Accessible React primitives & focus/portal hooks)
    - `@soraui/react@0.1.0-rc.1` (44 accessible UI components, zero-runtime CSS)
    - `@soraui/cli@0.1.0-rc.1` (Official CLI generator & template installer via `npx @soraui/cli`)
    - `@soraui/mcp@0.1.0-rc.1` (Model Context Protocol stdio server with 11 tools)
  - Configured `"publishConfig": { "access": "public", "tag": "rc" }` across all package manifests.
  - Verified package authenticity, tarball integrity, and zero monorepo leakage on npmjs.com.

### Phase 13: Public Developer Experience, Consumer Validation & Release Readiness (RC1) (LOCKED)

- **13A: Package & Tarball Integrity (Zero Monorepo Leakage)**:
  - Standardized NPM manifest publishing metadata across all 5 publishable packages (`@soraui/core`, `@soraui/hooks`, `@soraui/react`, `soraui`, `@soraui/mcp`).
  - Automated tarball leakage scanner (`scripts/check-package-leakage.mjs`) verifying 0 instances of `workspace:`, `file:`, `../../`, and local path leakage across unpacked `.tgz` archives.
  - Standalone tarball installation smoke test (`scripts/test-package-tarballs.mjs`) proving clean compilation in an external isolated tempdir.
- **13B: Measurable Developer Onboarding Acceptance**:
  - Deterministic time-to-first-success acceptance criteria: blank app -> tarball installation -> single-line CSS import -> pre-hydration theme initialization -> production build with 0 warnings/errors.
- **13C: Backward-Compatible CLI & Generator Hardening**:
  - Embedded canonical registry directly into CLI distribution with zero registry drift.
  - Multi-component addition (`npx soraui add <component...>`) with recursive dependency graph resolution.
  - Added `npx soraui add block <id>` and `npx soraui add theme <id>`.
  - Added `--dry-run` simulation flag and deterministic `--overwrite` handling.
- **13D: Real Consumer Validation Fixtures & Browser Runtime Safety**:
  - Created 3 production-grade fixtures under `examples/` (`examples/nextjs-app`, `examples/vite-react-app`, `examples/ai-generated-app`).
  - Automated test runner (`scripts/test-consumer-fixtures.mjs`) verifying tarball installation, typechecking, production build, server startup, and Playwright browser smoke test with 0 `console.error`, 0 `pageerror`, and 0 unhandled exceptions.
- **13E: Task-Oriented Documentation Platform**:
  - Enriched `apps/docs` with dedicated Model Context Protocol (MCP) and Semantic Versioning policy guides.
- **13F: Unified Master Release Candidate Gate (`pnpm verify:rc`)**:
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
- **Component Expansion (Phase 7: 22 New Primitives, Total 44 Components)**:
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
  - **Phase 9A: Block Standards, Registry Schema & CLI Dependency Resolution**:
    - Defined type-safe `BlockMetadata` and `TemplateMetadata` schemas.
    - Versioned registry schema (`registry.schema.json`) with isolated namespaces: `components`, `blocks`, and `templates`.
    - Deterministic dependency resolution (`Template -> Blocks -> Components -> Tokens`) with automated circular dependency detection.
  - **Phase 9B: Production Block Library (Zero External Runtime Dependencies)**:
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
    - Vite-powered, responsive developer platform with isolated `<ThemeScope>` previews and instant viewport switcher (Desktop `100%`, Mobile `375px`).
    - Canonical Documentation Registry (`apps/docs/src/registry/`): single source of truth for 44 primitive components, 14 production blocks, 4 full-page templates, 9 theme presets, and 8 framework/theming guides.
    - Automated registry consistency validation test suite (`apps/docs/tests/registry-validation.test.ts`) guaranteeing 100% sync between `registry.json` and documentation entries with zero orphans or duplicates.
  - **Interactive Documentation**:
    - 44 Primitive Component Pages: Live previews, copy-paste snippets (CLI vs NPM), prop reference tables, keyboard interaction matrices, WAI-ARIA roles, CSS tokens, and direct GitHub source links.
    - 14 Production Block Pages: Interactive previews, UI-only boundary matrix ("SoraUI Handles" vs "Your App Handles"), dependency badges, and CLI installation commands.
    - 4 Full-Page Template Pages: Interactive live previews, composed block lists, and complete layout source code.
    - Interactive Multi-Theme Playground (`/playground`): Real-time root theme selector and nested `<ThemeScope>` card simulator demonstrating pure CSS cascade theming.
  - **Instant Search**: Client-side modal search index (`Cmd+K` / `Ctrl+K`) with keyboard arrow navigation covering all components, blocks, templates, themes, and guides.
  - **Core Guides**: "Own Your UI" manifesto, Installation & CLI workflows, 3-Layer Theming Architecture, 9 Presets Gallery, Next.js App/Pages Router setup (RSC boundaries & zero-FOUC init script), Vite SPA setup, and migration mappings from Radix UI & shadcn/ui.
  - **Bundle Size Budget**: Verified package budget assertions (< 200 KB total unminified ESM, < 60 KB consolidated CSS stylesheet) via `packages/react/tests/bundle-size.test.ts`.
  - **Full Pipeline Verification**: 19/19 Turbo tasks green across all packages and applications.
- **Release Candidate & Public API Audit (Phase 10.5: RC1 Locked)**:
  - Strictly verified 44/44 primitives, 14/14 blocks, and 4/4 templates exported by name from `@soraui/react` matching canonical `registry.json`.
  - Architectural dependency boundaries verified: `@soraui/core` 100% free of React imports, `@soraui/hooks` UI-independent, `soraui` CLI free of React runtime.
  - CSS namespacing audit: 0 un-namespaced bare global element selectors in compiled `dist/styles.css`.
  - Granular bundle budgets verified: Core < 15 KB, Hooks < 10 KB, React < 200 KB, CSS < 60 KB.
  - Package tarball allowlists validated for all 4 packages with 0 leakage.
- **AI-Native SoraUI & Model Context Protocol (MCP) Server (Phase 11: Complete & Locked)**:
  - Built on `@modelcontextprotocol/sdk` (v1.30+) implementing JSON-RPC 2.0 stdio transport.
  - 11 structured tools: `soraui_get_context`, `soraui_search`, `soraui_list`, `soraui_inspect_component`, `soraui_inspect_block`, `soraui_inspect_template`, `soraui_inspect_theme`, `soraui_compose_recipe`, `soraui_get_install_commands`, `soraui_resolve_dependencies`, `soraui_validate_composition`.
  - Resources (`soraui://registry`, `soraui://themes`, `soraui://guidelines`) and prompt templates (`scaffold-page`, `build-custom-block`).
  - Read-only sandboxed runtime with path traversal protection.
- **Quality, A11y & Performance Hardening (Phase 12: COMPLETE & LOCKED)**:
  - Automated `axe-core` accessibility testing with 0 critical/serious violations across all 44 primitives.
  - Automated theme contrast matrix (9 Themes x 11 Token Pairs = 99 Checks) validating WCAG 2.1 AA ratios.
  - Focus trap, roving tabindex, and keyboard navigation hardening.
  - SSR and hydration correctness verified with zero hydration mismatches and zero-FOUC.
  - Cross-browser rendering verified on Chromium, Firefox, and WebKit.
  - Visual regression testing with `maxDiffPixels: 50` across Desktop and Mobile viewports.
  - 21/21 Turborepo tasks passing.
