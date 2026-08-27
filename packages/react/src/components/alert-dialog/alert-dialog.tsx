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
} from "react";
import { Portal, useFocusTrap, useEscapeKey } from "@soraui/hooks";
import { useScopedTheme } from "../../theme/theme-scope";
import type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from "./alert-dialog.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

interface AlertContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  titleId: string;
  descId: string;
  cancelRef: React.RefObject<HTMLButtonElement>;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const setOpen = (val: boolean) => {
    if (!isControlled) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <AlertContext.Provider
      value={{ open, setOpen, titleId, descId, cancelRef: cancelRef as any }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ asChild = false, className, onClick, children, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("AlertDialogTrigger must be inside AlertDialog");

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
      className={cx("sora-alert-dialog__trigger", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, size = "default", children, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("AlertDialogContent must be inside AlertDialog");

  const scopedTheme = useScopedTheme();
  const contentRef = useFocusTrap(ctx.open, { initialFocusRef: ctx.cancelRef });
  useEscapeKey(() => ctx.setOpen(false), ctx.open);

  // Scroll lock on body
  useEffect(() => {
    if (!ctx.open || typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [ctx.open]);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        className="sora-alert-dialog__backdrop"
        data-theme={scopedTheme || undefined}
      >
        <div
          ref={(el) => {
            contentRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) (ref as any).current = el;
          }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={ctx.titleId}
          aria-describedby={ctx.descId}
          data-size={size}
          className={cx(
            "sora-alert-dialog__content",
            size === "sm" && "sora-alert-dialog__content--sm",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("sora-alert-dialog__header", className)}
    {...props}
  />
));
AlertDialogHeader.displayName = "AlertDialogHeader";

export const AlertDialogMedia = forwardRef<
  HTMLDivElement,
  AlertDialogMediaProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("sora-alert-dialog__media", className)}
    {...props}
  />
));
AlertDialogMedia.displayName = "AlertDialogMedia";

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  return (
    <h2
      ref={ref}
      id={ctx?.titleId}
      className={cx("sora-alert-dialog__title", className)}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  return (
    <p
      ref={ref}
      id={ctx?.descId}
      className={cx("sora-alert-dialog__description", className)}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("sora-alert-dialog__footer", className)}
    {...props}
  />
));
AlertDialogFooter.displayName = "AlertDialogFooter";

export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ className, onClick, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  return (
    <button
      ref={ref}
      type="button"
      className={cx("sora-alert-dialog__action", className)}
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      {...props}
    />
  );
});
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ className, onClick, ...props }, ref) => {
  const ctx = useContext(AlertContext);
  return (
    <button
      ref={(el) => {
        if (ctx) (ctx.cancelRef as any).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as any).current = el;
      }}
      type="button"
      className={cx("sora-alert-dialog__cancel", className)}
      onClick={(e) => {
        onClick?.(e);
        ctx?.setOpen(false);
      }}
      {...props}
    />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
