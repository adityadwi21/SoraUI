import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
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
>(({ asChild = false, className, children, ...props }, ref) => {
  const linkClass = cx("sora-breadcrumb__link", className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement;
    return cloneElement(child, {
      ref,
      className: cx(linkClass, (child.props as { className?: string })?.className),
      ...props,
    });
  }

  return (
    <a ref={ref} className={linkClass} {...props}>
      {children}
    </a>
  );
});
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

export const BreadcrumbEllipsis = ({
  children,
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cx("sora-breadcrumb__ellipsis", className)}
    {...props}
  >
    {children || (
      <>
        <MoreHorizontal size={16} aria-hidden="true" />
        <span className="sora-sr-only">More</span>
      </>
    )}
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
