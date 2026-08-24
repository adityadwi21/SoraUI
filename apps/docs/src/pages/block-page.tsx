import React, { useState, useMemo } from "react";
import type { BlockDoc } from "../registry/types";
import { BLOCK_DOCS } from "../registry/blocks";
import { ComponentPreview } from "../components/component-preview";
import { PropTable } from "../components/prop-table";
import { PackageManagerBlock } from "../components/package-manager-block";
import { Badge } from "@soraui/react";
import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { GitHubIcon } from "../components/brand-icons";

export interface BlockPageProps {
  doc: BlockDoc;
  onNavigate?: (path: string) => void;
}

export const BlockPage: React.FC<BlockPageProps> = ({ doc, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const { prevBlock, nextBlock } = useMemo(() => {
    const idx = BLOCK_DOCS.findIndex((b) => b.id === doc.id);
    return {
      prevBlock: idx > 0 ? BLOCK_DOCS[idx - 1] : null,
      nextBlock: idx < BLOCK_DOCS.length - 1 ? BLOCK_DOCS[idx + 1] : null,
    };
  }, [doc.id]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyPage = async () => {
    const text = `# ${doc.name}\n\n${doc.description}\n\n\`\`\`bash\nnpx @soraui/cli add block ${doc.id}\n\`\`\`\n\nhttps://github.com/adityadwi21/SoraUI`;
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
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">{doc.name}</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={copyPage}
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
                onClick={() =>
                  prevBlock && handleNav(`/blocks/${prevBlock.id}`)
                }
                disabled={!prevBlock}
                title={
                  prevBlock
                    ? `Previous: ${prevBlock.name}`
                    : "No previous block"
                }
                aria-label="Previous block"
                style={
                  !prevBlock
                    ? { opacity: 0.35, cursor: "not-allowed" }
                    : undefined
                }
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() =>
                  nextBlock && handleNav(`/blocks/${nextBlock.id}`)
                }
                disabled={!nextBlock}
                title={nextBlock ? `Next: ${nextBlock.name}` : "No next block"}
                aria-label="Next block"
                style={
                  !nextBlock
                    ? { opacity: 0.35, cursor: "not-allowed" }
                    : undefined
                }
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="sora-doc-lead">{doc.description}</p>

        <div className="sora-doc-chips">
          <Badge
            variant="secondary"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            Production Block
          </Badge>
          <Badge
            variant="outline"
            style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
          >
            {doc.category}
          </Badge>
          <a
            href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/blocks/${doc.category}/${doc.id}.tsx`}
            target="_blank"
            rel="noreferrer"
            className="sora-doc-link-chip"
          >
            <GitHubIcon size={13} />
            <span>Source Code</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Live Interactive Canvas */}
      <section className="sora-doc-section">
        <h2 id="live-preview" className="sora-doc-h2">
          <span>Live Interactive Preview</span>
          <a href="#live-preview" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <ComponentPreview code={doc.code}>{doc.render()}</ComponentPreview>
      </section>

      {/* Architecture & Boundary Matrix */}
      <section className="sora-doc-section">
        <h2 id="boundary-matrix" className="sora-doc-h2">
          <span>Architecture &amp; Boundary Matrix</span>
          <a href="#boundary-matrix" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Clear separation between UI primitives and your business logic:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              borderLeft: "4px solid #22c55e",
              background: "var(--docs-bg-subtle)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#22c55e",
                marginBottom: "0.625rem",
              }}
            >
              ✓ SoraUI Handles (UI Layer)
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                fontSize: "0.8125rem",
                color: "var(--docs-fg-muted)",
                lineHeight: 1.7,
              }}
            >
              {doc.boundaryExplanation.soraHandles.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--docs-radius)",
              border: "1px solid var(--docs-border)",
              borderLeft: "4px solid var(--docs-accent)",
              background: "var(--docs-bg-subtle)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--docs-accent)",
                marginBottom: "0.625rem",
              }}
            >
              → Your App Handles (Consumer Domain)
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                fontSize: "0.8125rem",
                color: "var(--docs-fg-muted)",
                lineHeight: 1.7,
              }}
            >
              {doc.boundaryExplanation.consumerHandles.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="sora-doc-section">
        <h2 id="installation" className="sora-doc-h2">
          <span>Installation</span>
          <a href="#installation" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <p className="sora-subtext">
          Add this block directly into your project via CLI:
        </p>
        <PackageManagerBlock
          commands={{
            pnpm: `pnpm dlx @soraui/cli add block ${doc.id}`,
            npm: `npx @soraui/cli add block ${doc.id}`,
            yarn: `yarn dlx @soraui/cli add block ${doc.id}`,
            bun: `bunx @soraui/cli add block ${doc.id}`,
          }}
          style={{ marginTop: "0.5rem" }}
        />
      </section>

      {/* Props Reference */}
      <section className="sora-doc-section">
        <h2 id="props-reference" className="sora-doc-h2">
          <span>Props Reference</span>
          <a href="#props-reference" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <PropTable props={doc.props} />
      </section>

      {/* Dependencies */}
      <section className="sora-doc-section">
        <h2 id="dependencies" className="sora-doc-h2">
          <span>Required Dependencies</span>
          <a href="#dependencies" className="sora-doc-anchor">
            #
          </a>
        </h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {doc.dependencies.map((dep) => (
            <Badge key={dep} variant="outline">
              {dep}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};
