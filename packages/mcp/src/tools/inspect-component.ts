import { getComponent } from "../registry/adapter";

export function handleInspectComponent(params: { name: string }) {
  const component = getComponent(params.name);
  if (!component) {
    throw new Error(
      `Component "${params.name}" not found in SoraUI canonical registry.`,
    );
  }

  const capitalized =
    component.name.charAt(0).toUpperCase() + component.name.slice(1);

  return {
    name: component.name,
    type: component.type,
    level: component.level,
    description: component.description,
    dependencies: component.dependencies,
    tags: component.tags || [],
    installation: {
      cli: `npx soraui add ${component.name}`,
      npm: `import { ${capitalized} } from '@soraui/react';`,
    },
    props: component.props || [
      {
        name: "className",
        type: "string",
        description: "Additional CSS class names",
      },
      { name: "children", type: "ReactNode", description: "Component content" },
    ],
    accessibility: component.accessibility || {
      role: "presentation",
      keyboard: [],
      aria: [],
    },
    tokens: component.tokens || [`--sora-${component.name}-*`],
    example:
      component.example || `<${capitalized}>Example Content</${capitalized}>`,
  };
}
