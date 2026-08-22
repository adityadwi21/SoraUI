import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

console.log('\n🚀 SoraUI Phase 11 — MCP Release Smoke Test (Fresh Consumer Stdio Isolation)\n');

const rootDir = process.cwd();
const tempDir = path.join(os.tmpdir(), `soraui-mcp-smoke-${Date.now()}`);
fs.mkdirSync(tempDir, { recursive: true });

async function runSmokeTest() {
  try {
    // 1. Pack @soraui/mcp
    console.log('1. Packing @soraui/mcp into standalone .tgz...');
    const mcpPkgDir = path.join(rootDir, 'packages/mcp');
    const packOut = execSync(`pnpm pack --pack-destination "${tempDir}"`, {
      cwd: mcpPkgDir,
      encoding: 'utf8',
    }).trim();

    const lines = packOut.split('\n');
    const tgzName = path.basename(lines[lines.length - 1].trim());
    const tgzPath = path.join(tempDir, tgzName);
    console.log(`  ✓ Packed: ${tgzName}`);

    // 2. Scaffold isolated consumer app in tempDir/client-app
    const clientAppDir = path.join(tempDir, 'client-app');
    fs.mkdirSync(clientAppDir, { recursive: true });

    const packageJson = {
      name: 'isolated-mcp-consumer',
      version: '1.0.0',
      type: 'module',
      dependencies: {
        '@soraui/mcp': `file:${tgzPath}`,
        '@modelcontextprotocol/sdk': '^1.30.0',
      },
    };

    fs.writeFileSync(
      path.join(clientAppDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );

    // 3. Install in isolated consumer app
    console.log('2. Installing @soraui/mcp in isolated test directory...');
    execSync('pnpm install', {
      cwd: clientAppDir,
      stdio: 'inherit',
    });

    // 4. Launch real MCP Client over stdio connecting to installed binary
    console.log('3. Spawning @soraui/mcp server process via stdio transport...');
    const mcpServerBin = path.join(clientAppDir, 'node_modules/@soraui/mcp/dist/server.js');

    const transport = new StdioClientTransport({
      command: 'node',
      args: [mcpServerBin],
      cwd: clientAppDir,
    });

    const client = new Client(
      { name: 'SmokeTestClient', version: '1.0.0' },
      { capabilities: {} }
    );

    await client.connect(transport);
    console.log('  ✓ Connected to stdio MCP server process!');

    // 5. Test MCP Flow
    console.log('4. Testing MCP Tool calls over live stdio transport...');

    // A. List Tools
    const toolsRes = await client.listTools();
    console.log(`  ✓ tools/list: returned ${toolsRes.tools.length} tools`);
    if (toolsRes.tools.length !== 11) {
      throw new Error(`Expected 11 tools, got ${toolsRes.tools.length}`);
    }

    // B. Call soraui_get_context
    const ctxRes = await client.callTool({ name: 'soraui_get_context', arguments: {} });
    const ctx = JSON.parse(ctxRes.content[0].text);
    console.log(`  ✓ soraui_get_context: ${ctx.ecosystem} v${ctx.version} (${ctx.catalog.totalComponents} comps, ${ctx.catalog.totalBlocks} blocks)`);

    // C. Call soraui_search
    const searchRes = await client.callTool({ name: 'soraui_search', arguments: { query: 'login' } });
    const search = JSON.parse(searchRes.content[0].text);
    console.log(`  ✓ soraui_search("login"): found ${search.totalFound} results`);

    // D. Call soraui_inspect_component
    const inspectRes = await client.callTool({ name: 'soraui_inspect_component', arguments: { name: 'button' } });
    const comp = JSON.parse(inspectRes.content[0].text);
    console.log(`  ✓ soraui_inspect_component("button"): level ${comp.level}, CLI: "${comp.installation.cli}"`);

    // E. Call soraui_compose_recipe
    const recipeRes = await client.callTool({ name: 'soraui_compose_recipe', arguments: { recipe: 'auth_flow', theme: 'midnight' } });
    const recipe = JSON.parse(recipeRes.content[0].text);
    console.log(`  ✓ soraui_compose_recipe("auth_flow"): recipeVersion ${recipe.recipeVersion}`);

    // F. Call soraui_validate_composition
    const valRes = await client.callTool({
      name: 'soraui_validate_composition',
      arguments: { code: '<div style={{ color: "#ff0000" }}><Button size="icon" /></div>' },
    });
    const val = JSON.parse(valRes.content[0].text);
    console.log(`  ✓ soraui_validate_composition: detected ${val.errorsCount} errors as expected`);

    // G. Read Resource
    const resRead = await client.readResource({ uri: 'soraui://themes' });
    const themes = JSON.parse(resRead.contents[0].text);
    console.log(`  ✓ readResource("soraui://themes"): ${themes.totalPresets} themes`);

    // 6. Cleanup
    await client.close();
    console.log('\n✅ Phase 11 — MCP Release Smoke Test 100% Succeeded on isolated stdio runtime!\n');
  } catch (err) {
    console.error('\n❌ MCP Release Smoke Test Failed:', err);
    process.exit(1);
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

runSmokeTest();
