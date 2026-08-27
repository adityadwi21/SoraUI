import type { HTMLAttributes } from "react";

export interface DateRange {
  from?: Date | undefined;
  to?: Date | undefined;
}

export type CalendarMode = "single" | "range" | "multiple";
export type CaptionLayout = "label" | "dropdown" | "dropdown-buttons";

export type CalendarSystem =
  | "gregory"
  | "persian"
  | "islamic"
  | "islamic-umalqura"
  | "islamic-tbla"
  | "islamic-civil"
  | "hebrew"
  | "buddhist"
  | "japanese";

export interface CalendarFormatters {
  formatMonthTitle?: ((date: Date, locale?: string) => string) | undefined;
  formatWeekdayName?: ((weekdayIndex: number, date: Date, locale?: string) => string) | undefined;
  formatDay?: ((date: Date, locale?: string) => string) | undefined;
  formatMonthDropdown?: ((monthIndex: number, date: Date, locale?: string) => string) | undefined;
}

export type Matcher =
  | boolean
  | Date
  | Date[]
  | { from?: Date; to?: Date }
  | ((date: Date) => boolean);

export interface CalendarCell {
  date: Date;
  isOutside: boolean;
  dayNumber: number;
}

export interface CalendarProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange" | "onSelect"
  > {
  /** Selection mode: 'single' (default), 'range', or 'multiple' */
  mode?: CalendarMode | undefined;

  /** The selected date/range/array in controlled mode */
  selected?: Date | Date[] | DateRange | null | undefined;
  /** The default selected date/range/array in uncontrolled mode */
  defaultSelected?: Date | Date[] | DateRange | null | undefined;
  /** Callback fired when selection changes */
  onSelect?:
    | ((date: Date | undefined) => void)
    | ((dates: Date[] | undefined) => void)
    | ((range: DateRange | undefined) => void)
    | ((value: any) => void)
    | undefined;

  /** Backward-compatibility alias for selected in single mode */
  value?: Date | null | undefined;
  /** Backward-compatibility alias for defaultSelected in single mode */
  defaultValue?: Date | null | undefined;
  /** Backward-compatibility alias for onSelect in single mode */
  onValueChange?: ((date: Date) => void) | undefined;

  /** Locale string (e.g. 'fa-IR', 'ar-SA', 'en-US') or object with code */
  locale?: string | { code?: string } | undefined;
  /** Calendar system for localization (e.g. 'persian', 'islamic-umalqura', 'gregory') */
  calendarSystem?: CalendarSystem | undefined;
  /** Custom formatters for dates and labels */
  formatters?: CalendarFormatters | undefined;

  /** Minimum selectable date */
  minDate?: Date | undefined;
  /** Maximum selectable date */
  maxDate?: Date | undefined;
  /** Custom function to determine if a date is disabled */
  isDateDisabled?: ((date: Date) => boolean) | undefined;
  /** Date matcher(s) to disable */
  disabled?: Matcher | Matcher[] | undefined;

  /** Number of months to show side-by-side (default: 1) */
  numberOfMonths?: number | undefined;
  /** Whether to show days from adjacent months (default: true) */
  showOutsideDays?: boolean | undefined;
  /** Whether to show ISO week numbers column (default: false) */
  showWeekNumber?: boolean | undefined;
  /** Custom IANA TimeZone identifier (e.g. 'UTC', 'America/New_York') */
  timeZone?: string | undefined;
  /** Whether to always render 6 calendar weeks/rows (default: false) */
  fixedWeeks?: boolean | undefined;
  /** First day of week: 0 (Sunday) to 6 (Saturday), default: 0 */
  weekStartsOn?: (0 | 1 | 2 | 3 | 4 | 5 | 6) | undefined;

  /** Caption layout type: 'label' (default), 'dropdown', or 'dropdown-buttons' */
  captionLayout?: CaptionLayout | undefined;
  /** Earliest year for dropdown */
  fromYear?: number | undefined;
  /** Latest year for dropdown */
  toYear?: number | undefined;
  /** Earliest date for navigation */
  fromDate?: Date | undefined;
  /** Latest date for navigation */
  toDate?: Date | undefined;

  /** Controlled month view */
  month?: Date | undefined;
  /** Default month view */
  defaultMonth?: Date | undefined;
  /** Callback when viewed month changes */
  onMonthChange?: ((month: Date) => void) | undefined;
}
