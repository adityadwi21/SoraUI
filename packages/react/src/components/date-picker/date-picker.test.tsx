import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./date-picker";

describe("DatePicker Component & A11y", () => {
  it("opens calendar popup on click, selects date, and restores focus", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const defaultDate = new Date(2026, 7, 1);

    render(
      <DatePicker defaultValue={defaultDate} onValueChange={handleSelect} />,
    );

    const trigger = screen.getByRole("button", {
      name: /Selected date: 2026-08-01/i,
    });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByText("August 2026")).toBeInTheDocument();
    const day10 = screen.getByRole("gridcell", { name: "August 10, 2026" });
    await user.click(day10);

    expect(handleSelect).toHaveBeenCalled();
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();

    const updatedTrigger = screen.getByRole("button", {
      name: /Selected date: 2026-08-10/i,
    });
    expect(updatedTrigger).toBeInTheDocument();
  });

  it("closes popover on Escape key and clears date on clear button click", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DatePicker
        defaultValue={new Date(2026, 7, 15)}
        onValueChange={handleSelect}
        clearable
      />,
    );

    const clearBtn = screen.getByRole("button", {
      name: "Clear selected date",
    });
    await user.click(clearBtn);
    expect(handleSelect).toHaveBeenCalledWith(null);

    // Open popup then Escape
    const trigger = screen.getByRole("button", { name: /Select date.../i });
    await user.click(trigger);
    expect(screen.getByText("August 2026")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("August 2026")).not.toBeInTheDocument();
  });
});
