import React from 'react';
import { THEME_DOCS } from '../../registry/themes';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@soraui/react';

export const ThemePresetsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Presets</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Theme Presets Gallery
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          SoraUI includes 9 beautifully crafted space and atmosphere-inspired theme presets, satisfying the 24-key Theme Contract.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {THEME_DOCS.map((theme) => (
          <Card key={theme.id}>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <CardTitle style={{ fontSize: '1.125rem' }}>{theme.name}</CardTitle>
                <Badge variant={theme.mode === 'light' ? 'default' : 'secondary'}>{theme.mode}</Badge>
              </div>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: theme.primaryColor,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ui-muted-foreground, #71717a)' }}>Primary Accent</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{theme.primaryColor}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
