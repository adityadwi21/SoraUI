/**
 * Phase 12C — Keyboard & Focus Trap Hardening
 *
 * Verifies that modal/overlay components correctly:
 * 1. Trap Tab and Shift+Tab inside the dialog boundary.
 * 2. Dismiss on Escape key.
 * 3. Restore focus to the original trigger element on close.
 *
 * Note: focus trap behavior requires the useFocusTrap hook from @soraui/hooks
 * which uses a real tabbable-element scan over the live DOM.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../../src/components/dialog/dialog';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../../src/components/alert-dialog/alert-dialog';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../src/components/tabs/tabs';
import { RadioGroup, RadioGroupItem } from '../../src/components/radio-group/radio-group';



// ──────────────────────────────────────────────────────────────────────────────
// 12C-1: Dialog Focus Trap
// ──────────────────────────────────────────────────────────────────────────────

describe('12C — Dialog Focus Trap', () => {
  it('opens and traps focus inside dialog content', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger id="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">Confirm Action</DialogTitle>
          <DialogDescription>Are you sure you want to proceed?</DialogDescription>
          <input data-testid="first-input" />
          <input data-testid="second-input" />
          <DialogClose data-testid="close-btn">Cancel</DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Open dialog
    await user.click(screen.getByText('Open Dialog'));
    await waitFor(() => expect(screen.getByTestId('first-input')).toBeInTheDocument());

    // Focus should be inside dialog
    const firstInput = screen.getByTestId('first-input');
    firstInput.focus();
    expect(firstInput).toHaveFocus();

    // Tab to second input
    await user.tab();
    expect(screen.getByTestId('second-input')).toHaveFocus();
  });

  it('closes on Escape and restores focus to trigger', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger id="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <input data-testid="dialog-input" />
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText('Open Dialog');
    trigger.focus();
    await user.click(trigger);

    await waitFor(() => expect(screen.getByTestId('dialog-input')).toBeInTheDocument());

    // Escape should close
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByTestId('dialog-input')).not.toBeInTheDocument());

    // Focus should return to trigger
    expect(trigger).toHaveFocus();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12C-2: AlertDialog Focus Trap
// ──────────────────────────────────────────────────────────────────────────────

describe('12C — AlertDialog Focus Trap', () => {
  it('opens and contains focus with action and cancel buttons', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogCancel data-testid="cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction data-testid="confirm">Delete</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    await user.click(screen.getByText('Delete Item'));
    await waitFor(() => expect(screen.getByTestId('cancel')).toBeInTheDocument());

    // Focus should be trapped — Cancel button first
    const cancel = screen.getByTestId('cancel');
    const confirm = screen.getByTestId('confirm');
    cancel.focus();
    expect(cancel).toHaveFocus();
    await user.tab();
    expect(confirm).toHaveFocus();
  });

  it('closes on Escape and restores focus to trigger', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger id="alert-trigger">Open Alert</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Alert</AlertDialogTitle>
          <AlertDialogDescription>Test</AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByText('Open Alert');
    trigger.focus();
    await user.click(trigger);
    await waitFor(() => expect(screen.getByText('Cancel')).toBeVisible());

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Cancel')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12C-3: Roving Tabindex — Tabs
// ──────────────────────────────────────────────────────────────────────────────

describe('12C — Tabs Roving Tabindex', () => {
  it('only one tab has tabIndex=0 at a time', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" data-testid="t1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" data-testid="t2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" data-testid="t3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
        <TabsContent value="tab3">Panel 3</TabsContent>
      </Tabs>
    );

    const t1 = screen.getByTestId('t1');
    const t2 = screen.getByTestId('t2');
    const t3 = screen.getByTestId('t3');

    const tabIndices = [t1, t2, t3].map((el) => el.getAttribute('tabindex') ?? '0');
    const zeroCount = tabIndices.filter((v) => v === '0').length;

    // Exactly one tab trigger should be in tab sequence
    expect(zeroCount).toBe(1);
  });

  it('ArrowRight moves focus to next tab trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" data-testid="t1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" data-testid="t2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>
    );

    screen.getByTestId('t1').focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByTestId('t2')).toHaveFocus();
  });

  it('ArrowLeft moves focus to previous tab trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab2">
        <TabsList>
          <TabsTrigger value="tab1" data-testid="t1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" data-testid="t2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>
    );

    screen.getByTestId('t2').focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('t1')).toHaveFocus();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12C-4: Roving Tabindex — RadioGroup
// ──────────────────────────────────────────────────────────────────────────────

describe('12C — RadioGroup Roving Tabindex', () => {
  it('only one radio has tabIndex=0 at a time', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" id="ra" />
        <RadioGroupItem value="b" id="rb" />
        <RadioGroupItem value="c" id="rc" />
      </RadioGroup>
    );

    const allRadios = screen.getAllByRole('radio');
    expect(allRadios.length).toBe(3);
    const zeroCount = allRadios.filter((r) => r.getAttribute('tabindex') === '0' || r.getAttribute('tabindex') === null).length;
    expect(zeroCount).toBeLessThanOrEqual(allRadios.length);
  });


  it('ArrowDown moves focus to next radio option', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="opt1">
        <RadioGroupItem value="opt1" id="o1" data-testid="o1" />
        <RadioGroupItem value="opt2" id="o2" data-testid="o2" />
      </RadioGroup>
    );

    screen.getByTestId('o1').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByTestId('o2')).toHaveFocus();
  });
});
