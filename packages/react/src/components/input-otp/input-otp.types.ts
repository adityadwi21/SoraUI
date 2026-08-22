import type { HTMLAttributes } from 'react';

export interface InputOTPProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((code: string) => void) | undefined;
  disabled?: boolean | undefined;
  autoFocus?: boolean | undefined;
}