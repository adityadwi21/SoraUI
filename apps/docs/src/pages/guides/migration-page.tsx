import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@soraui/react';

export const MigrationPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Migration</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Migration from Radix & shadcn/ui
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          Concept and architectural mapping when transitioning your codebase to SoraUI.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Core Differences</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Zero Heavy External Runtime Dependencies</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Unlike Radix/shadcn which rely on <code>@radix-ui/*</code> npm packages, SoraUI uses internal hand-rolled positioning and focus-trapping hooks (<code>@soraui/hooks</code>) without third-party runtime weight.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1rem' }}>Pure CSS Variables vs Tailwind Utility Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                SoraUI relies on native CSS custom properties (<code>--ui-*</code> and <code>--sora-*</code>), making theme switches instantaneous and fully framework-agnostic.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Component Name Mapping</h2>
        <div style={{ overflowX: 'auto', borderRadius: 'var(--ui-radius, 0.5rem)', border: '1px solid var(--ui-border, #e4e4e7)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--ui-muted, #f4f4f5)', borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Radix / shadcn/ui</th>
                <th style={{ padding: '0.75rem 1rem' }}>SoraUI Equivalent</th>
                <th style={{ padding: '0.75rem 1rem' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>Dialog</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: 'var(--ui-primary, #0ea5e9)' }}>Dialog</td>
                <td style={{ padding: '0.75rem 1rem' }}>Built-in focus trap and backdrop blur</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>DropdownMenu</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: 'var(--ui-primary, #0ea5e9)' }}>Dropdown</td>
                <td style={{ padding: '0.75rem 1rem' }}>Keyboard roving tabindex navigation</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ui-border, #e4e4e7)' }}>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace' }}>Sheet</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: 'var(--ui-primary, #0ea5e9)' }}>Drawer</td>
                <td style={{ padding: '0.75rem 1rem' }}>Slide-in panel with smooth CSS transitions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
