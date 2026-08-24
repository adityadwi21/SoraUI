import { createContext, useContext, useState, forwardRef } from "react";
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
}

const CollapsibleCtx = createContext<CollapsibleCtxValue | null>(null);

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
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
      const next = !open;
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    };

    return (
      <CollapsibleCtx.Provider value={{ open, toggle }}>
        <div ref={ref} className={cx("sora-collapsible", className)} {...props}>
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
>(({ className, onClick, ...props }, ref) => {
  const ctx = useContext(CollapsibleCtx);
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={ctx?.open}
      onClick={(e) => {
        onClick?.(e);
        ctx?.toggle();
      }}
      className={cx("sora-collapsible__trigger", className)}
      {...props}
    />
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
      className={cx("sora-collapsible__content", className)}
      {...props}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";
