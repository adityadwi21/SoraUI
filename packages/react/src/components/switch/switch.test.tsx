import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './switch';

describe('Switch Component & A11y', () => {
  it('toggles switch state on click and space key', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Switch aria-label="Dark mode toggle" onCheckedChange={handleChange} />);

    const switchBtn = screen.getByRole('switch', { name: 'Dark mode toggle' });
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');

    await user.click(switchBtn);
    expect(switchBtn).toHaveAttribute('aria-checked', 'true');
    expect(handleChange).toHaveBeenCalledWith(true);

    switchBtn.focus();
    await user.keyboard(' ');
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});