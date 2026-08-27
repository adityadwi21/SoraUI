import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("Accordion", () => {
  it("toggles accordion item on click (single collapsible)", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByRole("button", { name: /Section 1/ });
    const trigger2 = screen.getByRole("button", { name: /Section 2/ });

    expect(trigger1).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content 1").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("Content 2").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "true");

    await user.click(trigger2);

    expect(trigger2).toHaveAttribute("aria-expanded", "true");
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content 2").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("Content 1").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "true");

    // Collapse active item
    await user.click(trigger2);
    expect(trigger2).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Content 2").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "true");
  });

  it("supports multiple open items in multiple mode", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger2 = screen.getByRole("button", { name: /Section 2/ });
    await user.click(trigger2);

    expect(screen.getByText("Content 1").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("Content 2").closest(".sora-accordion__content")).toHaveAttribute("aria-hidden", "false");
  });

  it("supports keyboard navigation and correct aria-hidden/inert attributes", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Section 3</AccordionTrigger>
          <AccordionContent>Content 3</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const triggers = screen.getAllByRole("button");
    const trigger1 = triggers[0]!;
    const trigger2 = triggers[1]!;
    const trigger3 = triggers[2]!;

    // Check aria-hidden on content
    const content1 = screen.getByText("Content 1").parentElement?.parentElement;
    const content2 = screen.getByText("Content 2").parentElement?.parentElement;
    
    expect(content1).toHaveAttribute("aria-hidden", "false");
    expect(content1).toHaveAttribute("data-state", "open");
    expect(content1).not.toHaveAttribute("inert");

    expect(content2).toHaveAttribute("aria-hidden", "true");
    expect(content2).toHaveAttribute("data-state", "closed");
    expect(content2).toHaveAttribute("inert");

    // Keyboard Navigation Test
    trigger1.focus();
    expect(trigger1).toHaveFocus();

    // Arrow Down moves to trigger 2
    await user.keyboard("{ArrowDown}");
    expect(trigger2).toHaveFocus();

    // Arrow Right moves to trigger 3
    await user.keyboard("{ArrowRight}");
    expect(trigger3).toHaveFocus();

    // Arrow Down at the end wraps to trigger 1
    await user.keyboard("{ArrowDown}");
    expect(trigger1).toHaveFocus();

    // Arrow Up at the beginning wraps to trigger 3
    await user.keyboard("{ArrowUp}");
    expect(trigger3).toHaveFocus();

    // Home moves to trigger 1
    await user.keyboard("{Home}");
    expect(trigger1).toHaveFocus();

    // End moves to trigger 3
    await user.keyboard("{End}");
    expect(trigger3).toHaveFocus();
  });
});
