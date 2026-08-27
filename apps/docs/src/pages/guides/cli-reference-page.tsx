import React, { useState } from "react";
import { PackageManagerBlock } from "../../components/package-manager-block";
import { Badge } from "@soraui/react";
import { Check, Copy, ChevronLeft, ChevronRight } from "lucide-react";

export interface CLIReferencePageProps {
  onNavigate?: (path: string) => void;
}

export const CLIReferencePage: React.FC<CLIReferencePageProps> = ({
  onNavigate,
}) => {
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
    const text = `# CLI Command Reference\n\nComprehensive command-line tool reference for scaffolding, component distribution, and registry searching.\n\nhttps://github.com/adityadwi21/SoraUI`;
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
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">CLI Reference</h1>
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
                onClick={() => go("/guides/skills")}
                title="Next: Skills"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p className="sora-doc-lead">
          Comprehensive command-line tool reference for scaffolding, component
          distribution, and registry searching.
        </p>
        <div className="sora-doc-chips">
          <Badge
            variant="secondary"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            Tooling
          </Badge>
          <Badge
            variant="outline"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            @soraui/cli
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="cli-init" className="sora-doc-h2">
          <span>
            <code>@soraui/cli init</code>
          </span>
          <a href="#cli-init" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Initializes SoraUI in your project directory, creating{" "}
          <code>soraui.config.json</code> and setting up the theme tokens.
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli init",
            npm: "npx @soraui/cli init",
            yarn: "yarn dlx @soraui/cli init",
            bun: "bunx @soraui/cli init",
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="cli-add-component" className="sora-doc-h2">
          <span>
            <code>@soraui/cli add &lt;component...&gt;</code>
          </span>
          <a href="#cli-add-component" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Downloads and writes primitive component source code directly into
          your configured components directory.
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli add button input card dialog select",
            npm: "npx @soraui/cli add button input card dialog select",
            yarn: "yarn dlx @soraui/cli add button input card dialog select",
            bun: "bunx @soraui/cli add button input card dialog select",
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="cli-add-block" className="sora-doc-h2">
          <span>
            <code>@soraui/cli add block &lt;id&gt;</code>
          </span>
          <a href="#cli-add-block" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Resolves all primitive dependencies and copies the production block
          into your project.
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli add block login-form",
            npm: "npx @soraui/cli add block login-form",
            yarn: "yarn dlx @soraui/cli add block login-form",
            bun: "bunx @soraui/cli add block login-form",
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="cli-list" className="sora-doc-h2">
          <span>
            <code>@soraui/cli list</code>
          </span>
          <a href="#cli-list" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Displays all available components, blocks, and templates available in
          the offline bundled registry.
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli list",
            npm: "npx @soraui/cli list",
            yarn: "yarn dlx @soraui/cli list",
            bun: "bunx @soraui/cli list",
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="cli-search" className="sora-doc-h2">
          <span>
            <code>@soraui/cli search &lt;query&gt;</code>
          </span>
          <a href="#cli-search" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Instant offline fuzzy search across all registry items.
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: "pnpm dlx @soraui/cli search auth",
            npm: "npx @soraui/cli search auth",
            yarn: "yarn dlx @soraui/cli search auth",
            bun: "bunx @soraui/cli search auth",
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>
    </div>
  );
};
