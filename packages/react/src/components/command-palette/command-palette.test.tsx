import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandPalette, CommandItem } from "./command-palette";

describe("CommandPalette Component & A11y", () => {
  it("opens palette, renders search input, and selects command item", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <CommandPalette open={true}>
        <CommandItem onSelect={handleSelect}>Search Docs</CommandItem>
      </CommandPalette>,
    );

    expect(
      screen.getByRole("dialog", { name: "Command palette" }),
    ).toBeInTheDocument();
    const item = screen.getByRole("option", { name: "Search Docs" });
    await user.click(item);

    expect(handleSelect).toHaveBeenCalled();
  });

  it("toggles open state on global Cmd+K or Ctrl+K keydown", () => {
    const handleOpenChange = vi.fn();
    render(<CommandPalette open={false} onOpenChange={handleOpenChange} />);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true }),
    );
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes on Escape key press", () => {
    const handleOpenChange = vi.fn();
    render(
      <CommandPalette open={true} onOpenChange={handleOpenChange}>
        <CommandItem>Option 1</CommandItem>
      </CommandPalette>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not trigger onSelect when item is disabled", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <CommandPalette open={true}>
        <CommandItem disabled onSelect={handleSelect}>
          Disabled Item
        </CommandItem>
      </CommandPalette>,
    );

    const item = screen.getByRole("option", { name: "Disabled Item" });
    expect(item).toHaveAttribute("aria-disabled", "true");
    await user.click(item);
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
