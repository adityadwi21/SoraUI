import React from 'react';
import { CopyButton } from './copy-button';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, filename, style }) => {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--ui-radius, 0.5rem)',
        backgroundColor: 'var(--ui-muted, #18181b)',
        color: 'var(--ui-foreground, #f4f4f5)',
        border: '1px solid var(--ui-border, #27272a)',
        overflow: 'hidden',
        fontSize: '0.875rem',
        margin: '1rem 0',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid var(--ui-border, #27272a)',
        }}
      >
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.8 }}>
          {filename || 'Example'}
        </span>
        <CopyButton text={code} />
      </div>

      <pre
        style={{
          margin: 0,
          padding: '1rem',
          overflowX: 'auto',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          lineHeight: 1.5,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
