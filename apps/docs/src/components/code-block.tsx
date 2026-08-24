import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  title?: string;
  style?: React.CSSProperties;
  /** Whether the code block is expandable (collapsed by default with fade mask) */
  expandable?: boolean;
  /** Initial expansion state */
  defaultExpanded?: boolean;
  /** Maximum height when collapsed */
  collapsedMaxHeight?: number | string;
}

function getLanguageBadge(language?: string, filename?: string): string {
  const target = (filename || language || '').toLowerCase();
  if (
    target.endsWith('.tsx') ||
    target.endsWith('.ts') ||
    target === 'typescript' ||
    target === 'ts' ||
    target === 'tsx'
  ) {
    return 'TS';
  }
  if (
    target.endsWith('.jsx') ||
    target.endsWith('.js') ||
    target.endsWith('.mjs') ||
    target === 'javascript' ||
    target === 'js' ||
    target === 'jsx'
  ) {
    return 'JS';
  }
  if (target.endsWith('.css') || target === 'css') return 'CSS';
  if (target.endsWith('.json') || target === 'json') return 'JSON';
  if (target.endsWith('.html') || target.endsWith('.astro') || target === 'html' || target === 'astro') return 'HTML';
  if (target.endsWith('.sh') || target.endsWith('.bash') || target === 'bash' || target === 'sh' || target === 'shell') return 'SH';
  if (target.endsWith('.php') || target === 'php') return 'PHP';
  return '';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  filename,
  title,
  style,
  expandable = false,
  defaultExpanded = false,
  collapsedMaxHeight = '240px',
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const badge = getLanguageBadge(language, filename || title);
  const displayName = title || filename || (language ? language.toLowerCase() : 'code');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCollapsed = expandable && !isExpanded;

  return (
    <div className={`docs-codeblock${expandable ? ' docs-codeblock--expandable' : ''}`} style={style}>
      <div className="docs-codeblock-head">
        <div className="docs-codeblock-head-left">
          {badge && <span className="docs-codeblock-badge">{badge}</span>}
          <span className="docs-codeblock-filename">{displayName}</span>
        </div>

        <div className="docs-codeblock-head-right">
          {expandable && (
            <button
              type="button"
              className="docs-codeblock-expand-toggle"
              onClick={() => setIsExpanded((v) => !v)}
              aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
            >
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            </button>
          )}

          <button
            type="button"
            className={`docs-codeblock-copy${copied ? ' ok' : ''}`}
            onClick={copy}
            title={copied ? 'Copied!' : 'Copy code'}
            aria-label={copied ? 'Copied' : 'Copy'}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div
        className={`docs-codeblock-body${isCollapsed ? ' is-collapsed' : ''}`}
        style={isCollapsed ? { maxHeight: collapsedMaxHeight } : undefined}
      >
        <pre className="docs-codeblock-pre">
          <code>{code}</code>
        </pre>

        {isCollapsed && (
          <div className="docs-codeblock-fade-mask">
            <button
              type="button"
              className="docs-codeblock-expand-pill"
              onClick={() => setIsExpanded(true)}
            >
              <span>Expand</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
