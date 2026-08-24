import React, { useState } from 'react';
import { Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DocPageHeaderProps {
  title: string;
  lead?: string;
  prevHref?: string;
  nextHref?: string;
  prevTitle?: string;
  nextTitle?: string;
  onNavigate?: (path: string) => void;
  markdownContent?: string;
  children?: React.ReactNode;
}

export const DocPageHeader: React.FC<DocPageHeaderProps> = ({
  title,
  lead,
  prevHref,
  nextHref,
  prevTitle,
  nextTitle,
  onNavigate,
  markdownContent,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy =
      markdownContent || `# ${title}\n\n${lead || ''}\n\nhttps://github.com/adityadwi21/SoraUI`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const go = (path?: string) => {
    if (!path) return;
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="docs-intro-header">
      <div className="docs-intro-header-top">
        <h1 className="docs-intro-title">{title}</h1>
        <div className="docs-intro-actions">
          <button
            type="button"
            className="docs-intro-copy-btn"
            onClick={handleCopy}
            title="Copy page as Markdown"
            aria-label="Copy page as Markdown"
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
              onClick={() => go(prevHref)}
              disabled={!prevHref}
              title={prevTitle ? `Previous: ${prevTitle}` : 'Previous page'}
              aria-label="Previous page"
              style={!prevHref ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              className="docs-intro-nav-arrow-btn"
              onClick={() => go(nextHref)}
              disabled={!nextHref}
              title={nextTitle ? `Next: ${nextTitle}` : 'Next page'}
              aria-label="Next page"
              style={!nextHref ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {lead && <p className="docs-intro-lead">{lead}</p>}
      {children}
    </header>
  );
};
