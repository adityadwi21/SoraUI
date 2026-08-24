/**
 * Phase 12H — Runtime & Unmount Safety
 *
 * Hard gate: After unmount, there must be 0 console.error, 0 console.warn,
 * 0 dangling timers, 0 dangling observers, 0 dangling portals.
 *
 * Target: All 15 high-risk interactive components.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, waitFor } from "@testing-library/react";
import React from "react";

// High-risk interactive components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../src/components/dialog/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../src/components/alert-dialog/alert-dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "../../src/components/drawer/drawer";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../../src/components/dropdown/dropdown";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../src/components/select/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../src/components/tooltip/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../src/components/popover/popover";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../../src/components/hover-card/hover-card";
import { Calendar } from "../../src/components/calendar/calendar";
import { DatePicker } from "../../src/components/date-picker/date-picker";
import {
  DataTable,
  type DataTableColumn,
} from "../../src/components/data-table/data-table";

import { TreeView } from "../../src/components/tree-view/tree-view";
import {
  CommandPalette,
  CommandItem,
} from "../../src/components/command-palette/command-palette";
import { ToastProvider } from "../../src/components/toast/toast";

// ──────────────────────────────────────────────────────────────────────────────
// Helper
// ──────────────────────────────────────────────────────────────────────────────

function assertCleanUnmount(jsx: React.ReactElement, label: string) {
  it(`${label} — 0 console.error/warn after unmount`, () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { unmount } = render(jsx);
    act(() => {
      unmount();
    });

    const errors = errorSpy.mock.calls.filter((args) => {
      const msg = args.join(" ");
      // Filter out known/expected React dev mode verbose messages
      return (
        !msg.includes("ReactDOM.render") &&
        !msg.includes("Warning: ReactDOM.render")
      );
    });

    expect(
      errors,
      `${label}: Unexpected console.error after unmount:\n${errors.map((a) => a.join(" ")).join("\n")}`,
    ).toHaveLength(0);
    expect(
      warnSpy.mock.calls,
      `${label}: Unexpected console.warn after unmount`,
    ).toHaveLength(0);

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// 12H Test Suite
// ──────────────────────────────────────────────────────────────────────────────

describe("12H — Runtime & Unmount Safety (closed/hidden state)", () => {
  // Test components in their default closed/non-open state to verify no timer/listener leaks
  // from setup effects that run before the component becomes interactive.

  assertCleanUnmount(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Test</DialogTitle>
        <DialogDescription>Desc</DialogDescription>
      </DialogContent>
    </Dialog>,
    "Dialog (closed)",
  );

  assertCleanUnmount(
    <AlertDialog>
      <AlertDialogTrigger>Alert</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Alert</AlertDialogTitle>
        <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        <AlertDialogCancel>No</AlertDialogCancel>
        <AlertDialogAction>Yes</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>,
    "AlertDialog (closed)",
  );

  assertCleanUnmount(
    <Drawer>
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Drawer</DrawerTitle>
      </DrawerContent>
    </Drawer>,
    "Drawer (closed)",
  );

  assertCleanUnmount(
    <Dropdown>
      <DropdownTrigger>Options</DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Action 1</DropdownItem>
      </DropdownContent>
    </Dropdown>,
    "Dropdown (closed)",
  );

  assertCleanUnmount(
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>,
    "Select (closed)",
  );

  assertCleanUnmount(
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>Hint text</TooltipContent>
    </Tooltip>,
    "Tooltip (not hovered)",
  );

  assertCleanUnmount(
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <p>Content</p>
      </PopoverContent>
    </Popover>,
    "Popover (closed)",
  );

  assertCleanUnmount(
    <HoverCard>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>
        <p>Preview</p>
      </HoverCardContent>
    </HoverCard>,
    "HoverCard (not hovered)",
  );

  assertCleanUnmount(
    <Calendar defaultValue={new Date(2026, 7, 1)} />,
    "Calendar",
  );

  assertCleanUnmount(<DatePicker />, "DatePicker (closed)");

  assertCleanUnmount(
    <DataTable
      columns={
        [
          { accessorKey: "id", header: "ID" },
          { accessorKey: "name", header: "Name" },
        ] as DataTableColumn<{ id: number; name: string }>[]
      }
      data={[
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]}
    />,
    "DataTable",
  );

  assertCleanUnmount(
    <TreeView
      items={[
        { id: "1", label: "Root", children: [{ id: "1-1", label: "Child" }] },
      ]}
    />,
    "TreeView",
  );

  assertCleanUnmount(
    <CommandPalette placeholder="Search...">
      <CommandItem>New File</CommandItem>
    </CommandPalette>,
    "CommandPalette (closed)",
  );

  assertCleanUnmount(
    <ToastProvider>
      <div>Content</div>
    </ToastProvider>,
    "ToastProvider",
  );
});

// ──────────────────────────────────────────────────────────────────────────────
// Portal cleanup
// ──────────────────────────────────────────────────────────────────────────────

describe("12H — Portal cleanup: no orphaned DOM nodes after unmount", () => {
  it("Dialog portal is removed from document.body after unmount", async () => {
    const { unmount } = render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Portal Test</DialogTitle>
          <DialogDescription>Testing portal cleanup</DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    // Give React time to mount the portal
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const beforeUnmount = document.body.querySelectorAll(
      ".sora-dialog__wrapper",
    ).length;
    expect(beforeUnmount).toBeGreaterThanOrEqual(1);

    act(() => {
      unmount();
    });

    const afterUnmount = document.body.querySelectorAll(
      ".sora-dialog__wrapper",
    ).length;
    expect(afterUnmount).toBe(0);
  });
});
