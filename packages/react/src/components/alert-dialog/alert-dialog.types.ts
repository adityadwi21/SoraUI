import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type AlertDialogSize = "default" | "sm";

export interface AlertDialogProps {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  children?: ReactNode | undefined;
}

export interface AlertDialogTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean | undefined;
  render?: ReactNode | undefined;
}

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: AlertDialogSize | undefined;
}

export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface AlertDialogMediaProps extends HTMLAttributes<HTMLDivElement> {}

export interface AlertDialogTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDialogDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export type AlertDialogActionVariant =
  | "default"
  | "destructive"
  | "soft-destructive"
  | "outline"
  | "secondary"
  | "ghost";

export interface AlertDialogActionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AlertDialogActionVariant | undefined;
}

export interface AlertDialogCancelProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AlertDialogActionVariant | undefined;
}

