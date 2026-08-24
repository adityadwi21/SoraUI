import React, { useState } from 'react';
import { Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPONENT_DOCS } from '../../registry/components';

export interface ComponentsIndexPageProps {
  onNavigate: (path: string) => void;
}

export const ComponentsIndexPage: React.FC<ComponentsIndexPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPage = () => {
    const fullText = `# Components\n\nHere you can find all the components available in the library. We are working on adding more components.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sort components alphabetically
  const sortedComponents = [...COMPONENT_DOCS].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Identify new components (e.g. recently added blocks/primitives)
  const newComponents = sortedComponents.filter(
    (c) =>
      c.id === 'data-table' ||
      c.id === 'date-picker' ||
      c.id === 'command-palette' ||
      c.id === 'file-uploader'
  );

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Components</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy page markdown"
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
                onClick={() => onNavigate('/guides/introduction')}
                title="Previous: Introduction"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => onNavigate('/components/accordion')}
                title="Next: Accordion"
                aria-label="Next component"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Here you can find all the components available in the library. We are working on adding more components.
        </p>
      </header>

      {/* ─── SECTION 1: NEW COMPONENTS ─── */}
      <section className="docs-intro-section" style={{ marginTop: '1.5rem' }}>
        <h2 id="new-components" className="docs-intro-h2">
          <span>New Components</span>
          <a href="#new-components" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <div className="docs-comp-grid-3">
          {newComponents.map((c) => (
            <button
              key={c.id}
              type="button"
              className="docs-comp-item-btn new-item"
              onClick={() => onNavigate(`/components/${c.id}`)}
            >
              <span className="docs-comp-item-name">{c.name}</span>
              <span className="docs-comp-item-dot" title="Recently added" />
            </button>
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: ALL COMPONENTS ─── */}
      <section className="docs-intro-section" style={{ marginTop: '2.5rem' }}>
        <h2 id="all-components" className="docs-intro-h2">
          <span>All Components</span>
          <a href="#all-components" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <div className="docs-comp-grid-3">
          {sortedComponents.map((c) => (
            <button
              key={c.id}
              type="button"
              className="docs-comp-item-btn"
              onClick={() => onNavigate(`/components/${c.id}`)}
            >
              <span className="docs-comp-item-name">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── REGISTRY CALLOUT NOTE ─── */}
      <p className="docs-intro-note" style={{ marginTop: '3rem' }}>
        Can't find what you need? Try the{' '}
        <a
          href="https://github.com/adityadwi21/SoraUI"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--docs-fg)', textDecoration: 'underline', fontWeight: 500 }}
        >
          registry directory
        </a>{' '}
        for community-maintained components and blocks.
      </p>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => onNavigate('/components/accordion')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next Component</span>
            <span className="docs-intro-pagination-title">Accordion</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
