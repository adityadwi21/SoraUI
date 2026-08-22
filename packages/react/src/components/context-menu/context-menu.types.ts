import type { HTMLAttributes, ReactNode, MouseEvent } from 'react';

export interface ContextMenuProps {
  children?: ReactNode | undefined;
}
export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {}
export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean | undefined;
}