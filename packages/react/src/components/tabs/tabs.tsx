import {
  createContext,
  useContext,
  useState,
  useId,
  useCallback,
  useRef,
  forwardRef,
  type KeyboardEvent,
} from 'react';
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsOrientation,
} from './tabs.types';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  orientation: TabsOrientation;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs sub-components must be used within a <Tabs>');
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export function Tabs({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const baseId = useId();

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue, orientation, baseId }}>
      <div
        className={cx('sora-tabs', 'sora-tabs--' + orientation, className)}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useTabsContext();
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const list = listRef.current;
      if (!list) return;

      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      if (tabs.length === 0) return;

      const activeIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
      let nextIndex = -1;

      if (orientation === 'horizontal') {
        if (e.key === 'ArrowRight') nextIndex = (activeIndex + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else {
        if (e.key === 'ArrowDown') nextIndex = (activeIndex + 1) % tabs.length;
        else if (e.key === 'ArrowUp') nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      }

      if (e.key === 'Home') nextIndex = 0;
      else if (e.key === 'End') nextIndex = tabs.length - 1;

      if (nextIndex >= 0 && nextIndex < tabs.length) {
        e.preventDefault();
        const nextTab = tabs[nextIndex];
        nextTab?.focus();
        nextTab?.click();
      }
    };

    const mergedRef = (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={mergedRef}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cx('sora-tabs__list', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value: tabValue, disabled, className, children, ...props }, ref) => {
    const { value, setValue, baseId } = useTabsContext();
    const isSelected = value === tabValue;

    const triggerId = `${baseId}-trigger-${tabValue}`;
    const panelId = `${baseId}-panel-${tabValue}`;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => setValue(tabValue)}
        className={cx(
          'sora-tabs__trigger',
          isSelected && 'sora-tabs__trigger--active',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value: tabValue, className, children, ...props }, ref) => {
    const { value, baseId } = useTabsContext();
    const isSelected = value === tabValue;

    const triggerId = `${baseId}-trigger-${tabValue}`;
    const panelId = `${baseId}-panel-${tabValue}`;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        tabIndex={0}
        className={cx('sora-tabs__content', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';