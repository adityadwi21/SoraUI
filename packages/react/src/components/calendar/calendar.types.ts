import type { HTMLAttributes } from "react";

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  /** The selected date (controlled) */
  value?: Date | null | undefined;
  /** The default selected date (uncontrolled) */
  defaultValue?: Date | null | undefined;
  /** Callback fired when selected date changes */
  onValueChange?: ((date: Date) => void) | undefined;
  /** Minimum selectable date */
  minDate?: Date | undefined;
  /** Maximum selectable date */
  maxDate?: Date | undefined;
  /** Function to determine if a date is disabled */
  isDateDisabled?: ((date: Date) => boolean) | undefined;
}
