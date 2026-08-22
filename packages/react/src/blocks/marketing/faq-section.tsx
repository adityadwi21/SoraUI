import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/accordion/accordion';
import type { FAQItem } from '../types';

export interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = 'Frequently asked questions',
  description = 'Everything you need to know about SoraUI components and tokens.',
  items,
  className,
}: FAQSectionProps) {
  return (
    <section
      className={className}
      style={{
        padding: '4rem 1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: 700,
            color: 'var(--ui-foreground, #0c1a2b)',
            margin: '0 0 0.75rem 0',
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--ui-muted-foreground, #71717a)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      <Accordion type="single" collapsible defaultValue={items[0]?.id || ''}>
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger style={{ fontSize: '1.0625rem', fontWeight: 600 }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p style={{ color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
