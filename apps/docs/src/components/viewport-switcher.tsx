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
      alignItems: "center",
      gap: "0.15rem",
      background: "var(--docs-bg-muted)",
      borderRadius: "6px",
      padding: "0.15rem",
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
          gap: "0.3rem",
          padding: "0.22rem 0.6rem",
          fontSize: "0.775rem",
          fontFamily: "var(--docs-font-sans)",
          borderRadius: "4px",
          border: "none",
          background: value === m ? "var(--docs-bg)" : "transparent",
          color: value === m ? "var(--docs-fg)" : "var(--docs-fg-muted)",
          cursor: "pointer",
          fontWeight: value === m ? 600 : 500,
          minHeight: "28px",
          boxShadow: value === m ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
          transition: "all 150ms ease",
        }}
      >
        <Icon size={13} />
        <span>{label}</span>
      </button>
    ))}
  </div>
);
