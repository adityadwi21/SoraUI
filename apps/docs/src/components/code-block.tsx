import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  title?: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename, title, style }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docs-codeblock" style={style}>
      <div className="docs-codeblock-head">
        <span className="docs-codeblock-lang">{title || filename || language || 'code'}</span>
        <button
          type="button"
          className={`docs-codeblock-copy${copied ? ' ok' : ''}`}
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy'}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="docs-codeblock-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};
