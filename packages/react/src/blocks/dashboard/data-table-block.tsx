import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/card/card";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { DataTable } from "../../components/data-table/data-table";
import type { DataTableColumn } from "../../components/data-table/data-table.types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/pagination/pagination";

export interface DataTableBlockProps<TData> {
  title?: string;
  description?: string;
  columns: DataTableColumn<TData>[];
  data: TData[];
  loading?: boolean;
  totalCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  onBulkDelete?: (selectedRows: TData[]) => void;
  onExport?: () => void;
  className?: string;
}

export function DataTableBlock<TData extends Record<string, any>>({
  title = "Data Management",
  description = "Manage and filter records across your workspace",
  columns,
  data,
  loading = false,
  totalCount = data.length,
  page = 1,
  pageSize = 10,
  onPageChange,
  onSearch,
  onSelectionChange,
  onBulkDelete,
  onExport,
  className,
}: DataTableBlockProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<TData[]>([]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onSearch?.(val);
  };

  const handleRowSelect = (rows: TData[]) => {
    setSelected(rows);
    onSelectionChange?.(rows);
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <Card className={className} elevated>
      <CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {selected.length > 0 && onBulkDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkDelete(selected)}
              >
                Delete Selected ({selected.length})
              </Button>
            )}
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                Export CSV
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Filter Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Core DataTable */}
        <DataTable
          columns={columns}
          data={data}
          selectable
          onSelectionChange={handleRowSelect}
        />

        {/* Footer / Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "var(--sora-text-sm, 0.875rem)",
              color: "var(--ui-muted-foreground, #71717a)",
            }}
          >
            Showing {data.length} of {totalCount} entries
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) onPageChange?.(page - 1);
                  }}
                  aria-disabled={page <= 1 || undefined}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === page}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange?.(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) onPageChange?.(page + 1);
                  }}
                  aria-disabled={page >= totalPages || undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
