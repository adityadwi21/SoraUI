import { forwardRef } from "react";
import { Check } from "lucide-react";
import type { StepperProps, StepperItemProps } from "./stepper.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label="Progress Stepper"
      className={cx("sora-stepper", `sora-stepper--${orientation}`, className)}
      {...props}
    />
  ),
);
Stepper.displayName = "Stepper";

export const StepperItem = forwardRef<HTMLDivElement, StepperItemProps>(
  (
    { step, completed = false, active = false, className, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      aria-current={active ? "step" : undefined}
      className={cx(
        "sora-stepper__item",
        completed && "sora-stepper__item--completed",
        active && "sora-stepper__item--active",
        className,
      )}
      {...props}
    >
      <span className="sora-stepper__indicator" aria-hidden="true">
        {completed ? <Check size={14} /> : step}
      </span>
      <span className="sora-stepper__content">{children}</span>
    </div>
  ),
);
StepperItem.displayName = "StepperItem";
