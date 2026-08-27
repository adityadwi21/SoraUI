"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { Portal, useClickOutside, usePositioning } from "@soraui/hooks";
import type {
  ComboboxChipDeleteProps,
  ComboboxChipProps,
  ComboboxChipsInputProps,
  ComboboxChipsProps,
  ComboboxContentProps,
  ComboboxContextValue,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxListProps,
  ComboboxProps,
  ComboboxSeparatorProps,
  ComboboxTriggerProps,
  RegisteredComboboxItem,
} from "./combobox.types";

/* =========================================================================
   Context
   ========================================================================= */

const ComboboxContext = createContext<ComboboxContextValue<any> | null>(null);

export function useComboboxContext<T = any>() {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error(
      "Combobox compound components must be used within a <Combobox> provider"
    );
  }
  return context as ComboboxContextValue<T>;
}

interface ComboboxChipContextValue<T = any> {
  value: T;
  disabled?: boolean | undefined;
  onRemove?: (() => void) | undefined;
}

const ComboboxChipContext = createContext<ComboboxChipContextValue<any> | null>(
  null
);

export function useComboboxChipContext<T = any>() {
  return useContext(ComboboxChipContext) as ComboboxChipContextValue<T> | null;
}

interface ComboboxGroupContextValue {
  labelId: string;
}

const ComboboxGroupContext = createContext<ComboboxGroupContextValue | null>(
  null
);

