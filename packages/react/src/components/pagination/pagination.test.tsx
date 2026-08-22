import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from './pagination';

describe('Pagination Component & A11y', () => {
  it('renders accessible pagination bar', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
  });
});