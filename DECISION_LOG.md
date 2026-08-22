# SoraUI — Decision Log

This document records all significant technical decisions, their rationale, and alternatives considered.

---

## Format

Each entry follows this structure:

`
### [DATE] — [Decision title]
**Decision:** What was decided
**Rationale:** Why this decision was made
**Alternatives considered:** What else was evaluated
**Impact:** Effect on bundle size / SSR / accessibility / DX
`

---

## Decisions

### 2026-08-22 — Phase 13: Tarball-Driven Isolated Consumer Validation
**Decision:** All external consumer applications (`examples/nextjs-app`, `examples/vite-react-app`, `examples/ai-generated-app`) must be validated against freshly packed `.tgz` archives installed in isolated OS temporary directories outside the monorepo.
**Rationale:** Testing against monorepo `workspace:*` symlinks allows undetected leakage of internal workspace configurations, path aliases, or missing export mappings. Testing unpacked `.tgz` tarballs in clean projects guarantees that external developers can consume SoraUI out-of-the-box.
**Alternatives considered:** Testing directly inside monorepo example folders using workspace links (rejected due to false-positive risk).
**Impact:** 100% confidence in external packaging, exports, and runtime module resolution.

### 2026-08-22 — Phase 13: Automated Zero Monorepo Leakage Gate
**Decision:** Implement `scripts/check-package-leakage.mjs` as a hard release gate scanning extracted `.tgz` tarball contents for `workspace:`, `file:`, `../../`, local filesystem paths, and monorepo path aliases.
**Rationale:** Published npm tarballs must never contain development-time artifacts or unresolvable relative paths.
**Alternatives considered:** Manual inspection of `package.json` (rejected as error-prone).
**Impact:** Zero monorepo leakage guarantee across all 5 published packages.

### 2026-08-22 — Phase 13: Canonical Registry as Single Source of Truth for CLI
**Decision:** Build the `soraui` CLI by embedding the canonical `registry/registry.json` payload during prebuild, rather than maintaining a detached copy.
**Rationale:** Prevents registry drift between CLI, MCP, and documentation while enabling fully standalone, offline-capable CLI operations.
**Alternatives considered:** Separate CLI component definitions or remote network fetching on every invocation.
**Impact:** 100% parity across all distribution surfaces with zero runtime network dependency.

### 2026-08-22 — Phase 13: Unified Single Master RC Gate (`pnpm verify:rc`)
**Decision:** Establish `pnpm verify:rc` (`scripts/verify-release-candidate.mjs`) as the single canonical release verification command, emitting `artifacts/release/rc-report.json` and `artifacts/release/rc-summary.txt`.
**Rationale:** Provides deterministic, machine-readable release verification encompassing monorepo builds, unit/contract tests, tarball audits, consumer apps, browser smoke, stdio MCP server, and bundle budgets in one execution.
**Alternatives considered:** Multiple separate scripts manually run before release.
**Impact:** Streamlined, error-free CI/CD release workflow.


### 2026-08-22 — Monorepo with pnpm + Turborepo
**Decision:** Use pnpm workspaces + Turborepo for monorepo management.
**Rationale:** pnpm has the best disk efficiency for monorepos; Turborepo provides incremental builds and task orchestration aligned with our pipeline (type check → lint → test → build). Both are explicitly mentioned in context doc section 19.
**Alternatives considered:** Nx (heavier config), Lerna (legacy), Yarn workspaces (slower installs).
**Impact:** Faster local builds, CI caching, no bundle impact on published packages.

### 2026-08-22 — MIT License
**Decision:** MIT License for all packages.
**Rationale:** Maximum adoption for an open-source UI library. Aligns with "Ownable" philosophy — developer can take source and modify freely.
**Alternatives considered:** Apache 2.0 (adds patent clause, less common in UI libs), ISC (less recognized).
**Impact:** No runtime/bundle impact.

