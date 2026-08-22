import { forwardRef } from 'react';
import type { StatisticProps } from './statistic.types';

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(
  ({ title, value, prefix, suffix, trend, trendValue, className, ...props }, ref) => (
    <div ref={ref} className={cx('sora-statistic', className)} {...props}>
      <div className="sora-statistic__title">{title}</div>
      <div className="sora-statistic__value-wrap">
        {prefix && <span className="sora-statistic__prefix">{prefix}</span>}
        <span className="sora-statistic__value">{value}</span>
        {suffix && <span className="sora-statistic__suffix">{suffix}</span>}
      </div>
      {trend && trendValue && (
        <div className={cx('sora-statistic__trend', `sora-statistic__trend--${trend}`)}>
          <span>{trend === 'up' ? '▲' : '▼'}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  )
);
Statistic.displayName = 'Statistic';