import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input — Rendering', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

describe('Input — Error State', () => {
  it('applies aria-invalid when error is true', () => {
    render(<Input error aria-label="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Input — Keyboard (a11y)', () => {
  it('can be focused via keyboard', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="username" />);
    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="username" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
});
