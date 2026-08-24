import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./navigation-menu";

describe("NavigationMenu Component & A11y", () => {
  it("opens and closes dropdown panel on click", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <a href="/components">Components</a>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByRole("button", { name: /Products/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Components")).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Components")).not.toBeInTheDocument();
  });

  it("closes dropdown content on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <span>Guide Content</span>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByRole("button", { name: /Docs/i });
    await user.click(trigger);
    expect(screen.getByText("Guide Content")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Guide Content")).not.toBeInTheDocument();
  });
});
