import React, { useState } from "react";
import { Badge, ThemeScope } from "@soraui/react";
import { CodeBlock } from "../../components/code-block";
import { Check, Copy, ChevronLeft, ChevronRight } from "lucide-react";

export interface ThemePresetsPageProps {
  onNavigate?: (path: string) => void;
}

export const ThemePresetsPage: React.FC<ThemePresetsPageProps> = ({
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedThemeId, setCopiedThemeId] = useState<string | null>(null);

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyPage = async () => {
    const text = `# Theme Presets\n\nSoraUI includes 9 pre-engineered, accessible color palettes ready for instant use via CSS custom properties.\n\nhttps://github.com/adityadwi21/SoraUI`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
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

  const themes = [
    {
      name: "Sky",
      id: "sky",
      mode: "light",
      primary: "#0369a1",
      primaryHex: "#0369a1",
      bg: "#ffffff",
      darkBg: "#090d16",
      desc: "Vivid azure cyan & daylight blue with crisp slate neutrals. The default SoraUI theme.",
    },
    {
      name: "Cloud",
      id: "cloud",
      mode: "light",
      primary: "#18181b",
      primaryHex: "#18181b",
      bg: "#fafafa",
      darkBg: "#09090b",
      desc: "Soft monochrome aesthetic with neutral zinc tones, slate undertones, and minimal styling.",
    },
    {
      name: "Horizon",
      id: "horizon",
      mode: "light",
      primary: "#c2410c",
      primaryHex: "#c2410c",
      bg: "#fffbf5",
      darkBg: "#1c0d06",
      desc: "Warm dawn sunrise palette with amber, orange highlights, and cozy warm paper cards.",
    },
    {
      name: "Midnight",
      id: "midnight",
      mode: "dark",
      primary: "#818cf8",
      primaryHex: "#818cf8",
      bg: "#ffffff",
      darkBg: "#09090b",
      desc: "Ultra-deep space navy background with crisp luminescent indigo and cyan highlights.",
    },
    {
      name: "Aurora",
      id: "aurora",
      mode: "dark",
      primary: "#14b8a6",
      primaryHex: "#14b8a6",
      bg: "#ffffff",
      darkBg: "#022c22",
      desc: "Vibrant emerald green & teal nature borealis palette on dark moss green backdrops.",
    },
    {
      name: "Twilight",
      id: "twilight",
      mode: "dark",
      primary: "#38bdf8",
      primaryHex: "#38bdf8",
      bg: "#ffffff",
      darkBg: "#020617",
      desc: "Deep oceanic indigo and dusk violet sky aesthetic on obsidian card surfaces.",
    },
    {
      name: "Nebula",
      id: "nebula",
      mode: "dark",
      primary: "#c084fc",
      primaryHex: "#c084fc",
      bg: "#ffffff",
      darkBg: "#1e1035",
      desc: "Cosmic deep violet and fuchsia nebula glow tailored for gaming and AI interfaces.",
    },
    {
      name: "Eclipse",
      id: "eclipse",
      mode: "dark",
      primary: "#facc15",
      primaryHex: "#facc15",
      bg: "#ffffff",
      darkBg: "#000000",
      desc: "Pure high-contrast obsidian black with sharp solar flare gold and amber glow.",
    },
    {
      name: "Starlight",
      id: "starlight",
      mode: "dark",
      primary: "#f59e0b",
      primaryHex: "#f59e0b",
      bg: "#ffffff",
      darkBg: "#1c1917",
      desc: "Deep charcoal dark backdrop with glowing starlight amber accents for dev tools.",
    },
  ];

  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Theme Presets Gallery</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy Page Markdown"
              aria-label="Copy Page Markdown"
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
                onClick={() => go("/guides/theming")}
                title="Previous: Theming"
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
        <p className="sora-doc-lead">
          SoraUI includes 9 pre-engineered, accessible space-inspired color palettes ready for instant use via CSS custom properties.
        </p>
        <div className="sora-doc-chips" style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          <Badge
            variant="secondary"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            9 Space Presets
          </Badge>
          <Badge
            variant="outline"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            WCAG 2.1 AA Verified
          </Badge>
          <Badge
            variant="outline"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            Zero Runtime
          </Badge>
        </div>
      </div>

      {/* ─── PRESETS GRID ─── */}
      <section className="sora-doc-section" style={{ marginTop: "1.75rem" }}>
        <h2 id="presets-grid" className="sora-doc-h2">
          <span>Available Presets</span>
          <a href="#presets-grid" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Click any card to copy its import snippet or inspect its dual-mode token styling:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginTop: "1.25rem",
          }}
        >
          {themes.map((t) => (
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
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => go("/guides/theming")}
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
                    Customizer
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW TO APPLY SECTION ─── */}
      <section className="sora-doc-section" style={{ marginTop: "3rem" }}>
        <h2 id="how-to-apply" className="sora-doc-h2">
          <span>How to Apply a Preset</span>
          <a href="#how-to-apply" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Import the corresponding CSS preset and apply the{" "}
          <code>data-theme</code> attribute to your root element:
        </p>
        <CodeBlock
          language="tsx"
          filename="app/layout.tsx"
          code={`// 1. Import preset stylesheet
import '@soraui/core/dist/tokens/themes/aurora.css';

// 2. Set theme on html or container
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="aurora">
      <body>{children}</body>
    </html>
  );
}`}
        />
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ marginTop: "3.5rem" }}>
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/theming")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Theming Guide</span>
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
    </div>
  );
};
