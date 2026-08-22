import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from './drawer';

describe('Drawer Component & A11y', () => {
  it('opens slide-over panel on click and closes on close button', async () => {
    const user = userEvent.setup();

    render(
      <Drawer side="left">
        <DrawerTrigger asChild>
          <button type="button">Open Drawer</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Navigation Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerClose>Close Drawer</DrawerClose>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByRole('button', { name: 'Open Drawer' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.className).toContain('sora-drawer__content--left');
    expect(document.body.style.overflow).toBe('hidden');

    const closeBtn = screen.getByRole('button', { name: 'Close Drawer' });
    await user.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape key press and restores body overflow', async () => {
    const user = userEvent.setup();

    render(
      <Drawer>
        <DrawerTrigger>Toggle Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByRole('button', { name: 'Toggle Drawer' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});