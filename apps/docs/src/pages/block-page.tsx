import React, { useState, useMemo } from 'react';
import type { BlockDoc } from '../registry/types';
import { BLOCK_DOCS } from '../registry/blocks';
import { ComponentPreview } from '../components/component-preview';
import { PropTable } from '../components/prop-table';
import { CodeBlock } from '../components/code-block';
import { Badge } from '@soraui/react';
import { Check, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

export interface BlockPageProps {
  doc: BlockDoc;
  onNavigate?: (path: string) => void;
}

export const BlockPage: React.FC<BlockPageProps> = ({ doc, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const { prevBlock, nextBlock } = useMemo(() => {
    const idx = BLOCK_DOCS.findIndex((b) => b.id === doc.id);
    return {
      prevBlock: idx > 0 ? BLOCK_DOCS[idx - 1] : null,
      nextBlock: idx < BLOCK_DOCS.length - 1 ? BLOCK_DOCS[idx + 1] : null,
    };
  }, [doc.id]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyPage = async () => {
    const text = `# ${doc.name}\n\n${doc.description}\n\n\`\`\`bash\nnpx @soraui/cli add block ${doc.id}\n\`\`\`\n\nhttps://github.com/adityadwi21/SoraUI`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="docs-page sora-shadcn-page">
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">{doc.name}</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={copyPage}
              title="Copy Page Markdown"
              aria-label="Copy Page Markdown"
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: '#22c55e' }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => prevBlock && handleNav(`/blocks/${prevBlock.id}`)}
                disabled={!prevBlock}
                title={prevBlock ? `Previous: ${prevBlock.name}` : 'No previous block'}
                aria-label="Previous block"
                style={!prevBlock ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => nextBlock && handleNav(`/blocks/${nextBlock.id}`)}
                disabled={!nextBlock}
                title={nextBlock ? `Next: ${nextBlock.name}` : 'No next block'}
                aria-label="Next block"
                style={!nextBlock ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="sora-doc-lead">{doc.description}</p>

        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Production Block
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            {doc.category}
          </Badge>
          <a
            href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/blocks/${doc.category}/${doc.id}.tsx`}
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

      {/* Live Interactive Canvas */}
      <section className="sora-doc-section">
        <h2 id="live-preview" className="sora-doc-h2">
          <span>Live Interactive Preview</span>
          <a href="#live-preview" className="sora-doc-anchor">#</a>
        </h2>
        <ComponentPreview code={doc.code}>
          {doc.render()}
        </ComponentPreview>
      </section>

      {/* Architecture & Boundary Matrix */}
      <section className="sora-doc-section">
        <h2 id="boundary-matrix" className="sora-doc-h2">
          <span>Architecture &amp; Boundary Matrix</span>
          <a href="#boundary-matrix" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Clear separation between UI primitives and your business logic:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', borderLeft: '4px solid #22c55e', background: 'var(--docs-bg-subtle)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.625rem' }}>
              ✓ SoraUI Handles (UI Layer)
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--docs-fg-muted)', lineHeight: 1.7 }}>
              {doc.boundaryExplanation.soraHandles.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          <div style={{ padding: '1.25rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', borderLeft: '4px solid var(--docs-accent)', background: 'var(--docs-bg-subtle)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--docs-accent)', marginBottom: '0.625rem' }}>
              → Your App Handles (Consumer Domain)
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--docs-fg-muted)', lineHeight: 1.7 }}>
              {doc.boundaryExplanation.consumerHandles.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="sora-doc-section">
        <h2 id="installation" className="sora-doc-h2">
          <span>Installation</span>
          <a href="#installation" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Add this block directly into your project via CLI:</p>
        <CodeBlock code={`npx @soraui/cli add block ${doc.id}`} language="bash" />
      </section>

      {/* Props Reference */}
      <section className="sora-doc-section">
        <h2 id="props-reference" className="sora-doc-h2">
          <span>Props Reference</span>
          <a href="#props-reference" className="sora-doc-anchor">#</a>
        </h2>
        <PropTable props={doc.props} />
      </section>

      {/* Dependencies */}
      <section className="sora-doc-section">
        <h2 id="dependencies" className="sora-doc-h2">
          <span>Required Dependencies</span>
          <a href="#dependencies" className="sora-doc-anchor">#</a>
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {doc.dependencies.map((dep) => (
            <Badge key={dep} variant="outline">
              {dep}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};
