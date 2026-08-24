import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {}
export interface PaginationContentProps extends HTMLAttributes<HTMLUListElement> {}
export interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {}
export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean | undefined;
}
