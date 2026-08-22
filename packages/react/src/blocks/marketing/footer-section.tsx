import React, { useState, type FormEvent, type ReactNode } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Separator } from '../../components/separator/separator';
import type { FooterColumn } from '../types';

export interface FooterSectionProps {
  brand?: ReactNode;
  description?: string;
  columns: FooterColumn[];
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  };
  copyright?: string;
  onNewsletterSubmit?: (email: string) => void;
  className?: string;
}

export function FooterSection({
  brand = 'SoraUI',
  description = 'Lightweight, CSS-variable first, accessible UI component library for modern web applications.',
  columns,
  newsletter,
  copyright = `© ${new Date().getFullYear()} SoraUI. All rights reserved.`,
  onNewsletterSubmit,
  className,
}: FooterSectionProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNewsletterSubmit?.(email);
    setSubscribed(true);
  };

  return (
    <footer
      className={className}
      style={{
        backgroundColor: 'var(--ui-card, #ffffff)',
        borderTop: '1px solid var(--ui-border, #e4e4e7)',
        padding: '4rem 1.5rem 2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Brand & Mission column */}
        <div style={{ maxWidth: '320px' }}>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--ui-primary, #0ea5e9)', marginBottom: '0.75rem' }}>
            {brand}
          </div>
          <p style={{ color: 'var(--ui-muted-foreground, #71717a)', fontSize: 'var(--sora-text-sm, 0.875rem)', lineHeight: 1.6 }}>
            {description}
          </p>

          {newsletter && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--sora-text-sm, 0.875rem)', marginBottom: '0.25rem' }}>
                {newsletter.title || 'Stay updated'}
              </div>
              {subscribed ? (
                <p style={{ color: 'var(--ui-success, #10b981)', fontSize: 'var(--sora-text-xs, 0.75rem)' }}>
                  ✓ Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <Input
                    type="email"
                    placeholder={newsletter.placeholder || 'Enter email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                    required
                  />
                  <Button type="submit" size="sm">
                    {newsletter.buttonText || 'Subscribe'}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Dynamic navigation columns */}
        {columns.map((col, idx) => (
          <div key={idx}>
            <div style={{ fontWeight: 600, fontSize: 'var(--sora-text-sm, 0.875rem)', marginBottom: '1rem', color: 'var(--ui-foreground, #0c1a2b)' }}>
              {col.title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.625rem' }}>
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    style={{
                      color: 'var(--ui-muted-foreground, #71717a)',
                      fontSize: 'var(--sora-text-sm, 0.875rem)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator style={{ maxWidth: '1200px', margin: '0 auto 2rem auto' }} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: 'var(--sora-text-xs, 0.75rem)',
          color: 'var(--ui-muted-foreground, #71717a)',
        }}
      >
        <div>{copyright}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}
