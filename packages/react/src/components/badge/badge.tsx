import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type MouseEvent,
  type CSSProperties,
} from "react";
import type { BadgeProps, BadgeDotStatus } from "./badge.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

function renderDot(dot?: BadgeDotStatus, pulse?: boolean) {
  if (!dot) return null;
  const statusClass =
    typeof dot === "string"
      ? "sora-badge__dot--" + dot
      : "sora-badge__dot--online";

  return (
    <span
      className={cx(
        "sora-badge__dot",
        statusClass,
        pulse && "sora-badge__dot--pulse"
      )}
      aria-hidden="true"
    />
  );
}

function DefaultSpinner() {
  return (
    <span className="sora-badge__spinner" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="sora-badge__spinner-svg"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    </span>
  );
}

function getCustomColorStyles(
  color?: string,
  variant?: string
): CSSProperties | undefined {
  if (!color) return undefined;

  if (variant === "outline") {
    return {
      borderColor: color,
      color: color,
      backgroundColor: "transparent",
    };
  }

  if (variant === "secondary") {
    return {
      backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
      borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
      color: color,
    };
  }

  if (variant === "ghost") {
    return {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: color,
    };
  }

  // Default solid
  return {
    backgroundColor: color,
    borderColor: color,
    color: "#ffffff",
  };
}

export const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      shape = "pill",
      color,
      dot,
      pulse = false,
      loading = false,
      spinner,
      dir,
      leftIcon,
      icon,
      rightIcon,
      asChild = false,
      onRemove,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const finalLeftIcon = leftIcon ?? icon;
    const isCustom = Boolean(color);
    const customStyle = getCustomColorStyles(color, variant);

    const mergedStyle: CSSProperties = {
      ...customStyle,
      ...style,
    };

    const badgeClass = cx(
      "sora-badge",
      "sora-badge--" + variant,
      "sora-badge--" + size,
      "sora-badge--" + shape,
      isCustom && "sora-badge--custom",
      loading && "sora-badge--loading",
      dir === "rtl" && "sora-badge--rtl",
      onRemove && "sora-badge--removable",
      className
    );

    const content = (
      <>
        {loading ? (
          spinner ?? <DefaultSpinner />
        ) : (
          renderDot(dot, pulse)
        )}
        {!loading && finalLeftIcon && (
          <span className="sora-badge__icon sora-badge__icon--left">
            {finalLeftIcon}
          </span>
        )}
        {children && <span className="sora-badge__text">{children}</span>}
        {rightIcon && (
          <span className="sora-badge__icon sora-badge__icon--right">
            {rightIcon}
          </span>
        )}
        {onRemove && (
          <button
            type="button"
            className="sora-badge__remove"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onRemove(e);
            }}
            aria-label="Remove badge"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </>
    );

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement;
      return cloneElement(child, {
        ref,
        dir,
        className: cx(badgeClass, (child.props as any).className),
        style: { ...mergedStyle, ...(child.props as any).style },
        ...props,
        children: (
          <>
            {loading ? (
              spinner ?? <DefaultSpinner />
            ) : (
              renderDot(dot, pulse)
            )}
            {!loading && finalLeftIcon && (
              <span className="sora-badge__icon sora-badge__icon--left">
                {finalLeftIcon}
              </span>
            )}
            {(child.props as any).children}
            {rightIcon && (
              <span className="sora-badge__icon sora-badge__icon--right">
                {rightIcon}
              </span>
            )}
            {onRemove && (
              <button
                type="button"
                className="sora-badge__remove"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onRemove(e);
                }}
                aria-label="Remove badge"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </>
        ),
      });
    }

    return (
      <span
        ref={ref as any}
        dir={dir}
        className={badgeClass}
        style={mergedStyle}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Badge.displayName = "Badge";
