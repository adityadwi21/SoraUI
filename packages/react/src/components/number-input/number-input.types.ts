import type { InputHTMLAttributes } from 'react';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  value?: number | undefined;
  defaultValue?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  onValueChange?: ((val: number) => void) | undefined;
}