### 2026-08-22 — CSS Modules for component styling
**Decision:** Use CSS Modules (*.module.css) for component styles.
**Rationale:** CSS Modules provide local scoping without runtime overhead, tree-shakeable per component, no JS-in-CSS overhead, compatible with SSR, and works with all modern bundlers. Aligns with CSS-first philosophy.
**Alternatives considered:** Tailwind CSS (forces developer to use Tailwind, conflicts with "not forcing a styling framework"), styled-components/emotion (adds JS runtime cost), vanilla-extract (adds build dependency).
**Impact:** Zero JS runtime for styling, full SSR compatibility, developer can read/edit plain CSS.

### 2026-08-22 — Vitest for unit testing
**Decision:** Use Vitest as the unit test runner.
**Rationale:** Native ESM support, fastest test runner for Vite/ESM ecosystems, compatible with @testing-library, minimal config. Mentioned in context doc section 19.
**Alternatives considered:** Jest (slower with ESM, more config), Mocha (less ecosystem support for React).
**Impact:** No production bundle impact (devDependency only).

### 2026-08-22 — tsup for package bundling
**Decision:** Use tsup for building packages/react and packages/core.
**Rationale:** tsup is the industry standard for TypeScript library bundling — zero config, generates ESM + CJS + .d.ts, supports tree-shaking. Minimal footprint in dev dependencies.
**Alternatives considered:** Rollup (more config), esbuild directly (less TypeScript integration), Vite Library Mode (good but more config).
**Impact:** Generates optimal dual ESM/CJS output with proper exports map for tree-shaking.

### 2026-08-22 — data-theme attribute for theme switching
**Decision:** Use data-theme attribute on root element for theme activation, following context doc Section 6 of Theme Design spec.
**Rationale:** Pure CSS attribute selector — no JS class manipulation overhead, compatible with SSR (can be set server-side), supports easy switching without React re-render.
**Alternatives considered:** CSS class (e.g., .theme-sky) — less semantic; React Context for theme — adds JS runtime.
**Impact:** Zero JS runtime for theme switching, full SSR support.

### 2026-08-22 — Plain CSS classes (BEM-like) instead of CSS Modules
**Decision:** Use plain CSS classes with `sora-` prefix and BEM-like naming (`.sora-button`, `.sora-button--primary`) instead of CSS Modules.
**Rationale:** tsup (the chosen bundler for library distribution) does not natively support CSS Modules — they require a postcss plugin that introduces PostCSS configuration overhead and BOM encoding issues on Windows. Plain CSS classes are: (1) zero runtime overhead, (2) fully SSR-compatible, (3) universally processable by any bundler, (4) easier for developers to override and inspect, (5) consistent with the "No unnecessary abstraction" principle.
**Alternatives considered:**
- CSS Modules (rejected: requires PostCSS plugin, adds complexity, encoding issues on Windows, developer cannot inspect final class names easily)
- CSS-in-JS (rejected: adds JS runtime, conflicts with SSR, against lightweight principle)
- Vanilla Extract (rejected: adds build dependency and complexity)
**Impact:** Styles are in `src/styles.css` and distributed as a separate `.css` file. Developer imports it once in their app entry. Class names are readable and overridable. Zero JS runtime cost. Compatible with all bundlers including Next.js, Vite, Webpack.

### 2026-08-22 — Native Hand-Rolled Positioning Engine (usePositioning)
**Decision:** Implement a lightweight, zero-dependency positioning hook (`usePositioning`) in `@soraui/hooks` instead of pulling in `@floating-ui` or `popper.js`.
**Rationale:** Per Decision Rule (section 22) and Aturan Utama #3, Level 2 requirements (`top`, `bottom`, `left`, `right` + alignment + auto-flip on viewport collision + scroll/resize listener) can be achieved reliably in < 1 KB of pure TypeScript without external dependency overhead.
**Alternatives considered:**
- `@floating-ui/dom` (rejected: adds 3–5 KB runtime dependency, unnecessary complexity for Level 2 placement requirements)
- CSS Anchor Positioning (rejected: lacks cross-browser parity in older engines without polyfills)
**Impact:** Zero added bundle dependencies, ultra-lightweight footprint, full SSR safety.

