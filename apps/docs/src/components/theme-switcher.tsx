import React from 'react';
import { THEME_DOCS } from '../registry/themes';

export interface ThemeSwitcherProps {
  value: string;
  onChange: (themeId: string) => void;
  style?: React.CSSProperties;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ value, onChange, style }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', ...style }}>
      <label htmlFor="theme-select" style={{ fontSize: '0.75rem', color: 'var(--ui-muted-foreground, #71717a)', fontWeight: 500 }}>
        Theme:
      </label>
      <select
        id="theme-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontSize: '0.8125rem',
          padding: '0.25rem 0.625rem',
          borderRadius: 'var(--ui-radius, 0.375rem)',
          border: '1px solid var(--ui-border, #e4e4e7)',
          backgroundColor: 'var(--ui-card, #ffffff)',
          color: 'var(--ui-foreground, #0c1a2b)',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {THEME_DOCS.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name} ({theme.mode})
          </option>
        ))}
      </select>
    </div>
  );
};
