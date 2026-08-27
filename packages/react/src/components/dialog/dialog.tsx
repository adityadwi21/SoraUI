import {
  createContext,
  useContext,
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { Portal, useEscapeKey, useFocusTrap } from "@soraui/hooks";
import { useScopedTheme } from "../../theme/theme-scope";
import type {
  DialogProps,
  DialogTriggerProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./dialog.types";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog sub-components must be used within a <Dialog>");
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DialogContext.Provider
      value={{ open, setOpen, titleId, descriptionId, triggerRef }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  ({ asChild, children, className, onClick, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDialogContext();

    const mergedRef = (node: HTMLElement | null) => {
      triggerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      setOpen(!open);
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    };

    const triggerProps = {
      ref: mergedRef,
      "aria-haspopup": "dialog" as const,
      "aria-expanded": open,
      onClick: handleClick,
      className: cx("sora-dialog__trigger", className),
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
  },
);
DialogTrigger.displayName = "DialogTrigger";

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cx("sora-dialog__overlay", className)}
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ closeOnOverlayClick = true, className, children, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDialogContext();
    const scopedTheme = useScopedTheme();
    const trapRef = useFocusTrap(open, { returnFocusOnDeactivate: true });

    useEscapeKey(() => setOpen(false), open);

    // Scroll lock on body
    useEffect(() => {
      if (!open || typeof document === "undefined") return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    const mergedRef = (node: HTMLDivElement | null) => {
      trapRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!open) return null;

    return (
      <Portal>
        <div
          className="sora-dialog__wrapper"
          data-theme={scopedTheme || undefined}
        >
          <DialogOverlay
            onClick={closeOnOverlayClick ? () => setOpen(false) : undefined}
          />
          <div
            ref={mergedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={cx("sora-dialog__content", className)}
            {...props}
          >
            {children}
          </div>
        </div>
      </Portal>
    );
  },
);
DialogContent.displayName = "DialogContent";

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("sora-dialog__header", className)} {...props}>
      {children}
    </div>
  ),
);
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { titleId } = useDialogContext();
    return (
      <h2
        ref={ref}
        id={titleId}
        className={cx("sora-dialog__title", className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => {
  const { descriptionId } = useDialogContext();
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cx("sora-dialog__description", className)}
      {...props}
    >
      {children}
    </p>
  );
});
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("sora-dialog__footer", className)} {...props}>
      {children}
    </div>
  ),
);
DialogFooter.displayName = "DialogFooter";

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, children, className, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext();

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
        className={cx("sora-dialog__close", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DialogClose.displayName = "DialogClose";
