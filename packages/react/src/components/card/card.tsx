import { forwardRef } from "react";
import type {
  CardProps,
  CardHeaderProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
} from "./card.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ elevated, size = "default", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-size={size}
        className={cx(
          "sora-card",
          size === "sm" && "sora-card--sm",
          elevated && "sora-card--elevated",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cx("sora-card__header", className)} {...props}>
        {children}
      </div>
    );
  },
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cx("sora-card__title", className)} {...props}>
        {children}
      </h3>
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cx("sora-card__description", className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
CardDescription.displayName = "CardDescription";

const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("sora-card__action", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardAction.displayName = "CardAction";

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("sora-card__content", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cx("sora-card__footer", className)} {...props}>
        {children}
      </div>
    );
  },
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
export type {
  CardProps,
  CardHeaderProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
  CardTitleProps,
  CardDescriptionProps,
};

