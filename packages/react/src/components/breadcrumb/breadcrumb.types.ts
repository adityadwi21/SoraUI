import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}
export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {}
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {}
export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean | undefined;
}
export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}
export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode | undefined;
}
export interface BreadcrumbEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode | undefined;
}
