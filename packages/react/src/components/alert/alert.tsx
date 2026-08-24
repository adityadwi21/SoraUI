import { forwardRef } from "react";
import type {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./alert.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cx("sora-alert", "sora-alert--" + variant, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5 ref={ref} className={cx("sora-alert__title", className)} {...props}>
        {children}
      </h5>
    );
  },
);
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cx("sora-alert__description", className)}
      {...props}
    >
      {children}
    </div>
  );
});
AlertDescription.displayName = "AlertDescription";
