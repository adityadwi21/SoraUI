import {
  createContext,
  useContext,
  useState,
  useRef,
  forwardRef,
  type HTMLAttributes,
} from 'react';
import { usePositioning, Portal, useClickOutside, useEscapeKey } from '@soraui/hooks';
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
} from './menubar.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

interface MenuContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(({ className, ...props }, ref) => (
  <div ref={ref} role="menubar" className={cx('sora-menubar', className)} {...props} />
));
Menubar.displayName = 'Menubar';

export const MenubarMenu = ({ children }: MenubarMenuProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <MenuContext.Provider value={{ open, setOpen, triggerRef: triggerRef as any }}>
      <div className="sora-menubar__menu">{children}</div>
    </MenuContext.Provider>
  );
};
MenubarMenu.displayName = 'MenubarMenu';

export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(({ className, ...props }, ref) => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('MenubarTrigger must be inside MenubarMenu');

  return (
    <button
      ref={(el) => {
        (ctx.triggerRef as any).current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as any).current = el;
      }}
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cx('sora-menubar__trigger', ctx.open && 'sora-menubar__trigger--open', className)}
      {...props}
    />
  );
});
MenubarTrigger.displayName = 'MenubarTrigger';

export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(({ className, ...props }, ref) => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('MenubarContent must be inside MenubarMenu');

  const contentRef = useRef<HTMLDivElement | null>(null);

  const { style } = usePositioning(ctx.triggerRef, contentRef, {
    placement: 'bottom-start',
    offset: 4,
    enabled: ctx.open,
  });

  useClickOutside([ctx.triggerRef, contentRef], () => ctx.setOpen(false), ctx.open);
  useEscapeKey(() => ctx.setOpen(false), ctx.open);

  if (!ctx.open) return null;

  return (
    <Portal>
      <div
        ref={(el) => {
          contentRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        role="menu"
        style={style}
        className={cx('sora-menubar__content', className)}
        {...props}
      />
    </Portal>
  );
});
MenubarContent.displayName = 'MenubarContent';

export const MenubarItem = forwardRef<HTMLDivElement, MenubarItemProps>(({ disabled, className, onClick, ...props }, ref) => {
  const ctx = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    ctx?.setOpen(false);
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      className={cx('sora-menubar__item', disabled && 'sora-menubar__item--disabled', className)}
      {...props}
    />
  );
});
MenubarItem.displayName = 'MenubarItem';

export const MenubarSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} role="separator" className={cx('sora-menubar__separator', className)} {...props} />
));
MenubarSeparator.displayName = 'MenubarSeparator';