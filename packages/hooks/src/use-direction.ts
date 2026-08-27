import { useCallback, useRef } from "react";

/**
 * `useDirection` — Detects the reading direction (LTR/RTL) of a given DOM element
 * by checking the nearest ancestor `[dir]` attribute or computed CSS `direction`.
 *
 * Usage:
 * ```tsx
 * const { isRtl, getDirection } = useDirection();
 *
 * <div onKeyDown={(e) => {
 *   const rtl = isRtl(e.currentTarget);
 *   const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
 *   if (e.key === nextKey) moveToNext();
 * }} />
 * ```
 */

export type Direction = "ltr" | "rtl";

export interface UseDirectionReturn {
  /**
   * Returns `true` if the given element (or its ancestor) is in RTL mode.
   * Falls back to `false` (LTR) when element is null.
   */
  isRtl: (element: HTMLElement | null | EventTarget) => boolean;

  /**
   * Returns `"rtl"` or `"ltr"` for the given element.
   */
  getDirection: (element: HTMLElement | null | EventTarget) => Direction;

  /**
   * Given an event, normalizes arrow keys so they always mean "logically next"
   * or "logically previous" regardless of text direction.
   *
   * Returns:
   * - `"next"` when the user presses the key that visually advances forward.
   * - `"prev"` when the user presses the key that visually goes backward.
   * - `null` when the key is not a horizontal arrow key.
   */
  resolveArrowKey: (
    e: React.KeyboardEvent | KeyboardEvent
  ) => "next" | "prev" | null;
}

function getElementDirection(element: HTMLElement | null | EventTarget): Direction {
  if (!element || !(element instanceof HTMLElement)) return "ltr";

  // 1. Walk up the DOM looking for an explicit [dir] attribute
  let current: HTMLElement | null = element;
  while (current) {
    const dir = current.getAttribute("dir");
    if (dir === "rtl") return "rtl";
    if (dir === "ltr") return "ltr";
    current = current.parentElement;
  }

  // 2. Fall back to CSS computed `direction` property
  const computed = window.getComputedStyle(element).direction;
  return computed === "rtl" ? "rtl" : "ltr";
}

export function useDirection(): UseDirectionReturn {
  const isRtl = useCallback(
    (element: HTMLElement | null | EventTarget): boolean =>
      getElementDirection(element) === "rtl",
    []
  );

  const getDirection = useCallback(
    (element: HTMLElement | null | EventTarget): Direction =>
      getElementDirection(element),
    []
  );

  const resolveArrowKey = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent): "next" | "prev" | null => {
      const target =
        "currentTarget" in e && e.currentTarget instanceof HTMLElement
          ? e.currentTarget
          : "target" in e && e.target instanceof HTMLElement
          ? e.target
          : null;

      const rtl = getElementDirection(target) === "rtl";

      if (e.key === "ArrowRight") return rtl ? "prev" : "next";
      if (e.key === "ArrowLeft") return rtl ? "next" : "prev";
      return null;
    },
    []
  );

  return { isRtl, getDirection, resolveArrowKey };
}