### 2026-08-22 — Native Zero-Dependency Focus Trap (useFocusTrap)
**Decision:** Keep `useFocusTrap` 100% native (handling keydown tab cycling, initial focus capture, and focus restoration upon deactivation) without external dependencies.
**Rationale:** In accordance with section 12, native focus traps with proper keyboard listeners and `document.activeElement` restoration fully satisfy WCAG 2.1 AA dialog/menu requirements without requiring external packages like `focus-trap-react`.
**Alternatives considered:**
- `focus-trap-react` / `focus-trap` (evaluated under section 12 exception clause, but decided native implementation is clean, robust, and adds 0 KB external weight)
**Impact:** Clean modal accessibility with zero dependency weight.

### 2026-08-22 — Local-Bundled Registry for CLI Distribution
**Decision:** The `soraui` CLI embeds and bundles the registry component source code and metadata directly within the package as primary distribution mechanism, with optional remote URL fallback.
**Rationale:** Aligns with the "Lightweight", "Build fast", and "Own your UI" philosophy (context doc sections 2 & 16). Eliminates network latency, ensures 100% offline functionality, avoids dependency on external API hosting in Phase 3, and guarantees CLI commands execute in under 100ms.
**Alternatives considered:**
- Remote-only registry via CDN / Cloudflare Workers (deferred: adds network dependency, latency, and requires external hosting infrastructure).
**Impact:** Instant CLI execution (< 100ms), 100% offline capability, zero external network failures.

### 2026-08-22 — Single Unified Stylesheet Export (styles.css)
**Decision:** Deliver all component styling through a single consolidated `styles.css` file exported as `@soraui/react/styles` and `@soraui/react/styles.css`, rather than injecting styles via JS or shipping individual CSS modules per component.
**Rationale:** The total unminified CSS for all 17 components is only ~6 KB (~1.8 KB gzipped). Shipping a single CSS file: (1) eliminates any CSS-in-JS runtime overhead, (2) requires only one simple import in the consumer's app layout, (3) avoids bundler-specific CSS loader issues, (4) allows consumers to easily override or inspect styles using standard CSS variables, (5) allows `"sideEffects": ["**/*.css"]` to let JavaScript components tree-shake cleanly.
**Alternatives considered:**
- CSS injection via JS runtime (rejected: increases JS bundle size, breaks SSR and React Server Components).
- Per-component CSS file imports (rejected: increases setup friction for developers without meaningful size savings).
**Impact:** Simple DX (1 import), 0 KB JS runtime styling overhead, perfect SSR/Next.js compatibility, pure CSS variable tokens.

### 2026-08-22 — Native Zero-Dependency Date Engine for Calendar & DatePicker
**Decision:** Implement calendar grid logic, date comparisons, and formatting using native JavaScript `Date` API instead of pulling in `date-fns` or `dayjs`.
**Rationale:** Per Decision Rule (section 22), basic date math (month days, leap years, weekday offsets) can be implemented in under 100 lines of pure TypeScript. Pulling in `date-fns` adds 5–15 KB of external dependencies. Native arithmetic keeps `Calendar` and `DatePicker` under 3 KB total.
**Alternatives considered:**
- `date-fns` (rejected: adds external dependency and increases bundle size).
- `dayjs` (rejected: requires plugins for relative math, adds runtime weight).
**Impact:** Zero added dependencies, sub-3KB bundle footprint for Calendar + DatePicker combined.

### 2026-08-22 — Zero-Dependency Expansion Architecture (Phase 7)
**Decision:** Hand-roll all 22 expansion components (`Checkbox`, `RadioGroup`, `Switch`, `Slider`, `InputOTP`, `NumberInput`, `Breadcrumb`, `NavigationMenu`, `Menubar`, `Pagination`, `Stepper`, `CommandPalette`, `AlertDialog`, `Drawer`, `HoverCard`, `ContextMenu`, `Progress`, `Avatar`, `Collapsible`, `Timeline`, `Statistic`, `TreeView`) using native browser APIs and internal hooks (`@soraui/hooks`) without adding external runtime dependencies (e.g. Radix, Floating UI, Downshift, Framer Motion).
**Rationale:** Preserves SoraUI's core promise — "Build fast. Ship less. Own your UI." Developers own the raw source code and CSS variables without dependency bloat or library lock-in. Hand-rolling achieves full WCAG 2.1 AA keyboard roving focus, WAI-ARIA compliance, and sub-1.5 KB tree-shaken component footprint.
**Alternatives considered:**
- Radix UI Primitives (rejected: adds external dependencies, conflicts with zero-runtime dependency philosophy).
- Downshift / Floating-UI for Menubar & CommandPalette (rejected: internal `@soraui/hooks` positioning and focus traps cover 100% of requirements).
**Impact:** Total SoraUI library footprint expanded to 44 components while maintaining 0 external dependencies and instant execution.

