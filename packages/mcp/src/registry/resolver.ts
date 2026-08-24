import {
  loadCanonicalRegistry,
  getBlock,
  getTemplate,
  getComponent,
} from "./adapter";

export interface DependencyNode {
  id: string;
  kind: "component" | "block" | "template";
  dependencies: string[];
}

export function resolveDependencies(
  id: string,
  kind: "component" | "block" | "template" = "component",
): {
  id: string;
  kind: string;
  resolvedComponents: string[];
  resolvedBlocks: string[];
  dependencyTree: Record<string, string[]>;
} {
  loadCanonicalRegistry();
  const visited = new Set<string>();
  const resolvedComponents = new Set<string>();
  const resolvedBlocks = new Set<string>();
  const dependencyTree: Record<string, string[]> = {};

  function traverse(
    currentId: string,
    currentKind: "component" | "block" | "template",
  ) {
    const key = `${currentKind}:${currentId}`;
    if (visited.has(key)) {
      throw new Error(
        `Circular dependency detected in SoraUI registry graph: ${key}`,
      );
    }
    visited.add(key);

    if (currentKind === "template") {
      const template = getTemplate(currentId);
      if (!template) {
        throw new Error(
          `Template "${currentId}" not found in canonical registry.`,
        );
      }
      dependencyTree[currentId] = [
        ...template.blocks,
        ...template.dependencies,
      ];
      template.blocks.forEach((bId) => traverse(bId, "block"));
      template.dependencies.forEach((cId) => traverse(cId, "component"));
    } else if (currentKind === "block") {
      const block = getBlock(currentId);
      if (!block) {
        throw new Error(
          `Block "${currentId}" not found in canonical registry.`,
        );
      }
      resolvedBlocks.add(block.id);
      dependencyTree[block.id] = block.dependencies;
      block.dependencies.forEach((cId) => traverse(cId, "component"));
    } else {
      const component = getComponent(currentId);
      if (!component) {
        throw new Error(
          `Component "${currentId}" not found in canonical registry.`,
        );
      }
      resolvedComponents.add(component.name);
      dependencyTree[component.name] = component.dependencies || [];
      if (component.dependencies) {
        component.dependencies.forEach((dep) => {
          // If dependency is a SoraUI component rather than external package
          if (!dep.startsWith("@")) {
            traverse(dep, "component");
          }
        });
      }
    }

    visited.delete(key);
  }

  traverse(id, kind);

  return {
    id,
    kind,
    resolvedComponents: Array.from(resolvedComponents).sort(),
    resolvedBlocks: Array.from(resolvedBlocks).sort(),
    dependencyTree,
  };
}
