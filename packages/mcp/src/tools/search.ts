import { searchRegistry } from "../registry/adapter";

export function handleSearch(params: {
  query: string;
  kind?: "all" | "components" | "blocks" | "templates" | "themes" | undefined;
  limit?: number | undefined;
}) {
  const { query, kind = "all", limit = 20 } = params;
  const results = searchRegistry(query, kind ?? "all", limit ?? 20);

  return {
    query,
    kind: kind ?? "all",
    totalFound: results.length,
    results,
  };
}
