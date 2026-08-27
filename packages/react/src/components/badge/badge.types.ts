import type { HTMLAttributes, ReactNode, MouseEvent, CSSProperties } from "react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "ghost"
  | "custom";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeShape = "pill" | "rounded" | "square";

export type BadgeDotStatus = boolean | "online" | "offline" | "busy" | "away";

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /**
   * Visual variant
   * @default "default"
   */
  variant?: BadgeVariant;

  /**
   * Badge size
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Corner radius shape
   * @default "pill"
   */
  shape?: BadgeShape;

  /**
   * Custom color (Hex, RGB, HSL, or CSS color name, e.g. '#8b5cf6', 'purple', 'pink')
   */
  color?: string;

  /**
   * Render a status dot indicator inside the badge
   */
  dot?: BadgeDotStatus;

  /**
   * Add a pulse glow animation to the dot indicator
   */
  pulse?: boolean;

  /**
   * Loading state showing an animated spinner
   */
  loading?: boolean;

  /**
   * Custom spinner component (defaults to a sleek animated circle spinner)
   */
  spinner?: ReactNode;

  /**
   * Text reading direction ('ltr' | 'rtl')
   */
  dir?: "ltr" | "rtl";

  /**
   * Optional leading icon (icon depan)
   */
  leftIcon?: ReactNode;

  /**
   * Alias for leftIcon (icon depan)
   */
  icon?: ReactNode;

  /**
   * Optional trailing icon (icon belakang)
   */
  rightIcon?: ReactNode;

  /**
   * Render custom child element directly (e.g. <a> link or <button>)
   */
  asChild?: boolean;

  /**
   * Callback when the remove button is clicked. If provided, renders a close (x) button.
   */
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
}
