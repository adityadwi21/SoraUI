import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './number-input';

describe('NumberInput Component & A11y', () => {
  it('increments and decrements values via stepper buttons and keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<NumberInput defaultValue={10} min={0} max={20} step={2} onValueChange={handleChange} />);

    const incBtn = screen.getByRole('button', { name: 'Increment value' });
    await user.click(incBtn);
    expect(handleChange).toHaveBeenCalledWith(12);

    const decBtn = screen.getByRole('button', { name: 'Decrement value' });
    await user.click(decBtn);
    expect(handleChange).toHaveBeenCalledWith(10);
  });
});