import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked' | 'defaultChecked'> {
  checked?: boolean | 'indeterminate' | undefined;
  defaultChecked?: boolean | 'indeterminate' | undefined;
  onCheckedChange?: ((checked: boolean | 'indeterminate') => void) | undefined;
}