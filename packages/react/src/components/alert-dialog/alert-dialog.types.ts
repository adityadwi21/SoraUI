import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface AlertDialogProps {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  children?: ReactNode | undefined;
}
export interface AlertDialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean | undefined;
}
export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogActionProps extends HTMLAttributes<HTMLButtonElement> {}
export interface AlertDialogCancelProps extends HTMLAttributes<HTMLButtonElement> {}
