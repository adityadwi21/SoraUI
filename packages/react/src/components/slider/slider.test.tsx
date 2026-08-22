import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './slider';

describe('Slider Component & A11y', () => {
  it('handles keyboard adjustments and updates aria-valuenow', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Slider defaultValue={50} min={0} max={100} step={5} onValueChange={handleChange} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');

    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith(55);

    await user.keyboard('{ArrowDown}');
    expect(handleChange).toHaveBeenCalledWith(50);
  });
});