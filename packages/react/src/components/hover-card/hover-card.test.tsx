import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';

describe('HoverCard Component & A11y', () => {
  it('opens card preview on mouse enter after delay', async () => {
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger>@soraui</HoverCardTrigger>
        <HoverCardContent>Next-Gen UI System</HoverCardContent>
      </HoverCard>
    );

    const trigger = screen.getByText('@soraui');
    fireEvent.mouseEnter(trigger);

    await new Promise((r) => setTimeout(r, 20));
    expect(screen.getByText('Next-Gen UI System')).toBeInTheDocument();
  });
});