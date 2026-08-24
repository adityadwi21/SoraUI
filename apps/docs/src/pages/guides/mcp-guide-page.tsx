import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const McpGuidePage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Model Context Protocol (MCP) Server</h1>
        </div>
        <p className="sora-doc-lead">
          Connect Cursor, Claude Desktop, Gemini CLI, or any AI coding assistant directly to SoraUI’s canonical component registry and design system.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            AI Tooling
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            @soraui/mcp
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="overview" className="sora-doc-h2">
          <span>Overview</span>
          <a href="#overview" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          <code>@soraui/mcp</code> is an official Model Context Protocol server that runs over standard I/O (stdio). It provides AI agents with real-time access to the complete SoraUI catalog (44 accessible components, 14 composite blocks, 4 full-page templates, and 9 theme presets) without hallucinating prop names or CSS classes.
        </p>
      </section>

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
      "args": ["-y", "@soraui/mcp"]
    }
  }
}`}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="cursor-setup" className="sora-doc-h2">
          <span>Setup in Cursor / VS Code</span>
          <a href="#cursor-setup" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          In Cursor settings under <strong>Features &gt; MCP</strong>, add a new MCP Server:
        </p>
        <div style={{ padding: '1rem', borderRadius: 'var(--docs-radius)', border: '1px solid var(--docs-border)', background: 'var(--docs-bg-card)' }}>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--docs-fg-muted)', lineHeight: 1.8 }}>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Name:</strong> <code>soraui</code></li>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Type:</strong> <code>command</code></li>
            <li><strong style={{ color: 'var(--docs-fg)' }}>Command:</strong> <code>npx -y @soraui/mcp</code></li>
          </ul>
        </div>
      </section>

      <section className="sora-doc-section">
        <h2 id="ai-tools" className="sora-doc-h2">
          <span>Available AI Tools</span>
          <a href="#ai-tools" className="sora-doc-anchor">#</a>
        </h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_get_context</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Returns full design system overview, available themes, and architectural guidelines.
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_search</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Fuzzy search across components, blocks, and templates with semantic tags.
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_inspect_component</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Inspects exact TypeScript props, variants, accessibility contract, and code examples.
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <code style={{ fontWeight: 700, color: 'var(--docs-accent)' }}>soraui_compose_recipe</code>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Generates clean, deterministic composite layout recipes ready for immediate rendering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
