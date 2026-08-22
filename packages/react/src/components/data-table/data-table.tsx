import { useState, useMemo, forwardRef, type ChangeEvent } from 'react';
import type { DataTableProps, DataTableColumn } from './data-table.types';

type SortDirection = 'asc' | 'desc' | null;

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export function DataTable<T extends Record<string, any>>({
  data = [],
  columns = [],
  pageSize: initialPageSize = 10,
  searchable = true,
  searchPlaceholder = 'Filter records...',
  selectable = false,
  getRowId,
  onSelectionChange,
  emptyText = 'No records found.',
  caption,
  className,
  ...props
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  // 1. Filter
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [data, searchQuery]);

  // 2. Sort
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // 3. Paginate
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (colKey: keyof T | undefined) => {
    if (!colKey) return;
    if (sortColumn !== colKey) {
      setSortColumn(colKey);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortColumn(null);
      setSortDirection(null);
    }
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const all = new Set<number>(paginatedData.map((_, i) => i));
      setSelectedIndices(all);
      const items: T[] = [];
      paginatedData.forEach((item) => items.push(item));
      onSelectionChange?.(items);
    } else {
      setSelectedIndices(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (index: number) => {
    const next = new Set(selectedIndices);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelectedIndices(next);
    const selectedRows: T[] = [];
    next.forEach((i) => {
      const item = paginatedData[i];
      if (item) selectedRows.push(item);
    });
    onSelectionChange?.(selectedRows);
  };

  return (
    <div className={cx('sora-data-table', className)} {...props}>
      {searchable && (
        <div className="sora-data-table__toolbar">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="sora-data-table__search"
            aria-label="Filter records"
          />
        </div>
      )}

      <div className="sora-data-table__wrapper">
        <table className="sora-data-table__table">
          {caption && <caption className="sora-data-table__caption">{caption}</caption>}
          <thead className="sora-data-table__thead">
            <tr>
              {selectable && (
                <th className="sora-data-table__th sora-data-table__th--checkbox">
                  <input
                    type="checkbox"
                    aria-label="Select all rows on page"
                    checked={
                      paginatedData.length > 0 &&
                      selectedIndices.size === paginatedData.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, idx) => {
                const isSorted = sortColumn === col.accessorKey;
                const ariaSort = !col.sortable
                  ? undefined
                  : isSorted
                  ? sortDirection === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none';

                return (
                  <th
                    key={col.id || idx}
                    aria-sort={ariaSort}
                    className={cx(
                      'sora-data-table__th',
                      col.sortable && 'sora-data-table__th--sortable'
                    )}
                    onClick={() => col.sortable && handleSort(col.accessorKey)}
                  >
                    <div className="sora-data-table__th-content">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="sora-data-table__sort-icon" aria-hidden="true">
                          {isSorted ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="sora-data-table__tbody">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="sora-data-table__empty"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const isSelected = selectedIndices.has(rowIdx);
                const rowKey = getRowId ? getRowId(row, rowIdx) : rowIdx;
                return (
                  <tr
                    key={rowKey}
                    className={cx(
                      'sora-data-table__tr',
                      isSelected && 'sora-data-table__tr--selected'
                    )}
                  >
                    {selectable && (
                      <td className="sora-data-table__td sora-data-table__td--checkbox">
                        <input
                          type="checkbox"
                          aria-label={`Select row ${rowIdx + 1}`}
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowIdx)}
                        />
                      </td>
                    )}
                    {columns.map((col, colIdx) => (
                      <td key={col.id || colIdx} className="sora-data-table__td">
                        {col.cell
                          ? col.cell(row, rowIdx)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? '')
                          : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="sora-data-table__pagination">
          <span className="sora-data-table__page-info">
            Page {currentPage} of {totalPages} ({sortedData.length} records)
          </span>
          <div className="sora-data-table__pagination-buttons">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="sora-data-table__page-btn"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="sora-data-table__page-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export type { DataTableProps, DataTableColumn };