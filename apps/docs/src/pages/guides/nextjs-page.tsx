import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const NextjsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Frameworks</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Next.js Integration Guide
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          How to integrate SoraUI in Next.js App Router (React Server Components) and Pages Router with zero hydration mismatch.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>App Router Setup (<code>app/layout.tsx</code>)</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          In Next.js App Router, wrap your children in a client-side <code>ThemeProvider</code> and inject the zero-FOUC init script:
        </p>

        <CodeBlock
          code={`import '@soraui/core/theme/primitives.css';
import '@soraui/core/theme/presets/sky.css';
import '@soraui/react/dist/index.css';
import { getThemeInitScript } from '@soraui/core';
import { ThemeProvider } from '@soraui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript({ defaultTheme: 'sky', defaultMode: 'system' }) }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="sky">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
          language="tsx"
          filename="app/layout.tsx"
        />
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>React Server Component (RSC) Boundaries</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Level 1 components (like <code>Button</code>, <code>Card</code>, <code>Badge</code>, <code>Typography</code>, <code>Separator</code>) are pure zero-runtime and can render seamlessly in Server Components. Interactive components (like <code>Dialog</code>, <code>Dropdown</code>, <code>Popover</code>) use client-side hooks and include <code>&apos;use client&apos;</code> directives.
        </p>
      </section>
    </div>
  );
};
