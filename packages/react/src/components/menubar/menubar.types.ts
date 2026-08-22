import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenubarMenuProps {
  children?: ReactNode | undefined;
}
export interface MenubarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface MenubarContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface MenubarItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean | undefined;
}