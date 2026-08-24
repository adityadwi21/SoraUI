import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
} from "./breadcrumb.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cx("sora-breadcrumb", className)}
      {...props}
    />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cx("sora-breadcrumb__list", className)}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cx("sora-breadcrumb__item", className)}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, ...props }, ref) => (
  <a ref={ref} className={cx("sora-breadcrumb__link", className)} {...props} />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cx("sora-breadcrumb__page", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cx("sora-breadcrumb__separator", className)}
    {...props}
  >
    {children || <ChevronRight size={14} aria-hidden="true" />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
