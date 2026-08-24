/**
 * SoraUI Core Utilities
 *
 * Minimal utility helpers. Follows the Decision Rule:
 * only utilities that are genuinely needed and cannot be done natively.
 */

/**
 * Merge CSS class names, filtering falsy values.
 * Intentionally minimal — no runtime complexity.
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Check if we are running in a browser environment.
 * Used to guard DOM operations for SSR safety.
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
