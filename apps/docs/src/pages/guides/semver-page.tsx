import React, { useState } from "react";
import { Badge } from "@soraui/react";
import { Check, Copy, ChevronLeft, ChevronRight } from "lucide-react";

export interface SemverPageProps {
  onNavigate?: (path: string) => void;
}

export const SemverPage: React.FC<SemverPageProps> = ({ onNavigate }) => {
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
    const text = `# Semantic Versioning Policy\n\nOur commitment to backward compatibility, predictable release cadence, and safe enterprise upgrades.\n\nhttps://github.com/adityadwi21/SoraUI`;
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
          <h1 className="sora-doc-title">Semantic Versioning Policy</h1>
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
                onClick={() => go("/guides/migration")}
                title="Previous: Migration Guide"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go("/guides/changelog")}
                title="Next: Changelog"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p className="sora-doc-lead">
          Our commitment to backward compatibility, predictable release cadence,
          and safe enterprise upgrades.
        </p>
        <div className="sora-doc-chips">
          <Badge
            variant="secondary"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            Policy
          </Badge>
          <Badge
            variant="outline"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            SemVer 2.0.0
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="version-format" className="sora-doc-h2">
          <span>Version Number Format</span>
          <a href="#version-format" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          SoraUI strictly follows Semantic Versioning (
          <code>MAJOR.MINOR.PATCH</code>):
        </p>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div
            style={{
              padding: "1rem",
              border: "1px solid var(--docs-border)",
              borderRadius: "var(--docs-radius)",
              background: "var(--docs-bg-card)",
            }}
          >
            <strong style={{ color: "var(--docs-fg)" }}>
              MAJOR (e.g. 1.0.0 → 2.0.0)
            </strong>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.875rem",
                color: "var(--docs-fg-muted)",
              }}
            >
              Breaking changes to component APIs, removed props, or fundamental
              architectural shifts. Includes automated codemods.
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              border: "1px solid var(--docs-border)",
              borderRadius: "var(--docs-radius)",
              background: "var(--docs-bg-card)",
            }}
          >
            <strong style={{ color: "var(--docs-fg)" }}>
              MINOR (e.g. 0.1.0 → 0.2.0)
            </strong>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.875rem",
                color: "var(--docs-fg-muted)",
              }}
            >
              New components, new props, additive features, and theme presets
              without breaking existing code.
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              border: "1px solid var(--docs-border)",
              borderRadius: "var(--docs-radius)",
              background: "var(--docs-bg-card)",
            }}
          >
            <strong style={{ color: "var(--docs-fg)" }}>
              PATCH (e.g. 0.1.0 → 0.1.1)
            </strong>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.875rem",
                color: "var(--docs-fg-muted)",
              }}
            >
              Bug fixes, accessibility improvements, style adjustments, and
              documentation updates.
            </p>
          </div>
        </div>
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
          onClick={() => go("/guides/mcp-guide")}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">
              Model Context Protocol
            </span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go("/guides/changelog")}
        >
          <div
            className="docs-intro-pagination-text"
            style={{ textAlign: "right" }}
          >
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Changelog</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
};
