import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/card/card';
import { Badge } from '../../components/badge/badge';
import type { FeatureItem } from '../types';

export interface FeatureGridProps {
  badge?: string;
  title: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({
  badge,
  title,
  description,
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  const getGridTemplateColumns = () => {
    return `repeat(${columns}, minmax(0, 1fr))`;
  };

  return (
    <section
      className={className}
      style={{
        padding: '4rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        {badge && (
          <Badge variant="outline" style={{ marginBottom: '0.75rem' }}>
            {badge}
          </Badge>
        )}
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--ui-foreground, #0c1a2b)',
            margin: '0 0 1rem 0',
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--ui-muted-foreground, #71717a)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: getGridTemplateColumns(),
          gap: '1.5rem',
        }}
      >
        {features.map((feature) => (
          <Card key={feature.id} elevated style={{ height: '100%' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                {feature.icon && (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--ui-radius, 0.5rem)',
                      backgroundColor: 'var(--ui-accent, #e0f2fe)',
                      color: 'var(--ui-primary, #0ea5e9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}
                  >
                    {feature.icon}
                  </div>
                )}
                {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
              </div>
              <CardTitle style={{ fontSize: '1.25rem' }}>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.5, margin: 0 }}>
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
