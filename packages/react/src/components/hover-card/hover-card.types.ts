import type { HTMLAttributes, ReactNode } from 'react';

export interface HoverCardProps {
  openDelay?: number | undefined;
  closeDelay?: number | undefined;
  children?: ReactNode | undefined;
}
export interface HoverCardTriggerProps extends HTMLAttributes<HTMLSpanElement> {}
export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {}