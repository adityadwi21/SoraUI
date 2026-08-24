import type { Diagnostic } from "./types";

export function analyzeAccessibility(code: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (typeof line !== "string") continue;
    const lineNum = i + 1;

    // Check icon button missing aria-label
    if (
      line.includes("<Button") &&
      line.includes('size="icon"') &&
      !line.includes("aria-label")
    ) {
      diagnostics.push({
        rule: "SORA-A11Y-001",
        severity: "error",
        message: "Icon-only button is missing an aria-label attribute.",
        line: lineNum,
        snippet: line.trim(),
        suggestion:
          'Add an aria-label="Description of action" to provide accessible names for screen reader users.',
      });
    }

    // Check naked Input without label
    if (
      line.includes("<Input") &&
      !line.includes("aria-label") &&
      !line.includes("aria-labelledby") &&
      !code.includes("<Label")
    ) {
      diagnostics.push({
        rule: "SORA-A11Y-002",
        severity: "warning",
        message:
          "Input element detected without an associated <Label> or aria-label.",
        line: lineNum,
        snippet: line.trim(),
        suggestion:
          'Wrap input with <Label htmlFor="..."> or provide an explicit aria-label.',
      });
    }
  }

  return diagnostics;
}
