import type { HTMLAttributes, ReactNode } from 'react';

export interface CommandPaletteProps {
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  placeholder?: string | undefined;
  children?: ReactNode | undefined;
}
export interface CommandItemProps extends HTMLAttributes<HTMLDivElement> {
  onSelect?: (() => void) | undefined;
  disabled?: boolean | undefined;
}