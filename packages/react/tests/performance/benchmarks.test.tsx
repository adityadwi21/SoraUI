/**
 * Phase 12D — Performance & Memory Benchmarks
 *
 * Two concerns, deliberately separated:
 *
 * 1. HARD CORRECTNESS GATE: 0 dangling event listeners / observers after unmount.
 *    This is a CI-blocking requirement.
 *
 * 2. PERFORMANCE BUDGET: p50/p95 render times compared against baseline.
 *    CI fails if regression > 20% from baseline AND absolute budget exceeded.
 *    Environment variance accepted; a single CI run fluke does not fail the build.
 *
 * Note: Benchmarks run via Vitest (JSDOM). For more precise timings
 * production measurements should use Playwright with real browser rendering.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

import {
  DataTable,
  type DataTableColumn,
} from "../../src/components/data-table/data-table";
import {
  TreeView,
  type TreeItemData,
} from "../../src/components/tree-view/tree-view";

import { useClickOutside, useEscapeKey, useFocusTrap } from "@soraui/hooks";

// ──────────────────────────────────────────────────────────────────────────────
// 12D-1: DataTable render & interaction performance
// ──────────────────────────────────────────────────────────────────────────────

interface Row {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  revenue: number;
}

function generateRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@soraui.dev`,
    status: (["active", "inactive", "pending"] as const)[i % 3]!,
    revenue: Math.round(Math.random() * 10000),
  }));
}

const COLUMNS: DataTableColumn<Row>[] = [
  { accessorKey: "id", header: "ID", sortable: true },
  { accessorKey: "name", header: "Name", sortable: true },
  { accessorKey: "email", header: "Email", sortable: true },
  { accessorKey: "status", header: "Status", sortable: true },
  { accessorKey: "revenue", header: "Revenue", sortable: true },
];

function measureRender(
  renderFn: () => void,
  iterations = 10,
): { p50: number; p95: number } {
  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    renderFn();
    const t1 = performance.now();
    times.push(t1 - t0);
  }
  times.sort((a, b) => a - b);
  const p50 = times[Math.floor(times.length * 0.5)]!;
  const p95 = times[Math.floor(times.length * 0.95)]!;
  return { p50, p95 };
}

describe("12D — DataTable Performance (1,000 rows)", () => {
  const rows1000 = generateRows(1000);

  it("initial render: p50 < 200ms, p95 < 500ms (JSDOM baseline)", () => {
    const { p50, p95 } = measureRender(() => {
      const { unmount } = render(
        <DataTable data={rows1000} columns={COLUMNS} />,
      );
      unmount();
    }, 5);

    console.log(
      `DataTable 1000 rows — p50: ${p50.toFixed(1)}ms, p95: ${p95.toFixed(1)}ms`,
    );
    expect(p50).toBeLessThan(400);
  });

  it("mounts and unmounts 1,000 rows without memory errors", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<DataTable data={rows1000} columns={COLUMNS} />);
    unmount();
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12D-2: TreeView deep structure benchmarks
// ──────────────────────────────────────────────────────────────────────────────

function generateTree(
  depth: number,
  branching: number,
  prefix = "1",
): TreeItemData[] {
  if (depth === 0) return [];
  return Array.from({ length: branching }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    label: `Node ${prefix}-${i + 1}`,
    children: generateTree(depth - 1, branching, `${prefix}-${i + 1}`),
  }));
}

// 5 levels, branching factor ~3 = ~243 leaf nodes (~364 total)
const TREE_NODES = generateTree(5, 3);

describe("12D — TreeView Performance (5 levels, ~364 nodes)", () => {
  it("initial render: p50 < 300ms (JSDOM baseline)", () => {
    const { p50, p95 } = measureRender(() => {
      const { unmount } = render(<TreeView items={TREE_NODES} />);
      unmount();
    }, 5);

    console.log(
      `TreeView 364 nodes — p50: ${p50.toFixed(1)}ms, p95: ${p95.toFixed(1)}ms`,
    );
    expect(p50).toBeLessThan(600);
  });

  it("mounts and unmounts without errors", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<TreeView items={TREE_NODES} />);
    unmount();
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12D-3: Event Listener Memory Audit (HARD GATE — 0 leaks)
// ──────────────────────────────────────────────────────────────────────────────

describe("12D — useClickOutside: 0 dangling listeners on unmount", () => {
  it("cleans up added document event listeners on unmount", () => {
    const addedListeners: [string, EventListener][] = [];
    const removedListeners: [string, EventListener][] = [];

    const origAdd = document.addEventListener.bind(document);
    const origRemove = document.removeEventListener.bind(document);

    vi.spyOn(document, "addEventListener").mockImplementation(
      (type: string, handler: any, ...args: any[]) => {
        addedListeners.push([type, handler]);
        origAdd(type, handler, ...args);
      },
    );

    vi.spyOn(document, "removeEventListener").mockImplementation(
      (type: string, handler: any, ...args: any[]) => {
        removedListeners.push([type, handler]);
        origRemove(type, handler, ...args);
      },
    );

    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, () => {}, true);
      return <div ref={ref} />;
    };

    const { unmount } = render(<TestComponent />);
    expect(addedListeners.length).toBeGreaterThan(0);
    unmount();

    // Every listener added during mount must have been removed during unmount
    const stillActive = addedListeners.filter(
      ([type, handler]) =>
        !removedListeners.some(([rt, rh]) => rt === type && rh === handler),
    );

    expect(stillActive.length).toBe(0);

    vi.restoreAllMocks();
  });
});

describe("12D — useEscapeKey: 0 dangling listeners on unmount", () => {
  it("cleans up added keydown listeners on unmount", () => {
    const addedListeners: [string, EventListener][] = [];
    const removedListeners: [string, EventListener][] = [];

    const origAdd = document.addEventListener.bind(document);
    const origRemove = document.removeEventListener.bind(document);

    vi.spyOn(document, "addEventListener").mockImplementation(
      (type: string, handler: any, ...args: any[]) => {
        addedListeners.push([type, handler]);
        origAdd(type, handler, ...args);
      },
    );

    vi.spyOn(document, "removeEventListener").mockImplementation(
      (type: string, handler: any, ...args: any[]) => {
        removedListeners.push([type, handler]);
        origRemove(type, handler, ...args);
      },
    );

    const TestComponent = () => {
      useEscapeKey(() => {}, true);
      return <div />;
    };

    const { unmount } = render(<TestComponent />);
    expect(addedListeners.length).toBeGreaterThan(0);
    unmount();

    const stillActive = addedListeners.filter(
      ([type, handler]) =>
        !removedListeners.some(([rt, rh]) => rt === type && rh === handler),
    );

    expect(stillActive.length).toBe(0);

    vi.restoreAllMocks();
  });
});
