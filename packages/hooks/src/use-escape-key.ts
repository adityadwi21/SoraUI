import { useEffect } from 'react';

/**
 * Hook to listen for Escape key presses when active.
 */
export function useEscapeKey(handler: (event: KeyboardEvent) => void, active: boolean = true) {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handler, active]);
}