import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP } from './input-otp';

describe('InputOTP Component & A11y', () => {
  it('advances focus on digit entry and updates value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<InputOTP length={4} onValueChange={handleChange} />);

    const slot1 = screen.getByRole('textbox', { name: 'Digit 1 of 4' });
    const slot2 = screen.getByRole('textbox', { name: 'Digit 2 of 4' });

    slot1.focus();
    await user.keyboard('1');
    expect(document.activeElement).toBe(slot2);

    await user.keyboard('2');
    expect(handleChange).toHaveBeenCalledWith('12');
  });
});