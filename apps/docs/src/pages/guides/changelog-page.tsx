import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Bot,
  Palette,
  Box,
} from "lucide-react";
import { Badge } from "@soraui/react";
import { CodeBlock } from "../../components/code-block";

export interface ChangelogPageProps {
  onNavigate?: (path: string) => void;
}

export const ChangelogPage: React.FC<ChangelogPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const handleCopyPage = () => {
    const fullText = `# Changelog\n\nLatest updates, releases, and announcements for SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="docs-page sora-intro-manifesto docs-changelog-page">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Changelog</h1>
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
                onClick={() => go("/docs/mcp-guide")}
                title="Previous: MCP Server"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/docs/components")}
                title="Next: Components"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Latest updates, releases, and announcements for the SoraUI ecosystem.
        </p>
      </header>

      {/* ─── TIMELINE ENTRIES ─── */}
      <div className="docs-changelog-timeline">
        {/* ═════════════════════════════════════════════════════════════════════
            RELEASE: AUGUST 2026 - v0.1.0
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="docs-changelog-entry">
          <div className="docs-changelog-meta">
            <time className="docs-changelog-date">August 2026</time>
            <Badge variant="success">v0.1.1 · Official Stable</Badge>
          </div>

          <h2
            id="august-2026-v0-1-0"
            className="docs-intro-h2"
            style={{ marginTop: "0.75rem" }}
          >
            <span>
              SoraUI v0.1.1: The Zero-Runtime Token & Component System
            </span>
            <a
              href="#august-2026-v0-1-0"
              className="docs-intro-anchor"
              aria-hidden
            >
              #
            </a>
          </h2>

          <p className="docs-changelog-lead">
            We are excited to announce the official release of{" "}
            <strong>SoraUI v0.1.1</strong>. SoraUI is built from the ground up
            to give developers full code ownership, zero-runtime styling, full
            accessibility, and native Model Context Protocol (MCP) support for
            AI coding agents.
          </p>

          {/* Feature Highlights Grid */}
          <div className="docs-changelog-card-grid">
            <div className="docs-changelog-card">
              <div className="docs-changelog-card-header">
                <div className="docs-changelog-card-icon">
                  <Box size={15} />
                </div>
                <div className="docs-changelog-card-title">
                  47 Accessible Primitives
                </div>
              </div>
              <p className="docs-changelog-card-desc">
                Full WAI-ARIA compliance, roving focus, keyboard navigation, and
                automatic focus trapping without heavy external runtime
                dependencies.
              </p>
            </div>

            <div className="docs-changelog-card">
              <div className="docs-changelog-card-header">
                <div className="docs-changelog-card-icon">
                  <Layers size={15} />
                </div>
                <div className="docs-changelog-card-title">
                  14 Blocks & 4 Templates
                </div>
              </div>
              <p className="docs-changelog-card-desc">
                Compound UI blocks for Auth, Dashboards, Metric grids, Settings,
                and full responsive page templates ready to scaffold.
              </p>
            </div>

            <div className="docs-changelog-card">
              <div className="docs-changelog-card-header">
                <div className="docs-changelog-card-icon">
                  <Palette size={15} />
                </div>
                <div className="docs-changelog-card-title">
                  9 Cosmic Theme Presets
                </div>
              </div>
              <p className="docs-changelog-card-desc">
                Sky, Cloud, Horizon, Aurora, Twilight, Midnight, Nebula,
                Eclipse, and Starlight with Dual-Mode Adaptive tokens (Light & Dark), 100% WCAG 2.1 AA contrast verification, and isolated <code>&lt;ThemeScope&gt;</code> subtrees.
              </p>
            </div>

            <div className="docs-changelog-card">
              <div className="docs-changelog-card-header">
                <div className="docs-changelog-card-icon">
                  <Bot size={15} />
                </div>
                <div className="docs-changelog-card-title">
                  AI-Native MCP Server
                </div>
              </div>
              <p className="docs-changelog-card-desc">
                Official Model Context Protocol server with 11 structured tools
                connecting directly to Claude Desktop, Cursor, and Gemini.
              </p>
            </div>
          </div>

          <h3
            style={{
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: "var(--docs-fg)",
              margin: "1.5rem 0 0.5rem",
            }}
          >
            Quick Scaffolding via CLI
          </h3>
          <p>
            Initialize SoraUI in any Next.js, Vite, Laravel, React Router, or
            Astro project in seconds:
          </p>

          <CodeBlock language="bash" code="npx @soraui/cli init" />

          <h3
            style={{
              fontSize: "1.0625rem",
              fontWeight: 600,
              color: "var(--docs-fg)",
              margin: "1.5rem 0 0.5rem",
            }}
          >
            What's Included in v0.1.0:
          </h3>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>
                Core Engine (<code>@soraui/core</code>)
              </strong>
              : 3-Layer design tokens (<code>--sora-*</code> &rarr;{" "}
              <code>--ui-*</code> &rarr; <code>--sora-component-*</code>),
              24-key semantic theme contract, and anti-FOUC initialization
              script (<code>getThemeInitScript()</code>).
            </li>
            <li>
              <strong>
                Hooks Primitives (<code>@soraui/hooks</code>)
              </strong>
              : Zero-dependency hooks for accessible UI interactions (
              <code>useFocusTrap</code>, <code>useEscapeKey</code>,{" "}
              <code>useClickOutside</code>, <code>usePositioning</code>,{" "}
              <code>useRovingFocus</code>, <code>useControllableState</code>,{" "}
              <code>Portal</code>).
            </li>
            <li>
              <strong>
                Component Library (<code>@soraui/react</code>)
              </strong>
              : 47 primitives across Typography, Forms, Overlays, Navigation,
              Data Display, and Feedback.
            </li>
            <li>
              <strong>
                Production CLI (<code>@soraui/cli</code>)
              </strong>
              : Multi-framework template generators (<code>-t next</code>,{" "}
              <code>-t vite</code>), component dependency resolver, and
              single-file extraction.
            </li>
            <li>
              <strong>
                AI Tooling (<code>@soraui/mcp</code>)
              </strong>
              : 11 JSON-RPC stdio tools for AI code generation, static
              composition validation, and deterministic recipes.
            </li>
          </ul>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            RELEASE: AUGUST 2026 - DOCS OVERHAUL
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="docs-changelog-entry">
          <div className="docs-changelog-meta">
            <time className="docs-changelog-date">August 2026</time>
            <Badge variant="secondary">Documentation & UX Overhaul</Badge>
          </div>

          <h2
            id="august-2026-docs-redesign"
            className="docs-intro-h2"
            style={{ marginTop: "0.75rem" }}
          >
            <span>Documentation Platform Redesign & Dynamic Theming</span>
            <a
              href="#august-2026-docs-redesign"
              className="docs-intro-anchor"
              aria-hidden
            >
              #
            </a>
          </h2>

          <p className="docs-changelog-lead">
            A comprehensive design overhaul of the SoraUI documentation platform
            matching the modern standards of shadcn/ui with instant dark mode
            switching and enhanced navigation.
          </p>

          <ul className="docs-intro-bullet-list" style={{ marginTop: "1rem" }}>
            <li>
              <strong>Universal Lucide Iconography</strong>: Migrated all 47
              primitives, 14 blocks, and 4 templates to native{" "}
              <code>lucide-react</code> icons, completely eliminating unicode
              placeholders and raw SVG bloat.
            </li>
            <li>
              <strong>Centered Dual-Mode Viewport Switcher</strong>: Clean
              Desktop and Mobile switching centered in preview toolbars with
              Lucide <code>Monitor</code> and <code>Smartphone</code> icons.
            </li>
            <li>
              <strong>Expandable Code Blocks with Fade Overlay</strong>: Code
              blocks feature high-contrast Expand/Collapse toggles, syntax
              language badges (<code>TS</code>, <code>JS</code>,{" "}
              <code>CSS</code>), and smooth bottom gradient overlays.
            </li>
            <li>
              <strong>3-Column Responsive Layout</strong>: Edge-to-edge layout
              with a 240px compact sidebar, auto-centered readable content area,
              and permanent sticky Table of Contents.
            </li>
            <li>
              <strong>Zero-Lag Theme Toggle (0ms Latency)</strong>: Removed
              global transition lag on background switches, enabling instant
              synchronous theme toggling.
            </li>
          </ul>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            RELEASE: AUGUST 2026 - RC.2
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="docs-changelog-entry">
          <div className="docs-changelog-meta">
            <time className="docs-changelog-date">August 2026</time>
            <Badge variant="outline">v0.1.0-rc.2</Badge>
          </div>

          <h2
            id="v0-1-0-rc-2"
            className="docs-intro-h2"
            style={{ marginTop: "0.75rem" }}
          >
            <span>Multi-Package Manager Verification & Public NPM Release</span>
            <a href="#v0-1-0-rc-2" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p className="docs-changelog-lead">
            Comprehensive testing across all four major JavaScript package
            managers (npm, pnpm, yarn, bun) in isolated environments.
          </p>

          <ul className="docs-intro-bullet-list" style={{ marginTop: "1rem" }}>
            <li>
              <strong>Package Manager Matrix</strong>: 100% test pass rate
              across npm (v11.6), pnpm (v9.7), yarn (v1.22), and bun (v1.4).
            </li>
            <li>
              <strong>Developer Adoption Benchmark (T0 → T4)</strong>: Validated
              out-of-the-box installation to browser rendering in under 8
              seconds.
            </li>
            <li>
              <strong>Public NPM Distribution</strong>: Published packages live
              under the <code>@soraui/*</code> scope.
            </li>
          </ul>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            RELEASE: AUGUST 2026 - RC.1
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="docs-changelog-entry">
          <div className="docs-changelog-meta">
            <time className="docs-changelog-date">August 2026</time>
            <Badge variant="outline">v0.1.0-rc.1</Badge>
          </div>

          <h2
            id="v0-1-0-rc-1"
            className="docs-intro-h2"
            style={{ marginTop: "0.75rem" }}
          >
            <span>
              Model Context Protocol (MCP) Server for AI Coding Agents
            </span>
            <a href="#v0-1-0-rc-1" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p className="docs-changelog-lead">
            Launched the official <code>@soraui/mcp</code> package, bringing
            deterministic component search, inspection, composition, and static
            rule validation directly to AI agents.
          </p>

          <CodeBlock
            language="json"
            filename="claude_desktop_config.json"
            code={`{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp"]
    }
  }
}`}
          />

          <ul className="docs-intro-bullet-list" style={{ marginTop: "1rem" }}>
            <li>
              <strong>11 Structured Tools</strong>: Including{" "}
              <code>soraui_get_context</code>, <code>soraui_search</code>,{" "}
              <code>soraui_inspect_component</code>,{" "}
              <code>soraui_compose_recipe</code>, and{" "}
              <code>soraui_validate_composition</code>.
            </li>
            <li>
              <strong>Static Composition Rules</strong>: Automatic enforcement
              of <code>SORA-TOKEN-001</code>, <code>SORA-BOUNDARY-001</code>,
              and <code>SORA-A11Y-001</code>.
            </li>
          </ul>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            RELEASE: JULY 2026 - THEME ENGINE
            ═════════════════════════════════════════════════════════════════════ */}
        <section className="docs-changelog-entry">
          <div className="docs-changelog-meta">
            <time className="docs-changelog-date">July 2026</time>
            <Badge variant="secondary">Theme Engine</Badge>
          </div>

          <h2
            id="july-2026-theme-engine"
            className="docs-intro-h2"
            style={{ marginTop: "0.75rem" }}
          >
            <span>9 Cosmic Themes & WCAG 2.1 AA Contrast Engine</span>
            <a
              href="#july-2026-theme-engine"
              className="docs-intro-anchor"
              aria-hidden
            >
              #
            </a>
          </h2>

          <p className="docs-changelog-lead">
            Introduced the 3-Layer Design Token Engine and automated 99-check
            WCAG 2.1 AA contrast matrix across all 9 theme presets.
          </p>

          <ul className="docs-intro-bullet-list" style={{ marginTop: "1rem" }}>
            <li>
              <strong>Cosmic Presets</strong>: Sky, Cloud, Horizon, Aurora,
              Twilight, Midnight, Nebula, Eclipse, and Starlight.
            </li>
            <li>
              <strong>Subtree Theming</strong>:{" "}
              <code>&lt;ThemeScope theme="midnight" mode="dark"&gt;</code> for
              isolated card/section theme overrides without context bleeding.
            </li>
            <li>
              <strong>WCAG 2.1 AA Certified</strong>: All text pairs pass &ge;
              4.5:1 contrast, and interactive UI elements pass &ge; 3.0:1
              contrast.
            </li>
          </ul>
        </section>
      </div>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav
        className="docs-intro-pagination"
        aria-label="Pagination"
        style={{ marginTop: "3rem" }}
      >
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/semver")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">
              Semantic Versioning & Policy
            </span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go("/guides/introduction")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Introduction</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
