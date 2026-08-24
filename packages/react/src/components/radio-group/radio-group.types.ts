import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  name?: string | undefined;
  disabled?: boolean | undefined;
  orientation?: "horizontal" | "vertical" | undefined;
}

export interface RadioGroupItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  value: string;
  children?: ReactNode | undefined;
}
