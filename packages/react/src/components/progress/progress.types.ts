import type { HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number | undefined;
  max?: number | undefined;
}