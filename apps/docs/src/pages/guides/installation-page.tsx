import React from 'react';
import { CodeBlock } from '../../components/code-block';
import { Badge } from '@soraui/react';

export const InstallationPage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Installation &amp; Setup</h1>
        </div>
        <p className="sora-doc-lead">
          How to install, configure, and add SoraUI components and blocks to your project with zero runtime CSS dependencies.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Getting Started
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            CLI &amp; NPM
          </Badge>
        </div>
      </div>

      {/* Method 1: CLI */}
      <section className="sora-doc-section">
        <h2 id="cli-method" className="sora-doc-h2">
          <span>Method 1: SoraUI CLI (Recommended)</span>
          <a href="#cli-method" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          The CLI copies component and block source code directly into your repository, giving you 100% code ownership with zero vendor lock-in.
        </p>

        <div className="sora-step-list">
          <div className="sora-step-item">
            <span className="sora-step-num">1</span>
            <div className="sora-step-body">
              <p className="sora-step-text">Initialize SoraUI in your project directory:</p>
              <CodeBlock code="npx @soraui/cli init" language="bash" />
            </div>
          </div>

          <div className="sora-step-item">
            <span className="sora-step-num">2</span>
            <div className="sora-step-body">
              <p className="sora-step-text">Add primitive components on demand:</p>
              <CodeBlock code="npx @soraui/cli add button input card dialog select" language="bash" />
            </div>
          </div>

          <div className="sora-step-item">
            <span className="sora-step-num">3</span>
            <div className="sora-step-body">
              <p className="sora-step-text">Add production-ready blocks:</p>
              <CodeBlock code="npx @soraui/cli add block login-form saas-pricing" language="bash" />
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: NPM */}
      <section className="sora-doc-section">
        <h2 id="npm-package" className="sora-doc-h2">
          <span>Method 2: Direct NPM Package</span>
          <a href="#npm-package" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Alternatively, you can install the published library package directly:
        </p>

        <CodeBlock code="pnpm add @soraui/react @soraui/core @soraui/hooks" language="bash" />

        <div style={{ marginTop: '1rem' }}>
          <p className="sora-subtext">Import core theme tokens and styles in your app entry point (<code>main.tsx</code> or <code>layout.tsx</code>):</p>
          <CodeBlock
            code={`import '@soraui/core/theme/primitives.css';
import '@soraui/core/theme/presets/sky.css';
import '@soraui/react/dist/index.css';`}
            language="typescript"
          />
        </div>
      </section>
    </div>
  );
};