/* =========================================================================
   1. Combobox (Root Provider & Syntactic Sugar)
   ========================================================================= */

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps<any>>(
  function Combobox(props, forwardedRef) {
    const {
      items,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      itemToStringValue: customItemToString,
      filterItem: customFilterItem,
      autoHighlight = false,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placeholder = "Search...",
      emptyText = "No options found.",
      clearable = false,
      showClear = false,
      loading = false,
      disabled = false,
      dir,
      className,
      style,
      children,
      ...rest
    } = props;

    const multiple = Boolean((props as any).multiple);

    // Uncontrolled vs Controlled Value State
    const [uncontrolledValue, setUncontrolledValue] = useState<any>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return multiple ? [] : undefined;
    });

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // Multi-select normalized array helper
    const selectedValues: any[] = useMemo(() => {
      if (multiple) {
        if (Array.isArray(value)) return value;
        if (value !== undefined && value !== null) return [value];
        return [];
      }
      return [];
    }, [multiple, value]);

    // Single-select value helper
    const selectedValue = multiple ? undefined : value;

    // Uncontrolled vs Controlled Open State
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpenControlled = controlledOpen !== undefined;
    const open = isOpenControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
      (nextOpen: boolean | ((prev: boolean) => boolean)) => {
        const resolved =
          typeof nextOpen === "function" ? nextOpen(open) : nextOpen;
        if (!isOpenControlled) {
          setUncontrolledOpen(resolved);
        }
        onOpenChange?.(resolved);
      },
      [isOpenControlled, open, onOpenChange]
    );

    // Search query & focus states
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [focusedChipIndex, setFocusedChipIndex] = useState<number>(-1);
    const [registeredItems, setRegisteredItems] = useState<
      RegisteredComboboxItem<any>[]
    >([]);

    const listboxId = useId();
    const triggerRef = useRef<HTMLDivElement | HTMLButtonElement | HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Default itemToStringValue
    const itemToStringValue = useCallback(
      (item: any): string => {
        if (customItemToString) return customItemToString(item);
        if (item === null || item === undefined) return "";
        if (typeof item === "string") return item;
        if (typeof item === "object") {
          if ("label" in item && typeof item.label === "string") return item.label;
          if ("name" in item && typeof item.name === "string") return item.name;
          if ("value" in item && typeof item.value === "string") return item.value;
        }
        return String(item);
      },
      [customItemToString]
    );

    // Default filterItem
    const filterItem = useCallback(
      (item: any, query: string): boolean => {
        if (customFilterItem) return customFilterItem(item, query);
        if (!query.trim()) return true;
        const itemStr = itemToStringValue(item).toLowerCase();
        const q = query.toLowerCase();
        return itemStr.includes(q);
      },
      [customFilterItem, itemToStringValue]
    );

    // Filtered items computation
    const filteredItems = useMemo(() => {
      if (!items) return [];
      if (!searchQuery.trim()) return items;
      return items.filter((item) => filterItem(item, searchQuery));
    }, [items, searchQuery, filterItem]);

    // Item selection check (handles objects and primitives)
    const isItemSelected = useCallback(
      (itemVal: any): boolean => {
        if (multiple) {
          return selectedValues.some((v) => {
            if (v === itemVal) return true;
            if (
              typeof v === "object" &&
              typeof itemVal === "object" &&
              v !== null &&
              itemVal !== null
            ) {
              if ("id" in v && "id" in itemVal) return (v as any).id === (itemVal as any).id;
              if ("value" in v && "value" in itemVal) return (v as any).value === (itemVal as any).value;
            }
            return false;
          });
        }
        if (selectedValue === itemVal) return true;
        if (
          typeof selectedValue === "object" &&
          typeof itemVal === "object" &&
          selectedValue !== null &&
          itemVal !== null
        ) {
          if ("id" in selectedValue && "id" in itemVal) return (selectedValue as any).id === (itemVal as any).id;
          if ("value" in selectedValue && "value" in itemVal) return (selectedValue as any).value === (itemVal as any).value;
        }
        return false;
      },
      [multiple, selectedValues, selectedValue]
    );

    // Dynamic item registration
    const registerItem = useCallback((item: RegisteredComboboxItem<any>) => {
      setRegisteredItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        return [...prev, item];
      });
    }, []);

    const unregisterItem = useCallback((id: string) => {
      setRegisteredItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    // Toggle multi-select item
    const toggleItem = useCallback(
      (itemVal: any) => {
        if (!multiple) {
          selectItem(itemVal);
          return;
        }
        const exists = isItemSelected(itemVal);
        let newValues: any[];
        if (exists) {
          newValues = selectedValues.filter((v) => {
            if (v === itemVal) return false;
            if (
              typeof v === "object" &&
              typeof itemVal === "object" &&
              v !== null &&
              itemVal !== null
            ) {
              if ("id" in v && "id" in itemVal) return (v as any).id !== (itemVal as any).id;
              if ("value" in v && "value" in itemVal) return (v as any).value !== (itemVal as any).value;
            }
            return true;
          });
        } else {
          newValues = [...selectedValues, itemVal];
        }

        if (!isControlled) {
          setUncontrolledValue(newValues);
        }
        (onValueChange as any)?.(newValues);
        setSearchQuery("");
        inputRef.current?.focus();
      },
      [multiple, isItemSelected, selectedValues, isControlled, onValueChange]
    );

    // Remove single chip
    const removeChip = useCallback(
      (itemVal: any) => {
        if (!multiple) return;
        const newValues = selectedValues.filter((v) => {
          if (v === itemVal) return false;
          if (
            typeof v === "object" &&
            typeof itemVal === "object" &&
            v !== null &&
            itemVal !== null
          ) {
            if ("id" in v && "id" in itemVal) return (v as any).id !== (itemVal as any).id;
            if ("value" in v && "value" in itemVal) return (v as any).value !== (itemVal as any).value;
          }
          return true;
        });

        if (!isControlled) {
          setUncontrolledValue(newValues);
        }
        (onValueChange as any)?.(newValues);
      },
      [multiple, selectedValues, isControlled, onValueChange]
    );

    // Selection handler
    const selectItem = useCallback(
      (itemVal: any) => {
        if (multiple) {
          toggleItem(itemVal);
          return;
        }

        if (!isControlled) {
          setUncontrolledValue(itemVal);
        }
        (onValueChange as any)?.(itemVal);
        setSearchQuery("");
        setOpen(false);
        inputRef.current?.focus();
      },
      [multiple, toggleItem, isControlled, onValueChange, setOpen]
    );

    // Clear handler
    const clearSelection = useCallback(() => {
      if (multiple) {
        if (!isControlled) {
          setUncontrolledValue([]);
        }
        (onValueChange as any)?.([]);
      } else {
        if (!isControlled) {
          setUncontrolledValue(undefined);
        }
        (onValueChange as any)?.(undefined);
      }
      setSearchQuery("");
      inputRef.current?.focus();
    }, [multiple, isControlled, onValueChange]);

    // Handle autoHighlight on query change
    useEffect(() => {
      if (autoHighlight && searchQuery.trim() !== "") {
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(-1);
      }
    }, [searchQuery, autoHighlight]);

    const contextValue: ComboboxContextValue<any> = useMemo(
      () => ({
        multiple,
        open,
        setOpen,
        searchQuery,
        setSearchQuery,
        selectedValue,
        selectedValues,
        isItemSelected,
        setSelectedValue: (val) => {
          if (!isControlled) setUncontrolledValue(val);
          (onValueChange as any)?.(val);
        },
        highlightedIndex,
        setHighlightedIndex,
        autoHighlight,
        disabled,
        dir,
        listboxId,
        items,
        itemToStringValue,
        filterItem,
        filteredItems,
        registeredItems,
        registerItem,
        unregisterItem,
        selectItem,
        toggleItem,
        removeChip,
        focusedChipIndex,
        setFocusedChipIndex,
        triggerRef,
        listboxRef,
        inputRef,
        clearSelection,
        loading,
      }),
      [
        multiple,
        open,
        setOpen,
        searchQuery,
        selectedValue,
        selectedValues,
        isItemSelected,
        isControlled,
        onValueChange,
        highlightedIndex,
        autoHighlight,
        disabled,
        dir,
        listboxId,
        items,
        itemToStringValue,
        filterItem,
        filteredItems,
        registeredItems,
        registerItem,
        unregisterItem,
        selectItem,
        toggleItem,
        removeChip,
        focusedChipIndex,
        loading,
        clearSelection,
      ]
    );

    // Monolithic Syntactic Sugar Handling
    const isMonolithic = options !== undefined && !children;

    if (isMonolithic) {
      const isClearable = clearable || showClear;

      if (multiple) {
        return (
          <ComboboxContext.Provider value={contextValue}>
            <div
              ref={forwardedRef}
              dir={dir}
              className={`sora-combobox ${className || ""}`.trim()}
              style={style}
              {...rest}
            >
              <ComboboxChips>
                {selectedValues.map((val) => {
                  const opt = options.find((o) => o.value === val);
                  const label = opt ? opt.label : itemToStringValue(val);
                  return (
                    <ComboboxChip key={String(val)} value={val}>
                      <span>{label}</span>
                      <ComboboxChipDelete />
                    </ComboboxChip>
                  );
                })}
                <ComboboxChipsInput
                  placeholder={selectedValues.length === 0 ? placeholder : ""}
                  loading={loading}
                />
              </ComboboxChips>

              <ComboboxContent>
                <ComboboxEmpty>{emptyText}</ComboboxEmpty>
                <ComboboxList>
                  {options.map((opt) => (
                    <ComboboxItem
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.icon && (
                        <span
                          className="sora-combobox__item-icon"
                          aria-hidden="true"
                        >
                          {opt.icon}
                        </span>
                      )}
                      <div className="sora-combobox__item-text">
                        <span className="sora-combobox__item-label">
                          {opt.label}
                        </span>
                        {opt.description && (
                          <span className="sora-combobox__item-desc">
                            {opt.description}
                          </span>
                        )}
                      </div>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </div>
          </ComboboxContext.Provider>
        );
      }

      return (
        <ComboboxContext.Provider value={contextValue}>
          <div
            ref={forwardedRef}
            dir={dir}
            className={`sora-combobox ${className || ""}`.trim()}
            style={style}
            {...rest}
          >
            <ComboboxInput
              placeholder={placeholder}
              showClear={isClearable}
              loading={loading}
            />
            <ComboboxContent>
              <ComboboxEmpty>{emptyText}</ComboboxEmpty>
              <ComboboxList>
                {options.map((opt) => (
                  <ComboboxItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.icon && (
                      <span
                        className="sora-combobox__item-icon"
                        aria-hidden="true"
                      >
                        {opt.icon}
                      </span>
                    )}
                    <div className="sora-combobox__item-text">
                      <span className="sora-combobox__item-label">
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="sora-combobox__item-desc">
                          {opt.description}
                        </span>
                      )}
                    </div>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </div>
        </ComboboxContext.Provider>
      );
    }

    return (
      <ComboboxContext.Provider value={contextValue}>
        <div
          ref={forwardedRef}
          dir={dir}
          className={`sora-combobox ${className || ""}`.trim()}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </ComboboxContext.Provider>
    );
  }
);

/* =========================================================================
   2. ComboboxInput
   ========================================================================= */

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
  function ComboboxInput(props, forwardedRef) {
    const {
      placeholder = "Search...",
      showClear = false,
      clearable = false,
      icon,
      loading: customLoading,
      className,
      style,
      disabled: inputDisabled,
      onKeyDown,
      onClick,
      onChange,
      onFocus,
      ...rest
    } = props;

    const {
      multiple,
      open,
      setOpen,
      searchQuery,
      setSearchQuery,
      selectedValue,
      selectedValues,
      highlightedIndex,
      setHighlightedIndex,
      disabled: contextDisabled,
      dir,
      listboxId,
      triggerRef,
      inputRef,
      clearSelection,
      loading: contextLoading,
      filteredItems,
      registeredItems,
      selectItem,
      removeChip,
      itemToStringValue,
    } = useComboboxContext();

    const isClearable = showClear || clearable;
    const isLoading = customLoading !== undefined ? customLoading : contextLoading;
    const isDisabled = inputDisabled || contextDisabled;

    const activeItems = useMemo(() => {
      if (registeredItems.length > 0) return registeredItems;
      return filteredItems.map((item, idx) => ({
        id: `${listboxId}-item-${idx}`,
        value: item,
        label: itemToStringValue(item),
        disabled: (item as any)?.disabled,
      }));
    }, [registeredItems, filteredItems, listboxId, itemToStringValue]);

    const activeItem =
      open && highlightedIndex >= 0 ? activeItems[highlightedIndex] : undefined;
    const activeDescendantId = activeItem?.id;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (isDisabled) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightedIndex(0);
          return;
        }
        if (activeItems.length === 0) return;
        setHighlightedIndex((prev) => (prev + 1) % activeItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightedIndex(activeItems.length - 1);
          return;
        }
        if (activeItems.length === 0) return;
        setHighlightedIndex((prev) =>
          prev <= 0 ? activeItems.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        if (open && highlightedIndex >= 0) {
          const target = activeItems[highlightedIndex];
          if (target && !target.disabled) {
            e.preventDefault();
            selectItem(target.value);
          }
        }
      } else if (e.key === "Escape") {
        if (open) {
          e.preventDefault();
          setOpen(false);
          setSearchQuery("");
        }
      } else if (e.key === "Backspace" && searchQuery === "") {
        // Explicit Zero-Conflict Backspace Handling
        if (multiple && selectedValues.length > 0) {
          e.preventDefault();
          removeChip(selectedValues[selectedValues.length - 1]!);
        } else if (!multiple && isClearable && selectedValue !== undefined) {
          e.preventDefault();
          clearSelection();
        }
      }
    };

    const displayPlaceholder = useMemo(() => {
      if (multiple) return placeholder;
      if (selectedValue !== undefined && selectedValue !== null) {
        return itemToStringValue(selectedValue);
      }
      return placeholder;
    }, [multiple, selectedValue, itemToStringValue, placeholder]);

    const hasSelection = multiple
      ? selectedValues.length > 0
      : selectedValue !== undefined && selectedValue !== null;

    const isInvalid = rest["aria-invalid"] === true || rest["aria-invalid"] === "true";

    return (
      <div
        ref={triggerRef as any}
        onClick={(e) => {
          if (!isDisabled) {
            setOpen((prev) => !prev);
            inputRef.current?.focus();
          }
          onClick?.(e as any);
        }}
        className={`sora-combobox__trigger ${
          open ? "sora-combobox__trigger--open" : ""
        } ${isDisabled ? "sora-combobox__trigger--disabled" : ""} ${
          isInvalid ? "sora-combobox--invalid" : ""
        } ${className || ""}`.trim()}
        style={style}
      >
        {icon && <span className="sora-combobox__addon-icon">{icon}</span>}
        <input
          ref={(el) => {
            (inputRef as any).current = el;
            if (typeof forwardedRef === "function") forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          aria-autocomplete="list"
          aria-busy={isLoading ? "true" : undefined}
          disabled={isDisabled}
          dir={dir}
          placeholder={displayPlaceholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!open) setOpen(true);
            onChange?.(e);
          }}
          onFocus={(e) => {
            onFocus?.(e);
          }}
          onKeyDown={handleKeyDown}
          className="sora-combobox__input"
          {...rest}
        />

        <div className="sora-combobox__actions">
          {isClearable && hasSelection && !isDisabled && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear selection"
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="sora-combobox__clear"
            >
              <X size={13} aria-hidden="true" />
            </button>
          )}

          {isLoading ? (
            <Loader2
              size={14}
              className="sora-combobox__spinner"
              aria-hidden="true"
            />
          ) : (
            <ChevronsUpDown
              size={14}
              className="sora-combobox__icon"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);

/* =========================================================================
   3. ComboboxChips (Multi-Select Wrapping Container)
   ========================================================================= */

export const ComboboxChips = forwardRef<HTMLDivElement, ComboboxChipsProps>(
  function ComboboxChips(props, forwardedRef) {
    const { children, className, style, onClick, ...rest } = props;
    const { disabled, triggerRef, inputRef, setOpen } = useComboboxContext();

    return (
      <div
        ref={(el) => {
          (triggerRef as any).current = el;
          if (typeof forwardedRef === "function") forwardedRef(el);
          else if (forwardedRef) forwardedRef.current = el;
        }}
        onClick={(e) => {
          if (!disabled) {
            setOpen(true);
            inputRef.current?.focus();
          }
          onClick?.(e);
        }}
        className={`sora-combobox__chips ${
          disabled ? "sora-combobox__trigger--disabled" : ""
        } ${className || ""}`.trim()}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   4. ComboboxChip (Individual Selectable / Removable Pill)
   ========================================================================= */

export const ComboboxChip = forwardRef<HTMLDivElement, ComboboxChipProps<any>>(
  function ComboboxChip(props, forwardedRef) {
    const {
      value,
      disabled: chipDisabled,
      onRemove,
      children,
      className,
      style,
      onKeyDown,
      onClick,
      ...rest
    } = props;

    const {
      disabled: contextDisabled,
      selectedValues,
      removeChip,
      focusedChipIndex,
      setFocusedChipIndex,
      inputRef,
    } = useComboboxContext();

    const isDisabled = chipDisabled || contextDisabled;
    const chipIndex = selectedValues.indexOf(value);
    const isFocused = focusedChipIndex === chipIndex;
    const chipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (isFocused && chipRef.current) {
        chipRef.current.focus();
      }
    }, [isFocused]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (isDisabled) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedChipIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (chipIndex >= selectedValues.length - 1) {
          setFocusedChipIndex(-1);
          inputRef.current?.focus();
        } else {
          setFocusedChipIndex((prev) => prev + 1);
        }
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        if (onRemove) {
          onRemove();
        } else {
          removeChip(value);
        }

        if (chipIndex > 0) {
          setFocusedChipIndex(chipIndex - 1);
        } else if (selectedValues.length > 1) {
          setFocusedChipIndex(0);
        } else {
          setFocusedChipIndex(-1);
          inputRef.current?.focus();
        }
      }
    };

    const chipContextValue = useMemo(
      () => ({ value, disabled: isDisabled, onRemove }),
      [value, isDisabled, onRemove]
    );

    return (
      <ComboboxChipContext.Provider value={chipContextValue}>
        <div
          ref={(el) => {
            chipRef.current = el;
            if (typeof forwardedRef === "function") forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
          tabIndex={isDisabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            e.stopPropagation();
            setFocusedChipIndex(chipIndex);
            onClick?.(e);
          }}
          className={`sora-combobox__chip ${
            isFocused ? "sora-combobox__chip--focused" : ""
          } ${className || ""}`.trim()}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </ComboboxChipContext.Provider>
    );
  }
);

/* =========================================================================
   5. ComboboxChipDelete
   ========================================================================= */

export const ComboboxChipDelete = forwardRef<
  HTMLButtonElement,
  ComboboxChipDeleteProps
>(function ComboboxChipDelete(props, forwardedRef) {
  const { children, className, onClick, ...rest } = props;
  const chipContext = useComboboxChipContext();
  const { removeChip, disabled: contextDisabled } = useComboboxContext();

  const isDisabled = chipContext?.disabled || contextDisabled;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isDisabled) return;
    if (chipContext?.onRemove) {
      chipContext.onRemove();
    } else if (chipContext) {
      removeChip(chipContext.value);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={forwardedRef}
      type="button"
      tabIndex={-1}
      aria-label="Remove chip"
      disabled={isDisabled}
      onClick={handleClick}
      className={`sora-combobox__chip-delete ${className || ""}`.trim()}
      {...rest}
    >
      {children || <X size={12} aria-hidden="true" />}
    </button>
  );
});

/* =========================================================================
   6. ComboboxChipsInput
   ========================================================================= */

export const ComboboxChipsInput = forwardRef<
  HTMLInputElement,
  ComboboxChipsInputProps
>(function ComboboxChipsInput(props, forwardedRef) {
  const {
    placeholder = "Search...",
    onKeyDown,
    onChange,
    className,
    style,
    ...rest
  } = props;

  const {
    multiple,
    open,
    setOpen,
    searchQuery,
    setSearchQuery,
    selectedValues,
    highlightedIndex,
    setHighlightedIndex,
    setFocusedChipIndex,
    disabled,
    dir,
    listboxId,
    inputRef,
    filteredItems,
    registeredItems,
    selectItem,
    removeChip,
    itemToStringValue,
  } = useComboboxContext();

  const activeItems = useMemo(() => {
    if (registeredItems.length > 0) return registeredItems;
    return filteredItems.map((item, idx) => ({
      id: `${listboxId}-item-${idx}`,
      value: item,
      label: itemToStringValue(item),
      disabled: (item as any)?.disabled,
    }));
  }, [registeredItems, filteredItems, listboxId, itemToStringValue]);

  const activeItem =
    open && highlightedIndex >= 0 ? activeItems[highlightedIndex] : undefined;
  const activeDescendantId = activeItem?.id;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
        return;
      }
      if (activeItems.length === 0) return;
      setHighlightedIndex((prev) => (prev + 1) % activeItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(activeItems.length - 1);
        return;
      }
      if (activeItems.length === 0) return;
      setHighlightedIndex((prev) =>
        prev <= 0 ? activeItems.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      if (open && highlightedIndex >= 0) {
        const target = activeItems[highlightedIndex];
        if (target && !target.disabled) {
          e.preventDefault();
          selectItem(target.value);
        }
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setSearchQuery("");
      }
    } else if (e.key === "Backspace" && searchQuery === "") {
      if (multiple && selectedValues.length > 0) {
        e.preventDefault();
        removeChip(selectedValues[selectedValues.length - 1]!);
      }
    } else if (e.key === "ArrowLeft" && searchQuery === "") {
      const target = e.currentTarget;
      if (target.selectionStart === 0 && selectedValues.length > 0) {
        e.preventDefault();
        setFocusedChipIndex(selectedValues.length - 1);
      }
    }
  };

  return (
    <input
      ref={(el) => {
        (inputRef as any).current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      }}
      type="text"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-activedescendant={activeDescendantId}
      aria-autocomplete="list"
      disabled={disabled}
      dir={dir}
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        if (!open) setOpen(true);
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      className={`sora-combobox__chips-input ${className || ""}`.trim()}
      style={style}
      {...rest}
    />
  );
});

