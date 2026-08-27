import React, { createRef, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

describe("Collapsible Component & A11y", () => {
  it("toggles collapsible section content on trigger click (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden Content Revealed</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Toggle Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(
      screen.queryByText("Hidden Content Revealed"),
    ).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Hidden Content Revealed")).toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText("Hidden Content Revealed"),
    ).not.toBeInTheDocument();
  });

  it("supports defaultOpen initial state", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
        <CollapsibleContent>Visible Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Toggle Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Visible Content")).toBeInTheDocument();
  });

  it("supports controlled open mode with onOpenChange callback", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    function ControlledDemo() {
      const [open, setOpen] = useState(false);
      return (
        <Collapsible
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            handleOpenChange(next);
          }}
        >
          <CollapsibleTrigger>Controlled Trigger</CollapsibleTrigger>
          <CollapsibleContent>Controlled Body</CollapsibleContent>
        </Collapsible>
      );
    }

    render(<ControlledDemo />);
    const trigger = screen.getByRole("button", { name: "Controlled Trigger" });
    expect(screen.queryByText("Controlled Body")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Controlled Body")).toBeInTheDocument();

    await user.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText("Controlled Body")).not.toBeInTheDocument();
  });

  it("supports asChild on CollapsibleTrigger and forwards state", async () => {
    const user = userEvent.setup();
    const handleChildClick = vi.fn();

    render(
      <Collapsible>
        <CollapsibleTrigger asChild className="trigger-extra">
          <button
            type="button"
            className="custom-btn"
            data-testid="custom-trigger"
            onClick={handleChildClick}
          >
            Custom Button
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>Collapsible Body</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByTestId("custom-trigger");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveClass("custom-btn", "trigger-extra");

    await user.click(trigger);
    expect(handleChildClick).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByText("Collapsible Body")).toBeInTheDocument();
  });

  it("prevents toggling when CollapsibleTrigger is disabled", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Collapsible onOpenChange={handleOpenChange}>
        <CollapsibleTrigger disabled>Disabled Trigger</CollapsibleTrigger>
        <CollapsibleContent>Secret Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Disabled Trigger" });
    expect(trigger).toBeDisabled();

    await user.click(trigger);
    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Secret Content")).not.toBeInTheDocument();
  });

  it("forwards ref to Collapsible, CollapsibleTrigger, and CollapsibleContent", () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Collapsible ref={rootRef} defaultOpen>
        <CollapsibleTrigger ref={triggerRef}>Trigger</CollapsibleTrigger>
        <CollapsibleContent ref={contentRef}>Content</CollapsibleContent>
      </Collapsible>,
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports keyboard interaction via Space and Enter keys on trigger button", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Keyboard Trigger</CollapsibleTrigger>
        <CollapsibleContent>Keyboard Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Keyboard Trigger" });
    trigger.focus();
    expect(trigger).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByText("Keyboard Content")).toBeInTheDocument();

    await user.keyboard(" ");
    expect(screen.queryByText("Keyboard Content")).not.toBeInTheDocument();
  });

  it("cascades disabled state from root Collapsible to trigger", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Collapsible disabled onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Root Disabled Trigger</CollapsibleTrigger>
        <CollapsibleContent>Secret Content</CollapsibleContent>
      </Collapsible>,
    );

    const trigger = screen.getByRole("button", { name: "Root Disabled Trigger" });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("data-disabled");

    await user.click(trigger);
    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(screen.queryByText("Secret Content")).not.toBeInTheDocument();
  });
});
