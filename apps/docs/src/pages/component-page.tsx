import React from 'react';
import type { ComponentDoc } from '../registry/types';
import { ComponentPreview } from '../components/component-preview';
import { PropTable } from '../components/prop-table';
import { CodeBlock } from '../components/code-block';
import { Badge, Separator } from '@soraui/react';

export interface ComponentPageProps {
  doc: ComponentDoc;
}

export const ComponentPage: React.FC<ComponentPageProps> = ({ doc }) => {
  return (
    <div style={{ maxWidth: '840px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            {doc.name}
          </h1>
          <Badge variant="secondary">Level {doc.level}</Badge>
          <Badge variant="outline">{doc.category}</Badge>
          <Badge variant={doc.status === 'stable' ? 'success' : 'warning'}>{doc.status}</Badge>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          {doc.description}
        </p>
      </div>

      {/* Main Interactive Preview */}
      {doc.examples[0] && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Preview</h2>
          <ComponentPreview code={doc.examples[0].code}>
            {doc.examples[0].render()}
          </ComponentPreview>
        </section>
      )}

      {/* Installation */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Installation</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
              1. Via SoraUI CLI (Recommended)
            </div>
            <CodeBlock code={`npx soraui add ${doc.id}`} language="bash" filename="Terminal" />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
              2. Via NPM Package
            </div>
            <CodeBlock code={`import { ${doc.name} } from '@soraui/react';`} language="typescript" filename="Import" />
          </div>
        </div>
      </section>

      {/* Additional Examples / Variants */}
      {doc.examples.length > 1 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Variants & Examples</h2>
          {doc.examples.slice(1).map((ex) => (
            <div key={ex.id} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{ex.title}</h3>
              {ex.description && (
                <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', margin: '0 0 0.5rem 0' }}>
                  {ex.description}
                </p>
              )}
              <ComponentPreview code={ex.code}>
                {ex.render()}
              </ComponentPreview>
            </div>
          ))}
        </section>
      )}

      {/* Props Reference */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Props Reference</h2>
        <PropTable props={doc.props} />
      </section>

      {/* Accessibility */}
      {doc.accessibility && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Accessibility & WAI-ARIA</h2>
          <div style={{ backgroundColor: 'var(--ui-muted, #f4f4f5)', padding: '1rem 1.25rem', borderRadius: 'var(--ui-radius, 0.5rem)', border: '1px solid var(--ui-border, #e4e4e7)' }}>
            {doc.accessibility.role && (
              <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                <span style={{ fontWeight: 600 }}>ARIA Role:</span> <code style={{ backgroundColor: 'var(--ui-background, #fff)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>{doc.accessibility.role}</code>
              </div>
            )}
            {doc.accessibility.keyboard && doc.accessibility.keyboard.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.375rem' }}>Keyboard Navigation:</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
                  {doc.accessibility.keyboard.map((k, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                      <kbd style={{ padding: '0.125rem 0.25rem', backgroundColor: 'var(--ui-background, #fff)', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: '3px', fontWeight: 600, color: 'var(--ui-foreground, #000)' }}>
                        {k.key}
                      </kbd>{' '}
                      — {k.action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Theming Tokens */}
      {doc.themingTokens && doc.themingTokens.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Theming & CSS Tokens</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {doc.themingTokens.map((t) => (
              <Badge key={t} variant="outline" style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                {t}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <Separator style={{ margin: '2rem 0' }} />

      {/* Source Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
        <span>Package: <code>@soraui/react</code></span>
        <a
          href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/components/${doc.id}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--ui-primary, #0ea5e9)', textDecoration: 'none', fontWeight: 500 }}
        >
          View Source on GitHub ↗
        </a>
      </div>
    </div>
  );
};
