# @soraui/core

SoraUI Core — 3-Layer Design Tokens, Theme Engine, and CSS Variable System.

## Installation

```bash
npm install @soraui/core
# or
pnpm add @soraui/core
```

## Features

- **3-Layer Design Token Architecture**: Primitives (`--sora-*`) -> Semantic (`--ui-*`) -> Component (`--sora-<comp>-*`).
- **9 Space-Themed Presets**: Sky, Cloud, Horizon, Aurora, Twilight, Midnight, Nebula, Eclipse, Starlight.
- **24-Key Theme Contract**: Universal consistency across light and dark modes.
- **Zero-FOUC Head Script**: `getThemeInitScript()` for pre-hydration initialization in Next.js / Remix / Astro.
- **Exporters**: W3C DTCG JSON, Tailwind CSS, and CSS Custom Properties.

## License

MIT © 2026 SoraUI Contributors
