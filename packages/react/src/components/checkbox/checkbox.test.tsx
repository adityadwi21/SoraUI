import React, { createRef } from "react";
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

  it("supports defaultChecked uncontrolled initial state", () => {
    render(<Checkbox aria-label="Subscribe" defaultChecked={true} />);
    const checkbox = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(checkbox).toBeChecked();
  });

  it("supports controlled checked mode", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(
      <Checkbox aria-label="Controlled" checked={false} onCheckedChange={handleChange} />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Controlled" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    // In controlled mode without state update in parent, it remains unchecked
    expect(checkbox).not.toBeChecked();

    rerender(
      <Checkbox aria-label="Controlled" checked={true} onCheckedChange={handleChange} />,
    );
    expect(checkbox).toBeChecked();
  });

  it("supports indeterminate state and sets native DOM property", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox", {
      name: "Select all",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("transitions from indeterminate to checked on click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Checkbox
        aria-label="Select all"
        defaultChecked="indeterminate"
        onCheckedChange={handleChange}
      />,
    );
    const checkbox = screen.getByRole("checkbox", {
      name: "Select all",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(checkbox.indeterminate).toBe(false);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("disables interaction when disabled is true", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Checkbox aria-label="Disabled" disabled onCheckedChange={handleChange} />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Disabled" });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("forwards ref to the underlying HTMLInputElement", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="With ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("checkbox");
  });

  it("supports keyboard navigation via Space key", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Checkbox aria-label="Keyboard" onCheckedChange={handleChange} />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "Keyboard" });

    checkbox.focus();
    expect(checkbox).toHaveFocus();

    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(true);

    await user.keyboard(" ");
    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("integrates seamlessly into native HTML forms", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form data-testid="test-form" onSubmit={handleSubmit}>
        <Checkbox name="newsletter" value="yes" defaultChecked />
        <button type="submit">Submit</button>
      </form>,
    );

    const form = screen.getByTestId("test-form") as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get("newsletter")).toBe("yes");
  });
});
