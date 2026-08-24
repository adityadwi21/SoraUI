import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
} from "./pagination.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cx("sora-pagination", className)}
      {...props}
    />
  ),
);
Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cx("sora-pagination__content", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cx("sora-pagination__item", className)}
      {...props}
    />
  ),
);
PaginationItem.displayName = "PaginationItem";

export const PaginationLink = forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ isActive, className, ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={cx(
      "sora-pagination__link",
      isActive && "sora-pagination__link--active",
      className,
    )}
    {...props}
  />
));
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ className, children, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    className={cx("sora-pagination__prev", className)}
    style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
    {...props}
  >
    <ChevronLeft size={14} aria-hidden="true" />
    {children || <span>Previous</span>}
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ className, children, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    className={cx("sora-pagination__next", className)}
    style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
    {...props}
  >
    {children || <span>Next</span>}
    <ChevronRight size={14} aria-hidden="true" />
  </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden="true"
    className={cx("sora-pagination__ellipsis", className)}
    {...props}
  >
    <MoreHorizontal size={14} />
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
