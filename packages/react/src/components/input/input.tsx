import { forwardRef } from "react";
import type { InputProps } from "./input.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", error = false, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cx(
        "sora-input",
        "sora-input--" + size,
        error && "sora-input--error",
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  ),
);
Input.displayName = "Input";
export { Input };
export type { InputProps };
