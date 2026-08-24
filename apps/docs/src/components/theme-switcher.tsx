import React from 'react';
import { THEME_DOCS } from '../registry/themes';

export interface ThemeSwitcherProps {
  value: string;
  onChange: (id: string) => void;
  style?: React.CSSProperties;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ value, onChange, style }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', ...style }}>
    <label
      htmlFor="preview-theme"
      style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}
    >
      Theme:
    </label>
    <select
      id="preview-theme"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        fontSize: '0.8125rem', padding: '0.2rem 1.5rem 0.2rem 0.5rem',
        borderRadius: 'var(--docs-radius-sm)',
        border: '1px solid var(--docs-border)',
        background: 'var(--docs-bg)',
        color: 'var(--docs-fg)',
        cursor: 'pointer', outline: 'none',
        fontFamily: 'var(--docs-font-sans)',
        appearance: 'none', WebkitAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.4rem center',
        transition: 'border-color 150ms ease',
      }}
    >
      {THEME_DOCS.map(t => (
        <option key={t.id} value={t.id}>{t.name} ({t.mode})</option>
      ))}
    </select>
  </div>
);
