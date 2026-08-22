import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

describe('Accordion', () => {
  it('toggles accordion item on click (single collapsible)', async () => {
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
      </Accordion>
    );

    const trigger1 = screen.getByRole('button', { name: /Section 1/ });
    const trigger2 = screen.getByRole('button', { name: /Section 2/ });

    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    await user.click(trigger2);

    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    // Collapse active item
    await user.click(trigger2);
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('supports multiple open items in multiple mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger2 = screen.getByRole('button', { name: /Section 2/ });
    await user.click(trigger2);

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});