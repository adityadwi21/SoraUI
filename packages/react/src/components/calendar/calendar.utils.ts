import type { DateRange, Matcher, CalendarCell } from "./calendar.types";

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const WEEKDAY_NAMES = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
] as const;

export function getWeekdayNames(weekStartsOn: number = 0): string[] {
  const names = [...WEEKDAY_NAMES];
  const shift = ((weekStartsOn % 7) + 7) % 7;
  return [...names.slice(shift), ...names.slice(0, shift)];
}

export function isSameDay(
  d1: Date | null | undefined,
  d2: Date | null | undefined,
): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isSameMonth(
  d1: Date | null | undefined,
  d2: Date | null | undefined,
): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
  );
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(
  year: number,
  month: number,
  weekStartsOn: number = 0,
): number {
  const day = new Date(year, month, 1).getDay();
  return (day - weekStartsOn + 7) % 7;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function addMonths(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setMonth(result.getMonth() + amount);
  return result;
}

export function isBefore(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 < t2;
}

export function isAfter(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 > t2;
}

export function matchDate(matcher: Matcher | undefined, date: Date): boolean {
  if (matcher === undefined || matcher === null) return false;
  if (typeof matcher === "boolean") return matcher;
  if (typeof matcher === "function") return matcher(date);
  if (matcher instanceof Date) return isSameDay(matcher, date);
  if (Array.isArray(matcher)) {
    return matcher.some((d) => isSameDay(d, date));
  }
  if (typeof matcher === "object") {
    const { from, to } = matcher;
    if (from && to) {
      return (
        (isAfter(date, from) || isSameDay(date, from)) &&
        (isBefore(date, to) || isSameDay(date, to))
      );
    }
    if (from) return isAfter(date, from) || isSameDay(date, from);
    if (to) return isBefore(date, to) || isSameDay(date, to);
  }
  return false;
}

export function isDateDisabled(
  date: Date,
  minDate?: Date | undefined,
  maxDate?: Date | undefined,
  customValidator?: ((d: Date) => boolean) | undefined,
  disabledMatchers?: Matcher | Matcher[] | undefined,
): boolean {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  if (customValidator && customValidator(date)) return true;

  if (disabledMatchers !== undefined) {
    if (Array.isArray(disabledMatchers)) {
      if (disabledMatchers.some((m) => matchDate(m, date))) return true;
    } else {
      if (matchDate(disabledMatchers, date)) return true;
    }
  }

  return false;
}

export function isDateInRange(
  date: Date,
  range: DateRange | null | undefined,
): boolean {
  if (!range || !range.from || !range.to) return false;
  const start = isBefore(range.from, range.to) ? range.from : range.to;
  const end = isBefore(range.from, range.to) ? range.to : range.from;
  return (
    isAfter(date, start) &&
    isBefore(date, end) &&
    !isSameDay(date, start) &&
    !isSameDay(date, end)
  );
}

export function isRangeStart(
  date: Date,
  range: DateRange | null | undefined,
): boolean {
  if (!range || !range.from) return false;
  const start =
    range.to && isBefore(range.to, range.from) ? range.to : range.from;
  return isSameDay(date, start);
}

export function isRangeEnd(
  date: Date,
  range: DateRange | null | undefined,
): boolean {
  if (!range || !range.to) return false;
  const end =
    range.from && isBefore(range.to, range.from) ? range.from : range.to;
  return isSameDay(date, end);
}

export function getCalendarGrid(
  year: number,
  month: number,
  options?: {
    showOutsideDays?: boolean | undefined;
    fixedWeeks?: boolean | undefined;
    weekStartsOn?: (0 | 1 | 2 | 3 | 4 | 5 | 6) | undefined;
  },
): CalendarCell[] {
  const showOutsideDays = options?.showOutsideDays ?? true;
  const fixedWeeks = options?.fixedWeeks ?? false;
  const weekStartsOn = options?.weekStartsOn ?? 0;

  const startWeekday = getFirstDayOfWeek(year, month, weekStartsOn);
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const prevMonthDate = new Date(year, month, 0);
  const prevDays = prevMonthDate.getDate();

  const cells: CalendarCell[] = [];

  // Previous month trailing days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = prevDays - i;
    const date = new Date(year, month - 1, day);
    cells.push({
      date,
      isOutside: true,
      dayNumber: day,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({
      date,
      isOutside: false,
      dayNumber: day,
    });
  }

  // Next month leading days
  const totalDays = cells.length;
  const rowsNeeded = fixedWeeks ? 6 : Math.ceil(totalDays / 7);
  const totalCellsNeeded = rowsNeeded * 7;
  const nextDaysNeeded = totalCellsNeeded - totalDays;

  for (let day = 1; day <= nextDaysNeeded; day++) {
    const date = new Date(year, month + 1, day);
    cells.push({
      date,
      isOutside: true,
      dayNumber: day,
    });
  }

  return showOutsideDays ? cells : cells.filter((c) => !c.isOutside);
}

export function formatDate(
  date: Date | null | undefined,
  customFormat?: ((d: Date) => string) | undefined,
): string {
  if (!date) return "";
  if (customFormat) return customFormat(date);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDate(
  str: string,
  customParse?: ((s: string) => Date | null) | undefined,
): Date | null {
  if (!str.trim()) return null;
  if (customParse) return customParse(str);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str.trim());
  if (!match) return null;
  const year = parseInt(match[1]!, 10);
  const month = parseInt(match[2]!, 10) - 1;
  const day = parseInt(match[3]!, 10);
  const parsed = new Date(year, month, day);
  if (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month &&
    parsed.getDate() === day
  ) {
    return parsed;
  }
  return null;
}

export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

