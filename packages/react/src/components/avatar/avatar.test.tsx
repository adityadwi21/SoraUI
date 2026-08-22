import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar Component & A11y', () => {
  it('renders fallback text when image fails or is absent', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});