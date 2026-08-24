import React from 'react';
import type { PropDefinition } from '../registry/types';

export interface PropTableProps {
  props: PropDefinition[];
}

export const PropTable: React.FC<PropTableProps> = ({ props }) => {
  if (!props?.length) {
    return (
      <p style={{ fontSize: '0.875rem', color: 'var(--docs-fg-muted)', fontStyle: 'italic' }}>
        No component-specific props. Inherits standard HTML / React attributes.
      </p>
    );
  }

  return (
    <div className="docs-prop-wrap">
      <table className="docs-prop-table">
        <thead>
          <tr>
            <th>Prop</th><th>Type</th><th>Default</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(p => (
            <tr key={p.name}>
              <td>
                <code style={{ color: 'var(--docs-accent)', fontWeight: 600 }}>
                  {p.name}
                  {p.required && <span style={{ color: '#f87171', marginLeft: 2 }} title="Required">*</span>}
                </code>
              </td>
              <td><code style={{ color: 'var(--docs-fg-muted)' }}>{p.type}</code></td>
              <td><code>{p.default || '-'}</code></td>
              <td style={{ color: 'var(--docs-fg-muted)' }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
