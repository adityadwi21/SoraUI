# @soraui/core

> 3-Layer Design Token Engine, Cosmic Themes, and Zero-FOUC Architecture for SoraUI.

[![npm version](https://img.shields.io/npm/v/@soraui/core.svg)](https://www.npmjs.com/package/@soraui/core)
[![license](https://img.shields.io/npm/l/@soraui/core.svg)](https://github.com/adityadwi21/SoraUI/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using npm
npm install @soraui/core

# Using pnpm
pnpm add @soraui/core

# Using yarn
yarn add @soraui/core

# Using bun
bun add @soraui/core
```

---

## ⚡ 3-Layer Token Engine

SoraUI decouples raw color scales from semantic application contracts:

1. **Layer 1: Primitive Scales (`--sora-*`)**: Raw, unopinionated color steps, typography scales, spacing units, and radius tokens.
2. **Layer 2: Semantic Theme Contract (`--ui-*`)**: 24-key universal theme contract across light and dark modes (`--ui-background`, `--ui-foreground`, `--ui-primary`, `--ui-border`, `--ui-radius`, etc.).
3. **Layer 3: Component Defaults (`--sora-<comp>-*`)**: Granular component-level overrides with safe fallback cascades.

---

## 🌌 9 Dual-Mode Space Theme Presets
Each preset includes fully adaptive Light and Dark mode tokens with 100% WCAG 2.1 AA contrast verification:

- **Sky**: Vivid azure blue with clean slate neutrals (default theme).
- **Cloud**: Soft monochrome aesthetic with neutral zinc tones and minimal styling.
- **Horizon**: Warm dawn sunrise palette with amber, orange highlights, and cozy warm paper cards.
- **Midnight**: Ultra-deep space navy background with crisp luminescent indigo and cyan highlights.
- **Aurora**: Vibrant emerald green & teal nature borealis palette on dark moss green backdrops.
- **Twilight**: Deep oceanic indigo and dusk violet sky aesthetic on obsidian card surfaces.
- **Nebula**: Cosmic deep violet and fuchsia nebula glow tailored for gaming and AI interfaces.
- **Eclipse**: Pure high-contrast obsidian black with sharp solar flare gold and amber glow.
- **Starlight**: Deep charcoal dark backdrop with glowing starlight amber accents for dev tools.

---

## 🛡️ Anti-FOUC SSR Initialization

Prevent Flash of Unstyled Content (FOUC) during SSR hydration in Next.js / Remix / Astro:

```tsx
import { getThemeInitScript } from "@soraui/core";

export default function Document() {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript({
              defaultTheme: "sky",
              defaultMode: "system",
            }),
          }}
        />
      </head>
      <body>...</body>
    </html>
  );
}
```

---

## 📄 License

MIT © 2026 SoraUI Contributors
