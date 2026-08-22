import {
  useState,
  useRef,
  useId,
  useEffect,
  createContext,
  useContext,
  forwardRef,
  cloneElement,
  isValidElement,
  type MouseEvent,
} from 'react';
import { Portal, useFocusTrap, useEscapeKey } from '@soraui/hooks';
import type {
  DrawerProps,
  DrawerTriggerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerCloseProps,
  DrawerSide,
} from './drawer.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

interface DrawerContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  side: DrawerSide;
  titleId: string;
  descId: string;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function Drawer({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
  children,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useId();
  const descId = useId();

  const setOpen = (val: boolean) => {
    if (!isControlled) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen, side, titleId, descId }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ asChild = false, className, onClick, children, ...props }, ref) => {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error('DrawerTrigger must be within Drawer');

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      ctx.setOpen(true);
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(children as any, {
        ref,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          (children.props as any)?.onClick?.(e);
          ctx.setOpen(true);
        },
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cx('sora-drawer__trigger', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DrawerTrigger.displayName = 'DrawerTrigger';

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(({ className, children, ...props }, ref) => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('DrawerContent must be within Drawer');

  const contentRef = useFocusTrap(ctx.open);
  useEscapeKey(() => ctx.setOpen(false), ctx.open);

  // Scroll lock on body
  useEffect(() => {
    if (!ctx.open || typeof document === 'undefined') return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [ctx.open]);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div className="sora-drawer__backdrop" onClick={() => ctx.setOpen(false)}>
        <div
          ref={(el) => {
            contentRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) (ref as any).current = el;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ctx.titleId}
          aria-describedby={ctx.descId}
          onClick={(e) => e.stopPropagation()}
          className={cx('sora-drawer__content', `sora-drawer__content--${ctx.side}`, className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx('sora-drawer__header', className)} {...props} />
));
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(({ className, ...props }, ref) => {
  const ctx = useContext(DrawerContext);
  return <h2 ref={ref} id={ctx?.titleId} className={cx('sora-drawer__title', className)} {...props} />;
});
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(({ className, ...props }, ref) => {
  const ctx = useContext(DrawerContext);
  return <p ref={ref} id={ctx?.descId} className={cx('sora-drawer__description', className)} {...props} />;
});
DrawerDescription.displayName = 'DrawerDescription';

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cx('sora-drawer__footer', className)} {...props} />
));
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(({ className, onClick, ...props }, ref) => {
  const ctx = useContext(DrawerContext);
  return (
    <button
      ref={ref}
      type="button"
      className={cx('sora-drawer__close', className)}
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      {...props}
    />
  );
});
DrawerClose.displayName = 'DrawerClose';