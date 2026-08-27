import {
  createContext,
  useContext,
  useState,
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./collapsible.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

interface CollapsibleCtxValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleCtx = createContext<CollapsibleCtxValue | null>(null);

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const toggle = () => {
      if (disabled) return;
      const next = !open;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    };

    return (
      <CollapsibleCtx.Provider value={{ open, toggle, disabled }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cx(
            "sora-collapsible",
            disabled && "sora-collapsible--disabled",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </CollapsibleCtx.Provider>
    );
  },
);
Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, onClick, asChild = false, disabled, children, ...props }, ref) => {
  const ctx = useContext(CollapsibleCtx);
  const isDisabled = disabled || (ctx?.disabled ?? false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
    ctx?.toggle();
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement;
    return cloneElement(child, {
      ...props,
      ref,
      disabled: isDisabled || (child.props as any)?.disabled,
      "aria-expanded": ctx?.open,
      "data-state": ctx?.open ? "open" : "closed",
      "data-disabled": isDisabled ? "" : undefined,
      className: cx((child.props as any)?.className, className),
      onClick: (e: any) => {
        (child.props as any)?.onClick?.(e);
        handleClick(e);
      },
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      aria-expanded={ctx?.open}
      data-state={ctx?.open ? "open" : "closed"}
      data-disabled={isDisabled ? "" : undefined}
      onClick={handleClick}
      className={cx("sora-collapsible__trigger", className)}
      {...props}
    >
      {children}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, ...props }, ref) => {
  const ctx = useContext(CollapsibleCtx);
  if (!ctx?.open) return null;
  return (
    <div
      ref={ref}
      data-state="open"
      className={cx("sora-collapsible__content", className)}
      {...props}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";
