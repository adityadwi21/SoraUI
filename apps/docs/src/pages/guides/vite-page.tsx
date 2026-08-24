import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const VitePage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Vite Integration</h1>
        </div>
        <p className="sora-doc-lead">
          Get started with SoraUI in a React Vite single page application with blazing fast HMR and zero runtime overhead.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Framework
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Vite + React
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="create-project" className="sora-doc-h2">
          <span>1. Create a Vite React Project</span>
          <a href="#create-project" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Initialize a new React + TypeScript project with Vite if you haven&apos;t already:
        </p>
        <CodeBlock language="bash" code="pnpm create vite my-soraui-app --template react-ts" />
      </section>

      <section className="sora-doc-section">
        <h2 id="install-soraui" className="sora-doc-h2">
          <span>2. Install SoraUI</span>
          <a href="#install-soraui" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Install the React primitive library and design token core:</p>
        <CodeBlock language="bash" code="pnpm add @soraui/react @soraui/core @soraui/hooks" />
      </section>

      <section className="sora-doc-section">
        <h2 id="configure-styles" className="sora-doc-h2">
          <span>3. Import SoraUI Styles</span>
          <a href="#configure-styles" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Add SoraUI primitive styles and your preferred theme preset to <code>src/main.tsx</code> or <code>src/index.css</code>:
        </p>
        <CodeBlock
          language="tsx"
          filename="src/main.tsx"
          code={`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import SoraUI core tokens and component styles
import '@soraui/core/dist/tokens/themes/sky.css';
import '@soraui/react/dist/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
        />
      </section>

      <section className="sora-doc-section">
        <h2 id="usage" className="sora-doc-h2">
          <span>4. Start Building</span>
          <a href="#usage" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Use any SoraUI primitive inside your components:</p>
        <CodeBlock
          language="tsx"
          filename="src/App.tsx"
          code={`import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@soraui/react';

export default function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to SoraUI</CardTitle>
          <CardDescription>Zero-runtime React design system</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}`}
        />
      </section>
    </div>
  );
};