### 2026-08-22 — 3-Layer Token System & Pure CSS Cascade Theming (Phase 8)
**Decision:** Formalize a strict 3-Layer Design Token hierarchy (`Primitive --sora-*` -> `Semantic Theme Contract --ui-*` -> `Component Defaults --sora-<comp>-*`) with decoupled `theme` (visual palette) and `mode` (brightness), and support nested subtree theming via `<ThemeScope>` using native CSS `[data-theme]` cascade without runtime style injection.
**Rationale:** (1) Pure CSS variables enable instantaneous theme and mode switching with zero React component re-rendering overhead, (2) Subtree scoping via `<ThemeScope>` allows embedded dark/accent zones within light pages naturally, (3) `getThemeInitScript()` provides an authoritative pre-hydration script for `<head>` preventing FOUC completely, (4) Recursive reference validation prevents broken chains and circular dependencies (`A -> B -> A`), (5) Zero-dependency exporters allow effortless consumption in CSS, W3C DTCG JSON, and Tailwind projects.
**Alternatives considered:**
- CSS-in-JS ThemeProvider injecting dynamic `<style>` tags (rejected: high runtime weight, breaks React Server Components and SSR streaming).
- Merging theme and mode into single strings like `sky-dark` (rejected: hampers extensibility and custom user palettes).
**Impact:** Rock-solid theme engine, 100% hydration-safe, FOUC-free SSR, universal Theme Contract across all 9 presets, zero runtime dependencies.

