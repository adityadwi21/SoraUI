import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';
describe('Textarea', () => {
  it('renders', () => { render(<Textarea aria-label="notes" />); expect(screen.getByRole('textbox')).toBeInTheDocument(); });
  it('sets aria-invalid on error', () => { render(<Textarea error aria-label="notes" />); expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true'); });
  it('is disabled', () => { render(<Textarea disabled aria-label="notes" />); expect(screen.getByRole('textbox')).toBeDisabled(); });
});