/* =========================================================================
   7. ComboboxTrigger (Button Trigger for Popups)
   ========================================================================= */

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(function ComboboxTrigger(props, forwardedRef) {
  const { asChild, children, className, onClick, ...rest } = props;
  const { open, setOpen, disabled, triggerRef, listboxId } =
    useComboboxContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: (el: any) => {
        (triggerRef as any).current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      },
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-controls": listboxId,
      disabled,
      onClick: (e: any) => {
        children.props.onClick?.(e);
        handleClick(e);
      },
    });
  }

  return (
    <button
      ref={(el) => {
        (triggerRef as any).current = el;
        if (typeof forwardedRef === "function") forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
      }}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      disabled={disabled}
      onClick={handleClick}
      className={`sora-combobox__trigger-btn ${className || ""}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
});

/* =========================================================================
   8. ComboboxContent (Floating Dropdown Panel)
   ========================================================================= */

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxContent(props, forwardedRef) {
    const { children, className, style, ...rest } = props;
    const { open, setOpen, dir, triggerRef, listboxRef } =
      useComboboxContext();

    useClickOutside(
      [triggerRef as React.RefObject<HTMLElement>, listboxRef as React.RefObject<HTMLElement>],
      () => {
        if (open) setOpen(false);
      }
    );

    const { style: positionStyle } = usePositioning(
      triggerRef as any,
      listboxRef as any,
      {
        placement: "bottom-start",
        offset: 4,
        enabled: open,
      }
    );

    if (!open) return null;

    return (
      <Portal>
        <div
          ref={(el) => {
            (listboxRef as any).current = el;
            if (typeof forwardedRef === "function") forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
          dir={dir}
          className={`sora-combobox__content ${className || ""}`.trim()}
          style={{ ...positionStyle, ...style }}
          {...rest}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

/* =========================================================================
   9. ComboboxList
   ========================================================================= */

export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps<any>>(
  function ComboboxList(props, forwardedRef) {
    const { children, className, style, ...rest } = props;
    const { listboxId, filteredItems, multiple } = useComboboxContext();

    return (
      <div
        ref={forwardedRef}
        role="listbox"
        id={listboxId}
        aria-multiselectable={multiple ? "true" : undefined}
        tabIndex={-1}
        className={`sora-combobox__list ${className || ""}`.trim()}
        style={style}
        {...rest}
      >
        {typeof children === "function"
          ? filteredItems.map((item) => (children as Function)(item))
          : children}
      </div>
    );
  }
);

/* =========================================================================
   10. ComboboxItem
   ========================================================================= */

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps<any>>(
  function ComboboxItem(props, forwardedRef) {
    const {
      value,
      disabled = false,
      children,
      className,
      style,
      onClick,
      onMouseEnter,
      ...rest
    } = props;
    const {
      highlightedIndex,
      setHighlightedIndex,
      selectItem,
      isItemSelected,
      registerItem,
      unregisterItem,
      registeredItems,
      listboxId,
      itemToStringValue,
    } = useComboboxContext();

    const itemId = `${listboxId}-opt-${registeredItems.length}`;
    const itemRef = useRef<HTMLDivElement | null>(null);

    // Register item
    useEffect(() => {
      const label =
        typeof children === "string" ? children : itemToStringValue(value);
      registerItem({ id: itemId, value, label, disabled });
      return () => unregisterItem(itemId);
    }, [
      itemId,
      value,
      children,
      disabled,
      registerItem,
      unregisterItem,
      itemToStringValue,
    ]);

    const itemIndex = registeredItems.findIndex((i) => i.id === itemId);
    const isHighlighted = highlightedIndex === itemIndex;
    const isSelected = isItemSelected(value);

    // Scroll into view when highlighted
    useEffect(() => {
      if (
        isHighlighted &&
        itemRef.current &&
        typeof itemRef.current.scrollIntoView === "function"
      ) {
        itemRef.current.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      }
    }, [isHighlighted]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (!disabled) {
        selectItem(value);
      }
    };

    return (
      <div
        ref={(el) => {
          itemRef.current = el;
          if (typeof forwardedRef === "function") forwardedRef(el);
          else if (forwardedRef) forwardedRef.current = el;
        }}
        id={itemId}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled ? "true" : undefined}
        onClick={handleClick}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (itemIndex >= 0) setHighlightedIndex(itemIndex);
        }}
        className={`sora-combobox__item ${
          isSelected ? "sora-combobox__item--selected" : ""
        } ${isHighlighted ? "sora-combobox__item--highlighted" : ""} ${
          disabled ? "sora-combobox__item--disabled" : ""
        } ${className || ""}`.trim()}
        style={style}
        {...rest}
      >
        {/* Check icon — always rendered, CSS visibility keeps layout stable */}
        <span className="sora-combobox__item-start" aria-hidden="true">
          <Check size={13} />
        </span>
        <div className="sora-combobox__item-text">{children}</div>
      </div>
    );
  }
);

/* =========================================================================
   11. ComboboxEmpty
   ========================================================================= */

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty(props, forwardedRef) {
    const { children, className, style, ...rest } = props;
    const { filteredItems } = useComboboxContext();

    if (filteredItems.length > 0) return null;

    return (
      <div
        ref={forwardedRef}
        className={`sora-combobox__empty ${className || ""}`.trim()}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   12. ComboboxGroup
   ========================================================================= */

export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
  function ComboboxGroup(props, forwardedRef) {
    const { children, className, style, ...rest } = props;
    const labelId = useId();

    return (
      <ComboboxGroupContext.Provider value={{ labelId }}>
        <div
          ref={forwardedRef}
          role="group"
          aria-labelledby={labelId}
          className={`sora-combobox__group ${className || ""}`.trim()}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </ComboboxGroupContext.Provider>
    );
  }
);

/* =========================================================================
   13. ComboboxLabel
   ========================================================================= */

export const ComboboxLabel = forwardRef<HTMLDivElement, ComboboxLabelProps>(
  function ComboboxLabel(props, forwardedRef) {
    const { children, className, style, ...rest } = props;
    const groupContext = useContext(ComboboxGroupContext);

    return (
      <div
        ref={forwardedRef}
        id={groupContext?.labelId}
        className={`sora-combobox__group-label ${className || ""}`.trim()}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* =========================================================================
   14. ComboboxSeparator
   ========================================================================= */

export const ComboboxSeparator = forwardRef<
  HTMLDivElement,
  ComboboxSeparatorProps
>(function ComboboxSeparator(props, forwardedRef) {
  const { className, style, ...rest } = props;

  return (
    <div
      ref={forwardedRef}
      role="separator"
      className={`sora-combobox__separator ${className || ""}`.trim()}
      style={style}
      {...rest}
    />
  );
});
