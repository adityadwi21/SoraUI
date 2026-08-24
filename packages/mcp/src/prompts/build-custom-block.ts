export function getBuildCustomBlockPrompt(params: {
  blockName: string;
  category: string;
  primitivesToUse: string;
}) {
  const { blockName, category, primitivesToUse } = params;

  return {
    description:
      "Compose a new reusable UI-only block from SoraUI Level 1-2 primitives.",
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a custom reusable SoraUI Block named "${blockName}" in the "${category}" category.
Use the following SoraUI primitives: ${primitivesToUse}.

Strict Architecture Rules:
1. Pure presentation + local interaction state only.
2. Accept onAction / onSubmit callback props instead of embedding API/database code.
3. Use CSS classes with namespace .sora-* and consume --ui-* tokens.
4. Support full keyboard navigation and WAI-ARIA roles.`,
        },
      },
    ],
  };
}
