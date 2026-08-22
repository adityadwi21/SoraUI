import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const InstallationPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Getting Started</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Installation & Setup
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          How to install, configure, and add SoraUI components and blocks to your project.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Method 1: SoraUI CLI (Recommended)</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          The CLI copies component and block source code directly into your repository, giving you 100% code ownership.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>1. Initialize SoraUI in your project</div>
          <CodeBlock code="npx soraui init" language="bash" filename="Terminal" />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>2. Add primitive components</div>
          <CodeBlock code="npx soraui add button input card dialog" language="bash" filename="Terminal" />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>3. Add production blocks</div>
          <CodeBlock code="npx soraui add block login-form" language="bash" filename="Terminal" />
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Method 2: NPM Package Install</h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, marginBottom: '1rem' }}>
          Alternatively, you can install the compiled package directly via your favorite package manager:
        </p>

        <CodeBlock code="pnpm add @soraui/react @soraui/core @soraui/hooks" language="bash" filename="Terminal" />

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Import styles in your root entry point (e.g. `main.tsx` or `layout.tsx`):</div>
          <CodeBlock code={`import '@soraui/core/theme/primitives.css';
import '@soraui/core/theme/presets/sky.css';
import '@soraui/react/dist/index.css';`} language="typescript" filename="index.tsx" />
        </div>
      </section>
    </div>
  );
};
