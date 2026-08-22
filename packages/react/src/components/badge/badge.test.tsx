import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders badge text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it('passes additional attributes', () => {
    render(<Badge data-testid="badge-test">Beta</Badge>);
    expect(screen.getByTestId('badge-test')).toBeInTheDocument();
  });
});
