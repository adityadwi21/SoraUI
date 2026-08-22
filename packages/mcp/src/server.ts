import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { handleGetContext } from './tools/get-context';
import { handleSearch } from './tools/search';
import { handleList } from './tools/list';
import { handleInspectComponent } from './tools/inspect-component';
import { handleInspectBlock } from './tools/inspect-block';
import { handleInspectTemplate } from './tools/inspect-template';
import { handleInspectTheme } from './tools/inspect-theme';
import { handleComposeRecipe } from './tools/compose-recipe';
import { handleGetInstallCommands } from './tools/install-commands';
import { handleResolveDependencies } from './tools/resolve-dependencies';
import { handleValidateComposition } from './tools/validate-composition';

import { getRegistryResource } from './resources/registry';
import { getThemesResource } from './resources/themes';
import { getGuidelinesResource } from './resources/guidelines';

import { getScaffoldPagePrompt } from './prompts/scaffold-page';
import { getBuildCustomBlockPrompt } from './prompts/build-custom-block';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'SoraUI MCP Server',
    version: '0.1.0',
  });

  // ─── 1. REGISTER TOOLS ──────────────────────────────────────────────────

  // Tool 1: soraui_get_context
  server.tool(
    'soraui_get_context',
    'Get comprehensive overview of SoraUI ecosystem, version, registered primitives/blocks/themes, and architectural principles for rapid AI onboarding.',
    {
      task: z.enum(['build', 'debug', 'migrate', 'compose']).optional().describe('Specific task the agent wants guidance for'),
    },
    async (args) => {
      const result = handleGetContext(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 2: soraui_search
  server.tool(
    'soraui_search',
    'Search across 44 components, 14 blocks, 4 templates, and 9 themes with deterministic scoring and match reasoning.',
    {
      query: z.string().min(1).describe('Search query keyword, component name, or category'),
      kind: z.enum(['all', 'components', 'blocks', 'templates', 'themes']).optional().describe('Filter by catalog kind'),
      limit: z.number().optional().describe('Maximum results to return (default 20)'),
    },
    async (args) => {
      const result = handleSearch(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 3: soraui_list
  server.tool(
    'soraui_list',
    'List all items in a namespace (components, blocks, templates, themes) with levels and dependencies.',
    {
      kind: z.enum(['components', 'blocks', 'templates', 'themes']).describe('Catalog namespace to list'),
      category: z.string().optional().describe('Optional category filter (e.g. auth, dashboard, marketing)'),
    },
    async (args) => {
      const result = handleList(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 4: soraui_inspect_component
  server.tool(
    'soraui_inspect_component',
    'Get detailed specification for a SoraUI primitive component including props, WAI-ARIA roles, keyboard keys, CSS tokens, and examples.',
    {
      name: z.string().min(1).describe('Component name (e.g. button, dialog, data-table, calendar)'),
    },
    async (args) => {
      const result = handleInspectComponent(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 5: soraui_inspect_block
  server.tool(
    'soraui_inspect_block',
    'Get block specification, compound slots, dependency list, and UI-Only Boundary Matrix (SoraUI Handles vs Consumer Handles).',
    {
      id: z.string().min(1).describe('Block ID (e.g. login-form, metric-grid, pricing-table, dashboard-shell)'),
    },
    async (args) => {
      const result = handleInspectBlock(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 6: soraui_inspect_template
  server.tool(
    'soraui_inspect_template',
    'Get full template specification, composed block hierarchy, and full page layout structure.',
    {
      id: z.string().min(1).describe('Template ID (e.g. login-page, dashboard-page, saas-landing-page, settings-page)'),
    },
    async (args) => {
      const result = handleInspectTemplate(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 7: soraui_inspect_theme
  server.tool(
    'soraui_inspect_theme',
    'Get 24-key Theme Contract values, color scales, light/dark mode contrast, and zero-FOUC head init script.',
    {
      id: z.string().optional().describe('Optional theme preset ID (e.g. sky, midnight, aurora). If omitted, returns all 9 themes overview.'),
    },
    async (args) => {
      const result = handleInspectTheme(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 8: soraui_compose_recipe
  server.tool(
    'soraui_compose_recipe',
    'Generate deterministic, production-ready React JSX recipes (v1.0) with ThemeProvider, ThemeScope, and consumer callback slots.',
    {
      recipe: z.enum(['auth_flow', 'dashboard', 'saas_landing', 'settings_tabs']).describe('Predefined composition recipe pattern'),
      theme: z.string().optional().describe('Theme preset ID (e.g. sky, midnight, aurora)'),
      mode: z.enum(['light', 'dark']).optional().describe('Color mode'),
    },
    async (args) => {
      const result = handleComposeRecipe(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 9: soraui_get_install_commands
  server.tool(
    'soraui_get_install_commands',
    'Generate exact CLI or NPM shell installation commands for any component, block, or template (read-only command generator).',
    {
      target: z.string().min(1).describe('Component, block, or template ID'),
      type: z.enum(['component', 'block', 'template']).optional().describe('Item type'),
      method: z.enum(['cli', 'npm', 'pnpm', 'yarn']).optional().describe('Installation method'),
    },
    async (args) => {
      const result = handleGetInstallCommands(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 10: soraui_resolve_dependencies
  server.tool(
    'soraui_resolve_dependencies',
    'Resolve full recursive dependency graph for a component, block, or template with automated cycle detection.',
    {
      id: z.string().min(1).describe('Component, block, or template ID'),
      kind: z.enum(['component', 'block', 'template']).optional().describe('Item kind'),
    },
    async (args) => {
      const result = handleResolveDependencies(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // Tool 11: soraui_validate_composition
  server.tool(
    'soraui_validate_composition',
    'Static SoraUI Composition Analyzer. Analyzes JSX for token compliance (no hardcoded colors), UI-only boundaries, and accessibility.',
    {
      code: z.string().min(1).describe('JSX / TSX code snippet to analyze'),
    },
    async (args) => {
      const result = handleValidateComposition(args);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  // ─── 2. REGISTER RESOURCES ──────────────────────────────────────────────

  server.resource(
    'registry',
    'soraui://registry',
    async () => {
      const resource = getRegistryResource();
      return { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text: resource.text }] };
    }
  );

  server.resource(
    'registry-subpath',
    new ResourceTemplate('soraui://registry/{subpath}', { list: undefined }),
    async (uri, { subpath }) => {
      const resource = getRegistryResource(subpath as string);
      return { contents: [{ uri: uri.href, mimeType: resource.mimeType, text: resource.text }] };
    }
  );

  server.resource(
    'themes',
    'soraui://themes',
    async () => {
      const resource = getThemesResource();
      return { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text: resource.text }] };
    }
  );

  server.resource(
    'guidelines',
    'soraui://guidelines',
    async () => {
      const resource = getGuidelinesResource();
      return { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text: resource.text }] };
    }
  );

  // ─── 3. REGISTER PROMPTS ────────────────────────────────────────────────

  server.prompt(
    'scaffold-page',
    {
      pageType: z.string().describe('Type of page to scaffold (e.g. login, dashboard, landing, settings)'),
      theme: z.string().optional().describe('Theme preset ID (e.g. midnight, sky, aurora)'),
      requirements: z.string().optional().describe('Special page requirements or user features'),
    },
    async (args) => {
      return getScaffoldPagePrompt(args);
    }
  );

  server.prompt(
    'build-custom-block',
    {
      blockName: z.string().describe('Name of the new custom block'),
      category: z.string().describe('Category (e.g. analytics, e-commerce, forms)'),
      primitivesToUse: z.string().describe('Comma-separated list of SoraUI primitives (e.g. Card, Button, Input)'),
    },
    async (args) => {
      return getBuildCustomBlockPrompt(args);
    }
  );

  return server;
}

export async function runServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// Auto-run if executed directly as script/binary
if (process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server.ts'))) {
  runServer().catch((err) => {
    console.error('Fatal MCP Server Error:', err);
    process.exit(1);
  });
}
