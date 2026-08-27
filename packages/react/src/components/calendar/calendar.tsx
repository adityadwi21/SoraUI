import {
  useState,
  useCallback,
  useId,
  forwardRef,
  useMemo,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  isSameDay,
  isSameMonth,
  isDateDisabled as checkIsDateDisabled,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  getCalendarGrid,
  getWeekdayNames,
  getISOWeekNumber,
  addMonths,
  MONTH_NAMES,
} from "./calendar.utils";
import type {
  CalendarProps,
  DateRange,
  CalendarCell,
} from "./calendar.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = "single",
      selected,
      defaultSelected,
      onSelect,
      value: legacyValue,
      defaultValue: legacyDefaultValue,
      onValueChange: legacyOnValueChange,
      locale,
      calendarSystem,
      formatters,
      timeZone,
      showWeekNumber = false,
      minDate,
      maxDate,
      isDateDisabled,
      disabled,
      numberOfMonths = 1,
      showOutsideDays = true,
      fixedWeeks = false,
      weekStartsOn = 0,
      captionLayout = "label",
      fromYear,
      toYear,
      fromDate,
      toDate,
      month: controlledMonth,
      defaultMonth,
      onMonthChange,
      className,
      ...props
    },
    ref,
  ) => {
    // ─── Locale & Calendar System Helpers ───
    const localeCode =
      typeof locale === "string" ? locale : locale?.code || undefined;

    // ─── Selection State Management ───
    const effectiveControlledSelected =
      selected !== undefined ? selected : legacyValue;
    const isControlled = effectiveControlledSelected !== undefined;

    const initialUncontrolled = useMemo(() => {
      if (defaultSelected !== undefined) return defaultSelected;
      if (legacyDefaultValue !== undefined) return legacyDefaultValue;
      if (mode === "range")
        return { from: undefined, to: undefined } as DateRange;
      if (mode === "multiple") return [] as Date[];
      return null;
    }, [defaultSelected, legacyDefaultValue, mode]);

    const [uncontrolledSelected, setUncontrolledSelected] = useState<
      Date | Date[] | DateRange | null | undefined
    >(initialUncontrolled);

    const currentSelected = isControlled
      ? effectiveControlledSelected
      : uncontrolledSelected;

    // Hover state for range preview
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    // ─── Month View State ───
    const determineInitialDate = (): Date => {
      if (controlledMonth) return controlledMonth;
      if (defaultMonth) return defaultMonth;
      if (currentSelected instanceof Date) return currentSelected;
      if (
        currentSelected &&
        typeof currentSelected === "object" &&
        "from" in currentSelected &&
        currentSelected.from
      ) {
        return currentSelected.from;
      }
      if (
        Array.isArray(currentSelected) &&
        currentSelected.length > 0 &&
        currentSelected[0]
      ) {
        return currentSelected[0];
      }
      return new Date();
    };

    const [viewDate, setViewDate] = useState<Date>(determineInitialDate);
    const displayedMonth = controlledMonth || viewDate;
    const viewYear = displayedMonth.getFullYear();
    const viewMonth = displayedMonth.getMonth();

    const changeMonth = useCallback(
      (newMonth: Date) => {
        if (!controlledMonth) {
          setViewDate(newMonth);
        }
        onMonthChange?.(newMonth);
      },
      [controlledMonth, onMonthChange],
    );

    const handlePrevMonth = () => {
      changeMonth(addMonths(displayedMonth, -1));
    };

    const handleNextMonth = () => {
      changeMonth(addMonths(displayedMonth, 1));
    };

    // ─── Selection Logic ───
    const handleSelectDate = useCallback(
      (targetDate: Date) => {
        const isDisabled = checkIsDateDisabled(
          targetDate,
          minDate || fromDate,
          maxDate || toDate,
          isDateDisabled,
          disabled,
        );
        if (isDisabled) return;

        if (mode === "single") {
          const isCurrentlySelected =
            currentSelected instanceof Date &&
            isSameDay(currentSelected, targetDate);
          const nextVal = isCurrentlySelected ? undefined : targetDate;

          if (!isControlled) setUncontrolledSelected(nextVal);
          onSelect?.(nextVal);
          if (nextVal) legacyOnValueChange?.(nextVal);
        } else if (mode === "range") {
          const prevRange: DateRange =
            currentSelected &&
            typeof currentSelected === "object" &&
            !("length" in currentSelected)
              ? (currentSelected as DateRange)
              : { from: undefined, to: undefined };

          let nextRange: DateRange;
          if (!prevRange.from || (prevRange.from && prevRange.to)) {
            // Start a new range
            nextRange = { from: targetDate, to: undefined };
          } else {
            // Complete range
            if (targetDate < prevRange.from) {
              nextRange = { from: targetDate, to: prevRange.from };
            } else {
              nextRange = { from: prevRange.from, to: targetDate };
            }
          }

          if (!isControlled) setUncontrolledSelected(nextRange);
          onSelect?.(nextRange);
        } else if (mode === "multiple") {
          const prevDates: Date[] = Array.isArray(currentSelected)
            ? currentSelected
            : [];
          const exists = prevDates.some((d) => isSameDay(d, targetDate));
          const nextDates = exists
            ? prevDates.filter((d) => !isSameDay(d, targetDate))
            : [...prevDates, targetDate];

          if (!isControlled) setUncontrolledSelected(nextDates);
          onSelect?.(nextDates);
        }
      },
      [
        minDate,
        fromDate,
        maxDate,
        toDate,
        isDateDisabled,
        disabled,
        mode,
        currentSelected,
        isControlled,
        onSelect,
        legacyOnValueChange,
      ],
    );

    // ─── Keyboard Navigation ───
    const handleKeyDown = (
      e: KeyboardEvent<HTMLButtonElement>,
      currentDate: Date,
    ) => {
      let daysToAdd = 0;
      if (e.key === "ArrowRight") daysToAdd = 1;
      else if (e.key === "ArrowLeft") daysToAdd = -1;
      else if (e.key === "ArrowDown") daysToAdd = 7;
      else if (e.key === "ArrowUp") daysToAdd = -7;
      else if (e.key === "Home") {
        e.preventDefault();
        const start = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        const el = document.getElementById(
          `sora-cal-${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`,
        );
        el?.focus();
        return;
      } else if (e.key === "End") {
        e.preventDefault();
        const end = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );
        const el = document.getElementById(
          `sora-cal-${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`,
        );
        el?.focus();
        return;
      } else if (e.key === "PageUp") {
        e.preventDefault();
        if (e.shiftKey) {
          changeMonth(addMonths(displayedMonth, -12));
        } else {
          changeMonth(addMonths(displayedMonth, -1));
        }
        return;
      } else if (e.key === "PageDown") {
        e.preventDefault();
        if (e.shiftKey) {
          changeMonth(addMonths(displayedMonth, 12));
        } else {
          changeMonth(addMonths(displayedMonth, 1));
        }
        return;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelectDate(currentDate);
        return;
      }

      if (daysToAdd !== 0) {
        e.preventDefault();
        const target = new Date(currentDate);
        target.setDate(target.getDate() + daysToAdd);

        if (!isSameMonth(target, currentDate)) {
          changeMonth(new Date(target.getFullYear(), target.getMonth(), 1));
        }

        setTimeout(() => {
          const el = document.getElementById(
            `sora-cal-${target.getFullYear()}-${target.getMonth()}-${target.getDate()}`,
          );
          el?.focus();
        }, 0);
      }
    };

    // ─── Dropdown Options ───
    const currentYear = viewYear;
    const startYear =
      fromYear ?? (fromDate ? fromDate.getFullYear() : currentYear - 80);
    const endYear =
      toYear ?? (toDate ? toDate.getFullYear() : currentYear + 30);
    const yearOptions = useMemo(() => {
      const years: number[] = [];
      for (let y = startYear; y <= endYear; y++) {
        years.push(y);
      }
      return years;
    }, [startYear, endYear]);

    const handleMonthDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newM = parseInt(e.target.value, 10);
      changeMonth(new Date(viewYear, newM, 1));
    };

    const handleYearDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const newY = parseInt(e.target.value, 10);
      changeMonth(new Date(newY, viewMonth, 1));
    };

    // ─── Formatters ───
    const formatMonthTitle = (mDate: Date): string => {
      if (formatters?.formatMonthTitle) {
        return formatters.formatMonthTitle(mDate, localeCode);
      }
      if (localeCode || calendarSystem || timeZone) {
        try {
          return new Intl.DateTimeFormat(localeCode || undefined, {
            month: "long",
            year: "numeric",
            calendar: calendarSystem,
            timeZone,
          }).format(mDate);
        } catch {
          // Fallback if calendar option is unsupported
        }
      }
      return `${MONTH_NAMES[mDate.getMonth()]} ${mDate.getFullYear()}`;
    };

    const weekdayHeaders = useMemo(() => {
      if (localeCode || calendarSystem || formatters?.formatWeekdayName || timeZone) {
        const baseSunday = new Date(2026, 0, 4); // Reference Sunday
        const headers: string[] = [];
        for (let i = 0; i < 7; i++) {
          const dayOffset = (i + weekStartsOn) % 7;
          const refDate = new Date(baseSunday);
          refDate.setDate(baseSunday.getDate() + dayOffset);

          if (formatters?.formatWeekdayName) {
            headers.push(formatters.formatWeekdayName(i, refDate, localeCode));
          } else {
            try {
              const formatter = new Intl.DateTimeFormat(
                localeCode || undefined,
                {
                  weekday: "narrow",
                  calendar: calendarSystem,
                  timeZone,
                },
              );
              headers.push(formatter.format(refDate));
            } catch {
              headers.push(getWeekdayNames(weekStartsOn)[i] || "");
            }
          }
        }
        return headers;
      }
      return getWeekdayNames(weekStartsOn);
    }, [weekStartsOn, localeCode, calendarSystem, formatters, timeZone]);

    const formatDayDisplay = (date: Date, defaultDay: number): string => {
      if (formatters?.formatDay) {
        return formatters.formatDay(date, localeCode);
      }
      if (localeCode || calendarSystem || timeZone) {
        try {
          return new Intl.DateTimeFormat(localeCode || undefined, {
            day: "numeric",
            calendar: calendarSystem,
            timeZone,
          }).format(date);
        } catch {
          // Fallback
        }
      }
      return defaultDay.toString();
    };

    const formatDayAriaLabel = (date: Date, defaultDay: number): string => {
      if (localeCode || calendarSystem || timeZone) {
        try {
          return new Intl.DateTimeFormat(localeCode || undefined, {
            dateStyle: "full",
            calendar: calendarSystem,
            timeZone,
          }).format(date);
        } catch {
          // Fallback
        }
      }
      return `${MONTH_NAMES[date.getMonth()]} ${defaultDay}, ${date.getFullYear()}`;
    };

    const formatMonthDropdownLabel = (mIdx: number): string => {
      const refDate = new Date(viewYear, mIdx, 1);
      if (formatters?.formatMonthDropdown) {
        return formatters.formatMonthDropdown(mIdx, refDate, localeCode);
      }
      if (localeCode || calendarSystem || timeZone) {
        try {
          return new Intl.DateTimeFormat(localeCode || undefined, {
            month: "long",
            calendar: calendarSystem,
            timeZone,
          }).format(refDate);
        } catch {
          // Fallback
        }
      }
      return MONTH_NAMES[mIdx] || "";
    };

    const titleId = useId();

    // ─── Months Renderer ───
    const monthsToRender = Array.from({ length: numberOfMonths }, (_, i) =>
      addMonths(displayedMonth, i),
    );

    const activeRange: DateRange | null = useMemo(() => {
      if (
        mode !== "range" ||
        !currentSelected ||
        typeof currentSelected !== "object"
      ) {
        return null;
      }
      const r = currentSelected as DateRange;
      if (r.from && !r.to && hoveredDate && !isSameDay(r.from, hoveredDate)) {
        return {
          from: r.from < hoveredDate ? r.from : hoveredDate,
          to: r.from < hoveredDate ? hoveredDate : r.from,
        };
      }
      return r;
    }, [mode, currentSelected, hoveredDate]);

    return (
      <div
        ref={ref}
        className={cx(
          "sora-calendar",
          numberOfMonths > 1 && "sora-calendar--multiple-months",
          className,
        )}
        {...props}
      >
        <div className="sora-calendar__months">
          {monthsToRender.map((monthDate, monthIndex) => {
            const mYear = monthDate.getFullYear();
            const mMonth = monthDate.getMonth();
            const grid = getCalendarGrid(mYear, mMonth, {
              showOutsideDays,
              fixedWeeks,
              weekStartsOn,
            });

            // Group into weeks (7 days per row)
            const weeks: CalendarCell[][] = [];
            for (let i = 0; i < grid.length; i += 7) {
              weeks.push(grid.slice(i, i + 7));
            }

            const showPrevNav = monthIndex === 0;
            const showNextNav = monthIndex === numberOfMonths - 1;

            return (
              <div
                key={`${mYear}-${mMonth}`}
                className="sora-calendar__month"
              >
                {/* Header */}
                <div className="sora-calendar__header">
                  {showPrevNav ? (
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      aria-label="Previous month"
                      className="sora-calendar__nav-btn sora-calendar__nav-btn--prev"
                    >
                      <ChevronLeft size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <span className="sora-calendar__nav-placeholder" />
                  )}

                  {captionLayout === "dropdown" ||
                  captionLayout === "dropdown-buttons" ? (
                    <div className="sora-calendar__dropdowns">
                      <select
                        aria-label="Select month"
                        value={mMonth}
                        onChange={handleMonthDropdownChange}
                        className="sora-calendar__dropdown sora-calendar__dropdown-month"
                      >
                        {MONTH_NAMES.map((_, idx) => (
                          <option key={idx} value={idx}>
                            {formatMonthDropdownLabel(idx)}
                          </option>
                        ))}
                      </select>
                      <select
                        aria-label="Select year"
                        value={mYear}
                        onChange={handleYearDropdownChange}
                        className="sora-calendar__dropdown sora-calendar__dropdown-year"
                      >
                        {yearOptions.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div
                      id={monthIndex === 0 ? titleId : undefined}
                      aria-live="polite"
                      className="sora-calendar__title"
                    >
                      {formatMonthTitle(monthDate)}
                    </div>
                  )}

                  {showNextNav ? (
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                      className="sora-calendar__nav-btn sora-calendar__nav-btn--next"
                    >
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <span className="sora-calendar__nav-placeholder" />
                  )}
                </div>

                {/* Grid */}
                <div
                  role="grid"
                  aria-labelledby={monthIndex === 0 ? titleId : undefined}
                  className="sora-calendar__grid"
                >
                  <div
                    role="row"
                    className={cx(
                      "sora-calendar__weekdays",
                      showWeekNumber && "sora-calendar__weekdays--with-weeks",
                    )}
                  >
                    {showWeekNumber && (
                      <span
                        role="columnheader"
                        aria-label="Week Number"
                        className="sora-calendar__weekday sora-calendar__weekday--week-number"
                      >
                        #
                      </span>
                    )}
                    {weekdayHeaders.map((wd, wdIdx) => (
                      <span
                        key={`${wd}-${wdIdx}`}
                        role="columnheader"
                        className="sora-calendar__weekday"
                      >
                        {wd}
                      </span>
                    ))}
                  </div>

                  <div className="sora-calendar__days">
                    {weeks.map((weekCells, weekIdx) => {
                      const firstCellDate = weekCells[0]?.date || new Date();
                      const weekNumber = getISOWeekNumber(firstCellDate);

                      return (
                        <div
                          key={`week-${weekIdx}`}
                          role="row"
                          className={cx(
                            "sora-calendar__week-row",
                            showWeekNumber &&
                              "sora-calendar__week-row--with-weeks",
                          )}
                        >
                          {showWeekNumber && (
                            <span
                              role="rowheader"
                              aria-label={`Week ${weekNumber}`}
                              className="sora-calendar__week-number"
                            >
                              {weekNumber}
                            </span>
                          )}

                          {weekCells.map((cell: CalendarCell, cellIdx: number) => {
                            const { date, isOutside, dayNumber } = cell;
                            const today = new Date();
                            const isToday = isSameDay(today, date);
                            const isDisabled = checkIsDateDisabled(
                              date,
                              minDate || fromDate,
                              maxDate || toDate,
                              isDateDisabled,
                              disabled,
                            );

                            // Single / Multiple selection check
                            let isSelected = false;
                            if (mode === "single") {
                              isSelected =
                                currentSelected instanceof Date &&
                                isSameDay(currentSelected, date);
                            } else if (mode === "multiple") {
                              isSelected =
                                Array.isArray(currentSelected) &&
                                currentSelected.some((d) => isSameDay(d, date));
                            }

                            // Range checks
                            const isStart =
                              mode === "range" &&
                              isRangeStart(date, activeRange);
                            const isEnd =
                              mode === "range" && isRangeEnd(date, activeRange);
                            const inRange =
                              mode === "range" &&
                              isDateInRange(date, activeRange);

                            const isRangeSelected = isStart || isEnd;

                            return (
                              <button
                                key={`${date.toISOString()}-${cellIdx}`}
                                id={`sora-cal-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                                type="button"
                                role="gridcell"
                                aria-label={formatDayAriaLabel(date, dayNumber)}
                                aria-selected={
                                  isSelected || isRangeSelected || inRange
                                }
                                aria-disabled={isDisabled || undefined}
                                disabled={isDisabled || undefined}
                                tabIndex={
                                  isSelected ||
                                  isRangeSelected ||
                                  (dayNumber === 1 && !currentSelected)
                                    ? 0
                                    : -1
                                }
                                onClick={() => handleSelectDate(date)}
                                onMouseEnter={() => {
                                  if (mode === "range") setHoveredDate(date);
                                }}
                                onMouseLeave={() => {
                                  if (mode === "range") setHoveredDate(null);
                                }}
                                onKeyDown={(e) => handleKeyDown(e, date)}
                                className={cx(
                                  "sora-calendar__day",
                                  (isSelected || isRangeSelected) &&
                                    "sora-calendar__day--selected",
                                  isStart && "sora-calendar__day--range-start",
                                  isEnd && "sora-calendar__day--range-end",
                                  inRange &&
                                    "sora-calendar__day--range-middle",
                                  isToday && "sora-calendar__day--today",
                                  isOutside && "sora-calendar__day--outside",
                                  isDisabled && "sora-calendar__day--disabled",
                                )}
                              >
                                {formatDayDisplay(date, dayNumber)}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
