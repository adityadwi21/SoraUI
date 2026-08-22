import type { HTMLAttributes } from 'react';
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  /** Circle shape variant */
  circle?: boolean;
}
