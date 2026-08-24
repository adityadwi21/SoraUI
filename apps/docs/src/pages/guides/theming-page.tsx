import React, { useState } from "react";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { CodeBlock } from "../../components/code-block";

export interface ThemingPageProps {
  onNavigate?: (path: string) => void;
}

export const ThemingPage: React.FC<ThemingPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const handleCopyPage = () => {
    const fullText = `# Theming\n\nUsing CSS variables to theme your app.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 24-key semantic token reference table
  const tokens = [
    {
      variable: "--ui-background",
      role: "Default background color of <body> or the canvas",
      usedIn: "body, page canvas, full-bleed containers",
    },
    {
      variable: "--ui-foreground",
      role: "Default text and typography color",
      usedIn: "body text, headings, list items",
    },
    {
      variable: "--ui-card",
      role: "Background color for cards and elevated panels",
      usedIn: "Card, CardContent, widgets, Bento items",
    },
    {
      variable: "--ui-card-foreground",
      role: "Text color inside cards and panels",
      usedIn: "CardTitle, CardDescription, card body text",
    },
    {
      variable: "--ui-popover",
      role: "Background color for floating popovers & dropdowns",
      usedIn: "Popover, Dropdown, SelectContent, Tooltip",
    },
    {
      variable: "--ui-popover-foreground",
      role: "Text and icon color inside floating overlays",
      usedIn: "PopoverContent, DropdownItem, SelectItem",
    },
    {
      variable: "--ui-primary",
      role: "Primary action and prominent brand background",
      usedIn: "Button (primary), active Tabs, highlighted badges",
    },
    {
      variable: "--ui-primary-foreground",
      role: "Contrast text color on top of primary background",
      usedIn: "Button label, active tab text, primary icons",
    },
    {
      variable: "--ui-secondary",
      role: "Subtle secondary button and surface fill",
      usedIn: "Button (secondary), secondary badges, tags",
    },
    {
      variable: "--ui-secondary-foreground",
      role: "Text color for secondary elements",
      usedIn: "Secondary button text, neutral badges",
    },
    {
      variable: "--ui-muted",
      role: "Subtle backgrounds for hovered states and tabs",
      usedIn: "TabsList, inactive pill buttons, table headers",
    },
    {
      variable: "--ui-muted-foreground",
      role: "De-emphasized text color for secondary labels",
      usedIn: "Subtitles, placeholders, timestamps, breadcrumbs",
    },
    {
      variable: "--ui-accent",
      role: "Hover accents, active indicators, and focus fills",
      usedIn: "DropdownItem (hover), Sidebar active link, chips",
    },
    {
      variable: "--ui-accent-foreground",
      role: "Text color when an element is hovered or focused",
      usedIn: "DropdownItem (active), active navigation text",
    },
    {
      variable: "--ui-destructive",
      role: "Critical errors, deletes, and destructive actions",
      usedIn: "Button (destructive), Alert (error), Badge (error)",
    },
    {
      variable: "--ui-destructive-foreground",
      role: "Contrast text on top of destructive actions",
      usedIn: "Destructive button label, error text",
    },
    {
      variable: "--ui-border",
      role: "Default hairline border for layout separation",
      usedIn: "Card border, table rows, input boundaries",
    },
    {
      variable: "--ui-input",
      role: "Border color specifically for input elements",
      usedIn: "Input, Textarea, SelectTrigger, Checkbox",
    },
    {
      variable: "--ui-ring",
      role: "Focus outline ring color for keyboard navigation",
      usedIn: "Focus-visible rings across all interactive controls",
    },
    {
      variable: "--ui-radius",
      role: "Base corner radius multiplier token",
      usedIn: "Buttons, Inputs, Cards, Dialogs, Tooltips",
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
              className="docs-copy-page-btn"
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
                onClick={() => go("/guides/theme-presets")}
                title="Next: Theme Presets Gallery"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Using CSS variables to theme your app.
        </p>
      </header>

      {/* ─── CALLOUT STATEMENT ─── */}
      <div className="docs-intro-callout">
        <p>
          You can use CSS variables for effortless, zero-runtime theming. Here
          we explain how to use the semantic CSS variable tokens, which is our
          recommended approach.
        </p>
      </div>

      <div className="docs-intro-body" style={{ marginTop: "1.25rem" }}>
        {/* ─── SECTION 1: CONVENTION ─── */}
        <section className="docs-intro-section" style={{ marginTop: "0.5rem" }}>
          <h2 id="css-variables" className="docs-intro-h2">
            <span>CSS Variables Convention</span>
            <a href="#css-variables" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            When initializing your project with{" "}
            <code>npx @soraui/cli init</code>, the CLI configures your{" "}
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
            We use a simple{" "}
            <strong>background and foreground convention</strong> for colors.
            The <code>background</code> suffix is omitted when the variable is
            used for a background color.
          </p>

          <p>Given a background and foreground color:</p>

          <CodeBlock
            language="css"
            code={`--ui-primary: #0284c7;
--ui-primary-foreground: #ffffff;`}
          />

          <p style={{ marginTop: "0.875rem" }}>
            This gives us self-documenting and contrast-safe styles:
          </p>

          <CodeBlock
            language="css"
            code={`.btn-primary {
  background-color: var(--ui-primary);
  color: var(--ui-primary-foreground);
}`}
          />

          <p className="docs-intro-note" style={{ marginTop: "0.875rem" }}>
            CSS variables are defined in your stylesheet (e.g.{" "}
            <code>globals.css</code>) in both light (<code>:root</code>) and
            dark (<code>[data-mode="dark"]</code> or <code>.dark</code>) modes.
          </p>
        </section>

        {/* ─── SECTION 2: TOKEN SCHEMA & REFERENCE TABLE ─── */}
        <section className="docs-intro-section" style={{ marginTop: "2.5rem" }}>
          <h2 id="theme-tokens" className="docs-intro-h2">
            <span>Theme Tokens</span>
            <a href="#theme-tokens" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            Here are the semantic variables available across all SoraUI themes:
          </p>

          <div className="docs-token-table-container">
            <table className="docs-token-table">
              <thead>
                <tr>
                  <th style={{ width: "32%" }}>Variable</th>
                  <th style={{ width: "38%" }}>Default Value / Role</th>
                  <th style={{ width: "30%" }}>Used In</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t) => (
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

          <p className="docs-intro-note" style={{ marginTop: "0.875rem" }}>
            The above variables are defined in each theme preset with tailored
            dark mode counterparts.
          </p>
        </section>

        {/* ─── SECTION 3: RADIUS SCALE ─── */}
        <section className="docs-intro-section" style={{ marginTop: "2.5rem" }}>
          <h2 id="radius-scale" className="docs-intro-h2">
            <span>Radius Scale</span>
            <a href="#radius-scale" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            The <code>--ui-radius</code> variable sets the corner radius
            multiplier for cards, buttons, inputs, dialogs, and popovers:
          </p>

          <CodeBlock
            language="css"
            filename="app/globals.css"
            code={`:root {
  --ui-radius: 0.5rem; /* 8px default */
  --ui-radius-sm: calc(var(--ui-radius) - 4px);
  --ui-radius-md: calc(var(--ui-radius) - 2px);
  --ui-radius-lg: var(--ui-radius);
  --ui-radius-xl: calc(var(--ui-radius) + 4px);
}`}
          />

          <ul className="docs-intro-bullet-list" style={{ marginTop: "1rem" }}>
            <li>
              <strong>Default:</strong> <code>0.5rem</code> (8px) provides a
              balanced modern look.
            </li>
            <li>
              <strong>Sharp / Flat:</strong> Set <code>--ui-radius: 0rem;</code>{" "}
              for rectangular neo-brutalist designs.
            </li>
            <li>
              <strong>Rounded / Pill:</strong> Set{" "}
              <code>--ui-radius: 0.75rem;</code> or <code>1rem;</code> for soft,
              approachable interfaces.
            </li>
          </ul>
        </section>

        {/* ─── SECTION 4: ADDING NEW COLORS ─── */}
        <section className="docs-intro-section" style={{ marginTop: "2.5rem" }}>
          <h2 id="adding-new-colors" className="docs-intro-h2">
            <span>Adding New Colors</span>
            <a
              href="#adding-new-colors"
              className="docs-intro-anchor"
              aria-hidden
            >
              #
            </a>
          </h2>

          <p>
            To add new custom color tokens (such as warning statuses or chart
            palettes), define them in your <code>globals.css</code>:
          </p>

          <CodeBlock
            language="css"
            filename="app/globals.css"
            code={`:root {
  --ui-warning: #f59e0b;
  --ui-warning-foreground: #000000;
  --ui-chart-1: #3b82f6;
  --ui-chart-2: #10b981;
  --ui-chart-3: #8b5cf6;
}

[data-mode="dark"],
.dark {
  --ui-warning: #fbbf24;
  --ui-warning-foreground: #000000;
  --ui-chart-1: #60a5fa;
  --ui-chart-2: #34d399;
  --ui-chart-3: #a78bfa;
}`}
          />

          <p className="docs-intro-note" style={{ marginTop: "0.875rem" }}>
            You can now use <code>var(--ui-warning)</code> and{" "}
            <code>var(--ui-chart-1)</code> directly in any component or chart
            widget.
          </p>
        </section>

        {/* ─── SECTION 5: CURATED THEME PRESETS ─── */}
        <section
          className="docs-intro-section"
          id="theme-presets"
          style={{ marginTop: "2.5rem" }}
        >
          <h2 className="docs-intro-h2">
            <span>Curated Theme Presets</span>
            <a href="#theme-presets" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI includes{" "}
            <strong>9 space and atmosphere-inspired theme presets</strong> built
            upon this contract:
          </p>

          <ul className="docs-intro-principles-list">
            <li>
              <strong>Sky:</strong> Vivid azure blue primary with clean slate
              neutrals.
            </li>
            <li>
              <strong>Aurora:</strong> Vibrant emerald greens inspired by the
              polar lights.
            </li>
            <li>
              <strong>Midnight:</strong> Deep ocean blue with indigo undertones.
            </li>
            <li>
              <strong>Nebula:</strong> Cosmic violet and purple neon aesthetics.
            </li>
            <li>
              <strong>Twilight, Horizon, Cloud, Eclipse, Starlight:</strong>{" "}
              Carefully tuned warmth, high contrast, and neutral palettes.
            </li>
          </ul>

          <div style={{ marginTop: "1.25rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--docs-fg)",
                marginBottom: "0.5rem",
              }}
            >
              Root Theming with ThemeProvider
            </h3>
            <CodeBlock
              language="tsx"
              code={`import { ThemeProvider } from '@soraui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="sky" defaultMode="system">
      {children}
    </ThemeProvider>
  );
}`}
            />
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--docs-fg)",
                marginBottom: "0.5rem",
              }}
            >
              Subtree Cascading with ThemeScope
            </h3>
            <p className="docs-intro-note">
              Use <code>&lt;ThemeScope&gt;</code> to apply a different theme or
              mode to an isolated card or section:
            </p>
            <CodeBlock
              language="tsx"
              code={`import { ThemeScope, Card, Button } from '@soraui/react';

export function MidnightHeroCard() {
  return (
    <ThemeScope theme="midnight" mode="dark">
      <Card>
        <p>This card renders with dark Midnight tokens regardless of page theme!</p>
        <Button variant="primary">Midnight Action</Button>
      </Card>
    </ThemeScope>
  );
}`}
            />
          </div>
        </section>
      </div>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
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
          onClick={() => go("/guides/theme-presets")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">
              Theme Presets Gallery
            </span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
