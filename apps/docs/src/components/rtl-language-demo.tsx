import React, { useState } from "react";
import { Info } from "lucide-react";

export type SupportedLanguage = "en" | "ar" | "he";

export interface RtlLanguageDemoProps {
  children: (lang: SupportedLanguage, dir: "ltr" | "rtl") => React.ReactNode;
  defaultLanguage?: SupportedLanguage;
  className?: string;
  style?: React.CSSProperties;
}

export const AI_TRANSLATION_DISCLAIMERS = {
  en: "I used AI to translate the text for demonstration purposes. It's not perfect and may contain errors.",
  ar: "لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون الترجمة دقيقة وقد تحتوي على أخطاء.",
  he: "השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול להכיל שגיאות.",
};

export const RtlLanguageDemo: React.FC<RtlLanguageDemoProps> = ({
  children,
  defaultLanguage = "en",
  className = "",
  style,
}) => {
  const [lang, setLang] = useState<SupportedLanguage>(defaultLanguage);
  const [showNotice, setShowNotice] = useState(false);

  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <div
      className={`docs-rtl-demo-card ${className}`}
      style={{
        width: "100%",
        maxWidth: "560px",
        borderRadius: "var(--docs-radius, 10px)",
        border: "1px solid var(--docs-border)",
        background: "var(--docs-bg, #ffffff)",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        ...style,
      }}
    >
      {/* Clean Minimal Header: Select Dropdown on Left & Info Icon on Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.625rem 1rem",
          borderBottom: "1px solid var(--docs-border)",
          background: "transparent",
        }}
      >
        {/* Language Select Pill */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as SupportedLanguage)}
          aria-label="Select Language"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            padding: "0.3rem 1.85rem 0.3rem 0.75rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--docs-fg)",
            background: "var(--docs-bg)",
            border: "1px solid var(--docs-border)",
            borderRadius: "var(--docs-radius-sm, 6px)",
            cursor: "pointer",
            outline: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.55rem center",
            fontFamily: "inherit",
          }}
        >
          <option value="en">English</option>
          <option value="ar">العربية (Arabic)</option>
          <option value="he">עברית (Hebrew)</option>
        </select>

        {/* Top-Right AI Translation Info Icon (ⓘ) */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowNotice((v) => !v)}
            onMouseEnter={() => setShowNotice(true)}
            aria-label="AI Translation Disclaimer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              border: "1px solid var(--docs-border)",
              background: "transparent",
              color: "var(--docs-fg-muted)",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
            title="AI Translation Disclaimer"
          >
            <Info size={13} />
          </button>

          {/* Floating Popover Tooltip */}
          {showNotice && (
            <div
              onMouseLeave={() => setShowNotice(false)}
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "0.4rem",
                width: "310px",
                maxWidth: "calc(100vw - 2rem)",
                padding: "0.875rem",
                borderRadius: "var(--docs-radius, 8px)",
                background: "var(--docs-bg, #ffffff)",
                border: "1px solid var(--docs-border)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
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
                  color: "var(--docs-fg)",
                }}
              >
                <Info size={14} style={{ color: "#eab308" }} />
                <span>AI Translation Disclaimer</span>
              </div>
              <p style={{ margin: 0, color: "var(--docs-fg-muted)" }}>
                {AI_TRANSLATION_DISCLAIMERS.en}
              </p>
              <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
              <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg-muted)" }}>
                {AI_TRANSLATION_DISCLAIMERS.ar}
              </p>
              <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
              <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg-muted)" }}>
                {AI_TRANSLATION_DISCLAIMERS.he}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        dir={dir}
        style={{
          padding: "1.75rem 1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          {children(lang, dir)}
        </div>
      </div>
    </div>
  );
};
