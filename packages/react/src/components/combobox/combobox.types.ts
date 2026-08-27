import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
} from "react";

/** Legacy option item format for monolithic usage */
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean | undefined;
  icon?: ReactNode | undefined;
  description?: string | undefined;
}

export interface RegisteredComboboxItem<T = any> {
  id: string;
  value: T;
  label: string;
  disabled?: boolean | undefined;
}

export interface ComboboxContextValue<T = any> {
  multiple: boolean;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedValue: T | T[] | undefined;
  selectedValues: T[];
  isItemSelected: (value: T) => boolean;
  setSelectedValue: (value: T | T[] | undefined) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number | ((prev: number) => number)) => void;
  autoHighlight: boolean;
  disabled: boolean;
  dir?: "ltr" | "rtl" | "auto" | undefined;
  listboxId: string;
  items?: T[] | undefined;
  itemToStringValue: (item: T) => string;
  filterItem?: ((item: T, query: string) => boolean) | undefined;
  filteredItems: T[];
  registeredItems: RegisteredComboboxItem<T>[];
  registerItem: (item: RegisteredComboboxItem<T>) => void;
  unregisterItem: (id: string) => void;
  selectItem: (value: T) => void;
  toggleItem: (value: T) => void;
  removeChip: (value: T) => void;
  focusedChipIndex: number;
  setFocusedChipIndex: (index: number | ((prev: number) => number)) => void;
  triggerRef: RefObject<HTMLDivElement | HTMLButtonElement | HTMLInputElement | null>;
  listboxRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  clearSelection: () => void;
  loading?: boolean | undefined;
}

export interface ComboboxBaseProps<T = any> {
  /** Array of items (composable pattern) */
  items?: T[] | undefined;
  /** Array of predefined options (monolithic/legacy pattern) */
  options?: ComboboxOption[] | undefined;
  /** Convert generic item to searchable string representation */
  itemToStringValue?: ((item: T) => string) | undefined;
  /** Custom filter predicate */
  filterItem?: ((item: T, query: string) => boolean) | undefined;
  /** Whether to automatically highlight the first matching item on query change */
  autoHighlight?: boolean | undefined;
  /** Controlled open state */
  open?: boolean | undefined;
  /** Initial open state */
  defaultOpen?: boolean | undefined;
  /** Callback when open state changes */
  onOpenChange?: ((open: boolean) => void) | undefined;
  /** Placeholder text (used in monolithic sugar) */
  placeholder?: string | undefined;
  /** Empty state text when no matches (used in monolithic sugar) */
  emptyText?: ReactNode | undefined;
  /** Whether selection can be cleared */
  clearable?: boolean | undefined;
  /** Alias for clearable */
  showClear?: boolean | undefined;
  /** Show animated loading spinner */
  loading?: boolean | undefined;
  /** Disabled state */
  disabled?: boolean | undefined;
  /** Text direction */
  dir?: "ltr" | "rtl" | "auto" | undefined;
  /** Children elements (composable) or omitted (monolithic) */
  children?: ReactNode | undefined;
}

export interface ComboboxSingleProps<T = any> {
  multiple?: false | undefined;
  /** Controlled active value */
  value?: T | undefined;
  /** Initial value for uncontrolled state */
  defaultValue?: T | undefined;
  /** Callback fired when selected value changes */
  onValueChange?: ((value: T | undefined) => void) | undefined;
}

export interface ComboboxMultiProps<T = any> {
  multiple: true;
  /** Controlled active values */
  value?: T[] | undefined;
  /** Initial values for uncontrolled state */
  defaultValue?: T[] | undefined;
  /** Callback fired when selected values change */
  onValueChange?: ((value: T[]) => void) | undefined;
}

export type ComboboxProps<T = any> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange" | "children"
> &
  ComboboxBaseProps<T> &
  (ComboboxSingleProps<T> | ComboboxMultiProps<T>);

export interface ComboboxInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Inline clear button */
  showClear?: boolean | undefined;
  /** Alias for showClear */
  clearable?: boolean | undefined;
  /** Leading icon or addon */
  icon?: ReactNode | undefined;
  /** Loading indicator */
  loading?: boolean | undefined;
}

export interface ComboboxChipsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxChipProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onRemove"> {
  value: T;
  disabled?: boolean | undefined;
  onRemove?: (() => void) | undefined;
  children?: ReactNode | undefined;
}

export interface ComboboxChipDeleteProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxChipsInputProps extends ComboboxInputProps {}

export interface ComboboxTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Pass-through child element */
  asChild?: boolean | undefined;
}

export interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxListProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Direct children or render prop function */
  children?: ReactNode | ((item: T) => ReactNode) | undefined;
}

export interface ComboboxItemProps<T = any>
  extends HTMLAttributes<HTMLDivElement> {
  /** Item value */
  value: T;
  /** Disabled state for this option */
  disabled?: boolean | undefined;
  /** Children content */
  children?: ReactNode | undefined;
}

export interface ComboboxEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | undefined;
}

export interface ComboboxSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
