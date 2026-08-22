import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge, Card, CardHeader, CardTitle, CardContent } from '@soraui/react';

export const ThemingPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Theming & Design Tokens</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          3-Layer Token System & Theming
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          How SoraUI decouples raw scales, semantic theme contracts, and component defaults for effortless zero-runtime theming.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>The 3-Layer Token Hierarchy</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Layer 1: Primitive Scales (<code>--sora-*</code>)</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Raw, unopinionated color steps (e.g. <code>--sora-sky-500</code>), typography scales (<code>--sora-text-sm</code>), spacing units, and radius tokens.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Layer 2: Semantic Theme Contract (<code>--ui-*</code>)</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                The 24-key standard contract required by all themes (e.g. <code>--ui-background</code>, <code>--ui-foreground</code>, <code>--ui-primary</code>, <code>--ui-border</code>, <code>--ui-radius</code>).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Layer 3: Component Defaults (<code>--sora-&lt;comp&gt;-*</code>)</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Granular component-specific overrides referencing Layer 2 tokens with safe fallback cascades.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>ThemeProvider & Multi-Theming</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Wrap your root layout with <code>&lt;ThemeProvider&gt;</code> to manage active visual theme and brightness modes (<code>light</code>, <code>dark</code>, <code>system</code>):
        </p>

        <CodeBlock
          code={`import { ThemeProvider } from '@soraui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="sky" defaultMode="system">
      {children}
    </ThemeProvider>
  );
}`}
          language="tsx"
          filename="RootLayout.tsx"
        />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Subtree Theming with ThemeScope</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Use <code>&lt;ThemeScope&gt;</code> to locally theme any section or card (e.g. a dark Midnight preview inside a daylight Sky page) via pure CSS cascading:
        </p>

        <CodeBlock
          code={`import { ThemeScope, Card, Button } from '@soraui/react';

export function ScopedCard() {
  return (
    <ThemeScope theme="midnight">
      <Card elevated>
        <p>This card renders with Midnight theme tokens!</p>
        <Button variant="primary">Midnight Button</Button>
      </Card>
    </ThemeScope>
  );
}`}
          language="tsx"
          filename="ScopedCard.tsx"
        />
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Zero-FOUC Head Initialization Script</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Prevent Flash of Unstyled Content (FOUC) during SSR hydration by injecting <code>getThemeInitScript()</code> inside your document <code>&lt;head&gt;</code>:
        </p>

        <CodeBlock
          code={`import { getThemeInitScript } from '@soraui/core';

export default function Document() {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript({ defaultTheme: 'sky', defaultMode: 'system' }) }} />
      </head>
      <body>...</body>
    </html>
  );
}`}
          language="tsx"
          filename="_document.tsx"
        />
      </section>
    </div>
  );
};
