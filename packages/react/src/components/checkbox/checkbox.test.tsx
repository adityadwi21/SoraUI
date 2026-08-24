import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox Component & A11y", () => {
  it("toggles checked state on user click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Checkbox aria-label="Accept terms" onCheckedChange={handleChange} />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(true);

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("supports indeterminate state", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox", {
      name: "Select all",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });
});
