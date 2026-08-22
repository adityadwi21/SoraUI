import {
  createContext,
  useContext,
  useState,
  useRef,
  useId,
  useCallback,
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react';
import { usePositioning, Portal, useEscapeKey, useClickOutside, useFocusTrap } from '@soraui/hooks';
import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from './popover.types';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover sub-components must be used within a <Popover>');
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentId }}>
      {children}
    </PopoverContext.Provider>
  );
}

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  ({ asChild, children, className, onClick, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = usePopoverContext();

    const mergedRef = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      setOpen(!open);
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const triggerProps = {
      ref: mergedRef,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': open,
      'aria-controls': open ? contentId : undefined,
      onClick: handleClick,
      className: cx('sora-popover__trigger', className),
      ...props,
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, triggerProps);
    }

    return (
      <button type="button" {...triggerProps}>
        {children}
      </button>
    );
  }
);
PopoverTrigger.displayName = 'PopoverTrigger';

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ placement = 'bottom', offset = 8, trapFocus = false, className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = usePopoverContext();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { style, actualPlacement } = usePositioning(triggerRef, contentRef, {
      placement,
      offset,
      enabled: open,
    });

    useEscapeKey(() => setOpen(false), open);
    useClickOutside([triggerRef, contentRef], () => setOpen(false), open);
    useFocusTrap(open && trapFocus);

    const mergedRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={mergedRef}
          id={contentId}
          role="dialog"
          aria-modal={trapFocus ? 'true' : 'false'}
          style={style}
          className={cx(
            'sora-popover__content',
            'sora-popover__content--' + actualPlacement,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);
PopoverContent.displayName = 'PopoverContent';

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ asChild, children, className, onClick, ...props }, ref) => {
    const { setOpen } = usePopoverContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        ref,
        onClick: handleClick,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cx('sora-popover__close', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
PopoverClose.displayName = 'PopoverClose';