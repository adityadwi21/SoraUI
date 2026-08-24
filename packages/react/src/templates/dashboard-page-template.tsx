import React, { type ReactNode } from "react";
import {
  DashboardShell,
  type DashboardShellProps,
} from "../blocks/dashboard/dashboard-shell";
import {
  MetricGrid,
  type MetricGridProps,
} from "../blocks/dashboard/metric-grid";
import {
  DataTableBlock,
  type DataTableBlockProps,
} from "../blocks/dashboard/data-table-block";

export interface DashboardPageTemplateProps<TData extends Record<string, any>> {
  shellProps: Omit<DashboardShellProps, "children">;
  metricsProps: MetricGridProps;
  tableProps: DataTableBlockProps<TData>;
  headerTitle?: string;
  headerDescription?: string;
  extraContent?: ReactNode;
}

export function DashboardPageTemplate<TData extends Record<string, any>>({
  shellProps,
  metricsProps,
  tableProps,
  headerTitle = "Overview",
  headerDescription = "Welcome back! Here is a summary of your workspace performance.",
  extraContent,
}: DashboardPageTemplateProps<TData>) {
  return (
    <DashboardShell {...shellProps}>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: "0 0 0.25rem 0",
              color: "var(--ui-foreground, #0c1a2b)",
            }}
          >
            {headerTitle}
          </h1>
          <p
            style={{
              color: "var(--ui-muted-foreground, #71717a)",
              margin: 0,
              fontSize: "var(--sora-text-sm, 0.875rem)",
            }}
          >
            {headerDescription}
          </p>
        </div>

        <MetricGrid {...metricsProps} />

        {extraContent}

        <DataTableBlock {...tableProps} />
      </div>
    </DashboardShell>
  );
}
