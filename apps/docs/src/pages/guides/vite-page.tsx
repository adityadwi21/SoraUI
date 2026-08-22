import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const VitePage: React.FC = () => {
  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="secondary" style={{ marginBottom: '0.75rem' }}>Frameworks</Badge>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Vite & SPA Integration Guide
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground, #71717a)', lineHeight: 1.6, margin: 0 }}>
          How to configure SoraUI inside a Vite + React Single Page Application.
        </p>
      </div>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Entry Point (<code>src/main.tsx</code>)</h2>
        <CodeBlock
          code={`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@soraui/core/theme/primitives.css';
import '@soraui/core/theme/presets/sky.css';
import '@soraui/react/dist/index.css';
import { ThemeProvider } from '@soraui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="sky" defaultMode="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`}
          language="tsx"
          filename="src/main.tsx"
        />
      </section>
    </div>
  );
};
