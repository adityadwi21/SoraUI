import React from "react";
import { Monitor, Smartphone, type LucideIcon } from "lucide-react";

export type ViewportMode = "desktop" | "mobile";

export interface ViewportSwitcherProps {
  value: ViewportMode;
  onChange: (m: ViewportMode) => void;
  style?: React.CSSProperties;
}

const VP: { m: ViewportMode; icon: LucideIcon; label: string }[] = [
  { m: "desktop", icon: Monitor, label: "Desktop" },
  { m: "mobile", icon: Smartphone, label: "Mobile" },
];

export const ViewportSwitcher: React.FC<ViewportSwitcherProps> = ({
  value,
  onChange,
  style,
}) => (
  <div
    style={{
      display: "inline-flex",
      gap: "0.125rem",
      background: "var(--docs-bg-muted)",
      borderRadius: "var(--docs-radius-sm)",
      padding: "0.2rem",
      border: "1px solid var(--docs-border)",
      ...style,
    }}
    role="group"
    aria-label="Preview viewport"
  >
    {VP.map(({ m, icon: Icon, label }) => (
      <button
        key={m}
        type="button"
        aria-label={label}
        aria-pressed={value === m}
        onClick={() => onChange(m)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.25rem 0.625rem",
          fontSize: "0.75rem",
          fontFamily: "var(--docs-font-sans)",
          borderRadius: "4px",
          border: "none",
          background: value === m ? "var(--docs-bg)" : "transparent",
          color: value === m ? "var(--docs-fg)" : "var(--docs-fg-muted)",
          cursor: "pointer",
          fontWeight: value === m ? 600 : 400,
          boxShadow: value === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          transition: "all 150ms ease",
        }}
      >
        <Icon size={13} />
        <span>{label}</span>
      </button>
    ))}
  </div>
);
