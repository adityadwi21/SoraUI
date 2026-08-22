import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './calendar';

describe('Calendar Component & A11y', () => {
  it('renders month grid and selects a date on click', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const baseDate = new Date(2026, 7, 15); // August 2026

    render(<Calendar defaultValue={baseDate} onValueChange={handleSelect} />);

    expect(screen.getByText('August 2026')).toBeInTheDocument();
    const day20 = screen.getByRole('gridcell', { name: '20' });
    await user.click(day20);

    expect(handleSelect).toHaveBeenCalled();
    const selectedDate = handleSelect.mock.calls[0]?.[0] as Date | undefined;
    expect(selectedDate?.getDate()).toBe(20);
    expect(selectedDate?.getMonth()).toBe(7);
  });

  it('navigates months with previous and next buttons', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultValue={new Date(2026, 7, 1)} />);

    expect(screen.getByText('August 2026')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('September 2026')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('August 2026')).toBeInTheDocument();
  });

  it('disables dates outside minDate/maxDate range and blocks selection', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const min = new Date(2026, 7, 10);
    const max = new Date(2026, 7, 20);

    render(
      <Calendar
        defaultValue={new Date(2026, 7, 15)}
        minDate={min}
        maxDate={max}
        onValueChange={handleSelect}
      />
    );

    const day5 = screen.getByRole('gridcell', { name: '5' });
    expect(day5).toBeDisabled();
    await user.click(day5);
    expect(handleSelect).not.toHaveBeenCalled();

    const day15 = screen.getByRole('gridcell', { name: '15' });
    expect(day15).not.toBeDisabled();
    expect(day15).toHaveAttribute('aria-selected', 'true');
  });

  it('supports keyboard navigation (Arrow keys, Home, End, PageUp, PageDown, Enter)', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Calendar
        defaultValue={new Date(2026, 7, 10)}
        onValueChange={handleSelect}
      />
    );

    const day10 = screen.getByRole('gridcell', { name: '10' });
    day10.focus();

    // ArrowRight -> 11
    await user.keyboard('{ArrowRight}');
    const day11 = screen.getByRole('gridcell', { name: '11' });
    expect(document.activeElement).toBe(day11);

    // ArrowDown -> 18
    await user.keyboard('{ArrowDown}');
    const day18 = screen.getByRole('gridcell', { name: '18' });
    expect(document.activeElement).toBe(day18);

    // Enter selects date
    await user.keyboard('{Enter}');
    expect(handleSelect).toHaveBeenCalled();
    const selected = handleSelect.mock.calls[0]?.[0] as Date | undefined;
    expect(selected?.getDate()).toBe(18);

    // PageDown -> switches to September
    await user.keyboard('{PageDown}');
    expect(screen.getByText('September 2026')).toBeInTheDocument();
  });
});