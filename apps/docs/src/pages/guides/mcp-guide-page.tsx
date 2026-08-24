import React, { useState } from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';
import { Check, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

export interface McpGuidePageProps {
  onNavigate?: (path: string) => void;
}

export const McpGuidePage: React.FC<McpGuidePageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyPage = async () => {
    const text = `# MCP Server (Model Context Protocol)\n\nConnect Cursor, Claude Desktop, Gemini CLI, or any AI coding assistant directly to SoraUI’s canonical component registry and design system.\n\nhttps://github.com/adityadwi21/SoraUI`;
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
          <h1 className="sora-doc-title">MCP Server</h1>
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
                  <Check size={13} style={{ color: '#22c55e' }} />
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
                onClick={() => go('/guides/skills')}
                title="Previous: Skills"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/migration')}
                title="Next: Migration Guide"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p className="sora-doc-lead">
          Connect Cursor, Claude Desktop, Gemini CLI, or any AI coding assistant directly to SoraUI&apos;s canonical component registry and design system via stdio JSON-RPC 2.0.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            AI Tooling
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            @soraui/mcp v0.1.0
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Model Context Protocol
          </Badge>
        </div>
      </div>

      {/* Overview */}
      <section className="sora-doc-section">
        <h2 id="overview" className="sora-doc-h2">
          <span>Overview</span>
          <a href="#overview" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          <code>@soraui/mcp</code> is an official, read-only Model Context Protocol (MCP) server that runs over standard I/O (stdio). It provides AI coding agents with real-time access to the complete SoraUI catalog (44 accessible components, 14 composite blocks, 4 full-page templates, and 9 theme presets) without hallucinating prop names, CSS classes, or accessibility contracts.
        </p>
      </section>

      {/* Quick Setup */}
      <section className="sora-doc-section">
        <h2 id="claude-desktop" className="sora-doc-h2">
          <span>Setup in Claude Desktop</span>
          <a href="#claude-desktop" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Add the following configuration to your <code>claude_desktop_config.json</code>:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp@latest"]
    }
  }
}`}
        />
      </section>

      {/* Cursor Setup */}
      <section className="sora-doc-section">
        <h2 id="cursor-setup" className="sora-doc-h2">
          <span>Setup in Cursor</span>
          <a href="#cursor-setup" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          In your project root, create or edit <code>.cursor/mcp.json</code>:
        </p>
        <CodeBlock
          language="json"
          code={`{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp@latest"]
    }
  }
}`}
        />
        <p className="sora-subtext" style={{ marginTop: '0.75rem' }}>
          Alternatively, open Cursor <strong>Settings &gt; Features &gt; MCP</strong>, click <strong>Add New MCP Server</strong>:
        </p>
        <div style={{ padding: '1rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', background: 'var(--docs-bg-card)' }}>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--docs-fg-muted)', lineHeight: 1.8 }}>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Name:</strong> <code>soraui</code></li>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Type:</strong> <code>command</code></li>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Command:</strong> <code>npx -y @soraui/mcp@latest</code></li>
          </ul>
        </div>
      </section>

      {/* 11 Available Tools */}
      <section className="sora-doc-section">
        <h2 id="ai-tools" className="sora-doc-h2">
          <span>Available AI Tools</span>
          <a href="#ai-tools" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          <code>@soraui/mcp</code> exposes 11 structured tools to your AI coding assistants:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_get_context</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Returns ecosystem overview, 3-layer design tokens, and architectural guidelines.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_search</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Deterministic scoring search across all components, blocks, and templates with semantic tags.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_list</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Filtered listing of primitives, blocks, templates, and 9 space theme presets.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_inspect_component</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Inspects exact TypeScript props, WAI-ARIA accessibility contracts, keyboard navigation, and code snippets.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_inspect_block</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Inspects UI-only boundary matrix (&ldquo;SoraUI Handles&rdquo; vs &ldquo;Consumer Handles&rdquo;) and compound slots.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_inspect_template</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Full page layout structure, composition code, and responsive grid configurations.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_inspect_theme</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              24-key Theme Contract values, color scales, and anti-FOUC initialization script.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_compose_recipe</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Generates clean, deterministic composite layout recipes ready for immediate rendering.
            </p>
          </div>

          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_validate_composition</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Static composition analyzer detecting hardcoded hex colors (<code>SORA-TOKEN-001</code>), backend coupling (<code>SORA-BOUNDARY-001</code>), and accessibility issues (<code>SORA-A11Y-001</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Static Analyzer Rules */}
      <section className="sora-doc-section">
        <h2 id="diagnostics" className="sora-doc-h2">
          <span>Static Composition Analyzer</span>
          <a href="#diagnostics" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          When generating or modifying components, <code>@soraui/mcp</code> automatically validates code against three strict quality rules:
        </p>

        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
          <table className="sora-doc-table">
            <thead>
              <tr>
                <th>Rule ID</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>SORA-TOKEN-001</code></td>
                <td>Design System</td>
                <td>Zero hardcoded colors. Flags inline hex/rgb/hsl colors that should use <code>var(--ui-*)</code>.</td>
              </tr>
              <tr>
                <td><code>SORA-BOUNDARY-001</code></td>
                <td>Architecture</td>
                <td>Zero backend coupling. Flags hardcoded fetch/axios calls in UI components.</td>
              </tr>
              <tr>
                <td><code>SORA-A11Y-001</code></td>
                <td>Accessibility</td>
                <td>Ensures required ARIA attributes, semantic roles, and focus traps are preserved.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Pagination */}
      <div className="docs-intro-pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn"
          onClick={() => go('/guides/skills')}
        >
          <ChevronLeft size={16} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)' }}>Previous</div>
            <div style={{ fontWeight: 600 }}>Skills</div>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn"
          onClick={() => go('/guides/migration')}
          style={{ textAlign: 'right' }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)' }}>Next</div>
            <div style={{ fontWeight: 600 }}>Migration Guide</div>
          </div>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
