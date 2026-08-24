export interface CSSExportOptions {
  themeId?: string;
  isDefault?: boolean;
  mode?: "light" | "dark";
}

export interface TailwindExportOptions {
  prefix?: string;
}

/**
 * Export theme tokens to a valid, standalone CSS block.
 * Uses :root, [data-theme="..."] for default themes, and [data-theme="..."] for scoped themes.
 */
export function exportThemeToCSS(
  tokens: Record<string, string>,
  options: CSSExportOptions = {},
): string {
  const { themeId = "custom", isDefault = false, mode } = options;

  let selector = `[data-theme="${themeId}"]`;
  if (isDefault) {
    selector = `:root,\n[data-theme="${themeId}"]`;
  }
  if (mode) {
    selector = `[data-theme="${themeId}"][data-mode="${mode}"]`;
  }

  const lines = Object.entries(tokens)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `${selector} {\n${lines}\n}\n`;
}

/**
 * Export theme tokens to W3C Design Tokens Community Group (DTCG) JSON format.
 */
export function exportThemeToJSON(
  tokens: Record<string, string>,
  metadata: { name?: string; description?: string } = {},
): Record<string, any> {
  const dtcg: Record<string, any> = {
    $name: metadata.name || "SoraUI Theme",
    $description: metadata.description || "SoraUI Design Tokens",
    color: {},
    dimension: {},
  };

  for (const [key, value] of Object.entries(tokens)) {
    const cleanKey = key.replace(/^--ui-/, "").replace(/^--sora-/, "");

    if (cleanKey.includes("radius") || cleanKey.includes("space")) {
      dtcg.dimension[cleanKey] = {
        $type: "dimension",
        $value: value,
      };
    } else {
      dtcg.color[cleanKey] = {
        $type: "color",
        $value: value,
      };
    }
  }

  return dtcg;
}

/**
 * Export theme tokens to Tailwind CSS configuration object.
 * Pure functional adapter with zero runtime dependency on Tailwind.
 */
export function exportThemeToTailwind(
  tokens: Record<string, string>,
  _options: TailwindExportOptions = {},
): Record<string, any> {
  const colors: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};

  for (const [key] of Object.entries(tokens)) {
    if (key.startsWith("--ui-")) {
      const cleanKey = key.replace(/^--ui-/, "");
      if (cleanKey.includes("radius")) {
        borderRadius[cleanKey] = `var(${key})`;
      } else {
        colors[cleanKey] = `var(${key})`;
      }
    }
  }

  return {
    theme: {
      extend: {
        colors,
        borderRadius,
      },
    },
  };
}
