import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseFocusTrapOptions {
  returnFocusOnDeactivate?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Hook to trap focus within a container element.
 * Handles Tab key cycling and returns focus to previously active element upon deactivation.
 */
export function useFocusTrap(active: boolean, options: UseFocusTrapOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    if (typeof document !== 'undefined') {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }

    const container = containerRef.current;
    if (!container) return;

    // Focus initial element or first focusable
    const focusTimer = setTimeout(() => {
      if (options.initialFocusRef?.current) {
        options.initialFocusRef.current.focus();
      } else {
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
        focusable[0]?.focus();
      }
    }, 10);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !container) return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last || !container.contains(document.activeElement)) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      if (options.returnFocusOnDeactivate !== false && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus?.();
      }
    };
  }, [active, options.returnFocusOnDeactivate, options.initialFocusRef]);

  return containerRef;
}