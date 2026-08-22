import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/card/card';
import { Button } from '../../components/button/button';
import { Badge } from '../../components/badge/badge';
import { Switch } from '../../components/switch/switch';
import type { PricingPlan } from '../types';

export interface PricingTableProps {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  billingInterval?: 'monthly' | 'annual';
  annualDiscountBadge?: string;
  onBillingIntervalChange?: (interval: 'monthly' | 'annual') => void;
  onSelectPlan?: (plan: PricingPlan) => void;
  className?: string;
}

export function PricingTable({
  title = 'Simple, transparent pricing',
  description = 'Choose the plan that fits your project needs. Upgrade or downgrade anytime.',
  plans,
  billingInterval: controlledInterval,
  annualDiscountBadge = 'Save 20%',
  onBillingIntervalChange,
  onSelectPlan,
  className,
}: PricingTableProps) {
  const [internalInterval, setInternalInterval] = useState<'monthly' | 'annual'>('monthly');
  const isAnnual = (controlledInterval ?? internalInterval) === 'annual';

  const handleToggle = (checked: boolean) => {
    const next = checked ? 'annual' : 'monthly';
    setInternalInterval(next);
    onBillingIntervalChange?.(next);
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
              margin: '0 auto 2rem auto',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}

        {/* Monthly / Annual Toggle Switch */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: 'var(--sora-text-sm, 0.875rem)', fontWeight: isAnnual ? 400 : 600 }}>Monthly</span>
          <Switch
            id="pricing-billing-toggle"
            checked={isAnnual}
            onCheckedChange={handleToggle}
            aria-label="Toggle annual billing"
          />
          <span style={{ fontSize: 'var(--sora-text-sm, 0.875rem)', fontWeight: isAnnual ? 600 : 400 }}>Annual</span>
          {annualDiscountBadge && (
            <Badge variant="success" style={{ marginLeft: '0.25rem' }}>
              {annualDiscountBadge}
            </Badge>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {plans.map((plan) => {
          const isPopular = plan.popular;

          return (
            <Card
              key={plan.id}
              elevated={!!isPopular}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: isPopular ? '2px solid var(--ui-primary, #0ea5e9)' : '1px solid var(--ui-border, #e4e4e7)',
              }}
            >
              {isPopular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  <Badge variant="default">Most Popular</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle style={{ fontSize: '1.25rem' }}>{plan.name}</CardTitle>
                {plan.description && <CardDescription>{plan.description}</CardDescription>}
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ui-foreground, #0c1a2b)' }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ fontSize: 'var(--sora-text-sm, 0.875rem)', color: 'var(--ui-muted-foreground, #71717a)' }}>
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
                      <span style={{ color: 'var(--ui-primary, #0ea5e9)', fontWeight: 700 }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={isPopular ? 'primary' : 'outline'}
                  disabled={plan.disabled}
                  onClick={() => onSelectPlan?.(plan)}
                  style={{ width: '100%' }}
                >
                  {plan.ctaLabel || 'Get Started'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