### 2026-08-22 — Blocks Architecture, UI-Only Boundary & Composition Standards (Phase 9)
**Decision:** Establish a data-driven, UI-only Block and Template composition system built purely from SoraUI's 44 primitives and 3-layer tokens without adding a composition runtime framework, third-party chart libraries, or backend business infrastructure.
**Rationale:**
1. **Zero-Dependency Composition**: SoraUI's existing 44 primitives and CSS custom properties already provide complete layout, interaction, and styling capabilities. Blocks are pure React compositions, eliminating the need for a separate "Block Runtime" or "Composition Engine".
2. **UI-Only Separation of Concerns**: Blocks (`LoginForm`, `RegisterForm`, `DataTableBlock`, etc.) strictly own visual presentation, validation UI feedback, and local interaction state. Network requests, OAuth SDKs, session management, and routing remain entirely in user/consumer space, keeping SoraUI 100% framework-agnostic.
3. **Data-Driven Props**: Blocks like `MetricGrid`, `PricingTable`, `FeatureGrid`, `FAQSection`, `FooterSection`, and `DashboardShell` accept data and configuration arrays rather than hardcoded demo strings.
4. **Deterministic Registry & Cycle Detection**: Registry is structured into versioned namespaces (`components`, `blocks`, `templates`), and CLI `soraui add block <id>` resolves dependencies recursively while detecting and rejecting cycles across the entire graph.
5. **100% Token-Driven Visuals**: All glowing effects, hero backgrounds, and card layouts consume `--ui-*` tokens, ensuring effortless theme switching across all 9 presets and `<ThemeScope>` subtrees with zero hardcoded colors.
**Alternatives considered:**
- Building a complex "Block Engine" runtime (rejected: unnecessary complexity; standard React composition with compound slots is cleaner and lighter).
- Pulling in chart libraries (Recharts/Chart.js) for `MetricGrid` (rejected: heavy runtime bundle, conflicts with zero-runtime dependency philosophy; pure CSS/SVG trend indicators provide sleek, lightweight visual cues).
- Hardcoding demo copy into block source code (rejected: harms production reusability; data-driven props make blocks instantly usable in real production apps).
### 2026-08-22 — Canonical Documentation Registry & Interactive DX Platform (Phase 10)
**Decision:** Implement a canonical Documentation Registry (`apps/docs/src/registry/`) as the single source of truth for the developer documentation platform, powered by pure Vite + React without heavy CMS runtimes, featuring interactive `<ThemeScope>` previews, instant multi-theme switching across all 9 presets, client-side search (⌘K), and automated consistency validation against `registry.json`.
**Rationale:**
1. **Single Source of Truth**: By driving documentation from a canonical TypeScript registry, documentation pages, props tables, search indices, and sidebar navigation remain synchronized with library source code without manual MDX duplication.
2. **Automated Registry Consistency**: `apps/docs/tests/registry-validation.test.ts` validates that every component, block, template, and theme preset registered in `registry.json` has a complete documentation entry, preventing orphaned or missing docs as the library evolves.
3. **Interactive Multi-Theming & Playground**: Developers can test all 44 primitives, 14 blocks, and 4 templates across all 9 space theme presets and responsive viewports (Desktop/Tablet/Mobile) with real-time nested `<ThemeScope>` CSS cascading.
4. **Build-Output Bundle Size Budgeting**: Placed bundle budget verification in `packages/react/tests/bundle-size.test.ts` to assert that actual compiled `dist/` outputs stay strictly below package budget thresholds (< 200 KB ESM, < 60 KB CSS).
**Alternatives considered:**
- Third-party hosted documentation platforms / Docusaurus (rejected: increases build complexity and lacks native seamless integration with custom `<ThemeScope>` CSS cascade).
### 2026-08-22 — Release Candidate 1 (RC1) & Public API Hardening (Phase 10.5)
**Decision:** Establish a strict Release Candidate audit baseline enforcing Public API Snapshot stability, architectural dependency boundaries (0 React in Core/CLI), CSS global pollution prevention, explicit output bundle budgets, tarball hygiene, and fresh consumer E2E isolation from standalone `.tgz` archives.
**Rationale:**
1. **Public API Contract**: Public API snapshot tests guarantee that no component, block, template, or theme primitive can be accidentally renamed or deleted as the codebase grows.
2. **True Consumer Isolation**: Verification through standalone packed `.tgz` files in an external `/tmp` consumer directory ensures zero monorepo path leakage, zero unresolved transitive dependencies, and 100% clean builds for third-party developers.
3. **CSS Encapsulation**: Strict scanning ensures zero bare element selectors (`body`, `button`, `input`, `*`, `.container`, `.card`) in distribution stylesheets, protecting consumer applications from style contamination.
4. **Canonical Registry as AI/MCP Foundation**: Formalized `registry/registry.json` as the definitive metadata API for Model Context Protocol (MCP) tooling in Phase 11, eliminating the need for AI agents to parse raw source code.
**Alternatives considered:**
- Relying exclusively on workspace-internal Turborepo tests (rejected: monorepo alias resolution conceals packaging, export map, and missing dependency errors that only appear in clean consumer installs).
**Impact:** SoraUI RC1 verified, 100% isolated, tree-shakable, CSS-safe, and architecturally primed for Phase 11 AI/MCP integration.
### 2026-08-22 — AI-Native SoraUI & Model Context Protocol (MCP) Server (Phase 11)
**Decision:** Implement the SoraUI MCP server (`@soraui/mcp`) on top of the official `@modelcontextprotocol/sdk` as a deterministic, registry-first capability layer (not an unconstrained LLM generator), exposing 11 JSON-Schema-driven tools, versioned resources (`soraui://*`), and structured prompt templates over standard stdio JSON-RPC 2.0 transport.
**Rationale:**
1. **Registry-First Ingestion**: MCP server acts as a pure read-only consumer of `registry/registry.json` and `@soraui/core` theme presets, preventing metadata duplication across the monorepo.
2. **Official SDK for Protocol Stability**: Leveraging the official `@modelcontextprotocol/sdk` guarantees compliance with MCP specification without maintaining a custom JSON-RPC transport parser.
3. **Deterministic Composition**: `soraui_compose_recipe` emits predictable React JSX (`recipeVersion: "1.0"`) with decoupled consumer callback slots and zero embedded backend/API coupling.
4. **Static Composition Analyzer**: `soraui_validate_composition` analyzes JSX snippets for design token violations (`SORA-TOKEN-001`), UI-only boundaries (`SORA-BOUNDARY-001`), and accessibility attributes (`SORA-A11Y-001`) with actionable diagnostic suggestions.
5. **Read-Only Security Boundary**: Enforced zero shell execution, zero filesystem mutation, and zero outbound network calls in the MCP server process.
**Alternatives considered:**
- Writing a custom JSON-RPC transport protocol from scratch (rejected: high maintenance overhead and potential protocol edge cases; the official TypeScript SDK provides battle-tested stdio transport).
- Enabling AI MCP tools to generate dynamic unconstrained JSX (rejected: violates determinism and consistency; recipes guarantee structured, accessible, and token-compliant compositions).
**Impact:** AI coding agents (Claude, Cursor, Gemini, Copilot) can discover, inspect, compose, and validate SoraUI primitives, blocks, templates, and themes deterministically; 21/21 Turbo tasks green.
### 2026-08-22 — Quality, A11y & Performance Hardening (Phase 12 — COMPLETE & LOCKED)
**Decision:** Execute comprehensive automated hardening across 9 specialized vectors (12A–12I) covering automated `axe-core` accessibility audits, dynamic 99-check WCAG 2.1 AA theme contrast validation, keyboard/focus trap isolation, sub-20ms rendering benchmarks, SSR hydration correctness & FOUC elimination, WebKit/Chromium/Firefox cross-browser compatibility, Playwright native visual regression, unmount memory safety, and bidirectional MCP/Registry contract regression.
**Status:** **`LOCKED`**
**Rationale & Engineering Principles:**
1. **Preserve Public API Contract**: Zero public component APIs or export signatures were altered to make tests pass. All accessibility and performance improvements were resolved strictly within internal component markup and hook lifecycles.
2. **Dynamic Token-Driven Contrast Validation**: `packages/core/tests/theme-contrast.test.ts` dynamically parses CSS tokens directly from preset files and computes WCAG 2.1 relative luminance, verifying the accessibility contract across 11 semantic token pairs for all 9 presets (99 checks total) rather than locking hardcoded hex values in assertions.
3. **Hard Leak Gates vs Relative Performance Regression Gates**: Enforce hard gates for correctness (0 dangling event listeners/observers on unmount) while treating benchmark timings (DataTable observed p50: 4.3ms / p95: 19.0ms, TreeView observed p50: 0.8ms / p95: 2.3ms) as baseline records where CI enforcement uses the **>20% regression threshold** rather than absolute timing guarantees.

