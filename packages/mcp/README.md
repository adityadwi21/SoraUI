# @soraui/mcp

> Model Context Protocol (MCP) Server for the SoraUI component ecosystem.

Enables AI coding assistants (Claude Desktop, Cursor, Gemini, Copilot) to discover, inspect, compose, and validate SoraUI primitives, blocks, templates, and theme tokens deterministically.

---

## Features

- **Registry-First**: Powered directly by SoraUI's Canonical Registry (`registry/registry.json`).
- **Official MCP SDK**: Built on `@modelcontextprotocol/sdk` for reliable stdio JSON-RPC 2.0 communication.
- **11 Structured Tools**:
  - `soraui_get_context`: Rapid ecosystem overview and architectural guidance.
  - `soraui_search`: Deterministic scoring search (`exact`, `prefix`, `alias`, `category`, `tag`, `description`).
  - `soraui_list`: Filtered listing of components, blocks, templates, and themes.
  - `soraui_inspect_component`: Comprehensive prop tables, WAI-ARIA roles, keyboard keys, and tokens.
  - `soraui_inspect_block`: UI-only boundary matrix ("SoraUI Handles" vs "Consumer Handles") and compound slots.
  - `soraui_inspect_template`: Full layout structure and page composition source code.
  - `soraui_inspect_theme`: 24-key Theme Contract values, color scales, and anti-FOUC init script.
  - `soraui_compose_recipe`: Deterministic React JSX recipes (`recipeVersion: "1.0"`).
  - `soraui_get_install_commands`: Shell install commands for CLI and NPM.
  - `soraui_resolve_dependencies`: Full recursive dependency graph resolution with cycle detection.
  - `soraui_validate_composition`: Static composition analyzer returning diagnostics and Rule IDs (`SORA-TOKEN-001`, `SORA-BOUNDARY-001`, `SORA-A11Y-001`).
- **MCP Resources**:
  - `soraui://registry` (and subpaths `/components`, `/blocks`, `/templates`)
  - `soraui://themes`
  - `soraui://guidelines`
- **MCP Prompts**:
  - `scaffold-page`
  - `build-custom-block`
- **Strict Security Sandboxing**: Read-only, zero shell executions, zero filesystem writes, zero network calls.

---

## Configuration

Add the SoraUI MCP server to your AI tool configuration:

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp"]
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "soraui": {
      "command": "npx",
      "args": ["-y", "@soraui/mcp"]
    }
  }
}
```

---

## License

MIT © [SoraUI](https://soraui.dev)
