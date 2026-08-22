import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './typography';
describe('Typography', () => {
  it('renders h1 as h1 element', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('renders body as p element', () => {
    const { container } = render(<Typography variant="body">Body text</Typography>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });
  it('renders code with code tag', () => {
    const { container } = render(<Typography variant="code">const x = 1;</Typography>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });
  it('allows overriding tag with as prop', () => {
    const { container } = render(<Typography variant="h2" as="div">Custom tag</Typography>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
