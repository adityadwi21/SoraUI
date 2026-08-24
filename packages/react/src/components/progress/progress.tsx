import { forwardRef } from "react";
import type { ProgressProps } from "./progress.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, className, ...props }, ref) => {
    const isIndeterminate = value === undefined || value === null;
    const percentage = isIndeterminate
      ? undefined
      : Math.max(0, Math.min(100, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : max}
        className={cx(
          "sora-progress",
          isIndeterminate && "sora-progress--indeterminate",
          className,
        )}
        {...props}
      >
        <div
          className="sora-progress__indicator"
          style={
            percentage !== undefined ? { width: `${percentage}%` } : undefined
          }
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";
