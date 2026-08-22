export function getScaffoldPagePrompt(params: {
  pageType: string;
  theme?: string | undefined;
  requirements?: string | undefined;
}) {
  const { pageType, theme = 'midnight', requirements = '' } = params;

  return {
    description: 'Scaffold a complete SoraUI page with responsive layout, ThemeProvider, and UI-only blocks.',
    messages: [
      {
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `Please generate a complete React page for a "${pageType}" using SoraUI components.
Apply the "${theme ?? 'midnight'}" theme preset using <ThemeProvider defaultTheme="${theme ?? 'midnight'}">.
Requirements: ${requirements || 'Ensure responsive layout, accessible navigation, and decoupled callback placeholders.'}

Guidelines:
1. Import components from '@soraui/react' and styles from '@soraui/react/styles'.
2. Use token-driven styling with var(--ui-*).
3. Keep blocks UI-only with consumer-level callbacks.`,
        },
      },
    ],
  };
}
