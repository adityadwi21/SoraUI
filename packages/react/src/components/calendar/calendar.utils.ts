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

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function addMonths(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

export function isBefore(d1: Date, d2: Date): boolean {
  return d1.getTime() < d2.getTime();
}

export function isAfter(d1: Date, d2: Date): boolean {
  return d1.getTime() > d2.getTime();
}

export function isDateDisabled(
  date: Date,
  minDate?: Date | undefined,
  maxDate?: Date | undefined,
  customValidator?: ((d: Date) => boolean) | undefined,
): boolean {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (customValidator && customValidator(date)) return true;
  return false;
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
