# @soraui/react

> Accessible, token-first React component construction system with 47 primitives, 14 production blocks, 4 page templates, universal `lucide-react` iconography, and zero-runtime CSS.

[![npm version](https://img.shields.io/npm/v/@soraui/react.svg)](https://www.npmjs.com/package/@soraui/react)
[![license](https://img.shields.io/npm/l/@soraui/react.svg)](https://github.com/adityadwi21/SoraUI/blob/main/LICENSE)

---

## 📦 Installation

```bash
# Using npm
npm install @soraui/react @soraui/core @soraui/hooks lucide-react

# Using pnpm
pnpm add @soraui/react @soraui/core @soraui/hooks lucide-react

# Using yarn
yarn add @soraui/react @soraui/core @soraui/hooks lucide-react

# Using bun
bun add @soraui/react @soraui/core @soraui/hooks lucide-react
```

---

## 🎨 Setup Styles

Import the consolidated stylesheet in your root layout (`app/layout.tsx` or `src/main.tsx`):

```tsx
import "@soraui/react/styles";
```

---

## 🚀 Quick Usage

```tsx
import React from "react";
import {
  ThemeProvider,
  ThemeScope,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
} from "@soraui/react";
import { ArrowRight } from "lucide-react";

export function App() {
  return (
    <ThemeProvider defaultTheme="sky" defaultMode="system">
      <main
        style={{ padding: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Card elevated style={{ maxWidth: 420, width: "100%" }}>
          <CardHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardTitle>Welcome to SoraUI</CardTitle>
              <Badge variant="success">v0.1.1</Badge>
            </div>
            <CardDescription>
              Zero-runtime token-first React UI system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Build fast, customize freely, and own your UI code.</p>
          </CardContent>
          <CardFooter
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}
          >
            <Button variant="outline">Cancel</Button>
            <Button
              variant="primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              Get Started <ArrowRight size={14} />
            </Button>
          </CardFooter>
        </Card>
      </main>
    </ThemeProvider>
  );
}
```

---

## 🌌 Key Highlights

- **47 Accessible Primitives**: WAI-ARIA compliant, full keyboard navigation, accessible focus rings, and screen-reader support.
- **14 Production Blocks**: Authentication, Dashboards, Metric grids, Settings, and Forms.
- **4 Full-Page Templates**: Dashboard, SaaS Landing, Analytics, and Settings.
- **Universal Lucide Iconography**: Native `lucide-react` integration across all components and blocks.
- **9 Cosmic Themes & ThemeScope**: Pure CSS cascading (`Sky`, `Cloud`, `Horizon`, `Aurora`, `Twilight`, `Midnight`, `Nebula`, `Eclipse`, `Starlight`).
- **Zero Runtime Styling**: 100% native CSS custom properties. 0ms runtime generation, 0 KB runtime parser.
- **AI-Native MCP Support**: Compatible with `@soraui/mcp` for Claude, Cursor, and Gemini.

---

## 📄 License

MIT © 2026 SoraUI Contributors
