import {
  useState,
  useCallback,
  useRef,
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../popover/popover";
import { Calendar } from "../calendar/calendar";
import { formatDate as defaultFormatDate } from "../calendar/calendar.utils";
import type { DatePickerProps } from "./date-picker.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      placeholder = "Select date...",
      minDate,
      maxDate,
      formatDate: customFormatDate,
      clearable = true,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(
      defaultValue,
    );
    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : uncontrolledValue;

    const [open, setOpen] = useState(false);
    const triggerBtnRef = useRef<HTMLButtonElement | null>(null);

    const handleSelect = useCallback(
      (newDate: Date) => {
        if (!isControlled) setUncontrolledValue(newDate);
        onValueChange?.(newDate);
        setOpen(false);
        triggerBtnRef.current?.focus();
      },
      [isControlled, onValueChange],
    );

    const handleClear = (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation();
      if (!isControlled) setUncontrolledValue(null);
      onValueChange?.(null);
      triggerBtnRef.current?.focus();
    };

    const handleClearKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        if (!isControlled) setUncontrolledValue(null);
        onValueChange?.(null);
        triggerBtnRef.current?.focus();
      }
    };

    const formattedValue = customFormatDate
      ? customFormatDate(selectedDate)
      : defaultFormatDate(selectedDate);

    return (
      <div ref={ref} className={cx("sora-date-picker", className)} {...props}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={triggerBtnRef}
              type="button"
              disabled={disabled}
              aria-label={
                formattedValue
                  ? `Selected date: ${formattedValue}`
                  : placeholder
              }
              className={cx(
                "sora-date-picker__trigger",
                !formattedValue && "sora-date-picker__trigger--empty",
                disabled && "sora-date-picker__trigger--disabled",
              )}
            >
              <span className="sora-date-picker__value">
                {formattedValue || placeholder}
              </span>
              <div className="sora-date-picker__actions">
                {clearable && formattedValue && !disabled && (
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Clear selected date"
                    onClick={handleClear}
                    onKeyDown={handleClearKeyDown}
                    className="sora-date-picker__clear-btn"
                  >
                    <X size={13} aria-hidden="true" />
                  </span>
                )}
                <CalendarIcon
                  size={14}
                  className="sora-date-picker__icon"
                  aria-hidden="true"
                />
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="sora-date-picker__popover"
            placement="bottom-start"
            offset={4}
          >
            <Calendar
              value={selectedDate}
              onValueChange={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";
