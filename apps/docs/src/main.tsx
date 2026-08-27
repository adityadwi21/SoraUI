import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "@soraui/react";
import { DocsThemeProvider } from "./registry/docs-theme-context";

// SoraUI Core Themes & Styles
import "@soraui/core/theme/primitives.css";
import "@soraui/core/theme/presets/sky.css";
import "@soraui/core/theme/presets/cloud.css";
import "@soraui/core/theme/presets/horizon.css";
import "@soraui/core/theme/presets/aurora.css";
import "@soraui/core/theme/presets/twilight.css";
import "@soraui/core/theme/presets/midnight.css";
import "@soraui/core/theme/presets/nebula.css";
import "@soraui/core/theme/presets/eclipse.css";
import "@soraui/core/theme/presets/starlight.css";
import "@soraui/react/styles";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DocsThemeProvider>
      <ThemeProvider defaultTheme="sky" defaultMode="light">
        <App />
      </ThemeProvider>
    </DocsThemeProvider>
  </React.StrictMode>,
);
