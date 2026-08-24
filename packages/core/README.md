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

## 🌌 9 Cosmic Theme Presets

- **Sky** (Light): Crisp azure blue with clean slate neutrals.
- **Cloud** (Light): Soft white and neutral cloud tones.
- **Horizon** (Light): Warm sunset transition colors.
- **Aurora** (Dark): Vibrant teal and emerald aurora lights.
- **Twilight** (Dark): Deep dusk indigo and purple undertones.
- **Midnight** (Dark): Minimal deep blue with indigo accents.
- **Nebula** (Dark): Purple and magenta deep-space nebula.
- **Eclipse** (Dark): High-contrast pitch black with golden accent.
- **Starlight** (Dark): Dark navy with radiant star highlights.

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
