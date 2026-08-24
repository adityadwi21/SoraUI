import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { ViewportSwitcher, ViewportMode } from "./viewport-switcher";
import { Button } from "@soraui/react";

export interface PreviewToolbarProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  viewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
}

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  theme,
  onThemeChange,
  viewport,
  onViewportChange,
  activeTab,
  onTabChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
        padding: "0.5rem 0.75rem",
        backgroundColor: "var(--ui-muted, #f4f4f5)",
        borderBottom: "1px solid var(--ui-border, #e4e4e7)",
        borderRadius: "var(--ui-radius, 0.5rem) var(--ui-radius, 0.5rem) 0 0",
      }}
    >
      <div style={{ display: "inline-flex", gap: "0.25rem", flex: 1 }}>
        <Button
          variant={activeTab === "preview" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onTabChange("preview")}
          style={{ fontSize: "0.75rem", height: "28px" }}
        >
          Preview
        </Button>
        <Button
          variant={activeTab === "code" ? "primary" : "ghost"}
          size="sm"
          onClick={() => onTabChange("code")}
          style={{ fontSize: "0.75rem", height: "28px" }}
        >
          Code
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ViewportSwitcher value={viewport} onChange={onViewportChange} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <ThemeSwitcher value={theme} onChange={onThemeChange} />
      </div>
    </div>
  );
};
