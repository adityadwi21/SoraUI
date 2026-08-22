import { forwardRef, useState, useRef, createContext, useContext } from 'react';
import { usePositioning, Portal, useClickOutside, useEscapeKey } from '@soraui/hooks';
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
} from './navigation-menu.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

interface NavItemContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const NavItemContext = createContext<NavItemContextValue | null>(null);

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(({ className, children, ...props }, ref) => (
  <nav ref={ref} className={cx('sora-nav-menu', className)} {...props}>
    {children}
  </nav>
));
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cx('sora-nav-menu__list', className)} {...props} />
));
NavigationMenuList.displayName = 'NavigationMenuList';

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(({ className, children, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <NavItemContext.Provider value={{ open, setOpen, triggerRef: triggerRef as any }}>
      <li ref={ref} className={cx('sora-nav-menu__item', className)} {...props}>
        {children}
      </li>
    </NavItemContext.Provider>
  );
});
NavigationMenuItem.displayName = 'NavigationMenuItem';

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(({ className, children, ...props }, ref) => {
  const ctx = useContext(NavItemContext);
  if (!ctx) throw new Error('NavigationMenuTrigger must be within NavigationMenuItem');

  return (
    <button
      ref={(el) => {
        (ctx.triggerRef as any).current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as any).current = el;
      }}
      type="button"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cx('sora-nav-menu__trigger', ctx.open && 'sora-nav-menu__trigger--open', className)}
      {...props}
    >
      <span>{children}</span>
      <span className="sora-nav-menu__icon" aria-hidden="true">▾</span>
    </button>
  );
});
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(({ className, ...props }, ref) => {
  const ctx = useContext(NavItemContext);
  if (!ctx) throw new Error('NavigationMenuContent must be within NavigationMenuItem');

  const contentRef = useRef<HTMLDivElement | null>(null);

  const { style } = usePositioning(ctx.triggerRef, contentRef, {
    placement: 'bottom-start',
    offset: 8,
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
        style={style}
        className={cx('sora-nav-menu__content', className)}
        {...props}
      />
    </Portal>
  );
});
NavigationMenuContent.displayName = 'NavigationMenuContent';