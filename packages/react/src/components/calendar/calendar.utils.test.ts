import { describe, it, expect } from "vitest";
import {
  isSameDay,
  isSameMonth,
  getDaysInMonth,
  getFirstDayOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  isDateDisabled,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  matchDate,
  getCalendarGrid,
  getWeekdayNames,
  formatDate,
  parseDate,
} from "./calendar.utils";

describe("Calendar Date Engine Utilities", () => {
  it("correctly compares same day and month", () => {
    const d1 = new Date(2026, 7, 22, 10, 0);
    const d2 = new Date(2026, 7, 22, 18, 30);
    const d3 = new Date(2026, 7, 23);
    const d4 = new Date(2026, 8, 22);

    expect(isSameDay(d1, d2)).toBe(true);
    expect(isSameDay(d1, d3)).toBe(false);
    expect(isSameDay(null, d1)).toBe(false);

    expect(isSameMonth(d1, d2)).toBe(true);
    expect(isSameMonth(d1, d4)).toBe(false);
  });

  it("calculates days in month correctly (including leap years)", () => {
    expect(getDaysInMonth(2026, 1)).toBe(28); // Feb 2026
    expect(getDaysInMonth(2024, 1)).toBe(29); // Feb 2024 (leap)
    expect(getDaysInMonth(2026, 7)).toBe(31); // Aug 2026
  });

  it("handles month additions and boundaries", () => {
    const start = new Date(2026, 7, 1);
    const nextMonth = addMonths(start, 1);
    expect(nextMonth.getMonth()).toBe(8); // September

    expect(startOfMonth(start).getDate()).toBe(1);
    expect(endOfMonth(start).getDate()).toBe(31);
  });

  it("validates min, max, custom predicates, and matchers", () => {
    const min = new Date(2026, 7, 10);
    const max = new Date(2026, 7, 20);

    expect(isDateDisabled(new Date(2026, 7, 5), min, max)).toBe(true);
    expect(isDateDisabled(new Date(2026, 7, 15), min, max)).toBe(false);
    expect(isDateDisabled(new Date(2026, 7, 25), min, max)).toBe(true);
    expect(
      isDateDisabled(
        new Date(2026, 7, 15),
        min,
        max,
        (d) => d.getDate() === 15,
      ),
    ).toBe(true);

    // Matcher array test
    expect(
      matchDate([new Date(2026, 7, 12), new Date(2026, 7, 18)], new Date(2026, 7, 18)),
    ).toBe(true);

    // Matcher range test
    expect(
      matchDate({ from: new Date(2026, 7, 1), to: new Date(2026, 7, 5) }, new Date(2026, 7, 3)),
    ).toBe(true);
  });

  it("identifies date ranges, start, and end correctly", () => {
    const range = {
      from: new Date(2026, 7, 10),
      to: new Date(2026, 7, 15),
    };

    expect(isRangeStart(new Date(2026, 7, 10), range)).toBe(true);
    expect(isRangeEnd(new Date(2026, 7, 15), range)).toBe(true);
    expect(isDateInRange(new Date(2026, 7, 12), range)).toBe(true);
    expect(isDateInRange(new Date(2026, 7, 10), range)).toBe(false);
    expect(isDateInRange(new Date(2026, 7, 15), range)).toBe(false);
    expect(isDateInRange(new Date(2026, 7, 18), range)).toBe(false);
  });

  it("generates calendar grids with outside days and fixed weeks", () => {
    const grid = getCalendarGrid(2026, 7, { showOutsideDays: true, fixedWeeks: true });
    expect(grid.length).toBe(42); // 6 rows * 7 days
    const currentMonthDays = grid.filter((c) => !c.isOutside);
    expect(currentMonthDays.length).toBe(31); // Aug has 31 days
  });

  it("shifts weekday headers with weekStartsOn", () => {
    const sunStart = getWeekdayNames(0);
    expect(sunStart[0]).toBe("Su");

    const monStart = getWeekdayNames(1);
    expect(monStart[0]).toBe("Mo");
    expect(monStart[6]).toBe("Su");
  });

  it("formats and parses ISO YYYY-MM-DD strings", () => {
    const date = new Date(2026, 7, 22);
    expect(formatDate(date)).toBe("2026-08-22");
    expect(formatDate(null)).toBe("");

    const parsed = parseDate("2026-08-22");
    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2026);
    expect(parsed?.getMonth()).toBe(7);
    expect(parsed?.getDate()).toBe(22);

    expect(parseDate("invalid")).toBeNull();
  });
});
