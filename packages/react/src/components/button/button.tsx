/**
 * SoraUI — Button Component
 * Level 1: Zero/Minimal Runtime
 *
 * Styling: CSS classes with sora- prefix for scoping (no CSS Modules runtime).
 * Import button.css separately in your app or via @soraui/react/styles.
 */
import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import type { ButtonProps, ButtonGroupProps } from "./button.types";

function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      rounded = false,
      loading = false,
      disabled,
      asChild = false,
      className,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled ?? loading;
    const buttonClass = cx(
      "sora-button",
      "sora-button--" + variant,
      "sora-button--" + size,
      rounded && "sora-button--rounded",
      className,
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      props.onClick?.(e);
    };

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement;
      return cloneElement(child, {
        ...props,
        ref,
        className: cx(
          buttonClass,
          (child.props as { className?: string })?.className,
        ),
        "aria-disabled": isDisabled || undefined,
        "data-loading": loading ? "true" : undefined,
        "aria-label": loading && !ariaLabel ? "Loading..." : ariaLabel,
        tabIndex: isDisabled ? -1 : (child.props as { tabIndex?: number })?.tabIndex,
        onClick: (e: React.MouseEvent) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          (child.props as { onClick?: (e: React.MouseEvent) => void })?.onClick?.(e);
          props.onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        },
        children: (
          <>
            {loading && (
              <span
                className="sora-button__spinner"
                aria-hidden="true"
                role="presentation"
              />
            )}
            {(child.props as { children?: React.ReactNode })?.children}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClass}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        data-loading={loading ? "true" : undefined}
        aria-label={loading && !ariaLabel ? "Loading..." : ariaLabel}
        {...props}
        onClick={handleClick}
      >
        {loading && (
          <span
            className="sora-button__spinner"
            aria-hidden="true"
            role="presentation"
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * ButtonGroup Component
 * Segmented button bar with unified borders and RTL support.
 * NOTE: Children of ButtonGroup should render buttons as direct DOM children to maintain border joining.
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cx("sora-button-group", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonGroup };
export type { ButtonProps, ButtonGroupProps };

