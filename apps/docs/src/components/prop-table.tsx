import React from 'react';
import type { PropDefinition } from '../registry/types';

export interface PropTableProps {
  props: PropDefinition[];
}

export const PropTable: React.FC<PropTableProps> = ({ props }) => {
  if (!props || props.length === 0) {
    return (
      <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', fontStyle: 'italic' }}>
        No component-specific props. Inherits standard HTML / React attributes.
      </p>
    );
  }

  return (
    <div style={{ overflowX: 'auto', margin: '1rem 0', borderRadius: 'var(--ui-radius, 0.5rem)', border: '1px solid var(--ui-border, #e4e4e7)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--ui-muted, #f4f4f5)', borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
            <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Prop</th>
            <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Type</th>
            <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Default</th>
            <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--ui-primary, #0ea5e9)' }}>
                {prop.name}
                {prop.required && <span style={{ color: 'var(--ui-destructive, #ef4444)', marginLeft: '2px' }}>*</span>}
              </td>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--ui-muted-foreground, #71717a)' }}>
                {prop.type}
              </td>
              <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                {prop.default || '-'}
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
