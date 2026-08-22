import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { Placement } from '@soraui/hooks';

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
  offset?: number;
  trapFocus?: boolean;
  children?: ReactNode;
}

export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}