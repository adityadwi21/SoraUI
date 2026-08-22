import type { ReactNode, HTMLAttributes } from 'react';
import type { Placement } from '@soraui/hooks';

export interface TooltipProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay in milliseconds before showing tooltip */
  delay?: number;
  /** Tooltip children */
  children?: ReactNode;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  /** Render as child element */
  asChild?: boolean;
  children?: ReactNode;
}

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Placement relative to trigger */
  placement?: Placement;
  /** Distance from trigger in pixels */
  offset?: number;
  /** Tooltip content */
  children?: ReactNode;
}