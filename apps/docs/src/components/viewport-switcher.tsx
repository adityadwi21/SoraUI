import React from 'react';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ViewportSwitcherProps {
  value: ViewportMode;
  onChange: (m: ViewportMode) => void;
  style?: React.CSSProperties;
}

const VP: { m: ViewportMode; icon: string; label: string }[] = [
  { m: 'desktop', icon: '🖥', label: 'Desktop' },
  { m: 'tablet',  icon: '📱', label: 'Tablet' },
  { m: 'mobile',  icon: '📲', label: 'Mobile' },
];

export const ViewportSwitcher: React.FC<ViewportSwitcherProps> = ({ value, onChange, style }) => (
  <div
    style={{
      display: 'inline-flex', gap: '0.125rem',
      background: 'var(--docs-bg-muted)',
      borderRadius: 'var(--docs-radius-sm)',
      padding: '0.2rem',
      ...style,
    }}
    role="group" aria-label="Preview viewport"
  >
    {VP.map(({ m, icon, label }) => (
      <button
        key={m} type="button"
        aria-label={label} aria-pressed={value === m}
        onClick={() => onChange(m)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          padding: '0.175rem 0.5rem',
          fontSize: '0.75rem', fontFamily: 'var(--docs-font-sans)',
          borderRadius: '4px', border: 'none',
          background: value === m ? 'var(--docs-bg)' : 'transparent',
          color: value === m ? 'var(--docs-fg)' : 'var(--docs-fg-muted)',
          cursor: 'pointer',
          fontWeight: value === m ? 550 : 400,
          boxShadow: value === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 150ms ease',
        }}
      >
        <span aria-hidden>{icon}</span>
        {label}
      </button>
    ))}
  </div>
);
