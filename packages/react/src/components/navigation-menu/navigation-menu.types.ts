import type { HTMLAttributes, ReactNode } from "react";

export interface NavigationMenuProps extends HTMLAttributes<HTMLElement> {}
export interface NavigationMenuListProps extends HTMLAttributes<HTMLUListElement> {}
export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {}
export interface NavigationMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | undefined;
}
export interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {}
