import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from './menubar';

describe('Menubar Component & A11y', () => {
  it('opens menubar submenu and triggers item click', async () => {
    const user = userEvent.setup();
    const handleNew = vi.fn();

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleNew}>New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    const trigger = screen.getByRole('menuitem', { name: 'File' });
    await user.click(trigger);

    const item = screen.getByRole('menuitem', { name: 'New File' });
    expect(item).toBeInTheDocument();

    await user.click(item);
    expect(handleNew).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes menubar submenu on Escape key', async () => {
    const user = userEvent.setup();

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    const trigger = screen.getByRole('menuitem', { name: 'Edit' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('ignores clicks on disabled menubar items', async () => {
    const user = userEvent.setup();
    const handleDisabled = vi.fn();

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled onClick={handleDisabled}>Disabled Action</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    const trigger = screen.getByRole('menuitem', { name: 'View' });
    await user.click(trigger);

    const item = screen.getByRole('menuitem', { name: 'Disabled Action' });
    expect(item).toHaveAttribute('aria-disabled', 'true');
    await user.click(item);
    expect(handleDisabled).not.toHaveBeenCalled();
  });
});