import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders trigger and shows tooltip content on hover', () => {
    render(
      <Tooltip delay={100}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Helpful info</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    act(() => {
      fireEvent.mouseEnter(trigger);
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful info');

    act(() => {
      fireEvent.mouseLeave(trigger);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on keyboard focus and links aria-describedby', () => {
    render(
      <Tooltip delay={50}>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Focused helper</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Focus me' });

    act(() => {
      fireEvent.focus(trigger);
      vi.advanceTimersByTime(50);
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);

    act(() => {
      fireEvent.blur(trigger);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
  });

  it('hides on Escape key (a11y)', () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Overlay</TooltipContent>
      </Tooltip>
    );

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});