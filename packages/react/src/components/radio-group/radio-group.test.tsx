import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup Component & A11y", () => {
  it("selects radio options and updates value on click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup defaultValue="opt1" onValueChange={handleChange}>
        <RadioGroupItem value="opt1">Option 1</RadioGroupItem>
        <RadioGroupItem value="opt2">Option 2</RadioGroupItem>
      </RadioGroup>,
    );

    const opt1 = screen.getByRole("radio", { name: "Option 1" });
    const opt2 = screen.getByRole("radio", { name: "Option 2" });

    expect(opt1).toBeChecked();
    expect(opt2).not.toBeChecked();

    await user.click(opt2);
    expect(opt2).toBeChecked();
    expect(opt1).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith("opt2");
  });
});
