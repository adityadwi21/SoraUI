# SoraUI Documentation Platform

Official interactive documentation platform for SoraUI, built with Vite, React, and TypeScript.

---

## 🌟 Key Features

- **Interactive Component Playground**: Live rendered canvas with code copy, prop tables, and variant toggles for all 44 accessible primitives.
- **Production Blocks & Templates**: Interactive previews and source code for 14 compound UI blocks and 4 full-page templates.
- **Dedicated Framework Guides**: Step-by-step setup guides for Next.js (App & Pages Router), Vite SPA, Laravel 11/12 Inertia React, React Router v7 / Remix, Astro Island Architecture, and Manual Pure React setup.
- **Instant Search (`Cmd + K`)**: Keyboard-driven modal search indexing all components, blocks, templates, and guides with per-category icons.
- **9-Preset Theme Switcher**: Instant 0ms toggle between light and dark modes across 9 cosmic theme presets.
- **Unified Action Headers**: Standardized `[ Copy Page ]` Markdown exporter and `[ < | > ]` quick navigation arrow buttons across 100% of documentation pages.
- **Clean shadcn-Inspired UX**: Polished 3-column layout (Sidebar + Content + Table of Contents) with minimal vertical footprint.

---

## 🚀 Running Locally

```bash
# Start Vite development server
pnpm --filter docs dev

# Run TypeScript typechecks
pnpm --filter docs typecheck

# Build production bundle
pnpm --filter docs build
```
