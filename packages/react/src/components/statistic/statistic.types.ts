import type { HTMLAttributes, ReactNode } from 'react';

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title: ReactNode;
  value: ReactNode;
  prefix?: ReactNode | undefined;
  suffix?: ReactNode | undefined;
  trend?: 'up' | 'down' | undefined;
  trendValue?: string | undefined;
}