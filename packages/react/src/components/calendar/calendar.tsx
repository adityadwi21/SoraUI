import { useState, useCallback, useId, forwardRef, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  isSameDay,
  getDaysInMonth,
  getFirstDayOfWeek,
  isDateDisabled as checkIsDateDisabled,
  MONTH_NAMES,
  WEEKDAY_NAMES,
} from './calendar.utils';
import type { CalendarProps } from './calendar.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      minDate,
      maxDate,
      isDateDisabled,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : uncontrolledValue;

    const initialView = selectedDate || new Date();
    const [viewYear, setViewYear] = useState(initialView.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialView.getMonth());

    const titleId = useId();

    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    const handleSelectDate = useCallback(
      (day: number) => {
        const newDate = new Date(viewYear, viewMonth, day);
        if (checkIsDateDisabled(newDate, minDate, maxDate, isDateDisabled)) return;

        if (!isControlled) setUncontrolledValue(newDate);
        onValueChange?.(newDate);
      },
      [viewYear, viewMonth, minDate, maxDate, isDateDisabled, isControlled, onValueChange]
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentDay: number) => {
      let targetDay = currentDay;
      const totalDays = getDaysInMonth(viewYear, viewMonth);

      if (e.key === 'ArrowRight') targetDay = Math.min(totalDays, currentDay + 1);
      else if (e.key === 'ArrowLeft') targetDay = Math.max(1, currentDay - 1);
      else if (e.key === 'ArrowDown') targetDay = Math.min(totalDays, currentDay + 7);
      else if (e.key === 'ArrowUp') targetDay = Math.max(1, currentDay - 7);
      else if (e.key === 'Home') targetDay = 1;
      else if (e.key === 'End') targetDay = totalDays;
      else if (e.key === 'PageUp') {
        e.preventDefault();
        handlePrevMonth();
        return;
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        handleNextMonth();
        return;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelectDate(currentDay);
        return;
      }

      if (targetDay !== currentDay) {
        e.preventDefault();
        const el = document.getElementById(`sora-calendar-day-${viewYear}-${viewMonth}-${targetDay}`);
        el?.focus();
      }
    };

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startWeekday = getFirstDayOfWeek(viewYear, viewMonth);
    const today = new Date();

    const calendarCells = [];
    for (let i = 0; i < startWeekday; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="sora-calendar__cell sora-calendar__cell--empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const isSelected = isSameDay(selectedDate, date);
      const isToday = isSameDay(today, date);
      const disabled = checkIsDateDisabled(date, minDate, maxDate, isDateDisabled);

      calendarCells.push(
        <button
          key={day}
          id={`sora-calendar-day-${viewYear}-${viewMonth}-${day}`}
          type="button"
          role="gridcell"
          aria-selected={isSelected}
          aria-disabled={disabled || undefined}
          disabled={disabled || undefined}
          tabIndex={isSelected || (day === 1 && !selectedDate) ? 0 : -1}
          onClick={() => handleSelectDate(day)}
          onKeyDown={(e) => handleKeyDown(e, day)}
          className={cx(
            'sora-calendar__day',
            isSelected && 'sora-calendar__day--selected',
            isToday && 'sora-calendar__day--today',
            disabled && 'sora-calendar__day--disabled'
          )}
        >
          {day}
        </button>
      );
    }

    return (
      <div ref={ref} className={cx('sora-calendar', className)} {...props}>
        <div className="sora-calendar__header">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="sora-calendar__nav-btn"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <div id={titleId} aria-live="polite" className="sora-calendar__title">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="sora-calendar__nav-btn"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div role="grid" aria-labelledby={titleId} className="sora-calendar__grid">
          <div role="row" className="sora-calendar__weekdays">
            {WEEKDAY_NAMES.map((wd) => (
              <span key={wd} role="columnheader" className="sora-calendar__weekday">
                {wd}
              </span>
            ))}
          </div>
          <div className="sora-calendar__days">{calendarCells}</div>
        </div>
      </div>
    );
  }
);
Calendar.displayName = 'Calendar';