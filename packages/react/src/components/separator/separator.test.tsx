import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Separator } from './separator';
describe('Separator', () => {
  it('renders horizontal by default', () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });
  it('is decorative by default (role=presentation)', () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('[role="presentation"]')).toBeInTheDocument();
  });
  it('non-decorative has role=separator', () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
  });
});
