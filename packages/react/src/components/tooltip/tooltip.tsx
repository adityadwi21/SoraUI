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
} from "react";
import { usePositioning, Portal, useEscapeKey } from "@soraui/hooks";
import type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
} from "./tooltip.types";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentId: string;
  delay: number;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip sub-components must be used within a <Tooltip>");
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delay = 200,
  children,
}: TooltipProps) {
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
    <TooltipContext.Provider
      value={{ open, setOpen, triggerRef, contentId, delay }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId, delay } = useTooltipContext();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleOpen = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (delay === 0) {
        setOpen(true);
      } else {
        timeoutRef.current = setTimeout(() => {
          setOpen(true);
        }, delay);
      }
    };

    const handleClose = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(false);
    };

    const mergedRef = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    const triggerProps = {
      ref: mergedRef,
      "aria-describedby": open ? contentId : undefined,
      onPointerEnter: handleOpen,
      onPointerLeave: handleClose,
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose,
      onFocus: handleOpen,
      onBlur: handleClose,
      className: cx("sora-tooltip__trigger", className),
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
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ placement = "top", offset = 6, className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = useTooltipContext();
    const contentRef = useRef<HTMLDivElement | null>(null);

    const { style, actualPlacement } = usePositioning(triggerRef, contentRef, {
      placement,
      offset,
      enabled: open,
    });

    useEscapeKey(() => setOpen(false), open);

    const mergedRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={mergedRef}
          id={contentId}
          role="tooltip"
          style={style}
          className={cx(
            "sora-tooltip__content",
            "sora-tooltip__content--" + actualPlacement,
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
TooltipContent.displayName = "TooltipContent";
