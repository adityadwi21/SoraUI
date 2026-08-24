import { useState, useEffect } from "react";
import { THEME_PRESETS, type ThemeTokens } from "./presets";
import { ThemeControls } from "./components/ThemeControls";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { CssExporter } from "./components/CssExporter";

export function App() {
  const [tokens, setTokens] = useState<ThemeTokens>(THEME_PRESETS.sky!);

  // Apply CSS variables dynamically to the document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--ui-primary", tokens.primary);
    root.style.setProperty("--ui-primary-foreground", tokens.primaryForeground);
    root.style.setProperty("--ui-secondary", tokens.secondary);
    root.style.setProperty(
      "--ui-secondary-foreground",
      tokens.secondaryForeground,
    );
    root.style.setProperty("--ui-background", tokens.background);
    root.style.setProperty("--ui-foreground", tokens.foreground);
    root.style.setProperty("--ui-muted", tokens.muted);
    root.style.setProperty("--ui-muted-foreground", tokens.mutedForeground);
    root.style.setProperty("--ui-border", tokens.border);
    root.style.setProperty("--ui-ring", tokens.ring);
    root.style.setProperty("--ui-destructive", tokens.destructive);
    root.style.setProperty(
      "--ui-destructive-foreground",
      tokens.destructiveForeground,
    );
    root.style.setProperty("--ui-radius", tokens.radius);
  }, [tokens]);

  return (
    <div className="theme-builder-app">
      <header className="app-header">
        <div className="brand-badge">
          <h1>SoraUI Theme Builder</h1>
          <span className="brand-tag">v0.1.0</span>
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--app-muted)" }}>
          Active Preset:{" "}
          <strong style={{ color: "#38bdf8" }}>{tokens.name}</strong> (
          {tokens.mode})
        </div>
      </header>

      <main className="app-layout">
        <ThemeControls
          tokens={tokens}
          onChange={setTokens}
          onReset={() => setTokens(THEME_PRESETS.sky!)}
        />
        <div className="preview-pane">
          <ComponentShowcase />
          <CssExporter tokens={tokens} />
        </div>
      </main>
    </div>
  );
}
