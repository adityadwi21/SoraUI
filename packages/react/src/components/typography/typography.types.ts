import type { HTMLAttributes } from "react";
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "body-sm"
  | "caption"
  | "code"
  | "lead"
  | "muted";
export type TypographyAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "code"
  | "small";
export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: TypographyAs;
}
