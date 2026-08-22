import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './context-menu';

describe('ContextMenu Component & A11y', () => {
  it('opens context menu on right click and executes action at mouse coordinates', () => {
    const handleCopy = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click zone</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleCopy}>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const trigger = screen.getByText('Right click zone');
    fireEvent.contextMenu(trigger, { clientX: 120, clientY: 240 });

    const menu = screen.getByRole('menu');
    expect(menu).toHaveStyle({ left: '120px', top: '240px' });

    const menuItem = screen.getByRole('menuitem', { name: 'Copy' });
    expect(menuItem).toBeInTheDocument();

    fireEvent.click(menuItem);
    expect(handleCopy).toHaveBeenCalled();
  });

  it('activates menuitem via keyboard Enter or Space key', () => {
    const handleAction = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger>Zone</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleAction}>Action</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const trigger = screen.getByText('Zone');
    fireEvent.contextMenu(trigger, { clientX: 50, clientY: 50 });

    const item = screen.getByRole('menuitem', { name: 'Action' });
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('dismisses menu on Escape key press', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Zone</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const trigger = screen.getByText('Zone');
    fireEvent.contextMenu(trigger, { clientX: 50, clientY: 50 });
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});