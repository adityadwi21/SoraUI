import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The value of the currently active tab (controlled) */
  value?: string;
  /** The default active tab value (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the active tab changes */
  onValueChange?: (value: string) => void;
  /** Orientation of the tablist */
  orientation?: TabsOrientation;
  children?: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying this tab */
  value: string;
  children?: ReactNode;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value matching the corresponding trigger */
  value: string;
  children?: ReactNode;
}