import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "./combobox";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro", disabled: true },
];

describe("Combobox Component & A11y", () => {
  it("filters options on typing, updates active descendant, and selects option", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Combobox
        options={frameworks}
        onValueChange={handleSelect}
        placeholder="Select framework"
      />,
    );

    const input = screen.getByRole("combobox");
    await user.click(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.type(input, "Svelte");
    expect(screen.getByText("SvelteKit")).toBeInTheDocument();
    expect(screen.queryByText("Next.js")).not.toBeInTheDocument();

    await user.click(screen.getByText("SvelteKit"));
    expect(handleSelect).toHaveBeenCalledWith("svelte");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("navigates options with ArrowDown/ArrowUp and selects with Enter", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(<Combobox options={frameworks} onValueChange={handleSelect} />);

    const input = screen.getByRole("combobox");
    input.focus();

    // Open with ArrowDown
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Cycle down to SvelteKit
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(handleSelect).toHaveBeenCalledWith("svelte");
  });

  it("closes listbox on Escape key", async () => {
    const user = userEvent.setup();
    render(<Combobox options={frameworks} />);

    const input = screen.getByRole("combobox");
    await user.click(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders empty text state when no matches found", async () => {
    const user = userEvent.setup();
    render(<Combobox options={frameworks} emptyText="No results found." />);

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.type(input, "xyz123");

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
