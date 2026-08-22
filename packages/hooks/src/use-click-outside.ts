import { useEffect, type RefObject } from 'react';

/**
 * Hook to trigger a callback when a click occurs outside the specified element(s).
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return;

    const refList = Array.isArray(refs) ? refs : [refs];

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const isInside = refList.some((ref) => ref.current?.contains(target));
      if (!isInside) {
        handler(event);
      }
    };

    document.addEventListener('pointerdown', listener);
    return () => document.removeEventListener('pointerdown', listener);
  }, [refs, handler, active]);
}