import { describe, it, expect } from 'vitest';
import {
  isSameDay,
  getDaysInMonth,
  getFirstDayOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  isDateDisabled,
  formatDate,
  parseDate,
} from './calendar.utils';

describe('Calendar Date Engine Utilities', () => {
  it('correctly compares same day', () => {
    const d1 = new Date(2026, 7, 22, 10, 0);
    const d2 = new Date(2026, 7, 22, 18, 30);
    const d3 = new Date(2026, 7, 23);

    expect(isSameDay(d1, d2)).toBe(true);
    expect(isSameDay(d1, d3)).toBe(false);
    expect(isSameDay(null, d1)).toBe(false);
  });

  it('calculates days in month correctly (including leap years)', () => {
    expect(getDaysInMonth(2026, 1)).toBe(28); // Feb 2026
    expect(getDaysInMonth(2024, 1)).toBe(29); // Feb 2024 (leap)
    expect(getDaysInMonth(2026, 7)).toBe(31); // Aug 2026
  });

  it('handles month additions and boundaries', () => {
    const start = new Date(2026, 7, 1);
    const nextMonth = addMonths(start, 1);
    expect(nextMonth.getMonth()).toBe(8); // September

    expect(startOfMonth(start).getDate()).toBe(1);
    expect(endOfMonth(start).getDate()).toBe(31);
  });

  it('validates min, max, and custom disabled date predicates', () => {
    const min = new Date(2026, 7, 10);
    const max = new Date(2026, 7, 20);

    expect(isDateDisabled(new Date(2026, 7, 5), min, max)).toBe(true);
    expect(isDateDisabled(new Date(2026, 7, 15), min, max)).toBe(false);
    expect(isDateDisabled(new Date(2026, 7, 25), min, max)).toBe(true);
    expect(isDateDisabled(new Date(2026, 7, 15), min, max, (d) => d.getDate() === 15)).toBe(true);
  });

  it('formats and parses ISO YYYY-MM-DD strings', () => {
    const date = new Date(2026, 7, 22);
    expect(formatDate(date)).toBe('2026-08-22');
    expect(formatDate(null)).toBe('');

    const parsed = parseDate('2026-08-22');
    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2026);
    expect(parsed?.getMonth()).toBe(7);
    expect(parsed?.getDate()).toBe(22);

    expect(parseDate('invalid')).toBeNull();
  });
});