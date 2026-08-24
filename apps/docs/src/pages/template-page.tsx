import React, { useState } from 'react';
import type { TemplateDoc } from '../registry/types';
import { ComponentPreview } from '../components/component-preview';
import { CodeBlock } from '../components/code-block';
import { Badge } from '@soraui/react';

export interface TemplatePageProps {
  doc: TemplateDoc;
}

export const TemplatePage: React.FC<TemplatePageProps> = ({ doc }) => {
  const [copied, setCopied] = useState(false);

  const copyCLI = () => {
    navigator.clipboard.writeText(`npx @soraui/cli add template ${doc.id}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docs-page sora-shadcn-page">
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">{doc.name}</h1>
          <div className="sora-doc-header-actions">
            <button
              type="button"
              className={`sora-btn-pill${copied ? ' sora-btn-pill--success' : ''}`}
              onClick={copyCLI}
            >
              {copied ? '✓ Copied' : 'Copy CLI'}
            </button>
          </div>
        </div>

        <p className="sora-doc-lead">{doc.description}</p>

        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Full Template
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            {doc.category}
          </Badge>
          <a
            href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/templates/${doc.id}-template.tsx`}
            target="_blank"
            rel="noreferrer"
            className="sora-doc-link-chip"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 13, height: 13 }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>Source Code</span>
            <span style={{ fontSize: '0.6875rem' }}>↗</span>
          </a>
        </div>
      </div>

      {/* Live Interactive Preview */}
      <section className="sora-doc-section">
        <h2 id="live-preview" className="sora-doc-h2">
          <span>Live Interactive Preview</span>
          <a href="#live-preview" className="sora-doc-anchor">#</a>
        </h2>
        <ComponentPreview code={doc.code}>
          {doc.render()}
        </ComponentPreview>
      </section>

      {/* Installation */}
      <section className="sora-doc-section">
        <h2 id="installation" className="sora-doc-h2">
          <span>Installation</span>
          <a href="#installation" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Add this full template directly to your project:</p>
        <CodeBlock code={`npx @soraui/cli add template ${doc.id}`} language="bash" />
      </section>

      {/* Composed Blocks */}
      <section className="sora-doc-section">
        <h2 id="composed-blocks" className="sora-doc-h2">
          <span>Composed Primitives &amp; Blocks</span>
          <a href="#composed-blocks" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">This template is composed of the following SoraUI primitives:</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {doc.blocks.map((b) => (
            <Badge key={b} variant="default">
              {b}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};
