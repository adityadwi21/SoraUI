import type { HTMLAttributes } from "react";

export type BadgeVariant =
  "default" | "secondary" | "outline" | "destructive" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}
