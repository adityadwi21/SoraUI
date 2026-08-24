import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer } from "../src/server";

describe("Phase 11 — MCP Protocol & Client Integration", () => {
  let client: Client;
  let server: ReturnType<typeof createMcpServer>;

  beforeAll(async () => {
    server = createMcpServer();
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    client = new Client(
      { name: "TestMcpClient", version: "1.0.0" },
      { capabilities: {} },
    );

    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport),
    ]);
  });

  afterAll(async () => {
    await client.close();
    await server.close();
  });

  it("1. client.listTools() returns all 11 SoraUI MCP tools", async () => {
    const toolsResult = await client.listTools();
    expect(toolsResult.tools.length).toBe(11);

    const toolNames = toolsResult.tools.map((t) => t.name);
    expect(toolNames).toContain("soraui_get_context");
    expect(toolNames).toContain("soraui_search");
    expect(toolNames).toContain("soraui_list");
    expect(toolNames).toContain("soraui_inspect_component");
    expect(toolNames).toContain("soraui_inspect_block");
    expect(toolNames).toContain("soraui_inspect_template");
    expect(toolNames).toContain("soraui_inspect_theme");
    expect(toolNames).toContain("soraui_compose_recipe");
    expect(toolNames).toContain("soraui_get_install_commands");
    expect(toolNames).toContain("soraui_resolve_dependencies");
    expect(toolNames).toContain("soraui_validate_composition");
  });

  it('2. client.callTool("soraui_get_context") returns ecosystem overview', async () => {
    const res = await client.callTool({
      name: "soraui_get_context",
      arguments: {},
    });
    expect(res.content).toBeDefined();
    const textContent = (res.content as any)[0].text;
    const parsed = JSON.parse(textContent);
    expect(parsed.ecosystem).toBe("SoraUI");
    expect(parsed.catalog.totalComponents).toBe(47);
  });

  it('3. client.callTool("soraui_search", { query: "table" }) returns search results', async () => {
    const res = await client.callTool({
      name: "soraui_search",
      arguments: { query: "table" },
    });
    const textContent = (res.content as any)[0].text;
    const parsed = JSON.parse(textContent);
    expect(parsed.totalFound).toBeGreaterThan(0);
    expect(
      parsed.results.some(
        (r: any) =>
          r.id === "data-table" ||
          r.id === "data-table-block" ||
          r.id === "pricing-table",
      ),
    ).toBe(true);
  });

  it('4. client.callTool("soraui_inspect_component", { name: "button" }) returns button schema', async () => {
    const res = await client.callTool({
      name: "soraui_inspect_component",
      arguments: { name: "button" },
    });
    const parsed = JSON.parse((res.content as any)[0].text);
    expect(parsed.name).toBe("button");
    expect(parsed.level).toBe(1);
    expect(parsed.installation.cli).toBe("npx soraui add button");
  });

  it('5. client.callTool("soraui_compose_recipe", { recipe: "auth_flow" }) produces deterministic JSX', async () => {
    const res = await client.callTool({
      name: "soraui_compose_recipe",
      arguments: { recipe: "auth_flow" },
    });
    const parsed = JSON.parse((res.content as any)[0].text);
    expect(parsed.recipeVersion).toBe("1.0");
    expect(parsed.generatedCode).toContain("<LoginForm");
  });

  it('6. client.callTool("soraui_validate_composition", { code: "..." }) executes static analysis', async () => {
    const res = await client.callTool({
      name: "soraui_validate_composition",
      arguments: { code: '<div style={{ color: "#ff0000" }} />' },
    });
    const parsed = JSON.parse((res.content as any)[0].text);
    expect(parsed.valid).toBe(false);
    expect(parsed.diagnostics[0].rule).toBe("SORA-TOKEN-001");
  });

  it("7. client.listResources() and client.readResource() work correctly", async () => {
    const resourcesList = await client.listResources();
    expect(resourcesList.resources.length).toBeGreaterThan(0);

    const readRes = await client.readResource({ uri: "soraui://registry" });
    expect(readRes.contents.length).toBe(1);
    const parsedRegistry = JSON.parse((readRes.contents[0] as any).text);
    expect(parsedRegistry.components.length).toBe(47);
  });

  it("8. client.listPrompts() and client.getPrompt() work correctly", async () => {
    const promptsList = await client.listPrompts();
    expect(promptsList.prompts.length).toBe(2);

    const promptRes = await client.getPrompt({
      name: "scaffold-page",
      arguments: { pageType: "Analytics Dashboard" },
    });
    expect(promptRes.messages.length).toBe(1);
    expect((promptRes.messages[0].content as any).text).toContain(
      "Analytics Dashboard",
    );
  });
});
