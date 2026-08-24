import type { ReactNode, HTMLAttributes } from "react";

export interface DataTableColumn<T> {
  id?: string | undefined;
  header: ReactNode;
  accessorKey?: keyof T | undefined;
  cell?: ((row: T, index: number) => ReactNode) | undefined;
  sortable?: boolean | undefined;
  filterable?: boolean | undefined;
}

export interface DataTableProps<T> extends HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number | undefined;
  searchable?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  selectable?: boolean | undefined;
  getRowId?: ((row: T, index: number) => string | number) | undefined;
  onSelectionChange?: ((selectedRows: T[]) => void) | undefined;
  emptyText?: ReactNode | undefined;
  caption?: string | undefined;
}
