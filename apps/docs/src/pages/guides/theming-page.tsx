import React, { useState } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Switch,
  ThemeScope,
} from "@soraui/react";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  AlertCircle,
  Palette,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CodeBlock } from "../../components/code-block";
import { THEME_DOCS } from "../../registry/themes";

export interface ThemingPageProps {
  onNavigate?: (path: string) => void;
}

export const ThemingPage: React.FC<ThemingPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [copiedThemeId, setCopiedThemeId] = useState<string | null>(null);

  // Interactive Theme Customizer State
  const [activeTheme, setActiveTheme] = useState("sky");
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");
  const [activeLang, setActiveLang] = useState<"en" | "ar" | "he">("en");
  const [activeRadius, setActiveRadius] = useState<"0" | "0.375" | "0.5" | "0.75" | "1">("0.5");
  const [switchChecked, setSwitchChecked] = useState(true);
  const [showAiNotice, setShowAiNotice] = useState(false);

  const activeDir = activeLang === "en" ? "ltr" : "rtl";

  const playgroundContent = {
    en: {
      title: "SoraUI Theme Playground",
      desc: "Real-time demonstration of semantic design tokens and components.",
      section1: "BUTTONS & BADGES",
      btnPrimary: "Primary Action",
      btnSecondary: "Secondary",
      btnOutline: "Outline",
      btnDestructive: "Destructive",
      badgeActive: "Active",
      section2: "INPUT & CONTROLS",
      inputPlaceholder: "Enter your email address...",
      switchLabel: "Notifications",
      footerNote: "Zero-runtime CSS variables",
      btnSave: "Save Changes",
    },
    ar: {
      title: "مساحة تجربة ثيمات SoraUI",
      desc: "عرض حي ومباشر للمتغيرات التصميمية والمكونات التفاعلية.",
      section1: "الأزرار والشارات",
      btnPrimary: "إجراء رئيسي",
      btnSecondary: "ثانوي",
      btnOutline: "مخطط",
      btnDestructive: "حذف",
      badgeActive: "نشط الآن",
      section2: "عناصر النموذج والتحكم",
      inputPlaceholder: "أدخل عنوان بريدك الإلكتروني...",
      switchLabel: "الإشعارات",
      footerNote: "متغيرات CSS بدون استهلاك وقت تشغيل",
      btnSave: "حفظ التغييرات",
    },
    he: {
      title: "סביבת בדיקת ערכות נושא SoraUI",
      desc: "הדגמה בזמן אמת של אסימוני עיצוב סמנטיים ורכיבים אינטראקטיביים.",
      section1: "כפתורים ותגים",
      btnPrimary: "פעולה ראשית",
      btnSecondary: "משני",
      btnOutline: "מתאר",
      btnDestructive: "מחיקה",
      badgeActive: "פעיל כעת",
      section2: "פקדי טופס והזנה",
      inputPlaceholder: "הזן את כתובת הדוא\"ל שלך...",
      switchLabel: "התראות",
      footerNote: "משתני CSS ללא עומס זמן ריצה",
      btnSave: "שמור שינויים",
    },
  }[activeLang];

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const handleCopyPage = () => {
    const fullText = `# Theming in SoraUI\n\nZero-runtime CSS variables, 9 accessible space presets, ThemeProvider, ThemeScope, and dual-mode architecture.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyThemeImport = async (id: string) => {
    const code = `import '@soraui/core/dist/tokens/themes/${id}.css';\n\n// Apply to root or subtree\n<html data-theme="${id}">`;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedThemeId(id);
      setTimeout(() => setCopiedThemeId(null), 2000);
    } catch {
      /* noop */
    }
  };

  // Detailed 9 space preset list
  const themePresetsList = [
    {
      name: "Sky",
      id: "sky",
      mode: "light",
      primaryHex: "#0369a1",
      desc: "Vivid azure cyan & daylight blue with crisp slate neutrals. The default SoraUI theme.",
    },
    {
      name: "Cloud",
      id: "cloud",
      mode: "light",
      primaryHex: "#18181b",
      desc: "Soft monochrome aesthetic with neutral zinc tones, slate undertones, and minimal styling.",
    },
    {
      name: "Horizon",
      id: "horizon",
      mode: "light",
      primaryHex: "#c2410c",
      desc: "Warm dawn sunrise palette with amber, orange highlights, and cozy warm paper cards.",
    },
    {
      name: "Midnight",
      id: "midnight",
      mode: "dark",
      primaryHex: "#818cf8",
      desc: "Ultra-deep space navy background with crisp luminescent indigo and cyan highlights.",
    },
    {
      name: "Aurora",
      id: "aurora",
      mode: "dark",
      primaryHex: "#14b8a6",
      desc: "Vibrant emerald green & teal nature borealis palette on dark moss green backdrops.",
    },
    {
      name: "Twilight",
      id: "twilight",
      mode: "dark",
      primaryHex: "#38bdf8",
      desc: "Deep oceanic indigo and dusk violet sky aesthetic on obsidian card surfaces.",
    },
    {
      name: "Nebula",
      id: "nebula",
      mode: "dark",
      primaryHex: "#c084fc",
      desc: "Cosmic deep violet and fuchsia nebula glow tailored for gaming and AI interfaces.",
    },
    {
      name: "Eclipse",
      id: "eclipse",
      mode: "dark",
      primaryHex: "#facc15",
      desc: "Pure high-contrast obsidian black with sharp solar flare gold and amber glow.",
    },
    {
      name: "Starlight",
      id: "starlight",
      mode: "dark",
      primaryHex: "#f59e0b",
      desc: "Deep charcoal dark backdrop with glowing starlight amber accents for dev tools.",
    },
  ];

  // 24-key semantic token reference table
  const tokens = [
    {
      group: "Surface & Layout",
      items: [
        {
          variable: "--ui-background",
          role: "Default background color of body or full-screen canvas",
          usedIn: "body, page canvas, full-bleed containers",
        },
        {
          variable: "--ui-foreground",
          role: "Default text and primary typography color",
          usedIn: "body text, headings, list items",
        },
        {
          variable: "--ui-card",
          role: "Surface background color for cards and elevated panels",
          usedIn: "Card, Bento grids, widgets",
        },
        {
          variable: "--ui-card-foreground",
          role: "Text and icon color inside cards and panels",
          usedIn: "CardTitle, CardDescription, card body text",
        },
        {
          variable: "--ui-popover",
          role: "Background for floating overlays, dialogs, and dropdowns",
          usedIn: "Popover, Dropdown, Select, Tooltip, Dialog",
        },
        {
          variable: "--ui-popover-foreground",
          role: "Text color inside floating overlays and dropdowns",
          usedIn: "PopoverContent, DropdownItem, SelectItem",
        },
      ],
    },
    {
      group: "Brand & Interactive Elements",
      items: [
        {
          variable: "--ui-primary",
          role: "Primary brand accent and prominent call-to-action color",
          usedIn: "Button (primary), active Tabs, highlighted badges",
        },
        {
          variable: "--ui-primary-foreground",
          role: "High-contrast text color on top of primary background",
          usedIn: "Primary button label, active tab text",
        },
        {
          variable: "--ui-secondary",
          role: "Subtle secondary button fill and pill background",
          usedIn: "Button (secondary), secondary badges, tags",
        },
        {
          variable: "--ui-secondary-foreground",
          role: "Text color for secondary and auxiliary elements",
          usedIn: "Secondary button text, neutral badges",
        },
        {
          variable: "--ui-accent",
          role: "Hover highlights, active list rows, and focus accents",
          usedIn: "DropdownItem (hover), Sidebar active link, chips",
        },
        {
          variable: "--ui-accent-foreground",
          role: "Text color when an item is hovered or focused",
          usedIn: "DropdownItem (active), active navigation text",
        },
      ],
    },
    {
      group: "Feedback & System States",
      items: [
        {
          variable: "--ui-muted",
          role: "De-emphasized background for hovered states and tabs",
          usedIn: "TabsList, inactive pill buttons, table headers",
        },
        {
          variable: "--ui-muted-foreground",
          role: "Subtle, de-emphasized text color for secondary labels",
          usedIn: "Subtitles, placeholders, timestamps, breadcrumbs",
        },
        {
          variable: "--ui-destructive",
          role: "Critical alerts, errors, and destructive actions",
          usedIn: "Button (destructive), Alert (error), Badge (error)",
        },
        {
          variable: "--ui-destructive-foreground",
          role: "Contrast text on top of destructive action surfaces",
          usedIn: "Destructive button label, critical badges",
        },
        {
          variable: "--ui-success",
          role: "Success badges, confirmations, and positive states",
          usedIn: "Alert (success), Badge (success), status chips",
        },
        {
          variable: "--ui-warning",
          role: "Warning badges, caution banners, and attention flags",
          usedIn: "Alert (warning), Badge (warning), status flags",
        },
      ],
    },
    {
      group: "Borders, Inputs & Focus Rings",
      items: [
        {
          variable: "--ui-border",
          role: "Default hairline border for layout and panel separation",
          usedIn: "Card border, table rows, divider lines",
        },
        {
          variable: "--ui-input",
          role: "Border color specifically for interactive input fields",
          usedIn: "Input, Textarea, SelectTrigger, Checkbox",
        },
        {
          variable: "--ui-ring",
          role: "Accessible focus outline ring for keyboard navigation",
          usedIn: "Focus-visible rings across all interactive controls",
        },
        {
          variable: "--ui-radius",
          role: "Corner radius multiplier token",
          usedIn: "Buttons, Inputs, Cards, Dialogs, Tooltips",
        },
      ],
    },
  ];

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Theming</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy page markdown"
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: "#22c55e" }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/installation")}
                title="Previous: Installation"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/cli-reference")}
                title="Next: CLI Reference"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Using CSS variables to theme your app. Zero runtime CSS, 9 accessible space presets, and seamless light/dark mode dualities.
        </p>
      </header>

      {/* ─── KEY HIGHLIGHTS ─── */}
      <div className="docs-feature-cards" style={{ marginTop: "1rem" }}>
        <div className="docs-feature-card">
          <div className="docs-feature-icon" style={{ color: "#0284c7" }}>
            <Zap size={20} />
          </div>
          <h3 className="docs-feature-title">0ms Runtime Overhead</h3>
          <p className="docs-feature-desc">
            100% native CSS custom properties. No style recalculations, no runtime theme context re-renders, and no bloated JS styling bundles.
          </p>
        </div>
        <div className="docs-feature-card">
          <div className="docs-feature-icon" style={{ color: "#10b981" }}>
            <ShieldCheck size={20} />
          </div>
          <h3 className="docs-feature-title">WCAG 2.1 AA Guaranteed</h3>
          <p className="docs-feature-desc">
            Every text and UI combination across all 9 presets is strictly verified with automated contrast testing (contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI elements).
          </p>
        </div>
        <div className="docs-feature-card">
          <div className="docs-feature-icon" style={{ color: "#8b5cf6" }}>
            <Palette size={20} />
          </div>
          <h3 className="docs-feature-title">Subtree Theme Isolation</h3>
          <p className="docs-feature-desc">
            Easily embed dark widgets into light pages with <code>&lt;ThemeScope&gt;</code> without variable leakage or parent mode clashes.
          </p>
        </div>
      </div>

      <div className="docs-intro-body" style={{ marginTop: "2rem" }}>
        {/* ─── SECTION 1: INTERACTIVE THEME CUSTOMIZER ─── */}
        <section className="docs-intro-section" id="theme-customizer">
          <h2 className="docs-intro-h2">
            <span>Interactive Theme Customizer</span>
            <a href="#theme-customizer" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>
          <p>
            Choose any of the 9 space presets, adjust the corner radius, and toggle between light and dark modes to preview live components in real-time:
          </p>

          <div
            style={{
              border: "1px solid var(--docs-border)",
              borderRadius: "var(--docs-radius)",
              background: "var(--docs-bg-card)",
              overflow: "hidden",
              marginTop: "1.25rem",
              boxShadow: "var(--docs-card-shadow)",
            }}
          >
            {/* Customizer Controls Bar */}
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--docs-border)",
                background: "var(--docs-bg-subtle)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              {/* Preset Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--docs-fg)" }}>
                  Preset:
                </span>
                <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {THEME_DOCS.map((t) => {
                    const isSelected = activeTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setActiveTheme(t.id);
                          setActiveMode(t.mode);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          padding: "0.25rem 0.65rem",
                          fontSize: "0.8125rem",
                          borderRadius: "var(--docs-radius-sm)",
                          border: isSelected
                            ? "1px solid var(--docs-border-focus, #38bdf8)"
                            : "1px solid var(--docs-border)",
                          background: isSelected ? "var(--docs-bg)" : "transparent",
                          color: isSelected ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                          fontWeight: isSelected ? 600 : 400,
                          cursor: "pointer",
                          transition: "all 150ms ease",
                          boxShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: t.primaryColor,
                          }}
                        />
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode & Radius Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                {/* Mode Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--docs-fg)" }}>
                    Mode:
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      background: "var(--docs-bg-muted)",
                      padding: "0.15rem",
                      borderRadius: "var(--docs-radius-sm)",
                      border: "1px solid var(--docs-border)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMode("light")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        border: "none",
                        borderRadius: "4px",
                        background: activeMode === "light" ? "var(--docs-bg)" : "transparent",
                        color: activeMode === "light" ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                        fontWeight: activeMode === "light" ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      <Sun size={12} />
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode("dark")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        border: "none",
                        borderRadius: "4px",
                        background: activeMode === "dark" ? "var(--docs-bg)" : "transparent",
                        color: activeMode === "dark" ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                        fontWeight: activeMode === "dark" ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      <Moon size={12} />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Radius Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--docs-fg)" }}>
                    Radius:
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      background: "var(--docs-bg-muted)",
                      padding: "0.15rem",
                      borderRadius: "var(--docs-radius-sm)",
                      border: "1px solid var(--docs-border)",
                    }}
                  >
                    {(["0", "0.375", "0.5", "0.75", "1"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setActiveRadius(r)}
                        style={{
                          padding: "0.2rem 0.45rem",
                          fontSize: "0.75rem",
                          border: "none",
                          borderRadius: "4px",
                          background: activeRadius === r ? "var(--docs-bg)" : "transparent",
                          color: activeRadius === r ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                          fontWeight: activeRadius === r ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        {r === "0" ? "0" : r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language / Direction Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--docs-fg)" }}>
                    Language:
                  </span>
                  <div
                    style={{
                      display: "inline-flex",
                      background: "var(--docs-bg-muted)",
                      padding: "0.15rem",
                      borderRadius: "var(--docs-radius-sm)",
                      border: "1px solid var(--docs-border)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveLang("en")}
                      style={{
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        border: "none",
                        borderRadius: "4px",
                        background: activeLang === "en" ? "var(--docs-bg)" : "transparent",
                        color: activeLang === "en" ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                        fontWeight: activeLang === "en" ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLang("ar")}
                      style={{
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        border: "none",
                        borderRadius: "4px",
                        background: activeLang === "ar" ? "var(--docs-bg)" : "transparent",
                        color: activeLang === "ar" ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                        fontWeight: activeLang === "ar" ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      العربية (RTL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLang("he")}
                      style={{
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        border: "none",
                        borderRadius: "4px",
                        background: activeLang === "he" ? "var(--docs-bg)" : "transparent",
                        color: activeLang === "he" ? "var(--docs-fg)" : "var(--docs-fg-muted)",
                        fontWeight: activeLang === "he" ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      עברית (RTL)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Preview Canvas */}
            <div
              style={{
                position: "relative",
                padding: "2rem",
                background: "var(--docs-canvas-bg)",
                backgroundImage: "radial-gradient(var(--docs-canvas-dot) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Floating Top-Right AI Translation Notice Button '!' */}
              {activeDir === "rtl" && (
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
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
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "1px solid rgba(234, 179, 8, 0.5)",
                      background: "rgba(234, 179, 8, 0.15)",
                      color: "#eab308",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      transition: "all 150ms ease",
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
                        right: 0,
                        marginTop: "0.5rem",
                        width: "320px",
                        maxWidth: "calc(100vw - 2rem)",
                        padding: "0.875rem",
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
                        <AlertCircle size={14} />
                        <span>AI Translation Disclaimer</span>
                      </div>
                      <p style={{ margin: 0, color: "var(--docs-fg)" }}>
                        I used AI to translate the text for demonstration purposes. It's not perfect and may contain errors.
                      </p>
                      <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
                      <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg)" }}>
                        لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون الترجمة دقيقة وقد تحتوي على أخطاء.
                      </p>
                      <div style={{ borderTop: "1px solid var(--docs-border)", margin: "0.4rem 0" }} />
                      <p style={{ margin: 0, direction: "rtl", textAlign: "right", color: "var(--docs-fg)" }}>
                        השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול להכיל שגיאות.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div style={{ width: "100%", maxWidth: "680px" }}>
                <ThemeScope
                  theme={activeTheme}
                  mode={activeMode}
                  style={
                    {
                      "--ui-radius": `${activeRadius}rem`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    dir={activeDir}
                    style={{
                      background: "var(--ui-background)",
                      color: "var(--ui-foreground)",
                      borderRadius: "var(--ui-radius, 0.5rem)",
                      padding: "1.75rem",
                      boxShadow: "0 0 0 1px var(--ui-border), 0 8px 24px rgba(0,0,0,0.12)",
                      transition: "all 200ms ease",
                    }}
                  >
                    {/* Live Card Content */}
                    <Card style={{ border: "1px solid var(--ui-border)", background: "var(--ui-card)" }}>
                      <CardHeader>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <CardTitle style={{ color: "var(--ui-card-foreground)" }}>
                            {playgroundContent.title}
                          </CardTitle>
                          <Badge variant="default">
                            {activeTheme.toUpperCase()} • {activeMode.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription style={{ color: "var(--ui-muted-foreground)" }}>
                          {playgroundContent.desc}
                        </CardDescription>
                      </CardHeader>

                      <CardContent style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {/* Interactive Buttons Row */}
                        <div>
                          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ui-muted-foreground)", marginBottom: "0.5rem" }}>
                            {playgroundContent.section1}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                            <Button variant="primary" size="sm">
                              {playgroundContent.btnPrimary}
                            </Button>
                            <Button variant="secondary" size="sm">
                              {playgroundContent.btnSecondary}
                            </Button>
                            <Button variant="outline" size="sm">
                              {playgroundContent.btnOutline}
                            </Button>
                            <Button variant="destructive" size="sm">
                              {playgroundContent.btnDestructive}
                            </Button>
                            <Badge variant="secondary">{playgroundContent.badgeActive}</Badge>
                            <Badge variant="outline">v0.1.1</Badge>
                          </div>
                        </div>

                        {/* Interactive Form Row */}
                        <div>
                          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--ui-muted-foreground)", marginBottom: "0.5rem" }}>
                            {playgroundContent.section2}
                          </p>
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                            <div style={{ flex: 1, minWidth: "200px" }}>
                              <Input placeholder={playgroundContent.inputPlaceholder} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <Switch
                                id="theme-switch"
                                checked={switchChecked}
                                onCheckedChange={setSwitchChecked}
                              />
                              <label
                                htmlFor="theme-switch"
                                style={{ fontSize: "0.8125rem", color: "var(--ui-foreground)", cursor: "pointer" }}
                              >
                                {playgroundContent.switchLabel}
                              </label>
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter
                        style={{
                          borderTop: "1px solid var(--ui-border)",
                          paddingTop: "0.875rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "0.75rem", color: "var(--ui-muted-foreground)" }}>
                          {playgroundContent.footerNote}
                        </span>
                        <Button variant="primary" size="sm">
                          {playgroundContent.btnSave}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </ThemeScope>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: CONVENTION ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="css-variables" className="docs-intro-h2">
            <span>CSS Variables Convention</span>
            <a href="#css-variables" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            When initializing your project with <code>npx @soraui/cli init</code>, the CLI configures your{" "}
            <code>components.json</code> with CSS variable tokens enabled:
          </p>

          <CodeBlock
            language="json"
            filename="components.json"
            code={`{
  "style": "default",
  "rsc": true,
  "theme": "sky",
  "css": "app/globals.css",
  "cssVariables": true
}`}
          />

          <p style={{ marginTop: "1rem" }}>
            We use a consistent <strong>background and foreground convention</strong> for colors.
            The <code>background</code> suffix is omitted when the variable is used for a background color.
          </p>

          <p>Given a background and foreground color token pair:</p>

          <CodeBlock
            language="css"
            code={`--ui-primary: #0284c7;
--ui-primary-foreground: #ffffff;`}
          />

          <p style={{ marginTop: "0.875rem" }}>
            This gives us self-documenting and contrast-safe styles across all components:
          </p>

          <CodeBlock
            language="css"
            code={`.btn-primary {
  background-color: var(--ui-primary);
  color: var(--ui-primary-foreground);
}`}
          />
        </section>

        {/* ─── SECTION 3: TOKEN SCHEMA & REFERENCE TABLE ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="theme-tokens" className="docs-intro-h2">
            <span>Design Tokens Reference</span>
            <a href="#theme-tokens" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            Here are the 24 canonical semantic variables defined across all SoraUI themes and components:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginTop: "1.25rem" }}>
            {tokens.map((group) => (
              <div key={group.group}>
                <h3
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--docs-fg)",
                    marginBottom: "0.625rem",
                  }}
                >
                  {group.group}
                </h3>
                <div className="docs-token-table-container">
                  <table className="docs-token-table">
                    <thead>
                      <tr>
                        <th style={{ width: "32%" }}>Token Variable</th>
                        <th style={{ width: "40%" }}>Semantic Role & Description</th>
                        <th style={{ width: "28%" }}>Used In</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((t) => (
                        <tr key={t.variable}>
                          <td>
                            <code className="docs-token-code">{t.variable}</code>
                          </td>
                          <td>{t.role}</td>
                          <td>
                            <span className="docs-token-used">{t.usedIn}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: 9 CURATED SPACE PRESETS GALLERY ─── */}
        <section className="docs-intro-section" id="theme-presets" style={{ marginTop: "3rem" }}>
          <h2 className="docs-intro-h2">
            <span>Curated 9 Theme Presets</span>
            <a href="#theme-presets" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI provides <strong>9 pre-engineered space & atmosphere themes</strong>, each featuring dual adaptive light & dark modes with verified WCAG 2.1 AA contrast:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
              marginTop: "1.25rem",
            }}
          >
            {themePresetsList.map((t) => (
              <div
                key={t.id}
                style={{
                  border: "1px solid var(--docs-border)",
                  borderRadius: "var(--docs-radius)",
                  background: "var(--docs-bg-card)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "var(--docs-card-shadow)",
                  transition: "transform 150ms ease, border-color 150ms ease",
                }}
              >
                {/* Miniature live preview banner inside ThemeScope */}
                <ThemeScope theme={t.id} mode={t.mode as "light" | "dark"}>
                  <div
                    style={{
                      background: "var(--ui-background)",
                      color: "var(--ui-foreground)",
                      padding: "1.25rem",
                      borderBottom: "1px solid var(--ui-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: t.primaryHex,
                          boxShadow: "0 0 0 2px var(--ui-background), 0 0 0 3px var(--ui-border)",
                        }}
                      />
                      <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                        {t.name}
                      </span>
                    </div>
                    <Badge variant="default" style={{ fontSize: "0.6875rem" }}>
                      {t.mode.toUpperCase()}
                    </Badge>
                  </div>
                </ThemeScope>

                {/* Card Details */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  <div>
                    <code
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--docs-fg-muted)",
                        fontFamily: "var(--docs-font-mono)",
                      }}
                    >
                      data-theme=&quot;{t.id}&quot;
                    </code>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8125rem",
                      color: "var(--docs-fg-muted)",
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {t.desc}
                  </p>

                  <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--docs-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={() => handleCopyThemeImport(t.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.3rem 0.65rem",
                        fontSize: "0.75rem",
                        borderRadius: "var(--docs-radius-sm)",
                        border: "1px solid var(--docs-border)",
                        background: "var(--docs-bg)",
                        color: "var(--docs-fg)",
                        cursor: "pointer",
                      }}
                    >
                      {copiedThemeId === t.id ? (
                        <>
                          <Check size={12} style={{ color: "#22c55e" }} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Import</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTheme(t.id);
                        setActiveMode(t.mode as "light" | "dark");
                        const el = document.getElementById("theme-customizer");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--docs-fg-muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      Preview
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: DARK MODE INTEGRATION ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="dark-mode" className="docs-intro-h2">
            <span>Dark Mode & Mode Detection</span>
            <a href="#dark-mode" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI supports seamless light and dark mode transitions using standard CSS selectors.
            You can toggle modes by setting either the <code>data-mode</code> attribute or the <code>.dark</code> class on your root <code>&lt;html&gt;</code> element:
          </p>

          <CodeBlock
            language="html"
            code={`<!-- Dark mode via data-mode (Recommended) -->
<html data-mode="dark">

<!-- Dark mode via class (Tailwind/next-themes compatible) -->
<html class="dark">`}
          />

          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--docs-fg)",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Using ThemeProvider in React
          </h3>
          <p>
            Wrap your root layout with <code>&lt;ThemeProvider&gt;</code> to manage theme and mode states with persistence:
          </p>

          <CodeBlock
            language="tsx"
            filename="app/layout.tsx (Next.js / Vite)"
            code={`import { ThemeProvider } from '@soraui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="sky" defaultMode="system">
      {children}
    </ThemeProvider>
  );
}`}
          />
        </section>

        {/* ─── SECTION 6: SUBTREE THEME ISOLATION (THEMESCOPE) ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="theme-scope" className="docs-intro-h2">
            <span>Subtree Theming with ThemeScope</span>
            <a href="#theme-scope" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            Need to render a deep dark widget (such as <code>midnight</code> or <code>twilight</code>) inside a light-themed webpage, or vice versa?
            Use <code>&lt;ThemeScope&gt;</code>:
          </p>

          <CodeBlock
            language="tsx"
            code={`import { ThemeScope, Card, Button } from '@soraui/react';

export function MidnightHeroCard() {
  return (
    /* Scoped dark card inside any page */
    <ThemeScope theme="midnight" mode="dark">
      <Card>
        <p>This card renders with dark Midnight tokens regardless of the parent page theme!</p>
        <Button variant="primary">Midnight Action</Button>
      </Card>
    </ThemeScope>
  );
}`}
          />

          <div
            className="docs-intro-callout"
            style={{
              marginTop: "1rem",
              background: "var(--docs-bg-subtle)",
              borderColor: "var(--docs-border)",
            }}
          >
            <p>
              <strong>Zero Leakage Guarantee:</strong> SoraUI presets use isolated selectors (<code>:not([data-mode])</code>) so that parent mode rules never collide or override child scoped containers.
            </p>
          </div>
        </section>

        {/* ─── SECTION 7: ADDING CUSTOM COLORS & RADIUS ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="custom-colors" className="docs-intro-h2">
            <span>Custom Colors & Radius Scale</span>
            <a href="#custom-colors" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            To add new custom project tokens or charts, add them directly to your <code>globals.css</code>:
          </p>

          <CodeBlock
            language="css"
            filename="app/globals.css"
            code={`:root {
  --ui-radius: 0.5rem; /* 8px default */
  --ui-brand: #6366f1;
  --ui-chart-1: #0ea5e9;
  --ui-chart-2: #10b981;
  --ui-chart-3: #8b5cf6;
}

[data-mode="dark"],
.dark {
  --ui-brand: #818cf8;
  --ui-chart-1: #38bdf8;
  --ui-chart-2: #34d399;
  --ui-chart-3: #a78bfa;
}`}
          />
        </section>

        {/* ─── SECTION 8: RIGHT-TO-LEFT (RTL) SUPPORT ─── */}
        <section className="docs-intro-section" style={{ marginTop: "3rem" }}>
          <h2 id="rtl-support" className="docs-intro-h2">
            <span>Right-to-Left (RTL) & Logical Properties</span>
            <a href="#rtl-support" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            All 47 SoraUI components are architected from the ground up with <strong>CSS Logical Properties</strong> (<code>padding-inline-*</code>, <code>margin-inline-*</code>, <code>inset-inline-*</code>, and <code>text-align: start</code>).
            No duplicate stylesheets or awkward overrides are required.
          </p>

          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--docs-fg)",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Enabling RTL in Your Application
          </h3>
          <p>
            Simply set the <code>dir="rtl"</code> attribute on your document root or on any parent section:
          </p>

          <CodeBlock
            language="html"
            filename="index.html (or root <html> tag)"
            code={`<!-- Global RTL for Arabic, Hebrew, Persian, Urdu -->
<html dir="rtl" lang="ar">
  <body>
    <!-- All SoraUI components automatically adapt layout, chevrons, and spacing -->
  </body>
</html>`}
          />

          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--docs-fg)",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Subtree RTL Section in React
          </h3>
          <p>
            You can also localize individual sections or modals without affecting the rest of your page:
          </p>

          <CodeBlock
            language="tsx"
            code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Alert, AlertTitle, AlertDescription, Badge } from '@soraui/react';

export function ArabicFaqSection() {
  return (
    <div dir="rtl" className="max-w-md w-full space-y-4">
      <Badge variant="secondary">الأسئلة الشائعة</Badge>
      
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>هل يدعم SoraUI اللغة العربية؟</AccordionTrigger>
          <AccordionContent>
            نعم، تم بناء كافة المكونات باستخدام CSS Logical Properties وتدعم RTL بشكل تلقائي.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}`}
          />
        </section>
      </div>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ marginTop: "3.5rem" }}>
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/installation")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Installation</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go("/guides/cli-reference")}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: "right" }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">CLI Reference</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
