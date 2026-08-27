import {
  createContext,
  useContext,
  useState,
  useId,
  useCallback,
  forwardRef,
} from "react";
import { ChevronDown } from "lucide-react";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./accordion.types";

interface AccordionContextValue {
  isItemOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion sub-components must be used within an <Accordion>",
    );
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  triggerId: string;
  contentId: string;
  disabled?: boolean | undefined;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within an <AccordionItem>",
    );
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export function Accordion(props: AccordionProps) {
  const { className, children, ...restProps } = props;

  // Single mode state
  const isSingle = props.type === "single";
  const [uncontrolledSingle, setUncontrolledSingle] = useState(
    isSingle ? (props.defaultValue ?? "") : "",
  );
  const singleValue = isSingle ? (props.value ?? uncontrolledSingle) : "";

  // Multiple mode state
  const [uncontrolledMultiple, setUncontrolledMultiple] = useState<string[]>(
    !isSingle ? (props.defaultValue ?? []) : [],
  );
  const multipleValue = !isSingle ? (props.value ?? uncontrolledMultiple) : [];

  const isItemOpen = useCallback(
    (itemValue: string) => {
      if (isSingle) return singleValue === itemValue;
      return multipleValue.includes(itemValue);
    },
    [isSingle, singleValue, multipleValue],
  );

  const toggleItem = useCallback(
    (itemValue: string) => {
      if (isSingle) {
        const nextValue =
          singleValue === itemValue
            ? props.collapsible
              ? ""
              : singleValue
            : itemValue;
        if (props.value === undefined) setUncontrolledSingle(nextValue);
        props.onValueChange?.(nextValue);
      } else {
        const nextValue = multipleValue.includes(itemValue)
          ? multipleValue.filter((v) => v !== itemValue)
          : [...multipleValue, itemValue];
        if (props.value === undefined) setUncontrolledMultiple(nextValue);
        props.onValueChange?.(nextValue);
      }
    },
    [isSingle, singleValue, multipleValue, props],
  );

  // Clean DOM attributes
  const domProps = { ...restProps };
  delete (domProps as Record<string, unknown>).collapsible;
  delete (domProps as Record<string, unknown>).onValueChange;
  delete (domProps as Record<string, unknown>).defaultValue;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("sora-accordion__trigger")) return;

    const triggers = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(".sora-accordion__trigger")
    ).filter((t) => !t.disabled);

    const index = triggers.indexOf(target as HTMLButtonElement);
    if (index === -1) return;

    let nextIndex = index;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (index + 1) % triggers.length;
        e.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (index - 1 + triggers.length) % triggers.length;
        e.preventDefault();
        break;
      case "Home":
        nextIndex = 0;
        e.preventDefault();
        break;
      case "End":
        nextIndex = triggers.length - 1;
        e.preventDefault();
        break;
    }

    if (nextIndex !== index) {
      triggers[nextIndex]?.focus();
    }
  }, []);

  return (
    <AccordionContext.Provider value={{ isItemOpen, toggleItem }}>
      <div 
        className={cx("sora-accordion", className)} 
        onKeyDown={handleKeyDown}
        {...domProps}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled, className, children, ...props }, ref) => {
    const { isItemOpen } = useAccordionContext();
    const baseId = useId();
    const triggerId = `${baseId}-trigger-${value}`;
    const contentId = `${baseId}-content-${value}`;
    const isOpen = isItemOpen(value);

    return (
      <AccordionItemContext.Provider
        value={{ value, triggerId, contentId, disabled }}
      >
        <div
          ref={ref}
          className={cx(
            "sora-accordion__item",
            className,
          )}
          data-disabled={disabled ? "" : undefined}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { isItemOpen, toggleItem } = useAccordionContext();
  const { value, triggerId, contentId, disabled } = useAccordionItemContext();
  const isOpen = isItemOpen(value);

  return (
    <h3 className="sora-accordion__heading">
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => toggleItem(value)}
        className={cx(
          "sora-accordion__trigger",
          className,
        )}
        {...props}
      >
        <span className="sora-accordion__trigger-text">{children}</span>
        <ChevronDown
          size={16}
          className="sora-accordion__chevron"
          aria-hidden="true"
        />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { isItemOpen } = useAccordionContext();
  const { value, triggerId, contentId } = useAccordionItemContext();
  const isOpen = isItemOpen(value);

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      data-state={isOpen ? "open" : "closed"}
      {...(!isOpen ? { inert: "" } : {})}
      className={cx("sora-accordion__content", className)}
      {...props}
    >
      <div className="sora-accordion__content-inner">
        <div className="sora-accordion__body">{children}</div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";
