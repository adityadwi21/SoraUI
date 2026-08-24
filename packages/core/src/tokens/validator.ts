import { THEME_CONTRACT_KEYS, type ThemeContractKey } from "./index";

export interface ThemeValidationError {
  type:
    | "missing_key"
    | "invalid_reference"
    | "circular_reference"
    | "invalid_value";
  key?: string;
  message: string;
  chain?: string[];
}

export interface ThemeValidationWarning {
  type: "unknown_token" | "unreferenced_primitive";
  key?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ThemeValidationError[];
  warnings: ThemeValidationWarning[];
}

const VAR_REGEX = /var\(\s*(--[a-zA-Z0-9_-]+)\s*(?:,[^)]+)?\)/g;

function extractReferences(value: string): string[] {
  const refs: string[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(VAR_REGEX);
  while ((match = regex.exec(value)) !== null) {
    if (match[1]) refs.push(match[1]);
  }
  return refs;
}

/**
 * Validates a theme token dictionary against the SoraUI Theme Contract.
 * Performs recursive reference resolution and circular dependency detection.
 */
export function validateTheme(
  themeTokens: Record<string, string>,
  options: { strict?: boolean } = {},
): ValidationResult {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];

  // 1. Check presence of all required Theme Contract keys
  for (const requiredKey of THEME_CONTRACT_KEYS) {
    if (!themeTokens[requiredKey] || themeTokens[requiredKey]?.trim() === "") {
      errors.push({
        type: "missing_key",
        key: requiredKey,
        message: `Missing required Theme Contract token: "${requiredKey}"`,
      });
    }
  }

  // 2. Check for unknown optional tokens (warning)
  const knownKeys = new Set<string>(THEME_CONTRACT_KEYS);
  for (const key of Object.keys(themeTokens)) {
    if (!key.startsWith("--ui-") && !key.startsWith("--sora-")) {
      warnings.push({
        type: "unknown_token",
        key,
        message: `Token "${key}" does not follow the standard --ui-* or --sora-* naming convention.`,
      });
    }
  }

  // 3. Recursive Reference & Circular Dependency Check
  for (const [key, value] of Object.entries(themeTokens)) {
    if (typeof value !== "string") {
      errors.push({
        type: "invalid_value",
        key,
        message: `Token "${key}" value must be a string, received ${typeof value}.`,
      });
      continue;
    }

    const visited = [key];

    function checkChain(
      currentKey: string,
      currentVal: string,
      chain: string[],
    ) {
      const refs = extractReferences(currentVal);

      for (const ref of refs) {
        if (chain.includes(ref)) {
          const fullCycle = [...chain, ref];
          errors.push({
            type: "circular_reference",
            key,
            chain: fullCycle,
            message: `Circular token reference detected: ${fullCycle.join(" -> ")}`,
          });
          return;
        }

        if (ref.startsWith("--ui-") && !(ref in themeTokens)) {
          errors.push({
            type: "invalid_reference",
            key,
            message: `Token "${currentKey}" references non-existent semantic token "${ref}".`,
          });
          return;
        }

        if (ref in themeTokens) {
          checkChain(ref, themeTokens[ref]!, [...chain, ref]);
        }
      }
    }

    checkChain(key, value, visited);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
