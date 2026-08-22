import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@soraui/react';
import { CodeBlock } from '../../components/code-block';

export interface IntroductionPageProps {
  onNavigate: (path: string) => void;
}

export const IntroductionPage: React.FC<IntroductionPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="default" style={{ marginBottom: '0.75rem' }}>Manifesto</Badge>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.03em' }}>
          Own Your UI.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          SoraUI is a lightweight, accessible, token-first UI component library and developer platform engineered for complete source-code ownership with zero runtime styling overhead.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <Button variant="primary" size="lg" onClick={() => onNavigate('/guides/installation')}>
          Get Started →
        </Button>
        <Button variant="outline" size="lg" onClick={() => onNavigate('/playground')}>
          Explore Playground
        </Button>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Why SoraUI?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1.0625rem' }}>⚡ Zero Runtime Styling</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Styles are 100% native CSS custom properties. 0ms stylesheet generation, 0 KB runtime parser weight, and instant theme cascading.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1.0625rem' }}>🛡️ Source Code Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Components and blocks copy directly into your repository. No vendor lock-in, no brittle npm abstractions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: '1.0625rem' }}>♿ Keyboard & ARIA First</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6 }}>
                Full WCAG 2.1 AA keyboard roving tabindex, native focus trapping, screen-reader alerts, and accessible dialogs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>The SoraUI Ecosystem Architecture</h2>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--ui-muted, #f4f4f5)', borderRadius: 'var(--ui-radius, 0.5rem)', border: '1px solid var(--ui-border, #e4e4e7)' }}>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`Layer 1–3 Tokens (Primitives -> 24-Key Semantic Theme Contract -> Component Defaults)
       ↓
44 Primitive Components (Zero-runtime, accessible interactive elements)
       ↓
14 Production Blocks (Data-driven UI shells: Auth, Dashboard, Marketing, Forms)
       ↓
4 Full-Page Templates (Composable, production-ready screen layouts)
       ↓
CLI & Registry (Offline-first, dependency-resolving, cycle-safe distribution)`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Quick Example</h2>
        <CodeBlock
          code={`import { Button, Card, CardHeader, CardTitle, CardContent } from '@soraui/react';

export function WelcomeCard() {
  return (
    <Card elevated>
      <CardHeader>
        <CardTitle>Welcome to SoraUI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Launch Dashboard</Button>
      </CardContent>
    </Card>
  );
}`}
          language="tsx"
          filename="WelcomeCard.tsx"
        />
      </section>
    </div>
  );
};
