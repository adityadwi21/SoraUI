import React, { useState } from "react";
import { ThemeScope } from "@soraui/react";
import { ViewportSwitcher, ViewportMode } from "./viewport-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { CodeBlock } from "./code-block";

export interface ComponentPreviewProps {
  children?: React.ReactNode;
  code: string;
  defaultTheme?: string;
  align?: "center" | "start";
  style?: React.CSSProperties;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  code,
  defaultTheme = "sky",
  align = "center",
  style,
}) => {
  const [previewTheme, setPreviewTheme] = useState(defaultTheme);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [isRtl, setIsRtl] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);

  const vpWidth = viewport === "mobile" ? "375px" : "100%";

  return (
    <div className="docs-preview-root" style={style}>
      {/* Toolbar */}
      <div className="docs-preview-toolbar">
        <div className="docs-preview-toolbar-left">
          <div className="docs-preview-tabs" role="tablist">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`docs-preview-tab${tab === t ? " active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "preview" ? "Preview" : "Code"}
              </button>
            ))}
          </div>
        </div>

        <div className="docs-preview-toolbar-center">
          {tab === "preview" && (
            <ViewportSwitcher value={viewport} onChange={setViewport} />
          )}
        </div>

        <div className="docs-preview-toolbar-right" style={{ gap: "0.5rem" }}>
          {tab === "preview" && (
            <button
              type="button"
              className={`docs-preview-tab${isRtl ? " active" : ""}`}
              onClick={() => setIsRtl((prev) => !prev)}
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.55rem",
                fontWeight: 600,
                border: "1px solid var(--docs-border)",
                borderRadius: "var(--docs-radius-sm)",
                background: isRtl ? "var(--ui-primary, #0ea5e9)" : "transparent",
                color: isRtl ? "var(--ui-primary-foreground, #ffffff)" : "var(--docs-fg-muted)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                lineHeight: 1.2,
                transition: "all 150ms ease",
              }}
              title={isRtl ? "Switch to Left-to-Right (LTR)" : "Switch to Right-to-Left (RTL)"}
              aria-label="Toggle Direction LTR / RTL"
            >
              {isRtl ? "RTL" : "LTR"}
            </button>
          )}
          <ThemeSwitcher value={previewTheme} onChange={setPreviewTheme} />
        </div>
      </div>

      {/* Content */}
      {tab === "preview" ? (
        <div className="docs-preview-canvas">
          <div
            style={{
              width: vpWidth,
              transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <ThemeScope
              theme={previewTheme as Parameters<typeof ThemeScope>[0]["theme"]}
            >
              <div
                dir={isRtl ? "rtl" : "ltr"}
                className="docs-preview-theme-canvas"
                style={{
                  position: "relative",
                  justifyContent: align === "center" ? "center" : "flex-start",
                  alignItems: align === "center" ? "center" : "flex-start",
                  direction: isRtl ? "rtl" : "ltr",
                  width: "100%",
                }}
              >
                {/* Floating AI Translation Disclaimer in Top-Right Corner */}
                {isRtl && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      insetInlineEnd: "0.5rem",
                      zIndex: 30,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setShowAiNotice((v) => !v)}
                      onMouseEnter={() => setShowAiNotice(true)}
                      aria-label="AI Translation Disclaimer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "1px solid rgba(234, 179, 8, 0.5)",
                        background: "rgba(234, 179, 8, 0.15)",
                        color: "#eab308",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      }}
                      title="AI Translation Disclaimer"
                    >
                      !
                    </button>
                    {showAiNotice && (
                      <div
                        onMouseLeave={() => setShowAiNotice(false)}
                        style={{
                          position: "absolute",
                          top: "100%",
                          insetInlineEnd: 0,
                          marginTop: "0.4rem",
                          width: "310px",
                          maxWidth: "calc(100vw - 2rem)",
                          padding: "0.75rem",
                          borderRadius: "var(--docs-radius, 8px)",
                          background: "var(--docs-bg, #ffffff)",
                          border: "1px solid var(--docs-border)",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                          zIndex: 50,
                          fontSize: "0.75rem",
                          lineHeight: 1.45,
                          color: "var(--docs-fg)",
                          textAlign: "left",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            marginBottom: "0.4rem",
                            fontWeight: 600,
                            color: "#eab308",
                          }}
                        >
                          <span>!</span>
                          <span>AI Translation Disclaimer</span>
                        </div>
                        <p style={{ margin: 0, color: "var(--docs-fg-muted)" }}>
                          I used AI to translate the text for demonstration purposes. It's not perfect and may contain errors.
                        </p>
                        <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
                        <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg-muted)" }}>
                          لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون الترجمة دقيقة وقد تحتوي على أخطاء.
                        </p>
                        <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
                        <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg-muted)" }}>
                          השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול להכיל שגיאות.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {children}
              </div>
            </ThemeScope>
          </div>
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
};
