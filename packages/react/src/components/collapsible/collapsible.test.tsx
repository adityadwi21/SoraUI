import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';

describe('Collapsible Component & A11y', () => {
  it('toggles collapsible section content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle Details</CollapsibleTrigger>
        <CollapsibleContent>Hidden Content Revealed</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle Details' });
    expect(screen.queryByText('Hidden Content Revealed')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText('Hidden Content Revealed')).toBeInTheDocument();
  });
});