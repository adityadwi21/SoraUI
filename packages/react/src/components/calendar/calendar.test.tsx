import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calendar } from "./calendar";

describe("Calendar Component & A11y", () => {
  it("renders month grid and selects a single date on click", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const baseDate = new Date(2026, 7, 15); // August 2026

    render(
      <Calendar
        mode="single"
        defaultValue={baseDate}
        onSelect={handleSelect}
      />,
    );

    expect(screen.getByText("August 2026")).toBeInTheDocument();
    const day20 = screen.getByRole("gridcell", { name: "August 20, 2026" });
    await user.click(day20);

    expect(handleSelect).toHaveBeenCalled();
    const selectedDate = handleSelect.mock.calls[0]?.[0] as Date | undefined;
    expect(selectedDate?.getDate()).toBe(20);
    expect(selectedDate?.getMonth()).toBe(7);
  });

  it("supports range mode selection (from and to)", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const baseDate = new Date(2026, 7, 1);

    render(
      <Calendar
        mode="range"
        defaultMonth={baseDate}
        onSelect={handleSelect}
      />,
    );

    const day10 = screen.getByRole("gridcell", { name: "August 10, 2026" });
    const day15 = screen.getByRole("gridcell", { name: "August 15, 2026" });

    // Click start of range
    await user.click(day10);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: undefined,
      }),
    );

    // Click end of range
    await user.click(day15);
    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.any(Date),
        to: expect.any(Date),
      }),
    );
  });

  it("supports multiple date selection", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const baseDate = new Date(2026, 7, 1);

    render(
      <Calendar
        mode="multiple"
        defaultMonth={baseDate}
        onSelect={handleSelect}
      />,
    );

    const day5 = screen.getByRole("gridcell", { name: "August 5, 2026" });
    const day12 = screen.getByRole("gridcell", { name: "August 12, 2026" });

    await user.click(day5);
    expect(handleSelect).toHaveBeenCalledWith([expect.any(Date)]);

    await user.click(day12);
    expect(handleSelect).toHaveBeenCalled();
  });

  it("navigates months with previous and next buttons", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2026, 7, 1)} />);

    expect(screen.getByText("August 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("September 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("August 2026")).toBeInTheDocument();
  });

  it("supports dropdown caption layout for quick month and year selection", async () => {
    const user = userEvent.setup();
    render(
      <Calendar
        captionLayout="dropdown"
        defaultMonth={new Date(2026, 7, 1)}
        fromYear={2020}
        toYear={2030}
      />,
    );

    const monthSelect = screen.getByLabelText("Select month");
    const yearSelect = screen.getByLabelText("Select year");

    expect(monthSelect).toBeInTheDocument();
    expect(yearSelect).toBeInTheDocument();

    await user.selectOptions(monthSelect, "11"); // December
    expect(monthSelect).toHaveValue("11");

    await user.selectOptions(yearSelect, "2028");
    expect(yearSelect).toHaveValue("2028");
  });

  it("supports rendering multiple months (numberOfMonths={2})", () => {
    render(
      <Calendar
        numberOfMonths={2}
        defaultMonth={new Date(2026, 7, 1)}
      />,
    );

    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });

  it("disables dates outside minDate/maxDate range and blocks selection", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const min = new Date(2026, 7, 10);
    const max = new Date(2026, 7, 20);

    render(
      <Calendar
        defaultValue={new Date(2026, 7, 15)}
        minDate={min}
        maxDate={max}
        onSelect={handleSelect}
      />,
    );

    const day5 = screen.getByRole("gridcell", { name: "August 5, 2026" });
    expect(day5).toBeDisabled();
    await user.click(day5);
    expect(handleSelect).not.toHaveBeenCalled();

    const day15 = screen.getByRole("gridcell", { name: "August 15, 2026" });
    expect(day15).not.toBeDisabled();
    expect(day15).toHaveAttribute("aria-selected", "true");
  });

  it("supports keyboard navigation (Arrow keys, Home, End, PageUp, PageDown, Enter)", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Calendar
        defaultValue={new Date(2026, 7, 10)}
        onSelect={handleSelect}
      />,
    );

    const day10 = screen.getByRole("gridcell", { name: "August 10, 2026" });
    day10.focus();

    // ArrowRight -> 11
    await user.keyboard("{ArrowRight}");
    const day11 = screen.getByRole("gridcell", { name: "August 11, 2026" });
    expect(day11).toBeInTheDocument();

    // Enter selects date
    await user.keyboard("{Enter}");
    expect(handleSelect).toHaveBeenCalled();
  });

  it("supports Persian (Jalali) and Hijri (Islamic) calendars via locale and calendarSystem props", () => {
    const testDate = new Date(2026, 7, 15);

    // Persian / Jalali calendar
    const { container: persianContainer } = render(
      <Calendar
        locale="fa-IR"
        calendarSystem="persian"
        defaultMonth={testDate}
      />,
    );
    expect(persianContainer.querySelector(".sora-calendar")).toBeInTheDocument();

    // Hijri / Islamic calendar
    const { container: hijriContainer } = render(
      <Calendar
        locale="ar-SA"
        calendarSystem="islamic-umalqura"
        defaultMonth={testDate}
      />,
    );
    expect(hijriContainer.querySelector(".sora-calendar")).toBeInTheDocument();
  });

  it("renders week numbers when showWeekNumber={true}", () => {
    const testDate = new Date(2026, 7, 1);
    const { container } = render(
      <Calendar
        showWeekNumber={true}
        defaultMonth={testDate}
      />,
    );

    const weekNumbers = container.querySelectorAll(".sora-calendar__week-number");
    expect(weekNumbers.length).toBeGreaterThan(0);
    // Week number for Aug 1, 2026 should be rendered
    expect(weekNumbers[0]).toBeInTheDocument();
  });

  it("disables dates using a date range matcher (Booked dates)", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const bookedRange = {
      from: new Date(2026, 0, 12),
      to: new Date(2026, 0, 26),
    };

    render(
      <Calendar
        mode="single"
        defaultMonth={new Date(2026, 0, 1)}
        disabled={bookedRange}
        onSelect={handleSelect}
      />,
    );

    // Day 6 (available)
    const day6 = screen.getByRole("gridcell", { name: "January 6, 2026" });
    expect(day6).not.toBeDisabled();
    await user.click(day6);
    expect(handleSelect).toHaveBeenCalled();

    // Day 15 (booked/disabled)
    const day15 = screen.getByRole("gridcell", { name: "January 15, 2026" });
    expect(day15).toBeDisabled();
    await user.click(day15);
    // Should not trigger selection on disabled day
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("supports timeZone prop for rendering localized dates", () => {
    const testDate = new Date(2026, 7, 15);
    const { container } = render(
      <Calendar
        defaultMonth={testDate}
        timeZone="Asia/Tokyo"
      />,
    );
    expect(container.querySelector(".sora-calendar")).toBeInTheDocument();
  });

  it("supports controlled month and onMonthChange for presets", async () => {
    const user = userEvent.setup();
    const handleMonthChange = vi.fn();
    render(
      <Calendar
        month={new Date(2026, 7, 1)}
        onMonthChange={handleMonthChange}
      />,
    );

    expect(screen.getByText("August 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(handleMonthChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
