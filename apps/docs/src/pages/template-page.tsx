import React from 'react';
import type { TemplateDoc } from '../registry/types';
import { ComponentPreview } from '../components/component-preview';
import { CodeBlock } from '../components/code-block';
import { Badge, Separator } from '@soraui/react';

export interface TemplatePageProps {
  doc: TemplateDoc;
}

export const TemplatePage: React.FC<TemplatePageProps> = ({ doc }) => {
  return (
    <div style={{ maxWidth: '920px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            {doc.name}
          </h1>
          <Badge variant="secondary">Page Template</Badge>
          <Badge variant="outline">{doc.category}</Badge>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          {doc.description}
        </p>
      </div>

      {/* Interactive Preview */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Live Interactive Preview</h2>
        <ComponentPreview code={doc.code}>
          {doc.render()}
        </ComponentPreview>
      </section>

      {/* Installation */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Installation</h2>
        <CodeBlock code={`npx soraui add template ${doc.id}`} language="bash" filename="Terminal" />
      </section>

      {/* Composed Blocks */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Composed Blocks</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {doc.blocks.map((b) => (
            <Badge key={b} variant="default">
              {b}
            </Badge>
          ))}
        </div>
      </section>

      <Separator style={{ margin: '2rem 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
        <span>Full-page composable template</span>
        <a
          href={`https://github.com/soraui/soraui/tree/main/packages/react/src/templates/${doc.id}-template.tsx`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--ui-primary, #0ea5e9)', textDecoration: 'none', fontWeight: 500 }}
        >
          View Template Source ↗
        </a>
      </div>
    </div>
  );
};
