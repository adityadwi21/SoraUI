import type { ElementType } from "react";
import type { TypographyProps, TypographyVariant } from "./typography.types";

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(" ");
}

const defaultTags: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-sm": "p",
  caption: "small",
  code: "code",
  lead: "p",
  muted: "p",
};

function Typography({
  variant = "body",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = (as ?? defaultTags[variant]) as ElementType;
  return (
    <Tag
      className={cx(
        "sora-text",
        "sora-text--" + variant.replace("-", "_"),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
Typography.displayName = "Typography";
export { Typography };
export type { TypographyProps };
