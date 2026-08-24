import { useEffect, useLayoutEffect, useState, useCallback, type RefObject, type CSSProperties } from 'react';

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface UsePositioningOptions {
  placement?: Placement;
  offset?: number;
  flip?: boolean;
  enabled?: boolean;
  matchWidth?: boolean;
}

export interface PositionResult {
  style: CSSProperties;
  actualPlacement: Placement;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Lightweight, rock-solid positioning engine.
 * Computes coordinates relative to viewport, flips on collision, and prevents top-left jumping or detached scrolling.
 */
export function usePositioning(
  anchorRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  options: UsePositioningOptions = {}
): PositionResult {
  const { placement = 'bottom-start', offset = 4, flip = true, enabled = true } = options;

  const [position, setPosition] = useState<PositionResult>(() => {
    if (typeof window !== 'undefined' && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      return {
        style: {
          position: 'fixed',
          top: `${Math.round(rect.bottom + offset)}px`,
          left: `${Math.round(rect.left)}px`,
          zIndex: 9999,
          visibility: 'visible',
          opacity: 1,
          minWidth: `${Math.max(160, Math.round(rect.width))}px`,
        },
        actualPlacement: placement,
      };
    }
    return {
      style: {
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        zIndex: 9999,
        visibility: 'hidden',
        opacity: 0,
      },
      actualPlacement: placement,
    };
  });

  const updatePosition = useCallback(() => {
    if (!enabled || !anchorRef.current) return;
    if (typeof window === 'undefined') return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const floatingEl = floatingRef.current;
    const floatingRect = floatingEl ? floatingEl.getBoundingClientRect() : { width: anchorRect.width, height: 160 };

    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1024;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 768;

    // Check if anchor is visible in viewport (or fallback for JSDOM zero-rects)
    const isAnchorZero = anchorRect.top === 0 && anchorRect.bottom === 0 && anchorRect.left === 0 && anchorRect.right === 0;
    const isAnchorVisible =
      isAnchorZero ||
      (anchorRect.bottom >= 0 &&
        anchorRect.top <= viewportHeight &&
        anchorRect.right >= 0 &&
        anchorRect.left <= viewportWidth);

    if (!isAnchorVisible) {
      setPosition((prev) => ({
        ...prev,
        style: {
          ...prev.style,
          visibility: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        },
      }));
      return;
    }

    let [side, align] = placement.split('-') as ['top' | 'bottom' | 'left' | 'right', 'start' | 'end' | undefined];
    let actualSide = side;

    // Viewport collision auto-flip
    if (flip) {
      if (side === 'bottom' && anchorRect.bottom + offset + floatingRect.height > viewportHeight) {
        if (anchorRect.top - offset - floatingRect.height >= 0) actualSide = 'top';
      } else if (side === 'top' && anchorRect.top - offset - floatingRect.height < 0) {
        if (anchorRect.bottom + offset + floatingRect.height <= viewportHeight) actualSide = 'bottom';
      } else if (side === 'right' && anchorRect.right + offset + floatingRect.width > viewportWidth) {
        if (anchorRect.left - offset - floatingRect.width >= 0) actualSide = 'left';
      } else if (side === 'left' && anchorRect.left - offset - floatingRect.width < 0) {
        if (anchorRect.right + offset + floatingRect.width <= viewportWidth) actualSide = 'right';
      }
    }

    let top = 0;
    let left = 0;

    if (actualSide === 'bottom') {
      top = anchorRect.bottom + offset;
      if (align === 'start') left = anchorRect.left;
      else if (align === 'end') left = anchorRect.right - floatingRect.width;
      else left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2;
    } else if (actualSide === 'top') {
      top = anchorRect.top - floatingRect.height - offset;
      if (align === 'start') left = anchorRect.left;
      else if (align === 'end') left = anchorRect.right - floatingRect.width;
      else left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2;
    } else if (actualSide === 'right') {
      left = anchorRect.right + offset;
      if (align === 'start') top = anchorRect.top;
      else if (align === 'end') top = anchorRect.bottom - floatingRect.height;
      else top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2;
    } else if (actualSide === 'left') {
      left = anchorRect.left - floatingRect.width - offset;
      if (align === 'start') top = anchorRect.top;
      else if (align === 'end') top = anchorRect.bottom - floatingRect.height;
      else top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2;
    }

    // Boundary constraint within viewport only when anchor is visible
    left = Math.max(8, Math.min(left, viewportWidth - floatingRect.width - 8));

    const finalPlacement = (align ? `${actualSide}-${align}` : actualSide) as Placement;

    setPosition({
      style: {
        position: 'fixed',
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        zIndex: 9999,
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'auto',
        minWidth: `${Math.max(160, Math.round(anchorRect.width))}px`,
      },
      actualPlacement: finalPlacement,
    });
  }, [anchorRef, floatingRef, placement, offset, flip, enabled]);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;

    // Run immediately and in the next frame to catch post-mount ref assignment
    updatePosition();
    const raf1 = requestAnimationFrame(updatePosition);
    const raf2 = requestAnimationFrame(() => {
      requestAnimationFrame(updatePosition);
    });

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true, capture: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && floatingRef.current) {
      ro = new ResizeObserver(() => {
        updatePosition();
      });
      ro.observe(floatingRef.current);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, { capture: true });
    };
  }, [enabled, updatePosition, floatingRef]);

  return position;
}