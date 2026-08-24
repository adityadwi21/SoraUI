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
  type KeyboardEvent,
} from "react";
import {
  usePositioning,
  Portal,
  useEscapeKey,
  useClickOutside,
} from "@soraui/hooks";
import type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownSeparatorProps,
  DropdownLabelProps,
} from "./dropdown.types";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown sub-components must be used within a <Dropdown>");
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export function Dropdown({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownProps) {
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
    [isControlled, onOpenChange],
  );

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentId }}>
      {children}
    </DropdownContext.Provider>
  );
}

export const DropdownTrigger = forwardRef<HTMLElement, DropdownTriggerProps>(
  ({ asChild, children, className, onClick, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = useDropdownContext();

    const mergedRef = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
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
      "aria-haspopup": "menu" as const,
      "aria-expanded": open,
      "aria-controls": open ? contentId : undefined,
      onClick: handleClick,
      className: cx("sora-dropdown__trigger", className),
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
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    { placement = "bottom-start", offset = 6, className, children, ...props },
    ref,
  ) => {
    const { open, setOpen, triggerRef, contentId } = useDropdownContext();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { style, actualPlacement } = usePositioning(triggerRef, contentRef, {
      placement,
      offset,
      enabled: open,
    });

    useEscapeKey(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, open);

    useClickOutside([triggerRef, contentRef], () => setOpen(false), open);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const container = contentRef.current;
      if (!container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]:not([disabled])',
        ),
      );
      if (items.length === 0) return;

      const activeIndex = items.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      let nextIndex = -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex =
          activeIndex === -1
            ? items.length - 1
            : (activeIndex - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      if (nextIndex >= 0 && nextIndex < items.length) {
        items[nextIndex]?.focus();
      }
    };

    const mergedRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!open) return null;

    const scopedTheme =
      triggerRef.current?.closest("[data-theme]")?.getAttribute("data-theme") ||
      undefined;
    const scopedMode =
      triggerRef.current?.closest("[data-mode]")?.getAttribute("data-mode") ||
      (typeof document !== "undefined"
        ? document.documentElement.getAttribute("data-docs-theme")
        : undefined) ||
      undefined;

    return (
      <Portal>
        <div
          ref={mergedRef}
          id={contentId}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          data-theme={scopedTheme}
          data-mode={scopedMode}
          data-docs-theme={scopedMode}
          style={style}
          className={cx(
            "sora-dropdown__content",
            "sora-dropdown__content--" + actualPlacement,
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);
DropdownContent.displayName = "DropdownContent";

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ disabled, destructive, className, children, onClick, ...props }, ref) => {
    const { setOpen, triggerRef } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      setOpen(false);
      triggerRef.current?.focus();
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        tabIndex={-1}
        onClick={handleClick}
        className={cx(
          "sora-dropdown__item",
          destructive && "sora-dropdown__item--destructive",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownItem.displayName = "DropdownItem";

export const DropdownSeparator = forwardRef<
  HTMLHRElement,
  DropdownSeparatorProps
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    role="separator"
    className={cx("sora-dropdown__separator", className)}
    {...props}
  />
));
DropdownSeparator.displayName = "DropdownSeparator";

export const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx("sora-dropdown__label", className)} {...props}>
      {children}
    </div>
  ),
);
DropdownLabel.displayName = "DropdownLabel";
