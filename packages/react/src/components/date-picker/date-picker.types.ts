import type { HTMLAttributes } from 'react';

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** The selected date (controlled) */
  value?: Date | null | undefined;
  /** The default selected date (uncontrolled) */
  defaultValue?: Date | null | undefined;
  /** Callback fired when selected date changes */
  onValueChange?: ((date: Date | null) => void) | undefined;
  /** Placeholder text */
  placeholder?: string | undefined;
  /** Minimum selectable date */
  minDate?: Date | undefined;
  /** Maximum selectable date */
  maxDate?: Date | undefined;
  /** Custom date formatter */
  formatDate?: ((date: Date | null) => string) | undefined;
  /** Custom date parser */
  parseDate?: ((str: string) => Date | null) | undefined;
  /** Whether to show a clear button when a date is selected */
  clearable?: boolean | undefined;
  /** Disabled state */
  disabled?: boolean | undefined;
}