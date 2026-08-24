import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from "./dropdown";

describe("Dropdown", () => {
  it("opens menu on trigger click and activates items", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Dropdown>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Account</DropdownLabel>
          <DropdownItem onClick={handleSelect}>Profile</DropdownItem>
          <DropdownSeparator />
          <DropdownItem destructive>Delete</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = screen.getByRole("button", { name: "Options" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();

    const profileItem = screen.getByRole("menuitem", { name: "Profile" });
    await user.click(profileItem);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation via ArrowDown and ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const menu = screen.getByRole("menu");
    menu.focus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Item 1" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Item 2" })).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Item 1" })).toHaveFocus();
  });
});
