import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export interface IntroductionPageProps {
  onNavigate: (path: string) => void;
}

export const IntroductionPage: React.FC<IntroductionPageProps> = ({
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [rtlFaqOpen, setRtlFaqOpen] = useState(false);
  const [tailwindFaqOpen, setTailwindFaqOpen] = useState(false);

  const handleCopyPage = () => {
    const fullText = `# Introduction\n\nSoraUI is a set of beautifully-designed, accessible components and a code distribution platform. Built with Zero-Runtime CSS, First-Class RTL support, and native AI/MCP integration. Open Source. Open Code.\n\nThis is not a component library. It is how you build your component library.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── PAGE HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Introduction</h1>
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
                onClick={() => onNavigate("/")}
                title="Previous: Home"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => onNavigate("/guides/installation")}
                title="Next: Installation"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          SoraUI is a set of beautifully-designed, accessible components, a flexible code distribution platform, and an AI-native design system. Built with Zero-Runtime CSS, First-Class RTL multi-language support, and Model Context Protocol (MCP) tooling. Open Source. Open Code.
        </p>
      </header>

      {/* ─── MANIFESTO SUBHEAD ─── */}
      <div className="docs-intro-statement">
        <strong>
          This is not a component library. It is how you build your component
          library.
        </strong>
      </div>

      <div className="docs-intro-body">
        <p>
          You know how traditional component libraries work: you install a heavy NPM package, import rigid black-box components, and struggle to customize them to match your unique brand identity.
        </p>

        <p>
          This approach breaks down when you need deep style overrides, specialized accessibility logic, or non-Latin multi-language support (like Arabic and Hebrew).{" "}
          <strong>
            Often, you end up wrapping library components, fighting CSS specificity battles, dealing with heavy JavaScript runtime overhead, or mixing incompatible libraries.
          </strong>
        </p>

        <p>
          SoraUI solves this from first principles with seven core pillars:
        </p>

        <ul className="docs-intro-principles-list">
          <li>
            <strong>Open Code & Total Ownership:</strong> You own the component code directly in your repository. No black-box abstractions.
          </li>
          <li>
            <strong>Zero-Runtime CSS:</strong> Native CSS Variables (<code>--ui-*</code>) with 0ms JavaScript runtime styling cost. Works seamlessly with or without Tailwind CSS.
          </li>
          <li>
            <strong>First-Class RTL & Internationalization:</strong> Native bidirectional support for English (LTR), Arabic (RTL), and Hebrew (RTL) built directly into components.
          </li>
          <li>
            <strong>Dual Distribution (CLI + NPM):</strong> Add source files via <code>@soraui/cli</code> or install centralized packages (<code>@soraui/react</code>).
          </li>
          <li>
            <strong>Composition & WAI-ARIA Accessibility:</strong> Modular sub-components with predictable keyboard navigation, focus management, and screen reader compliance.
          </li>
          <li>
            <strong>9 Curated Space Theme Presets:</strong> 3-layer design tokens with runtime dynamic theming via <code>ThemeProvider</code> and localized <code>ThemeScope</code>.
          </li>
          <li>
            <strong>AI-Native & MCP Server:</strong> Built-in Model Context Protocol server (<code>@soraui/mcp</code>) and Agent Skills for Cursor, Claude Desktop, and Gemini CLI.
          </li>
        </ul>

        {/* ─── SECTION 1: OPEN CODE ─── */}
        <section className="docs-intro-section">
          <h2 id="open-code" className="docs-intro-h2">
            <span>Open Code & Total Ownership</span>
            <a href="#open-code" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI hands you the actual source code of each component. You have full transparency and complete freedom to customize, optimize, and extend everything to your project's exact requirements:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Full Transparency:</strong> Inspect and modify every JSX element, hook, and CSS variable directly in your project.
            </li>
            <li>
              <strong>Zero Vendor Lock-in:</strong> You are not locked into any single framework vendor's release cycle or breaking changes.
            </li>
            <li>
              <strong>Clean Code Quality:</strong> Built with strict TypeScript, clean BEM-prefixed CSS classes (<code>sora-*</code>), and zero unnecessary dependencies.
            </li>
          </ul>

          <div className="docs-intro-faq">
            <button
              type="button"
              className={`docs-intro-faq-trigger${faqOpen ? " open" : ""}`}
              onClick={() => setFaqOpen((prev) => !prev)}
              aria-expanded={faqOpen}
            >
              <span>
                How do I receive upstream updates in an Open Code approach?
              </span>
              <ChevronDown
                size={16}
                className="docs-intro-faq-chevron"
                style={{
                  transform: faqOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--docs-transition-fast)",
                }}
              />
            </button>
            {faqOpen && (
              <div className="docs-intro-faq-content">
                <p>
                  Because components live directly in your repository as pure TypeScript and CSS custom properties, you can update them using the SoraUI CLI (
                  <code>npx @soraui/cli add [component] --overwrite</code>) or review updates via standard git diffs. You maintain 100% control of what gets merged.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 2: ZERO-RUNTIME CSS ─── */}
        <section className="docs-intro-section">
          <h2 id="zero-runtime-css" className="docs-intro-h2">
            <span>Zero-Runtime CSS & Framework Agnostic</span>
            <a href="#zero-runtime-css" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            Unlike CSS-in-JS libraries (Emotion, styled-components) that parse and inject styles at runtime inside the browser, SoraUI relies on <strong>Pure Static CSS & CSS Custom Properties (<code>--ui-*</code>)</strong>:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>0ms JavaScript Styling Overhead:</strong> The browser renders styles natively with zero script execution penalty.
            </li>
            <li>
              <strong>Tailwind CSS Compatible:</strong> Use SoraUI alongside Tailwind CSS or without Tailwind entirely. Component classes use isolated <code>sora-*</code> prefixes, preventing any class name collisions.
            </li>
            <li>
              <strong>Server-Side Rendering & RSC Ready:</strong> Instant rendering with zero layout shift, hydration mismatches, or flash of unstyled content (FOUC) in Next.js, Vite, Astro, and Laravel.
            </li>
          </ul>

          <div className="docs-intro-faq">
            <button
              type="button"
              className={`docs-intro-faq-trigger${tailwindFaqOpen ? " open" : ""}`}
              onClick={() => setTailwindFaqOpen((prev) => !prev)}
              aria-expanded={tailwindFaqOpen}
            >
              <span>
                Can I use Tailwind CSS utility classes with SoraUI components?
              </span>
              <ChevronDown
                size={16}
                className="docs-intro-faq-chevron"
                style={{
                  transform: tailwindFaqOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--docs-transition-fast)",
                }}
              />
            </button>
            {tailwindFaqOpen && (
              <div className="docs-intro-faq-content">
                <p>
                  Yes! All SoraUI components accept standard <code>className</code> and <code>style</code> props. You can use Tailwind classes for layout, positioning, and responsive grids (e.g. <code>className="flex gap-4 max-w-lg mt-6"</code>) while letting SoraUI handle component design tokens and interactive behaviors.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 3: FIRST-CLASS RTL ─── */}
        <section className="docs-intro-section">
          <h2 id="first-class-rtl" className="docs-intro-h2">
            <span>First-Class RTL & Internationalization</span>
            <a href="#first-class-rtl" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI is built from the ground up with <strong>Native Right-to-Left (RTL)</strong> multi-language architecture. It provides seamless bidirectional support for languages such as <strong>Arabic (العربية)</strong> and <strong>Hebrew (עברית)</strong>:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Automatic Layout Inversion:</strong> Just set <code>dir="rtl"</code> on your page or container. Margins, padding, and text alignments adjust automatically.
            </li>
            <li>
              <strong>Direction-Aware Components:</strong> Chevrons rotate correctly, avatar overlapping stacks reverse direction, and dialog transitions mirror smoothly without extra CSS code.
            </li>
            <li>
              <strong>Interactive RTL Demos:</strong> Test components in real-time across English, Arabic, and Hebrew in our documentation.
            </li>
          </ul>

          <div className="docs-intro-faq">
            <button
              type="button"
              className={`docs-intro-faq-trigger${rtlFaqOpen ? " open" : ""}`}
              onClick={() => setRtlFaqOpen((prev) => !prev)}
              aria-expanded={rtlFaqOpen}
            >
              <span>
                Do I need to install separate RTL plugins or post-processors?
              </span>
              <ChevronDown
                size={16}
                className="docs-intro-faq-chevron"
                style={{
                  transform: rtlFaqOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform var(--docs-transition-fast)",
                }}
              />
            </button>
            {rtlFaqOpen && (
              <div className="docs-intro-faq-content">
                <p>
                  No. RTL support is natively compiled into <code>@soraui/react/styles.css</code> using CSS logical properties and <code>[dir="rtl"]</code> selectors. It works out-of-the-box without requiring PostCSS RTL plugins or complex configuration.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 4: COMPOSITION & ACCESSIBILITY ─── */}
        <section className="docs-intro-section">
          <h2 id="composition-accessibility" className="docs-intro-h2">
            <span>Composition & Accessibility (WAI-ARIA)</span>
            <a href="#composition-accessibility" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            Every component in SoraUI follows a predictable, composable sub-component architecture (e.g. <code>&lt;Accordion&gt;</code>, <code>&lt;AccordionItem&gt;</code>, <code>&lt;AccordionTrigger&gt;</code>, <code>&lt;AccordionContent&gt;</code>).
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>WAI-ARIA Compliant:</strong> Adheres to official WAI-ARIA authoring practices for modal dialogs, menus, accordions, and dropdowns.
            </li>
            <li>
              <strong>Full Keyboard Navigation:</strong> Supports Tab, Escape, Arrow keys, Enter, and Spacebar navigation with automatic focus trapping.
            </li>
            <li>
              <strong>Screen Reader Ready:</strong> Includes automated <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-labelledby</code>, and live region announcements.
            </li>
          </ul>
        </section>

        {/* ─── SECTION 5: DUAL DISTRIBUTION ─── */}
        <section className="docs-intro-section">
          <h2 id="distribution" className="docs-intro-h2">
            <span>Dual Distribution: CLI & NPM Packages</span>
            <a href="#distribution" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI adapts to both individual developers and enterprise design system teams through dual distribution models:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>CLI Flat-File Generator:</strong> Use <code>npx @soraui/cli init</code> and <code>npx @soraui/cli add [component]</code> to generate editable source code directly into your repository.
            </li>
            <li>
              <strong>Centralized NPM Package:</strong> Enterprise teams can install <code>@soraui/react</code> as a standard NPM dependency for unified version management across multiple repositories.
            </li>
            <li>
              <strong>Schema-Driven Registry:</strong> Flat-file <code>registry.json</code> definitions make it trivial to distribute custom internal components across teams.
            </li>
          </ul>
        </section>

        {/* ─── SECTION 6: THEMING & PRESETS ─── */}
        <section className="docs-intro-section">
          <h2 id="theming-presets" className="docs-intro-h2">
            <span>9 Space Theme Presets & Dynamic Theming</span>
            <a href="#theming-presets" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI ships with <strong>47 primitives</strong>, <strong>14 production blocks</strong>, and <strong>9 celestial space theme presets</strong> designed for high visual appeal:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>Light Mode Presets:</strong> <code>Sky</code> (Azure Cyan), <code>Cloud</code> (Neutral Indigo), <code>Horizon</code> (Amber Dawn).
            </li>
            <li>
              <strong>Dark Mode Presets:</strong> <code>Aurora</code> (Borealis Teal), <code>Twilight</code> (Violet Dusk), <code>Midnight</code> (Deep Space Navy), <code>Nebula</code> (Cosmic Purple), <code>Eclipse</code> (Solar Gold), <code>Starlight</code> (Ice Blue).
            </li>
            <li>
              <strong>Runtime Theming:</strong> Switch themes dynamically using <code>&lt;ThemeProvider&gt;</code> or scope specific sections with localized <code>&lt;ThemeScope&gt;</code>.
            </li>
          </ul>
        </section>

        {/* ─── SECTION 7: AI-READY & MCP SERVER ─── */}
        <section className="docs-intro-section">
          <h2 id="ai-ready" className="docs-intro-h2">
            <span>AI-Ready & Model Context Protocol (MCP)</span>
            <a href="#ai-ready" className="docs-intro-anchor" aria-hidden>
              #
            </a>
          </h2>

          <p>
            SoraUI is built for the AI era. We provide native tooling for AI coding assistants to discover, understand, and generate SoraUI components with zero friction:
          </p>

          <ul className="docs-intro-bullet-list">
            <li>
              <strong>SoraUI MCP Server (<code>@soraui/mcp</code>):</strong> Connect Cursor, Claude Desktop, and Gemini CLI to query component metadata, inspect props, and fetch clean JSX snippets via MCP tools.
            </li>
            <li>
              <strong>Agent Skills:</strong> Pre-configured AI agent skills that teach LLMs the architectural patterns, tokens, and best practices of SoraUI.
            </li>
            <li>
              <strong>Predictable AI Generation:</strong> Clean TypeScript interfaces and open schema enable LLMs to write accurate, bug-free components effortlessly.
            </li>
          </ul>
        </section>
      </div>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => onNavigate("/docs/components/base/typography")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Typography</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => onNavigate("/guides/installation")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Installation</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
