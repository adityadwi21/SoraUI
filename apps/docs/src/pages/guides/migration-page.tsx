import React, { useState } from "react";
import { CodeBlock } from "../../components/code-block";
import { PackageManagerBlock } from "../../components/package-manager-block";
import { Badge } from "@soraui/react";
import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Zap,
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
          Radix UI, shadcn/ui, or CSS-in-JS to SoraUI with zero external primitive
          dependencies and predictable CSS custom properties.
        </p>

        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
            Guides
          </Badge>
          <Badge variant="outline" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
            Zero-Runtime CSS
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
          SoraUI is built around three core architectural tenets:
          <strong> CSS-first design tokens</strong>, <strong>clean BEM class naming</strong> (<code>.sora-[component]</code>),
          and <strong>zero external primitive dependencies</strong>.
        </p>

        {/* Feature Comparison Table */}
        <div className="docs-prop-wrap" style={{ margin: "1.25rem 0" }}>
          <table className="docs-prop-table">
            <thead>
              <tr>
                <th>Feature / Architecture</th>
                <th>shadcn/ui (Tailwind + Radix)</th>
                <th>Chakra / Material UI</th>
                <th>SoraUI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>CSS Runtime Overhead</td>
                <td>Zero (Generated static CSS)</td>
                <td>Runtime JS style injection (Emotion)</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>Zero (Standard CSS Custom Properties)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Primitive Dependencies</td>
                <td>Multiple <code>@radix-ui/react-*</code> packages</td>
                <td>Coupled to styling engine packages</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>0 external primitive packages</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Build Tooling Dependency</td>
                <td>Tailwind compiler + PostCSS</td>
                <td>Babel / SWC CSS-in-JS plugins</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>None (Works with any bundler or vanilla CSS)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Theme Customization</td>
                <td>Tailwind HSL color variables</td>
                <td>JavaScript theme objects</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>3-Layer CSS Tokens (<code>--ui-*</code>)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Distribution Model</td>
                <td>Copy-Paste into codebase</td>
                <td>NPM package only</td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>Both (NPM package OR CLI registry)</td>
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
          SoraUI components share the exact same slot and composition ergonomics as shadcn/ui.
          You do not need to re-architect your component tree when migrating:
        </p>

        <div className="sora-callout" style={{ margin: "1rem 0" }}>
          <div className="sora-callout-title" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Zap size={14} style={{ color: "#0ea5e9" }} />
            <span>Drop-in JSX Compatibility</span>
          </div>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.8125rem", color: "var(--docs-fg-muted)" }}>
            Components like <code>Accordion</code>, <code>Dialog</code>, <code>Card</code>, <code>Button</code>, and <code>Select</code> share identical sub-component APIs and prop conventions.
          </p>
        </div>

        <h3 id="component-import-comparison" className="sora-doc-h3">
          <span>Component Import Comparison</span>
          <a href="#component-import-comparison" className="sora-doc-anchor">#</a>
        </h3>

        <CodeBlock
          language="tsx"
          filename="Accordion Migration"
          code={`// ❌ BEFORE (shadcn/ui)
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ✅ AFTER (SoraUI Package)
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@soraui/react";

// OR copy directly into your project via CLI:
// npx @soraui/cli add accordion`}
        />

        <p className="sora-subtext" style={{ marginTop: "1rem" }}>
          The JSX usage remains identical:
        </p>

        <CodeBlock
          language="tsx"
          code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation.
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
          SoraUI replaces utility class compilation with standardized CSS Custom Properties.
          Here is how to update your global styles:
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
              1. Replace Global Stylesheet Imports
            </h4>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", color: "var(--docs-fg-muted)" }}>
              Import SoraUI core primitives and your chosen theme preset in your main entry file (e.g. <code>main.tsx</code> or <code>globals.css</code>):
            </p>
            <CodeBlock
              language="css"
              filename="globals.css / main.tsx"
              code={`/* Import SoraUI Core Theme Primitives & Presets */
import "@soraui/core/theme/primitives.css";
import "@soraui/core/theme/presets/sky.css";
import "@soraui/react/styles";`}
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
              SoraUI standardizes on semantic hex CSS variables instead of HSL string manipulations:
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
                  <tr>
                    <td><code>ring-ring</code></td>
                    <td><code>hsl(var(--ring))</code></td>
                    <td><code>var(--ui-ring)</code></td>
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
          Instead of installing dozen separate <code>@radix-ui/react-*</code> packages, SoraUI bundles all accessible keyboard behaviors, ARIA attributes, and focus traps directly into <code>@soraui/react</code>:
        </p>

        <CodeBlock
          language="bash"
          filename="Terminal (Dependency Cleanup)"
          code={`# Remove individual Radix packages
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
          Use the SoraUI CLI to initialize your project and add components on demand:
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
          Add components to your codebase with one command:
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
              <strong>Yes, absolutely.</strong> SoraUI uses namespaced classes (<code>.sora-[component]</code>) and scoped CSS custom properties (<code>--ui-*</code>). It can safely coexist with Tailwind utility classes without conflicts.
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
              <strong>No.</strong> SoraUI components include GPU-accelerated CSS keyframe animations and smooth transitions natively built into their stylesheets.
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
              SoraUI supports bidirectional layouts natively with standard HTML <code>dir="rtl"</code> attributes and CSS flexbox mirroring, requiring zero JavaScript layout recalculations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
