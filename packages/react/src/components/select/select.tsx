import {
  createContext,
  useContext,
  useState,
  useRef,
  useId,
  useCallback,
  forwardRef,
  type KeyboardEvent,
} from 'react';
import { usePositioning, Portal, useEscapeKey, useClickOutside } from '@soraui/hooks';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './select.types';

interface SelectContextValue {
  value: string;
  setValue: (value: string, label: string) => void;
  selectedLabel: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentId: string;
  placeholder?: string | undefined;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select sub-components must be used within a <Select>');
  }
  return context;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export function Select({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  name,
  placeholder,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [selectedLabel, setSelectedLabel] = useState('');
  const isControlledValue = controlledValue !== undefined;
  const value = isControlledValue ? controlledValue : uncontrolledValue;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlledOpen = controlledOpen !== undefined;
  const open = isControlledOpen ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentId = useId();

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlledOpen) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlledOpen, onOpenChange]
  );

  const setValue = useCallback(
    (nextValue: string, nextLabel: string) => {
      if (!isControlledValue) setUncontrolledValue(nextValue);
      setSelectedLabel(nextLabel);
      onValueChange?.(nextValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [isControlledValue, onValueChange, setOpen]
  );

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        selectedLabel,
        open,
        setOpen,
        disabled,
        triggerRef,
        contentId,
        placeholder,
      }}
    >
      {children}
      {name && <input type="hidden" name={name} value={value} />}
    </SelectContext.Provider>
  );
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { open, setOpen, disabled, triggerRef, contentId } = useSelectContext();

    const mergedRef = (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setOpen(!open);
      onClick?.(e);
    };

    return (
      <button
        ref={mergedRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cx(
          'sora-select__trigger',
          open && 'sora-select__trigger--open',
          disabled && 'sora-select__trigger--disabled',
          className
        )}
        {...props}
      >
        <span className="sora-select__trigger-content">{children}</span>
        <span className="sora-select__icon" aria-hidden="true">
          ▼
        </span>
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder: propPlaceholder, className, ...props }, ref) => {
    const { value, selectedLabel, placeholder: contextPlaceholder } = useSelectContext();
    const effectivePlaceholder = propPlaceholder ?? contextPlaceholder ?? 'Select an option...';
    const display = selectedLabel || value || effectivePlaceholder;
    const isPlaceholder = !selectedLabel && !value;

    return (
      <span
        ref={ref}
        className={cx(
          'sora-select__value',
          isPlaceholder && 'sora-select__value--placeholder',
          className
        )}
        {...props}
      >
        {display}
      </span>
    );
  }
);
SelectValue.displayName = 'SelectValue';

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ placement = 'bottom-start', offset = 4, className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef, contentId } = useSelectContext();
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
        container.querySelectorAll<HTMLDivElement>('[role="option"]:not([aria-disabled="true"])')
      );
      if (items.length === 0) return;

      const activeIndex = items.indexOf(document.activeElement as HTMLDivElement);
      let nextIndex = -1;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = activeIndex === -1 ? items.length - 1 : (activeIndex - 1 + items.length) % items.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      if (nextIndex >= 0 && nextIndex < items.length) {
        items[nextIndex]?.focus();
      }
    };

    const mergedRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!open) return null;

    const scopedTheme = triggerRef.current?.closest('[data-theme]')?.getAttribute('data-theme') || undefined;
    const scopedMode =
      triggerRef.current?.closest('[data-mode]')?.getAttribute('data-mode') ||
      (typeof document !== 'undefined' ? document.documentElement.getAttribute('data-docs-theme') : undefined) ||
      undefined;

    return (
      <Portal>
        <div
          ref={mergedRef}
          id={contentId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          data-theme={scopedTheme}
          data-mode={scopedMode}
          data-docs-theme={scopedMode}
          style={{ ...style, ...props.style }}
          className={cx(
            'sora-select__content',
            'sora-select__content--' + actualPlacement,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  }
);
SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value: itemValue, disabled, className, children, ...props }, ref) => {
    const { value, setValue } = useSelectContext();
    const isSelected = value === itemValue;

    const labelText = typeof children === 'string' ? children : itemValue;

    const handleSelect = () => {
      if (disabled) return;
      setValue(itemValue, labelText);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? undefined : -1}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        className={cx(
          'sora-select__item',
          isSelected && 'sora-select__item--selected',
          disabled && 'sora-select__item--disabled',
          className
        )}
        {...props}
      >
        <span className="sora-select__item-text">{children}</span>
        {isSelected && (
          <span className="sora-select__item-indicator" aria-hidden="true">
            ✓
          </span>
        )}
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem';

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="group" className={cx('sora-select__group', className)} {...props}>
      {children}
    </div>
  )
);
SelectGroup.displayName = 'SelectGroup';

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx('sora-select__label', className)} {...props}>
      {children}
    </div>
  )
);
SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = forwardRef<HTMLHRElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} role="separator" className={cx('sora-select__separator', className)} {...props} />
  )
);
SelectSeparator.displayName = 'SelectSeparator';