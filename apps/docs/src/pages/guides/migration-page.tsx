import React, { useState } from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';
import { Check, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

export interface MigrationPageProps {
  onNavigate?: (path: string) => void;
}

export const MigrationPage: React.FC<MigrationPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyPage = async () => {
    const text = `# Migration Guide\n\nStep-by-step instructions for migrating your codebase from Radix UI, shadcn/ui, or raw CSS to SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
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
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Migration Guide</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
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
                onClick={() => go('/guides/manual')}
                title="Previous: Manual Setup"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/semver')}
                title="Next: Semantic Versioning"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p className="sora-doc-lead">
          Step-by-step instructions for migrating your codebase from Radix UI, shadcn/ui, or raw CSS to SoraUI.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Guides
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Migration
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="shadcn-migration" className="sora-doc-h2">
          <span>Migrating from shadcn/ui</span>
          <a href="#shadcn-migration" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          SoraUI follows the exact same component composition patterns and prop ergonomics as shadcn/ui, but eliminates runtime Tailwind dependencies in favor of pure CSS custom properties.
        </p>
        <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.7 }}>
            <strong>1. Component imports:</strong> Change <code>@/components/ui/button</code> to <code>@soraui/react</code> or use <code>npx @soraui/cli add button</code> to copy component source directly into your codebase.
          </p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', lineHeight: 1.7 }}>
            <strong>2. CSS Variables:</strong> Replace Tailwind HSL variables with standard hex tokens from <code>@soraui/core</code> presets.
          </p>
        </div>
      </section>

      <section className="sora-doc-section">
        <h2 id="radix-migration" className="sora-doc-h2">
          <span>Migrating from Radix Primitives</span>
          <a href="#radix-migration" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          SoraUI includes all accessible ARIA contracts natively without requiring multiple <code>@radix-ui/react-*</code> packages:
        </p>
        <CodeBlock
          language="tsx"
          code={`// Before (Radix UI)
import * as DialogPrimitive from '@radix-ui/react-dialog';

// After (SoraUI)
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@soraui/react';`}
        />
      </section>
    </div>
  );
};