4. **Explicit SSR Correctness vs FOUC Separation**: Separated SSR hydration testing (asserting 0 React hydration mismatch console errors in JSDOM) from FOUC prevention (asserting `data-theme` pre-hydration and `--ui-background` computed style in browser environment), recognising they are independent failure modes.
5. **Native Playwright Visual Snapshotting (`maxDiffPixels: 50`)**: Used Playwright's native `toHaveScreenshot()` with an explicit `maxDiffPixels: 50` threshold across Desktop (1280px) and Mobile (375px) viewports across all 9 presets rather than introducing third-party pixel comparison dependencies.
6. **WebKit as CI Baseline (Not "Safari Verified")**: Tested Chromium, Firefox, and WebKit in CI, accurately documenting results as **"Chromium / Firefox / WebKit verified"** (WebKit browser engine baseline) while reserving native macOS Safari for standalone consumer verification.
7. **Bidirectional Registry ↔ Ecosystem Parity**: Enforced bidirectional invariant testing between Registry ↔ MCP, Registry ↔ Docs, Registry ↔ CLI, and Public API exports, eliminating orphan metadata across all consumer surfaces.
8. **Continuous Release Gates**: Phase 10.5 bundle budgets (Core < 15 KB, Hooks < 10 KB, React < 200 KB, CSS < 60 KB) and Phase 11 MCP contracts remain active regression gates across all future phases.
**Impact:** 0 accessibility violations across all 44 primitives, 100% WCAG AA contrast compliance across all 9 theme presets, sub-20ms rendering performance, zero memory leaks, and complete bidirectional parity across all consumer surfaces; 21/21 Turbo tasks green.

