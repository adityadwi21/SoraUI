import React, { useState, useMemo } from 'react';
import type { TemplateDoc } from '../registry/types';
import { TEMPLATE_DOCS } from '../registry/templates';
import { ComponentPreview } from '../components/component-preview';
import { PackageManagerBlock } from '../components/package-manager-block';
import { Badge } from '@soraui/react';
import { Check, Copy, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../components/brand-icons';

export interface TemplatePageProps {
  doc: TemplateDoc;
  onNavigate?: (path: string) => void;
}

export const TemplatePage: React.FC<TemplatePageProps> = ({ doc, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const { prevTemplate, nextTemplate } = useMemo(() => {
    const idx = TEMPLATE_DOCS.findIndex((t) => t.id === doc.id);
    return {
      prevTemplate: idx > 0 ? TEMPLATE_DOCS[idx - 1] : null,
      nextTemplate: idx < TEMPLATE_DOCS.length - 1 ? TEMPLATE_DOCS[idx + 1] : null,
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
    const text = `# ${doc.name}\n\n${doc.description}\n\n\`\`\`bash\nnpx @soraui/cli add template ${doc.id}\n\`\`\`\n\nhttps://github.com/adityadwi21/SoraUI`;
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
                onClick={() => prevTemplate && handleNav(`/templates/${prevTemplate.id}`)}
                disabled={!prevTemplate}
                title={prevTemplate ? `Previous: ${prevTemplate.name}` : 'No previous template'}
                aria-label="Previous template"
                style={!prevTemplate ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => nextTemplate && handleNav(`/templates/${nextTemplate.id}`)}
                disabled={!nextTemplate}
                title={nextTemplate ? `Next: ${nextTemplate.name}` : 'No next template'}
                aria-label="Next template"
                style={!nextTemplate ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
              >
                <ChevronRight size={14} />
              </button>
            </div>
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
            <GitHubIcon size={13} />
            <span>Source Code</span>
            <ExternalLink size={11} />
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
        <PackageManagerBlock
          commands={{
            pnpm: `pnpm dlx @soraui/cli add template ${doc.id}`,
            npm: `npx @soraui/cli add template ${doc.id}`,
            yarn: `yarn dlx @soraui/cli add template ${doc.id}`,
            bun: `bunx @soraui/cli add template ${doc.id}`,
          }}
          style={{ marginTop: '0.5rem' }}
        />
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
