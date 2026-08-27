import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
} from "./combobox";
import type { ComboboxOption } from "./combobox.types";

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js", disabled: true },
  { value: "remix", label: "Remix", description: "Full stack web framework" },
];

describe("Combobox Component & Composable Architecture", () => {
  it("renders monolithic sugar with options and interacts cleanly", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Combobox
        options={frameworks}
        placeholder="Select framework..."
        onValueChange={handleSelect}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("placeholder", "Select framework...");

    // Click input to open
    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Next.js");

    // Click an option
    await user.click(options[0]!);
    expect(handleSelect).toHaveBeenCalledWith("next");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("renders composable subcomponents with function children in ComboboxList", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    const items = ["React", "Vue", "Angular", "Svelte"];

    render(
      <Combobox items={items} onValueChange={handleSelect}>
        <ComboboxInput placeholder="Choose library..." />
        <ComboboxContent>
          <ComboboxEmpty>No match found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole("combobox");
    await user.click(input);

    const itemsRendered = screen.getAllByRole("option");
    expect(itemsRendered).toHaveLength(4);
    expect(itemsRendered[1]).toHaveTextContent("Vue");

    await user.click(itemsRendered[1]!);
    expect(handleSelect).toHaveBeenCalledWith("Vue");
  });

  it("handles object items and custom itemToStringValue", async () => {
    const user = userEvent.setup();
    const members = [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ];

    render(
      <Combobox
        items={members}
        itemToStringValue={(m) => m.name}
        defaultValue={members[0]}
      >
        <ComboboxInput placeholder="Assignee..." />
        <ComboboxContent>
          <ComboboxList>
            {(member) => (
              <ComboboxItem key={member.id} value={member}>
                <span>{member.name}</span>
                <span>{member.email}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole("combobox") as HTMLInputElement;
    expect(input.value).toBe("Alice");

    await user.click(input);
    await user.type(input, "Bob");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("Bob");
  });

  it("supports ComboboxGroup and links aria-labelledby with ComboboxLabel", async () => {
    const user = userEvent.setup();

    render(
      <Combobox>
        <ComboboxInput placeholder="Categorized..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Frontend</ComboboxLabel>
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>Backend</ComboboxLabel>
              <ComboboxItem value="node">Node.js</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const input = screen.getByRole("combobox");
    await user.click(input);

    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(2);

    const labelId = groups[0]!.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();

    const labelEl = document.getElementById(labelId!);
    expect(labelEl).toHaveTextContent("Frontend");
  });

  it("handles autoHighlight={false} (default) vs autoHighlight={true} on query change and Enter key", async () => {
    const user = userEvent.setup();
    const handleSelectDefault = vi.fn();

    // 1. autoHighlight={false} (default) -> typing query does NOT auto-highlight index 0
    const { unmount } = render(
      <Combobox items={["Alpha", "Beta", "Gamma"]} onValueChange={handleSelectDefault}>
        <ComboboxInput placeholder="Search..." />
        <ComboboxContent>
          <ComboboxList>
            {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const inputDefault = screen.getByRole("combobox");
    await user.click(inputDefault);
    await user.type(inputDefault, "Bet");
    await user.keyboard("{Enter}");
    expect(handleSelectDefault).not.toHaveBeenCalled();

    unmount();

    // 2. autoHighlight={true} -> typing query auto-highlights index 0, Enter selects it
    const handleSelectAuto = vi.fn();
    render(
      <Combobox items={["Alpha", "Beta", "Gamma"]} autoHighlight onValueChange={handleSelectAuto}>
        <ComboboxInput placeholder="Search..." />
        <ComboboxContent>
          <ComboboxList>
            {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const inputAuto = screen.getByRole("combobox");
    await user.click(inputAuto);
    await user.type(inputAuto, "Bet");
    await user.keyboard("{Enter}");
    expect(handleSelectAuto).toHaveBeenCalledWith("Beta");
  });

  it("supports popup mode with ComboboxTrigger button", async () => {
    const user = userEvent.setup();

    render(
      <Combobox items={["Option A", "Option B"]}>
        <ComboboxTrigger>Open Popup</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Search within popup..." />
          <ComboboxList>
            {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );

    const triggerBtn = screen.getByRole("button", { name: "Open Popup" });
    expect(triggerBtn).toHaveAttribute("aria-expanded", "false");

    await user.click(triggerBtn);
    expect(triggerBtn).toHaveAttribute("aria-expanded", "true");

    const innerInput = screen.getByRole("combobox");
    expect(innerInput).toBeInTheDocument();
  });

  it("clears selection with X button and Backspace when search query is empty", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Combobox
        options={frameworks}
        defaultValue="next"
        clearable
        onValueChange={handleSelect}
      />
    );

    const clearBtn = screen.getByRole("button", { name: "Clear selection" });
    expect(clearBtn).toBeInTheDocument();

    await user.click(clearBtn);
    expect(handleSelect).toHaveBeenCalledWith(undefined);

    // Keyboard backspace clear test
    const input = screen.getByRole("combobox") as HTMLInputElement;
    await user.click(input);
    await user.keyboard("{Backspace}");
    expect(handleSelect).toHaveBeenCalledWith(undefined);
  });

  it("propagates dir attribute to the root container and portal listbox", async () => {
    const user = userEvent.setup();
    const { container } = render(<Combobox options={frameworks} dir="rtl" />);

    const root = container.querySelector(".sora-combobox");
    expect(root).toHaveAttribute("dir", "rtl");

    const input = screen.getByRole("combobox");
    await user.click(input);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("dir", "rtl");
  });

  it("displays invalid state when aria-invalid is true", () => {
    const { container } = render(
      <Combobox>
        <ComboboxInput aria-invalid="true" />
      </Combobox>
    );

    const trigger = container.querySelector(".sora-combobox__trigger");
    expect(trigger).toHaveClass("sora-combobox--invalid");
  });

  it("respects disabled state on root or input", async () => {
    const user = userEvent.setup();
    render(<Combobox options={frameworks} disabled />);

    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();

    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
