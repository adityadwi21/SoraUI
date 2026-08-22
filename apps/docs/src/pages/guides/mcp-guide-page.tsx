import React from 'react';

export const McpGuidePage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ui-primary, #0ea5e9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          AI Integration
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>
          Model Context Protocol (MCP) Server
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground)', lineHeight: 1.6 }}>
          Connect Cursor, Claude Desktop, Gemini CLI, or any AI coding assistant directly to SoraUI’s canonical component registry and design system.
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Overview</h2>
        <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
          <code>@soraui/mcp</code> is an official Model Context Protocol server that runs over standard I/O (stdio). It provides AI agents with real-time access to the complete SoraUI catalog (44 accessible components, 14 composite blocks, 4 full-page templates, and 9 theme presets) without hallucinating prop names or CSS classes.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Setup in Claude Desktop</h2>
        <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
          Add the following configuration to your <code>claude_desktop_config.json</code>:
        </p>
        <pre style={{ backgroundColor: 'var(--ui-muted, #f4f4f5)', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem' }}>
{`{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp"]
    }
  }
}`}
        </pre>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Setup in Cursor / VS Code</h2>
        <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
          In Cursor settings under <strong>Features &gt; MCP</strong>, add a new MCP Server:
        </p>
        <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li><strong>Name:</strong> <code>soraui</code></li>
          <li><strong>Type:</strong> <code>command</code></li>
          <li><strong>Command:</strong> <code>npx -y @soraui/mcp</code></li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Available AI Tools</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: '8px' }}>
            <code style={{ fontWeight: 700, color: 'var(--ui-primary)' }}>soraui_get_context</code>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>Returns full design system overview, available themes, and architectural guidelines.</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: '8px' }}>
            <code style={{ fontWeight: 700, color: 'var(--ui-primary)' }}>soraui_search</code>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>Fuzzy search across components, blocks, and templates with semantic tags.</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: '8px' }}>
            <code style={{ fontWeight: 700, color: 'var(--ui-primary)' }}>soraui_inspect_component</code>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>Inspects exact TypeScript props, variants, accessibility contract, and code examples.</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: '8px' }}>
            <code style={{ fontWeight: 700, color: 'var(--ui-primary)' }}>soraui_compose_recipe</code>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>Generates clean, deterministic composite layout recipes ready for immediate rendering.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
