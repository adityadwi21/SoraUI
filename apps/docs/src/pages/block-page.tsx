import React from 'react';
import type { BlockDoc } from '../registry/types';
import { ComponentPreview } from '../components/component-preview';
import { PropTable } from '../components/prop-table';
import { CodeBlock } from '../components/code-block';
import { Badge, Card, CardHeader, CardTitle, CardContent, Separator } from '@soraui/react';

export interface BlockPageProps {
  doc: BlockDoc;
}

export const BlockPage: React.FC<BlockPageProps> = ({ doc }) => {
  return (
    <div style={{ maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            {doc.name}
          </h1>
          <Badge variant="secondary">Block</Badge>
          <Badge variant="outline">{doc.category}</Badge>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          {doc.description}
        </p>
      </div>

      {/* Interactive Preview */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Interactive Preview</h2>
        <ComponentPreview code={doc.code}>
          {doc.render()}
        </ComponentPreview>
      </section>

      {/* UI-Only Boundary Matrix */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.75rem 0' }}>Architecture & Boundary Matrix</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <Card style={{ borderLeft: '4px solid var(--ui-success, #10b981)' }}>
            <CardHeader style={{ paddingBottom: '0.5rem' }}>
              <CardTitle style={{ fontSize: '0.9375rem', color: 'var(--ui-success, #10b981)' }}>
                ✓ SoraUI Handles (UI Layer)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                {doc.boundaryExplanation.soraHandles.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card style={{ borderLeft: '4px solid var(--ui-primary, #0ea5e9)' }}>
            <CardHeader style={{ paddingBottom: '0.5rem' }}>
              <CardTitle style={{ fontSize: '0.9375rem', color: 'var(--ui-primary, #0ea5e9)' }}>
                → Your Application Handles (Consumer)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                {doc.boundaryExplanation.consumerHandles.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Installation</h2>
        <CodeBlock code={`npx soraui add block ${doc.id}`} language="bash" filename="Terminal" />
      </section>

      {/* Props Reference */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Props Reference</h2>
        <PropTable props={doc.props} />
      </section>

      {/* Dependencies */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Dependencies</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {doc.dependencies.map((dep) => (
            <Badge key={dep} variant="outline">
              {dep}
            </Badge>
          ))}
        </div>
      </section>

      <Separator style={{ margin: '2rem 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
        <span>Composed strictly from SoraUI primitives</span>
        <a
          href={`https://github.com/soraui/soraui/tree/main/packages/react/src/blocks/${doc.category}/${doc.id}.tsx`}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--ui-primary, #0ea5e9)', textDecoration: 'none', fontWeight: 500 }}
        >
          View Block Source ↗
        </a>
      </div>
    </div>
  );
};
