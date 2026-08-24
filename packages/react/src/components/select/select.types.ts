import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";
import type { Placement } from "@soraui/hooks";

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  children?: ReactNode;
}

export interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
  offset?: number;
  children?: ReactNode;
}

export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
}

export interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SelectLabelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface SelectSeparatorProps extends HTMLAttributes<HTMLHRElement> {}
