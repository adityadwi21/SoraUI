import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";

describe("Select", () => {
  it("opens options on trigger click and updates value on select", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select defaultValue="apple" onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    const bananaOption = screen.getByRole("option", { name: /banana/i });
    await user.click(bananaOption);

    expect(handleChange).toHaveBeenCalledWith("banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
