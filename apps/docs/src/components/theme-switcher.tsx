import React from "react";
import { THEME_DOCS } from "../registry/themes";

export interface ThemeSwitcherProps {
  value: string;
  onChange: (id: string) => void;
  style?: React.CSSProperties;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  value,
  onChange,
  style,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.35rem",
      ...style,
    }}
  >
    <select
      id="preview-theme"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Component Theme Scope"
      title="Switch Theme Scope"
      style={{
        height: "28px",
        fontSize: "0.775rem",
        fontWeight: 500,
        padding: "0 1.5rem 0 0.55rem",
        borderRadius: "5px",
        border: "1px solid var(--docs-border)",
        background: "var(--docs-bg)",
        color: "var(--docs-fg)",
        cursor: "pointer",
        outline: "none",
        fontFamily: "var(--docs-font-sans)",
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.45rem center",
        transition: "all 150ms ease",
      }}
    >
      {THEME_DOCS.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  </div>
);
