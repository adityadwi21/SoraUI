import type { CSSProperties } from 'react';
import type { SkeletonProps } from './skeleton.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

function Skeleton({ width, height, circle, className, style, ...props }: SkeletonProps) {
  const inlineStyle: CSSProperties = { width, height: height ?? (circle ? width : '1rem'), ...style };
  return (
    <div
      className={cx('sora-skeleton', circle && 'sora-skeleton--circle', className)}
      style={inlineStyle}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  );
}
Skeleton.displayName = 'Skeleton';
export { Skeleton };
export type { SkeletonProps };