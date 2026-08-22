import React from 'react';
import { Card, CardContent } from '../../components/card/card';
import { Statistic } from '../../components/statistic/statistic';
import type { MetricItem } from '../types';

export interface MetricGridProps {
  items: MetricItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function MetricGrid({ items, columns = 4, className }: MetricGridProps) {
  const getGridTemplateColumns = () => {
    return `repeat(${columns}, minmax(0, 1fr))`;
  };

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: '1rem',
      }}
    >
      {items.map((item, index) => {
        const trendIcon =
          item.trend?.direction === 'up' ? '▲ ' : item.trend?.direction === 'down' ? '▼ ' : '';

        return (
          <Card key={item.id || index} elevated>
            <CardContent style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 'var(--sora-text-sm, 0.875rem)',
                      color: 'var(--ui-muted-foreground, #71717a)',
                      fontWeight: 500,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--ui-foreground, #0c1a2b)',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
                {item.icon && (
                  <div
                    style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--ui-radius, 0.5rem)',
                      backgroundColor: 'var(--ui-accent, #e0f2fe)',
                      color: 'var(--ui-primary, #0ea5e9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                )}
              </div>

              {(item.trend || item.comparison) && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    marginTop: '0.75rem',
                    fontSize: 'var(--sora-text-xs, 0.75rem)',
                  }}
                >
                  {item.trend && (
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          item.trend.direction === 'up'
                            ? 'var(--ui-success, #10b981)'
                            : item.trend.direction === 'down'
                            ? 'var(--ui-destructive, #ef4444)'
                            : 'var(--ui-muted-foreground, #71717a)',
                      }}
                    >
                      {trendIcon}
                      {item.trend.value}
                    </span>
                  )}
                  {item.comparison && (
                    <span style={{ color: 'var(--ui-muted-foreground, #71717a)' }}>
                      {item.comparison}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
