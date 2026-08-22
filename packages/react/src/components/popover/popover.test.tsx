import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './popover';

describe('Popover', () => {
  it('toggles open on click', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Body</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: 'Open Popover' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toHaveTextContent('Popover Body');

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when PopoverClose is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>
          <p>Content</p>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key (a11y)', async () => {
    const user = userEvent.setup();
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on click outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover defaultOpen>
          <PopoverTrigger>Trigger</PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
        <button type="button">Outside Button</button>
      </div>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Outside Button' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});