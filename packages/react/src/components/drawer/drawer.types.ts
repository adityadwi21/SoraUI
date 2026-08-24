import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  side?: DrawerSide | undefined;
  children?: ReactNode | undefined;
}
export interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean | undefined;
}
export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}
export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {}
