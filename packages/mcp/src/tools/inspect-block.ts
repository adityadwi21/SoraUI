import { getBlock } from "../registry/adapter";

export function handleInspectBlock(params: { id: string }) {
  const block = getBlock(params.id);
  if (!block) {
    throw new Error(
      `Block "${params.id}" not found in SoraUI canonical registry.`,
    );
  }

  const boundaryExplanation = block.boundaryExplanation || {
    soraHandles: [
      "Accessible presentation & layout structure",
      "Local interaction state & validation visual feedback",
      "Token-driven responsive styles across all 9 themes",
      "Keyboard navigation and WAI-ARIA role adherence",
    ],
    consumerHandles: [
      "API network requests and OAuth providers",
      "Database mutations & session state",
      "Routing redirects and toast/alert triggers",
      "Business domain logic and credentials storage",
    ],
  };

  const compName = block.name.replace(/\s+/g, "");

  return {
    id: block.id,
    name: block.name,
    category: block.category,
    description: block.description,
    dependencies: block.dependencies,
    tags: block.tags || [],
    installation: {
      cli: `npx soraui add block ${block.id}`,
      npm: `import { ${compName} } from '@soraui/react';`,
    },
    boundaryExplanation,
    previewSupport: block.preview || { desktop: true, mobile: true },
    usageSnippet: `<${compName} onSubmit={(data) => { /* handle in app */ }} />`,
  };
}
