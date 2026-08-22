import type { HTMLAttributes } from 'react';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: number | undefined;
  defaultValue?: number | undefined;
  min?: number | undefined;
  max?: number | undefined;
  step?: number | undefined;
  onValueChange?: ((val: number) => void) | undefined;
  disabled?: boolean | undefined;
}