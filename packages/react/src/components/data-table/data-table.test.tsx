import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './data-table';

interface User {
  id: number;
  name: string;
  role: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', role: 'Developer' },
  { id: 2, name: 'Bob Smith', role: 'Designer' },
  { id: 3, name: 'Charlie Brown', role: 'Manager' },
  { id: 4, name: 'Diana Prince', role: 'Architect' },
];

const columns = [
  { header: 'ID', accessorKey: 'id' as keyof User, sortable: true },
  { header: 'Name', accessorKey: 'name' as keyof User, sortable: true },
  { header: 'Role', accessorKey: 'role' as keyof User },
];

describe('DataTable Component & A11y', () => {
  it('renders table data and filters with search input', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockUsers} columns={columns} />);

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Filter records...');
    await user.type(searchInput, 'Designer');

    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  it('cycles sorting asc -> desc -> none on sortable column headers and sets aria-sort', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockUsers} columns={columns} />);

    const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');

    // 1st click: Ascending
    await user.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

    // 2nd click: Descending
    await user.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');

    // 3rd click: Reset to none
    await user.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');
  });

  it('paginates data and disables boundary buttons', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockUsers} columns={columns} pageSize={2} />);

    expect(screen.getByText('Page 1 of 2 (4 records)')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: 'Previous' });
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    expect(prevBtn).toBeDisabled();

    await user.click(nextBtn);
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    expect(prevBtn).not.toBeDisabled();
  });

  it('handles row selection and select all checkbox', async () => {
    const user = userEvent.setup();
    const handleSelection = vi.fn();

    render(
      <DataTable
        data={mockUsers}
        columns={columns}
        selectable
        onSelectionChange={handleSelection}
        pageSize={4}
      />
    );

    const row1Check = screen.getByRole('checkbox', { name: 'Select row 1' });
    await user.click(row1Check);
    expect(handleSelection).toHaveBeenCalled();
    expect(handleSelection.mock.calls[0]?.[0]).toHaveLength(1);

    const selectAllCheck = screen.getByRole('checkbox', { name: 'Select all rows on page' });
    await user.click(selectAllCheck);
    expect(handleSelection).toHaveBeenLastCalledWith(mockUsers);
  });
});