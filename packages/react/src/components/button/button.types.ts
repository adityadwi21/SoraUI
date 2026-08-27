import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Rounded shape (pill) */
  rounded?: boolean;
  /** Loading state — shows spinner and disables interaction */
  loading?: boolean;
  /** Render as a different HTML element or component (polymorphic) */
  asChild?: boolean;
  /** Button content */
  children?: ReactNode;
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
