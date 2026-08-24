import type { HTMLAttributes, ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: ReactNode;
  disabled?: boolean;
}
