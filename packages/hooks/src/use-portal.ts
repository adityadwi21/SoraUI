import { useEffect, useState, type ReactNode, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export interface UsePortalOptions {
  container?: HTMLElement | null | undefined;
}

/**
 * Hook & Component helper to render elements into document.body or a target container.
 * SSR-safe: guarantees rendering only after client hydration.
 */
export function usePortal(options: UsePortalOptions = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = options.container ?? (typeof document !== 'undefined' ? document.body : null);

  const renderPortal = (children: ReactNode): ReactPortal | null => {
    if (!mounted || !container) return null;
    return createPortal(children, container);
  };

  return { mounted, container, renderPortal };
}

export function Portal({ children, container }: { children: ReactNode; container?: HTMLElement | null | undefined }) {
  const { renderPortal } = usePortal({ container });
  return renderPortal(children);
}