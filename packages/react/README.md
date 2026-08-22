# @soraui/react

SoraUI React — 44 Primitives, 14 Production Blocks, and 4 Page Templates with zero-runtime CSS tokens.

## Installation

```bash
npm install @soraui/react @soraui/core @soraui/hooks
# or
pnpm add @soraui/react @soraui/core @soraui/hooks
```

## Setup Styles

Import the consolidated stylesheet in your root layout:

```tsx
import '@soraui/react/styles';
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, ThemeProvider } from '@soraui/react';

export function App() {
  return (
    <ThemeProvider defaultTheme="sky">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to SoraUI</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Get Started</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

## Features

- **44 Accessible Primitives**: WAI-ARIA compliant, full keyboard support, zero runtime CSS.
- **14 Production Blocks**: Auth, Dashboard, Marketing, and Forms.
- **4 Full-Page Templates**: Instant scaffolding for modern apps.
- **Multi-Theme Support**: Decoupled Theme & Mode with `<ThemeScope>` for nested subtrees.
- **100% Tree-Shakeable**: Import only what you use.

## License

MIT © 2026 SoraUI Contributors
