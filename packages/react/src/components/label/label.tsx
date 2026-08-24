import type { LabelProps } from "./label.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

function Label({
  required,
  disabled,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cx(
        "sora-label",
        disabled && "sora-label--disabled",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="sora-label__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
Label.displayName = "Label";
export { Label };
export type { LabelProps };
