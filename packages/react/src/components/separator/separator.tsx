import type { SeparatorProps } from "./separator.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <hr
      className={cx(
        "sora-separator",
        "sora-separator--" + orientation,
        className,
      )}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      {...props}
    />
  );
}
Separator.displayName = "Separator";
export { Separator };
export type { SeparatorProps };
