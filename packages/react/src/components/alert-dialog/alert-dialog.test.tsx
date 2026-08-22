import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog';

describe('AlertDialog Component & A11y', () => {
  it('opens alert dialog and executes action or cancel', async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button type="button">Delete Item</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByRole('button', { name: 'Delete Item' });
    await user.click(trigger);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    const actionBtn = screen.getByRole('button', { name: 'Continue' });
    await user.click(actionBtn);

    expect(handleConfirm).toHaveBeenCalled();
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});