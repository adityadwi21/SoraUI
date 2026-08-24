import React, { useState } from "react";
import { Copy, Check, ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import { CodeBlock } from "../../components/code-block";

export interface ManualPageProps {
  onNavigate?: (path: string) => void;
}

export const ManualPage: React.FC<ManualPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tab1, setTab1] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const handleCopyPage = () => {
    const fullText = `# Manual Installation\n\nInstall and configure SoraUI manually in any custom React project.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Manual Installation</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy Page as Markdown"
              aria-label="Copy Page as Markdown"
            >
              {copied ? (
                <>
                  <Check size={14} className="docs-copy-check" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/astro")}
                title="Previous: Astro"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/introduction")}
                title="Next: Introduction"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Add SoraUI dependencies, tokens, and primitives manually to any custom
          React setup or bundler.
        </p>
      </header>

      {/* ─── STEP 1: INSTALL PACKAGES ─── */}
      <section className="docs-intro-section">
        <h2 className="docs-intro-h2">
          <span>1. Install Packages</span>
          <a href="#install-packages" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>
        <p>
          Install the core styling tokens, React primitive bindings, and utility
          packages:
        </p>

        <div className="docs-tabbed-codeblock">
          <div className="docs-tabbed-codeblock-header">
            <div className="docs-tabbed-codeblock-tabs">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`docs-tabbed-codeblock-tab${tab1 === tab ? " active" : ""}`}
                  onClick={() => setTab1(tab)}
                >
                  <Terminal size={12} style={{ opacity: 0.7 }} />
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          </div>
          <pre className="docs-tabbed-codeblock-pre">
            <code>
              {tab1 === "pnpm" &&
                "pnpm add @soraui/react @soraui/core @soraui/hooks lucide-react clsx"}
              {tab1 === "npm" &&
                "npm install @soraui/react @soraui/core @soraui/hooks lucide-react clsx"}
              {tab1 === "yarn" &&
                "yarn add @soraui/react @soraui/core @soraui/hooks lucide-react clsx"}
              {tab1 === "bun" &&
                "bun add @soraui/react @soraui/core @soraui/hooks lucide-react clsx"}
            </code>
          </pre>
        </div>
      </section>

      {/* ─── STEP 2: PATH ALIASES ─── */}
      <section className="docs-intro-section">
        <h2 className="docs-intro-h2">
          <span>2. Configure Path Aliases</span>
          <a href="#path-aliases" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>
        <p>
          Add <code>@/*</code> path mapping to your <code>tsconfig.json</code>:
        </p>
        <CodeBlock
          language="json"
          title="tsconfig.json"
          code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
        />
      </section>

      {/* ─── STEP 3: CSS TOKENS ─── */}
      <section className="docs-intro-section">
        <h2 className="docs-intro-h2">
          <span>3. Configure CSS Variable Contract</span>
          <a href="#css-tokens" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>
        <p>
          Import the base tokens or define the 20-token contract in your global
          stylesheet:
        </p>
        <CodeBlock
          language="css"
          title="src/index.css"
          code={`@import '@soraui/core/dist/index.css';

:root {
  --ui-bg: #ffffff;
  --ui-fg: #09090b;
  --ui-card: #ffffff;
  --ui-card-foreground: #09090b;
  --ui-primary: #0284c7;
  --ui-primary-foreground: #ffffff;
  --ui-muted: #f4f4f5;
  --ui-muted-foreground: #71717a;
  --ui-border: #e4e4e7;
  --ui-radius: 0.5rem;
}

.dark {
  --ui-bg: #09090b;
  --ui-fg: #fafafa;
  --ui-card: #09090b;
  --ui-card-foreground: #fafafa;
  --ui-primary: #38bdf8;
  --ui-muted: #27272a;
  --ui-muted-foreground: #a1a1aa;
  --ui-border: #27272a;
}`}
        />
      </section>

      {/* ─── STEP 4: THEME PROVIDER ─── */}
      <section className="docs-intro-section">
        <h2 className="docs-intro-h2">
          <span>4. Setup Theme Provider</span>
          <a href="#theme-provider" className="docs-intro-anchor" aria-hidden>
            #
          </a>
        </h2>
        <p>
          Wrap your application root with <code>ThemeProvider</code>:
        </p>
        <CodeBlock
          language="tsx"
          title="src/App.tsx"
          code={`import React from 'react';
import { ThemeProvider, Button } from '@soraui/react';
import './index.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Pure React with SoraUI</h1>
        <Button variant="primary">Click Me</Button>
      </div>
    </ThemeProvider>
  );
}`}
        />
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav
        className="docs-intro-pagination"
        aria-label="Pagination"
        style={{ marginTop: "3rem" }}
      >
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go("/guides/astro")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Astro</span>
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
