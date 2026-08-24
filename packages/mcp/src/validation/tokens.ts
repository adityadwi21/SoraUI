import type { Diagnostic } from "./types";

const HEX_COLOR_REGEX = /#([0-9a-fA-F]{3,8})\b/g;
const RAW_COLOR_FUNC_REGEX = /\b(rgba?|hsla?|oklch|oklab)\s*\([^)]+\)/gi;

export function analyzeTokenCompliance(code: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (typeof line !== "string") continue;
    const lineNum = i + 1;

    // Skip comment lines
    const trimmed = line.trim();
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*")
    ) {
      continue;
    }

    // Check Hex colors
    let match: RegExpExecArray | null;
    while ((match = HEX_COLOR_REGEX.exec(line)) !== null) {
      // Ignore if inside a CSS variable fallback, e.g. var(--ui-primary, #0ea5e9)
      const isInsideFallback = line.includes(`var(`) && line.includes(match[0]);
      if (isInsideFallback) continue;

      diagnostics.push({
        rule: "SORA-TOKEN-001",
        severity: "error",
        message: `Hardcoded color "${match[0]}" detected. SoraUI requires using design tokens.`,
        line: lineNum,
        column: match.index + 1,
        snippet: line.trim(),
        suggestion:
          "Replace with a CSS token: var(--ui-primary), var(--ui-background), or var(--ui-border).",
      });
    }

    // Check Raw color functions
    while ((match = RAW_COLOR_FUNC_REGEX.exec(line)) !== null) {
      if (line.includes("var(") && line.indexOf("var(") < match.index) continue;

      diagnostics.push({
        rule: "SORA-TOKEN-001",
        severity: "error",
        message: `Direct color function "${match[0]}" detected.`,
        line: lineNum,
        column: match.index + 1,
        snippet: line.trim(),
        suggestion:
          "Replace with semantic tokens: var(--ui-muted), var(--ui-accent), or var(--ui-destructive).",
      });
    }
  }

  return diagnostics;
}
