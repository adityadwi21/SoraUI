import {
  createContext,
  useContext,
  useState,
  useRef,
  forwardRef,
} from 'react';
import { usePositioning, Portal } from '@soraui/hooks';
import type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
} from './hover-card.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

interface HoverCardContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLSpanElement>;
  openDelay: number;
  closeDelay: number;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

export function HoverCard({ openDelay = 200, closeDelay = 300, children }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef: triggerRef as any, openDelay, closeDelay }}>
      {children}
    </HoverCardContext.Provider>
  );
}

export const HoverCardTrigger = forwardRef<HTMLSpanElement, HoverCardTriggerProps>(({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error('HoverCardTrigger must be inside HoverCard');

  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => ctx.setOpen(true), ctx.openDelay);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => ctx.setOpen(false), ctx.closeDelay);
    onMouseLeave?.(e);
  };

  return (
    <span
      ref={(el) => {
        (ctx.triggerRef as any).current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as any).current = el;
      }}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cx('sora-hover-card__trigger', className)}
      {...props}
    />
  );
});
HoverCardTrigger.displayName = 'HoverCardTrigger';

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(({ className, ...props }, ref) => {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error('HoverCardContent must be inside HoverCard');

  const contentRef = useRef<HTMLDivElement | null>(null);

  const { style } = usePositioning(ctx.triggerRef, contentRef, {
    placement: 'bottom-start',
    offset: 8,
    enabled: ctx.open,
  });

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        ref={(el) => {
          contentRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        style={{ ...style, ...props.style }}
        className={cx('sora-hover-card__content', className)}
        {...props}
      />
    </Portal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';