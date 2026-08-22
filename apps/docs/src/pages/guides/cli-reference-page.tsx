import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const CLIReferencePage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Tooling</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          CLI Reference
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          Comprehensive command-line tool reference for scaffolding, component distribution, and registry searching.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}><code>soraui init</code></h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.75rem' }}>
          Initializes SoraUI in your project directory, creating <code>soraui.config.json</code> and setting up the theme tokens.
        </p>
        <CodeBlock code="npx soraui init" language="bash" filename="Terminal" />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}><code>soraui add &lt;component...&gt;</code></h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.75rem' }}>
          Downloads and writes primitive component source code directly into your configured components directory.
        </p>
        <CodeBlock code="npx soraui add button input card dialog" language="bash" filename="Terminal" />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}><code>soraui add block &lt;id&gt;</code></h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.75rem' }}>
          Resolves all primitive dependencies and copies the production block into your project.
        </p>
        <CodeBlock code="npx soraui add block login-form" language="bash" filename="Terminal" />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}><code>soraui list</code></h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.75rem' }}>
          Displays all available components, blocks, and templates available in the offline bundled registry.
        </p>
        <CodeBlock code="npx soraui list" language="bash" filename="Terminal" />
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}><code>soraui search &lt;query&gt;</code></h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.75rem' }}>
          Instant offline fuzzy search across all registry items.
        </p>
        <CodeBlock code="npx soraui search auth" language="bash" filename="Terminal" />
      </section>
    </div>
  );
};
