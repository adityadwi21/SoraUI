import { useEffect, useState, useCallback, type RefObject, type CSSProperties } from 'react';

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
}

export interface PositionResult {
  style: CSSProperties;
  actualPlacement: Placement;
}

/**
 * Lightweight, zero-dependency positioning engine.
 * Computes coordinates relative to viewport and flips on collision.
 */
export function usePositioning(
  anchorRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  options: UsePositioningOptions = {}
): PositionResult {
  const { placement = 'bottom', offset = 8, flip = true, enabled = true } = options;

  const [position, setPosition] = useState<PositionResult>({
    style: { position: 'fixed', top: 0, left: 0, opacity: 1 },
    actualPlacement: placement,
  });

  const updatePosition = useCallback(() => {
    if (!enabled || !anchorRef.current || !floatingRef.current) return;
    if (typeof window === 'undefined') return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const floatingRect = floatingRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth || 1024;
    const viewportHeight = window.innerHeight || 768;

    let [side, align] = placement.split('-') as [ 'top' | 'bottom' | 'left' | 'right', 'start' | 'end' | undefined ];
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

    // Boundary constraint within viewport
    left = Math.max(8, Math.min(left, viewportWidth - floatingRect.width - 8));
    top = Math.max(8, Math.min(top, viewportHeight - floatingRect.height - 8));

    const finalPlacement = (align ? `${actualSide}-${align}` : actualSide) as Placement;

    setPosition({
      style: {
        position: 'fixed',
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        zIndex: 50,
        opacity: 1,
      },
      actualPlacement: finalPlacement,
    });
  }, [anchorRef, floatingRef, placement, offset, flip, enabled]);

  useEffect(() => {
    if (!enabled) return;
    updatePosition();

    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true, capture: true });

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, { capture: true });
    };
  }, [enabled, updatePosition]);

  return position;
}