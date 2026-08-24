import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
}
export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {}
