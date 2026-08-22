import type { BadgeProps } from './badge.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span className={cx('sora-badge', 'sora-badge--' + variant, className)} {...props}>
      {children}
    </span>
  );
}
Badge.displayName = 'Badge';
export { Badge };
export type { BadgeProps };