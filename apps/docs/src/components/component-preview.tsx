import React, { useState, useEffect } from "react";
import { ThemeScope } from "@soraui/react";
import { ViewportSwitcher, ViewportMode } from "./viewport-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { CodeBlock } from "./code-block";
import { Eye, Code2, Copy, Check, Sparkles } from "lucide-react";

export interface ComponentPreviewProps {
  children?: React.ReactNode;
  code: string;
  defaultTheme?: string;
  align?: "center" | "start";
  style?: React.CSSProperties;
  /** Optional title or filename for code view */
  filename?: string;
  /** Whether to show theme switcher */
  showThemeSwitcher?: boolean;
  /** Whether to show RTL toggle button (default: false) */
  showRtlToggle?: boolean;
  /** Default RTL state */
  defaultRtl?: boolean;
}

/** Helper to observe the docs layout dark/light mode */
function useDocsMode(): "light" | "dark" {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-docs-theme");
      if (attr === "dark" || attr === "light") return attr;
    }
    return "light";
  });

  useEffect(() => {
    const update = () => {
      const attr = document.documentElement.getAttribute("data-docs-theme");
      if (attr === "dark" || attr === "light") setMode(attr);
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-docs-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return mode;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  code,
  defaultTheme,
  align = "center",
  style,
  showThemeSwitcher = true,
  showRtlToggle = false,
  defaultRtl = false,
}) => {
  const docsMode = useDocsMode();
  // Automatically choose dark default theme (midnight) in dark mode, light (sky) in light mode
  const resolvedDefault = defaultTheme || (docsMode === "dark" ? "midnight" : "sky");
  
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [isRtl, setIsRtl] = useState(defaultRtl);
  const [copied, setCopied] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);

  // Active theme is user selection if chosen, or resolved default from docs mode
  const activeTheme = selectedTheme || resolvedDefault;

  const vpWidth = viewport === "mobile" ? "375px" : "100%";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="sora-preview-card" style={style}>
      {/* ─── PREVIEW TOOLBAR ─── */}
      <div className="sora-preview-toolbar">
        {/* Left: View Mode Tabs */}
        <div className="sora-preview-tabs-group" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            className={`sora-preview-tab-btn${tab === "preview" ? " active" : ""}`}
            onClick={() => setTab("preview")}
            title="Interactive Preview"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "code"}
            className={`sora-preview-tab-btn${tab === "code" ? " active" : ""}`}
            onClick={() => setTab("code")}
            title="View Source Code"
          >
            <Code2 size={13} />
            <span>Code</span>
          </button>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="sora-preview-toolbar-center">
          {tab === "preview" && (
            <ViewportSwitcher value={viewport} onChange={setViewport} />
          )}
        </div>

        {/* Right: Controls & Copy */}
        <div className="sora-preview-toolbar-right">
          {/* LTR / RTL Direction Toggle (Only shown when showRtlToggle is true) */}
          {showRtlToggle && (
            <button
              type="button"
              className={`sora-preview-dir-btn${isRtl ? " is-rtl" : ""}`}
              onClick={() => setIsRtl((prev) => !prev)}
              title={isRtl ? "Switch to Left-to-Right (LTR)" : "Switch to Right-to-Left (RTL)"}
              aria-label="Toggle Direction LTR / RTL"
            >
              <span>{isRtl ? "RTL" : "LTR"}</span>
            </button>
          )}

          {/* Theme Scope Selector */}
          {showThemeSwitcher && (
            <div className="sora-preview-theme-wrap">
              <ThemeSwitcher
                value={activeTheme}
                onChange={(th) => setSelectedTheme(th)}
              />
            </div>
          )}

          {/* Quick Copy Code Button */}
          <button
            type="button"
            className={`sora-preview-copy-btn${copied ? " copied" : ""}`}
            onClick={handleCopy}
            title={copied ? "Copied to clipboard!" : "Copy code snippet"}
            aria-label="Copy Code"
          >
            {copied ? (
              <>
                <Check size={13} style={{ color: "#22c55e" }} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── PREVIEW CANVAS OR CODE BLOCK ─── */}
      {tab === "preview" ? (
        <div className="sora-preview-canvas-wrapper">
          <div
            className="sora-preview-viewport-box"
            style={{
              width: vpWidth,
              transition: "width 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <ThemeScope
              theme={activeTheme as Parameters<typeof ThemeScope>[0]["theme"]}
            >
              <div
                dir={isRtl ? "rtl" : "ltr"}
                className="sora-preview-canvas-inner"
                style={{
                  justifyContent: align === "center" ? "center" : "flex-start",
                  alignItems: align === "center" ? "center" : "flex-start",
                }}
              >
                {/* Floating RTL Disclaimer */}
                {isRtl && (
                  <div className="sora-rtl-disclaimer-badge">
                    <button
                      type="button"
                      onClick={() => setShowAiNotice((v) => !v)}
                      onMouseEnter={() => setShowAiNotice(true)}
                      aria-label="AI Translation Disclaimer"
                      className="sora-rtl-info-icon"
                      title="AI Translation Disclaimer"
                    >
                      !
                    </button>
                    {showAiNotice && (
                      <div
                        onMouseLeave={() => setShowAiNotice(false)}
                        className="sora-rtl-disclaimer-popup"
                      >
                        <div className="sora-rtl-popup-title">
                          <Sparkles size={12} />
                          <span>AI Translation Preview</span>
                        </div>
                        <p>
                          Auto-translated sample strings for testing bidirectional alignment (RTL).
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Render Component Content */}
                <div className="sora-preview-rendered-content">
                  {children}
                </div>
              </div>
            </ThemeScope>
          </div>
        </div>
      ) : (
        <div className="sora-preview-code-pane">
          <CodeBlock
            code={code}
            language="tsx"
            hideHeader={true}
          />
        </div>
      )}
    </div>
  );
};
