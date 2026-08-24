import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const ThemingPage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">3-Layer Token System &amp; Theming</h1>
        </div>
        <p className="sora-doc-lead">
          How SoraUI decouples raw color scales, semantic theme contracts, and component defaults for effortless zero-runtime theming.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Design Tokens
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Zero Runtime
          </Badge>
        </div>
      </div>

      {/* 3-Layer Token Hierarchy */}
      <section className="sora-doc-section">
        <h2 id="token-hierarchy" className="sora-doc-h2">
          <span>The 3-Layer Token Hierarchy</span>
          <a href="#token-hierarchy" className="sora-doc-anchor">#</a>
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', background: 'var(--docs-bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--docs-fg)', marginBottom: '0.5rem' }}>
              Layer 1: Primitive Scales (<code>--sora-*</code>)
            </h3>
            <p className="sora-subtext">
              Raw, unopinionated color steps (e.g. <code>--sora-sky-500</code>), typography scales (<code>--sora-text-sm</code>), spacing units, and radius tokens.
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', background: 'var(--docs-bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--docs-fg)', marginBottom: '0.5rem' }}>
              Layer 2: Semantic Theme Contract (<code>--ui-*</code>)
            </h3>
            <p className="sora-subtext">
              The 24-key standard contract required by all themes (e.g. <code>--ui-background</code>, <code>--ui-foreground</code>, <code>--ui-primary</code>, <code>--ui-border</code>, <code>--ui-radius</code>).
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', background: 'var(--docs-bg-card)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--docs-fg)', marginBottom: '0.5rem' }}>
              Layer 3: Component Defaults (<code>--sora-&lt;comp&gt;-*</code>)
            </h3>
            <p className="sora-subtext">
              Granular component-specific overrides referencing Layer 2 tokens with safe fallback cascades.
            </p>
          </div>
        </div>
      </section>

      {/* ThemeProvider & Multi-Theming */}
      <section className="sora-doc-section">
        <h2 id="theme-provider" className="sora-doc-h2">
          <span>ThemeProvider &amp; Multi-Theming</span>
          <a href="#theme-provider" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
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
        />
      </section>

      {/* Subtree Theming with ThemeScope */}
      <section className="sora-doc-section">
        <h2 id="theme-scope" className="sora-doc-h2">
          <span>Subtree Theming with ThemeScope</span>
          <a href="#theme-scope" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
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
        />
      </section>

      {/* Zero-FOUC */}
      <section className="sora-doc-section">
        <h2 id="zero-fouc" className="sora-doc-h2">
          <span>Zero-FOUC Initialization Script</span>
          <a href="#zero-fouc" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
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
        />
      </section>
    </div>
  );
};
