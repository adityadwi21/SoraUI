import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";
import type { Placement } from "@soraui/hooks";

export interface DropdownProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children?: ReactNode;
}

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
  align?: "start" | "end" | "center";
  offset?: number;
  children?: ReactNode;
}

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  destructive?: boolean;
  children?: ReactNode;
}

export interface DropdownSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

export interface DropdownLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
