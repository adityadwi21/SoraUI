import {
  createContext,
  useContext,
  useState,
  useRef,
  forwardRef,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Portal, useClickOutside, useEscapeKey } from "@soraui/hooks";
import type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
} from "./context-menu.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

interface ContextMenuCtxValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuCtx = createContext<ContextMenuCtxValue | null>(null);

export function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuCtx.Provider value={{ open, setOpen, position, setPosition }}>
      {children}
    </ContextMenuCtx.Provider>
  );
}

export const ContextMenuTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps
>(({ onContextMenu, className, ...props }, ref) => {
  const ctx = useContext(ContextMenuCtx);
  if (!ctx) throw new Error("ContextMenuTrigger must be inside ContextMenu");

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    ctx.setPosition({ x: e.clientX, y: e.clientY });
    ctx.setOpen(true);
    onContextMenu?.(e);
  };

  return (
    <div
      ref={ref}
      onContextMenu={handleContextMenu}
      className={cx("sora-context-menu__trigger", className)}
      {...props}
    />
  );
});
ContextMenuTrigger.displayName = "ContextMenuTrigger";

export const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(({ className, ...props }, ref) => {
  const ctx = useContext(ContextMenuCtx);
  if (!ctx) throw new Error("ContextMenuContent must be inside ContextMenu");

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([menuRef], () => ctx.setOpen(false), ctx.open);
  useEscapeKey(() => ctx.setOpen(false), ctx.open);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        ref={(el) => {
          menuRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as any).current = el;
        }}
        role="menu"
        style={{
          position: "fixed",
          left: `${ctx.position.x}px`,
          top: `${ctx.position.y}px`,
          zIndex: 50,
          ...props.style,
        }}
        className={cx("sora-context-menu__content", className)}
        {...props}
      />
    </Portal>
  );
});
ContextMenuContent.displayName = "ContextMenuContent";

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ disabled, className, onClick, onKeyDown, ...props }, ref) => {
    const ctx = useContext(ContextMenuCtx);

    const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      ctx?.setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.(e as any);
        ctx?.setOpen(false);
      }
      onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cx(
          "sora-context-menu__item",
          disabled && "sora-context-menu__item--disabled",
          className,
        )}
        {...props}
      />
    );
  },
);
ContextMenuItem.displayName = "ContextMenuItem";
