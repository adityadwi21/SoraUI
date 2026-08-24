import { resolveDependencies } from "../registry/resolver";

export function handleResolveDependencies(params: {
  id: string;
  kind?: "component" | "block" | "template" | undefined;
}) {
  const { id, kind = "component" } = params;
  return resolveDependencies(id, kind ?? "component");
}
