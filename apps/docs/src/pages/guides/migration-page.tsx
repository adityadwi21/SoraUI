import React, { useState } from "react";
import { CodeBlock } from "../../components/code-block";
import { PackageManagerBlock } from "../../components/package-manager-block";
import { Badge } from "@soraui/react";
import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export interface MigrationPageProps {
  onNavigate?: (path: string) => void;
}

export const MigrationPage: React.FC<MigrationPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyPage = async () => {
    const text = `# Migration Guide

Step-by-step instructions for migrating your codebase from Tailwind CSS, Radix UI, shadcn/ui, or CSS-in-JS to SoraUI with zero regressions.

https://github.com/adityadwi21/SoraUI`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="docs-page sora-shadcn-page">
      {/* ─── 1. HEADER ─── */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Migration Guide</h1>
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
                onClick={() => go("/docs/cli")}
                title="Previous: CLI"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/docs/skills")}
                title="Next: Skills"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="sora-doc-lead">
          Step-by-step instructions for migrating your codebase from Tailwind CSS,
          Radix UI, shadcn/ui, or CSS-in-JS to SoraUI with zero runtime overhead
          and zero styling regressions.
        </p>

        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
            Guides
          </Badge>
          <Badge variant="outline" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
            Zero-Runtime
          </Badge>
          <Badge variant="outline" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
            v0.1.1
          </Badge>
        </div>
      </div>

      {/* ─── 2. WHY MIGRATE SECTION ─── */}
      <section className="sora-doc-section">
        <h2 id="why-migrate" className="sora-doc-h2">
          <span>Why Migrate to SoraUI?</span>
          <a href="#why-migrate" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Modern web applications are increasingly burdened by heavy CSS-in-JS runtimes,
          bloated Tailwind configuration files, and fragile npm dependency trees.
          SoraUI is built from the ground up on modern CSS standards (Custom Properties,
          CSS Logical Properties, BEM naming) to give you total ownership and maximum performance.
        </p>

        {/* Feature Comparison Table */}
        <div className="docs-prop-wrap" style={{ margin: "1.25rem 0" }}>
          <table className="docs-prop-table">
            <thead>
              <tr>
                <th>Feature / Architecture</th>
                <th>Tailwind + shadcn/ui</th>
                <th>Chakra / Material UI</th>
                <th>SoraUI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Runtime JavaScript Overhead</td>
                <td>Low (Tailwind build) + Radix (~40KB)</td>
                <td>High (Emotion / styled-engine ~80KB+)</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>0 KB (Pure CSS Variables)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Build Tooling Dependency</td>
                <td>PostCSS / Tailwind Compiler / plugins</td>
                <td>Babel / SWC styling plugins</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>Zero (Standard CSS imports)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>RTL Multi-Language Support</td>
                <td>Requires manual <code>rtl:</code> utility classes</td>
                <td>Requires complex RTL theme provider</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>Native CSS Logical Properties</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>AI Agent & MCP Tooling</td>
                <td>Generic text prompt parsing</td>
                <td>Generic text prompt parsing</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>1st-Class MCP Server & Token AST</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Code Ownership Model</td>
                <td>Copy-Paste only</td>
                <td>NPM package only (black box)</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>Both: NPM package OR CLI registry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 3. MIGRATING FROM SHADCN/UI ─── */}
      <section className="sora-doc-section">
        <h2 id="migrating-from-shadcn" className="sora-doc-h2">
          <span>Migrating from shadcn/ui</span>
          <a href="#migrating-from-shadcn" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          SoraUI was designed with the exact same component composition patterns and prop ergonomics as shadcn/ui.
          If your project already uses shadcn/ui, migrating requires minimal JSX changes:
        </p>

        <div className="sora-callout" style={{ margin: "1rem 0" }}>
          <div className="sora-callout-title" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Zap size={14} style={{ color: "#0ea5e9" }} />
            <span>Drop-in JSX Compatibility</span>
          </div>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "var(--docs-fg-muted)" }}>
            Components like <code>Accordion</code>, <code>Dialog</code>, <code>Card</code>, <code>Button</code>, and <code>Select</code> maintain identical sub-component hierarchies.
          </p>
        </div>

        <h3 id="component-import-comparison" className="sora-doc-h3">
          <span>Component Import Comparison</span>
          <a href="#component-import-comparison" className="sora-doc-anchor">#</a>
        </h3>

        <CodeBlock
          language="tsx"
          filename="Accordion Migration"
          code={`// ❌ BEFORE (shadcn/ui + Radix UI)
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ✅ AFTER (SoraUI)
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@soraui/react";
// OR copy directly into your project: npx @soraui/cli add accordion`}
        />

        <p className="sora-subtext" style={{ marginTop: "1rem" }}>
          The JSX usage remains 100% identical:
        </p>

        <CodeBlock
          language="tsx"
          code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern with zero runtime JS.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      {/* ─── 4. MIGRATING FROM TAILWIND CSS ─── */}
      <section className="sora-doc-section">
        <h2 id="migrating-from-tailwind" className="sora-doc-h2">
          <span>Migrating from Tailwind CSS</span>
          <a href="#migrating-from-tailwind" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          SoraUI eliminates the need for complex Tailwind configuration files and compiler plugins.
          Follow these 3 steps to migrate your global stylesheet:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1rem 0" }}>
          {/* Step 1 */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              background: "var(--docs-bg-card)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
              1. Replace Tailwind Directives in globals.css
            </h4>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", color: "var(--docs-fg-muted)" }}>
              Remove <code>@tailwind base; @tailwind components; @tailwind utilities;</code> and import SoraUI core themes:
            </p>
            <CodeBlock
              language="css"
              filename="globals.css"
              code={`/* ❌ Remove Tailwind Directives */
/* @tailwind base; */
/* @tailwind components; */
/* @tailwind utilities; */

/* ✅ Import SoraUI Core & Presets */
@import "@soraui/core/theme/primitives.css";
@import "@soraui/core/theme/presets/sky.css";
@import "@soraui/react/styles";`}
            />
          </div>

          {/* Step 2: Token Translation Table */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              background: "var(--docs-bg-card)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
              2. Design Token Translation Map
            </h4>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", color: "var(--docs-fg-muted)" }}>
              SoraUI standardizes on semantic hex CSS variables instead of HSL string concatenations:
            </p>

            <div className="docs-prop-wrap">
              <table className="docs-prop-table">
                <thead>
                  <tr>
                    <th>Tailwind Utility Class</th>
                    <th>Tailwind Variable</th>
                    <th>SoraUI CSS Token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>bg-background</code></td>
                    <td><code>hsl(var(--background))</code></td>
                    <td><code>var(--ui-background)</code></td>
                  </tr>
                  <tr>
                    <td><code>text-foreground</code></td>
                    <td><code>hsl(var(--foreground))</code></td>
                    <td><code>var(--ui-foreground)</code></td>
                  </tr>
                  <tr>
                    <td><code>bg-primary</code></td>
                    <td><code>hsl(var(--primary))</code></td>
                    <td><code>var(--ui-primary)</code></td>
                  </tr>
                  <tr>
                    <td><code>border-border</code></td>
                    <td><code>hsl(var(--border))</code></td>
                    <td><code>var(--ui-border)</code></td>
                  </tr>
                  <tr>
                    <td><code>bg-card</code></td>
                    <td><code>hsl(var(--card))</code></td>
                    <td><code>var(--ui-card)</code></td>
                  </tr>
                  <tr>
                    <td><code>rounded-md</code></td>
                    <td><code>var(--radius)</code></td>
                    <td><code>var(--ui-radius)</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. MIGRATING FROM RADIX UI ─── */}
      <section className="sora-doc-section">
        <h2 id="migrating-from-radix" className="sora-doc-h2">
          <span>Migrating from Radix Primitives</span>
          <a href="#migrating-from-radix" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Radix UI divides each UI element into individual npm packages (<code>@radix-ui/react-dialog</code>, <code>@radix-ui/react-accordion</code>, <code>@radix-ui/react-select</code>), which rapidly inflates your <code>node_modules</code>.
          With SoraUI, all accessible primitives are unified in <code>@soraui/react</code> with zero external dependencies:
        </p>

        <CodeBlock
          language="bash"
          filename="Terminal (Uninstall Radix)"
          code={`# Clean up individual Radix packages
pnpm remove @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tabs

# Install SoraUI
pnpm add @soraui/react @soraui/core`}
        />
      </section>

      {/* ─── 6. AUTOMATED CLI WORKFLOW ─── */}
      <section className="sora-doc-section">
        <h2 id="automated-cli" className="sora-doc-h2">
          <span>Automated Setup with CLI</span>
          <a href="#automated-cli" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Use the SoraUI CLI to initialize your project configuration and automatically scaffolding your component library:
        </p>

        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli init",
            npm: "npx @soraui/cli init",
            yarn: "yarn dlx @soraui/cli init",
            bun: "bunx @soraui/cli init",
          }}
        />

        <p className="sora-subtext" style={{ marginTop: "1rem" }}>
          Add all desired components into your codebase with one command:
        </p>

        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli add accordion dialog card button select",
            npm: "npx @soraui/cli add accordion dialog card button select",
            yarn: "yarn dlx @soraui/cli add accordion dialog card button select",
            bun: "bunx @soraui/cli add accordion dialog card button select",
          }}
        />
      </section>

      {/* ─── 7. FREQUENTLY ASKED QUESTIONS ─── */}
      <section className="sora-doc-section">
        <h2 id="faq" className="sora-doc-h2">
          <span>Migration FAQ</span>
          <a href="#faq" className="sora-doc-anchor">#</a>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1rem 0" }}>
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              background: "var(--docs-bg-card)",
            }}
          >
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.875rem", fontWeight: 600 }}>
              Can I use SoraUI alongside Tailwind CSS during a gradual migration?
            </h4>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--docs-fg-muted)", lineHeight: 1.6 }}>
              <strong>Yes, absolutely.</strong> SoraUI uses namespaced classes (<code>.sora-[component]</code>) and scoped CSS custom properties (<code>--ui-*</code>). It has zero namespace collisions with Tailwind utility classes.
            </p>
          </div>

          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              background: "var(--docs-bg-card)",
            }}
          >
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.875rem", fontWeight: 600 }}>
              Do I need to rewrite my animations and transitions?
            </h4>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--docs-fg-muted)", lineHeight: 1.6 }}>
              <strong>No.</strong> SoraUI components include GPU-accelerated keyframe animations and smooth transitions natively built into their CSS stylesheets.
            </p>
          </div>

          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              background: "var(--docs-bg-card)",
            }}
          >
            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.875rem", fontWeight: 600 }}>
              How does SoraUI handle Right-to-Left (RTL) languages?
            </h4>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--docs-fg-muted)", lineHeight: 1.6 }}>
              Unlike libraries that require manual conditional styling or Tailwind <code>rtl:</code> prefixes, SoraUI uses modern <strong>CSS Logical Properties</strong> (<code>padding-inline</code>, <code>margin-inline</code>, <code>inset-inline</code>). Simply setting <code>dir="rtl"</code> on your container handles 100% of the layout flip automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
