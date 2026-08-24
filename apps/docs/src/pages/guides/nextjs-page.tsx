import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const NextjsPage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Next.js App Router Setup</h1>
        </div>
        <p className="sora-doc-lead">
          Configure SoraUI in Next.js 14/15 App Router with full Server Component (RSC) compatibility and SSR support.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Framework
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Next.js App Router
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="install" className="sora-doc-h2">
          <span>1. Install Dependencies</span>
          <a href="#install" className="sora-doc-anchor">#</a>
        </h2>
        <CodeBlock language="bash" code="pnpm add @soraui/react @soraui/core @soraui/hooks" />
      </section>

      <section className="sora-doc-section">
        <h2 id="root-layout" className="sora-doc-h2">
          <span>2. Configure Root Layout</span>
          <a href="#root-layout" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Import SoraUI CSS tokens and component stylesheets in <code>app/layout.tsx</code>:
        </p>
        <CodeBlock
          language="tsx"
          filename="app/layout.tsx"
          code={`import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Import SoraUI tokens and component styles
import '@soraui/core/dist/tokens/themes/sky.css';
import '@soraui/react/dist/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My App with SoraUI',
  description: 'Next.js App Router with SoraUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="sky">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="server-components" className="sora-doc-h2">
          <span>3. Server vs Client Components</span>
          <a href="#server-components" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Static primitives like <code>Card</code>, <code>Badge</code>, <code>Separator</code>, and <code>Typography</code> render seamlessly on the server as React Server Components (RSC).
          Interactive primitives (like <code>Dialog</code>, <code>Select</code>, <code>Dropdown</code>, <code>Tabs</code>) have built-in <code>&quot;use client&quot;</code> directives.
        </p>
      </section>
    </div>
  );
};
