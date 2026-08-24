import type { Diagnostic } from "./types";

const FORBIDDEN_BOUNDARY_CALLS = [
  { pattern: /\bfetch\s*\(/g, name: "fetch()" },
  { pattern: /\baxios\.(get|post|put|delete|patch)\s*\(/g, name: "axios" },
  {
    pattern: /\b(useQuery|useMutation|useSWR)\s*\(/g,
    name: "data fetching hooks",
  },
  {
    pattern: /\b(supabase|firebase|prisma|db)\./g,
    name: "direct database client",
  },
];

export function analyzeBoundaryCompliance(code: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (typeof line !== "string") continue;
    const lineNum = i + 1;

    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("/*")) continue;

    for (const forbidden of FORBIDDEN_BOUNDARY_CALLS) {
      let match: RegExpExecArray | null;
      while ((match = forbidden.pattern.exec(line)) !== null) {
        diagnostics.push({
          rule: "SORA-BOUNDARY-001",
          severity: "warning",
          message: `Direct backend integration "${forbidden.name}" detected in UI composition.`,
          line: lineNum,
          column: match.index + 1,
          snippet: line.trim(),
          suggestion:
            "SoraUI blocks must remain UI-only. Expose an onSubmit/onAction prop callback and handle network requests in your application layer.",
        });
      }
    }
  }

  return diagnostics;
}
