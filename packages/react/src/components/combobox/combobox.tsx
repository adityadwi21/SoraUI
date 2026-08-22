import {
  useState,
  useRef,
  useId,
  useCallback,
  forwardRef,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';
import { usePositioning, Portal, useEscapeKey, useClickOutside } from '@soraui/hooks';
import type { ComboboxProps, ComboboxOption } from './combobox.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      placeholder = 'Search...',
      emptyText = 'No options found.',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const triggerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const listboxId = useId();

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { style } = usePositioning(triggerRef, listboxRef, {
      placement: 'bottom-start',
      offset: 4,
      enabled: open,
    });

    useEscapeKey(() => setOpen(false), open);
    useClickOutside([triggerRef, listboxRef], () => setOpen(false), open);

    const handleSelectOption = useCallback(
      (option: ComboboxOption) => {
        if (option.disabled) return;
        if (!isControlled) setUncontrolledValue(option.value);
        onValueChange?.(option.value);
        setSearchQuery('');
        setOpen(false);
        inputRef.current?.focus();
      },
      [isControlled, onValueChange]
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setHighlightedIndex(0);
      if (!open) setOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!open) setOpen(true);
        else setHighlightedIndex((prev) => (prev + 1) % (filteredOptions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!open) setOpen(true);
        else setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % (filteredOptions.length || 1));
      } else if (e.key === 'Enter') {
        if (open && filteredOptions[highlightedIndex]) {
          e.preventDefault();
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
      }
    };

    const activeDescendantId =
      open && filteredOptions[highlightedIndex]
        ? `${listboxId}-opt-${highlightedIndex}`
        : undefined;

    return (
      <div ref={ref} className={cx('sora-combobox', className)} {...props}>
        <div
          ref={triggerRef}
          onClick={() => { if (!disabled) { setOpen(true); inputRef.current?.focus(); } }}
          className={cx(
            'sora-combobox__trigger',
            open && 'sora-combobox__trigger--open',
            disabled && 'sora-combobox__trigger--disabled'
          )}
        >
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={activeDescendantId}
            disabled={disabled}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="sora-combobox__input"
          />
          <span className="sora-combobox__icon" aria-hidden="true">
            ▾
          </span>
        </div>

        {open && (
          <Portal>
            <div
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              style={style}
              className="sora-combobox__content"
            >
              {filteredOptions.length === 0 ? (
                <div className="sora-combobox__empty">{emptyText}</div>
              ) : (
                filteredOptions.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <div
                      key={opt.value}
                      id={`${listboxId}-opt-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled ? 'true' : undefined}
                      onClick={() => handleSelectOption(opt)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={cx(
                        'sora-combobox__item',
                        isSelected && 'sora-combobox__item--selected',
                        isHighlighted && 'sora-combobox__item--highlighted',
                        opt.disabled && 'sora-combobox__item--disabled'
                      )}
                    >
                      <span className="sora-combobox__item-text">{opt.label}</span>
                      {isSelected && (
                        <span className="sora-combobox__item-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </Portal>
        )}
      </div>
    );
  }
);
Combobox.displayName = 'Combobox';