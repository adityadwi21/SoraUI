import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  disabled?: boolean | undefined;
  children?: ReactNode;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
