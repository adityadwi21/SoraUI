import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Code2,
} from "lucide-react";
import { Button } from "@soraui/react";
import { PackageManagerBlock } from "../../components/package-manager-block";

export interface InstallationPageProps {
  onNavigate?: (path: string) => void;
}

export const InstallationPage: React.FC<InstallationPageProps> = ({
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeStartPoint, setActiveStartPoint] = useState<
    "theme-builder" | "cli" | "existing"
  >("cli");

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const scrollToSection = (
    sectionId: string,
    pointId: "theme-builder" | "cli" | "existing",
  ) => {
    setActiveStartPoint(pointId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleCopyPage = () => {
    const fullText = `# Installation\n\nHow to install dependencies and structure your app.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cliCommands = {
    pnpm: "pnpm dlx @soraui/cli@latest init -t [framework]",
    npm: "npx @soraui/cli@latest init -t [framework]",
    yarn: "yarn dlx @soraui/cli@latest init -t [framework]",
    bun: "bunx --bun @soraui/cli@latest init -t [framework]",
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Installation</h1>
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
                onClick={() => go("/guides/introduction")}
                title="Previous: Introduction"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/theming")}
                title="Next: Theming"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          How to install dependencies and structure your app.
        </p>
      </header>

      {/* ─── RECOMMENDED BANNER ─── */}
      <div className="docs-install-banner">
        <div className="docs-install-banner-content">
          <strong>Recommended for new projects:</strong> Use{" "}
          <code>@soraui/cli</code> to initialize your project with preconfigured
          tokens and components.
        </div>
      </div>

      {/* ─── 3 SETUP CARDS ─── */}
      <div
        className="docs-intro-statement"
        style={{ margin: "1.75rem 0 1rem" }}
      >
        Choose the setup that matches your starting point.
      </div>

      <div className="docs-install-start-cards">
        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "theme-builder" ? " active" : ""}`}
          onClick={() => scrollToSection("use-theme-builder", "theme-builder")}
        >
          <div className="docs-install-start-title">Use Theme Builder</div>
          <div className="docs-install-start-sub">
            Build your preset visually, preview your choices, and generate a
            setup command.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "cli" ? " active" : ""}`}
          onClick={() => scrollToSection("use-the-cli", "cli")}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Scaffold a supported template directly from the terminal.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === "existing" ? " active" : ""}`}
          onClick={() => scrollToSection("choose-your-framework", "existing")}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an app you already created.
          </div>
        </button>
      </div>

      {/* ─── SECTION 1: THEME BUILDER ─── */}
      <section className="docs-intro-section" id="use-theme-builder">
        <h2 className="docs-intro-h2">
          <span>Use Theme Builder</span>
          <a
            href="#use-theme-builder"
            className="docs-intro-anchor"
            aria-hidden
          >
            #
          </a>
        </h2>

        <p>
          Build your preset visually, preview your choices, and generate a
          framework-specific setup command.
        </p>

        <div style={{ marginTop: "0.5rem" }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => go("/playground")}
            style={{ fontWeight: 600 }}
          >
            Open Theme Builder
          </Button>
        </div>

        <p className="docs-intro-note" style={{ marginTop: "0.75rem" }}>
          Available for Next.js, Vite, Laravel, React Router, Astro, and
          TanStack Start.
        </p>
      </section>

      {/* ─── SECTION 2: USE THE CLI ─── */}
      <section className="docs-intro-section" id="use-the-cli">
        <h2 className="docs-intro-h2">
          <span>Use the CLI</span>
          <a href="#use-the-cli" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>

        <p>Use the CLI to scaffold a new project directly from the terminal:</p>

        {/* Tabbed Package Manager Codeblock */}
        <PackageManagerBlock commands={cliCommands} />

        <p className="docs-intro-note">
          Supported templates: <code>next</code>, <code>vite</code>,{" "}
          <code>start</code>, <code>react-router</code>, and <code>astro</code>.
        </p>
        <p className="docs-intro-note">
          For Laravel, create the app first with <code>laravel new</code>, then
          run <code>npx @soraui/cli@latest init</code>.
        </p>
      </section>

      {/* ─── SECTION 3: EXISTING PROJECT ─── */}
      <section className="docs-intro-section" id="existing-project">
        <h2 className="docs-intro-h2">
          <span>Existing Project</span>
          <a href="#existing-project" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>

        <p>
          Each framework guide includes an <strong>Existing Project</strong>{" "}
          section with the manual setup steps for that framework.
        </p>
        <p>Pick your framework below and follow that path.</p>
      </section>

      {/* ─── SECTION 4: CHOOSE YOUR FRAMEWORK ─── */}
      <section className="docs-intro-section" id="choose-your-framework">
        <h2 className="docs-intro-h2">
          <span>Choose Your Framework</span>
          <a
            href="#choose-your-framework"
            className="docs-intro-anchor"
            aria-hidden
          >
            #
          </a>
        </h2>

        <p className="docs-intro-note">
          For Laravel, start with <code>laravel new</code> before using SoraUI
          CLI.
        </p>

        <div className="docs-framework-grid">
          {[
            {
              id: "nextjs",
              name: "Next.js",
              path: "/guides/nextjs",
              icon: (
                <svg
                  viewBox="0 0 180 180"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <mask
                    height="180"
                    id="mask0"
                    maskUnits="userSpaceOnUse"
                    width="180"
                    x="0"
                    y="0"
                    style={{ maskType: "alpha" }}
                  >
                    <circle cx="90" cy="90" fill="black" r="90" />
                  </mask>
                  <g mask="url(#mask0)">
                    <circle cx="90" cy="90" fill="currentColor" r="90" />
                    <path
                      d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
                      fill="var(--docs-bg)"
                    />
                    <rect
                      fill="var(--docs-bg)"
                      height="72"
                      width="12"
                      x="115"
                      y="54"
                    />
                  </g>
                </svg>
              ),
            },
            {
              id: "vite",
              name: "Vite",
              path: "/guides/vite",
              icon: (
                <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                  <path
                    d="M29.6 4.8L16.8 28.5c-.3.6-1.2.6-1.5 0L2.4 4.8c-.4-.7.1-1.6 1-.1.6L16 6.5l12.6-1.8c.8-.1 1.4.7 1 1.4z"
                    fill="#bd34fe"
                  />
                  <path
                    d="M22.5 2.5L16 15 9.5 2.5l6.5 1.5 6.5-1.5z"
                    fill="#ffc837"
                  />
                </svg>
              ),
            },
            {
              id: "tanstack",
              name: "TanStack Start",
              path: "/guides/theming",
              icon: <Layers size={32} style={{ color: "var(--docs-fg)" }} />,
            },
            {
              id: "laravel",
              name: "Laravel",
              path: "/guides/laravel",
              icon: (
                <svg viewBox="0 0 32 32" width="32" height="32" fill="#ef4444">
                  <path d="M16 2L3 9.5v13L16 30l13-7.5v-13L16 2zm-1.5 3.3l10 5.8-3.5 2-10-5.8 3.5-2zm-10 7.3l8.5 4.9v9.8L4.5 22.4v-9.8zm10.5 14.7v-9.8l8.5-4.9v9.8l-8.5 4.9z" />
                </svg>
              ),
            },
            {
              id: "react-router",
              name: "React Router",
              path: "/guides/react-router",
              icon: <Code2 size={32} style={{ color: "var(--docs-fg)" }} />,
            },
            {
              id: "astro",
              name: "Astro",
              path: "/guides/astro",
              icon: (
                <svg
                  viewBox="0 0 32 32"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M22.7 7.3c-.4-.5-1.1-.8-1.7-.8H11c-.7 0-1.3.3-1.7.8-.4.5-.6 1.2-.4 1.9l3.5 13.5c.2.8 1 1.4 1.8 1.4h3.6c.8 0 1.6-.6 1.8-1.4l3.5-13.5c.2-.7 0-1.4-.4-1.9zm-4.3 12.8h-4.8l-2-7.8h8.8l-2 7.8z" />
                </svg>
              ),
            },
            {
              id: "manual",
              name: "Manual",
              path: "/guides/manual",
              icon: <Sparkles size={32} style={{ color: "var(--docs-fg)" }} />,
            },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              className="docs-framework-card"
              onClick={() => go(f.path)}
            >
              <div className="docs-framework-icon">{f.icon}</div>
              <span className="docs-framework-name">{f.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/introduction")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Introduction</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go("/guides/theming")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">
              Theming & Tokens
            </span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
