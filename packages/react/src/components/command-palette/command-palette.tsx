import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Portal, useEscapeKey } from "@soraui/hooks";
import type {
  CommandPaletteProps,
  CommandItemProps,
} from "./command-palette.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
  placeholder = "Type a command or search...",
  children,
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (!isControlled) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  useEscapeKey(() => setOpen(false), isOpen);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="sora-command-palette__backdrop"
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="sora-command-palette__dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sora-command-palette__header">
            <input
              type="text"
              autoFocus
              placeholder={placeholder}
              className="sora-command-palette__input"
            />
          </div>
          <div className="sora-command-palette__list">{children}</div>
        </div>
      </div>
    </Portal>
  );
}

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ onSelect, disabled = false, className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      onSelect?.();
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        className={cx(
          "sora-command-palette__item",
          disabled && "sora-command-palette__item--disabled",
          className,
        )}
        {...props}
      />
    );
  },
);
CommandItem.displayName = "CommandItem";
