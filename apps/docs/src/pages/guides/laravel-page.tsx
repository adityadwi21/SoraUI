import React, { useState } from 'react';
import {
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { Button } from '@soraui/react';
import { CodeBlock } from '../../components/code-block';

export interface LaravelPageProps {
  onNavigate?: (path: string) => void;
}

export const LaravelPage: React.FC<LaravelPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tab1, setTab1] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab2, setTab2] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab3, setTab3] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeStartPoint, setActiveStartPoint] = useState<'theme-builder' | 'cli' | 'existing'>('cli');

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
  };

  const scrollToSection = (sectionId: string, pointId: 'theme-builder' | 'cli' | 'existing') => {
    setActiveStartPoint(pointId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCopyPage = () => {
    const fullText = `# Laravel Installation\n\nInstall and configure Laravel with Inertia.js React and SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const getCmd = (type: 'init' | 'add', tab: 'pnpm' | 'npm' | 'yarn' | 'bun', extra = '') => {
    if (type === 'init') {
      switch (tab) {
        case 'pnpm': return `pnpm dlx @soraui/cli@latest init ${extra}`.trim();
        case 'npm': return `npx @soraui/cli@latest init ${extra}`.trim();
        case 'yarn': return `yarn dlx @soraui/cli@latest init ${extra}`.trim();
        case 'bun': return `bunx --bun @soraui/cli@latest init ${extra}`.trim();
      }
    }
    if (type === 'add') {
      switch (tab) {
        case 'pnpm': return `pnpm dlx @soraui/cli@latest add ${extra}`.trim();
        case 'npm': return `npx @soraui/cli@latest add ${extra}`.trim();
        case 'yarn': return `yarn dlx @soraui/cli@latest add ${extra}`.trim();
        case 'bun': return `bunx --bun @soraui/cli@latest add ${extra}`.trim();
      }
    }
    return '';
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Laravel</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy Page as Markdown"
              aria-label="Copy Page as Markdown"
            >
              {copied ? (
                <>
                  <Check size={14} className="docs-copy-check" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/vite')}
                title="Previous: Vite"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/react-router')}
                title="Next: React Router"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Install and configure Laravel with Inertia.js React and SoraUI design tokens.
        </p>
      </header>

      {/* ─── STARTING POINTS CARDS ─── */}
      <div className="docs-install-start-cards">
        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'theme-builder' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-theme-builder', 'theme-builder')}
        >
          <div className="docs-install-start-title">Use Theme Builder</div>
          <div className="docs-install-start-sub">
            Customize colors and tokens visually before scaffolding.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'cli' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-the-cli', 'cli')}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Initialize SoraUI directly inside your Inertia React app.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'existing' ? ' active' : ''}`}
          onClick={() => scrollToSection('existing-project', 'existing')}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an existing Laravel project.
          </div>
        </button>
      </div>

      {/* ─── SECTION 1: THEME BUILDER ─── */}
      <section className="docs-intro-section" id="use-theme-builder">
        <h2 className="docs-intro-h2">
          <span>Use Theme Builder</span>
          <a href="#use-theme-builder" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>
        <p>
          Pick a cosmic theme preset, fine-tune the 20 CSS tokens, and generate ready-to-use tokens for your Laravel app:
        </p>
        <div style={{ marginTop: '0.75rem' }}>
          <Button variant="primary" size="sm" onClick={() => go('/playground')} style={{ fontWeight: 600 }}>
            Open Theme Builder
          </Button>
        </div>
      </section>

      {/* ─── SECTION 2: USE THE CLI ─── */}
      <section className="docs-intro-section" id="use-the-cli">
        <h2 className="docs-intro-h2">
          <span>Use the CLI</span>
          <a href="#use-the-cli" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>
        <p>
          First create a fresh Laravel application with Inertia.js React:
        </p>
        <CodeBlock
          language="bash"
          code="laravel new my-app --react"
        />

        <p style={{ marginTop: '1rem' }}>
          Then navigate into your project and initialize SoraUI:
        </p>

        <div className="docs-tabbed-codeblock">
          <div className="docs-tabbed-codeblock-header">
            <div className="docs-tabbed-codeblock-tabs">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`docs-tabbed-codeblock-tab${tab1 === tab ? ' active' : ''}`}
                  onClick={() => setTab1(tab)}
                >
                  <Terminal size={12} style={{ opacity: 0.7 }} />
                  <span>{tab}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="docs-tabbed-codeblock-copy"
              onClick={() => copyText(getCmd('init', tab1), 'cmd-init')}
              title="Copy command"
            >
              {copiedCmd === 'cmd-init' ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
          <pre className="docs-tabbed-codeblock-pre">
            <code>{getCmd('init', tab1)}</code>
          </pre>
        </div>
      </section>

      {/* ─── SECTION 3: EXISTING PROJECT ─── */}
      <section className="docs-intro-section" id="existing-project">
        <h2 className="docs-intro-h2">
          <span>Manual / Existing Project Setup</span>
          <a href="#existing-project" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <h3 className="docs-intro-h3">1. Install Dependencies</h3>
        <div className="docs-tabbed-codeblock">
          <div className="docs-tabbed-codeblock-header">
            <div className="docs-tabbed-codeblock-tabs">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`docs-tabbed-codeblock-tab${tab2 === tab ? ' active' : ''}`}
                  onClick={() => setTab2(tab)}
                >
                  <Terminal size={12} style={{ opacity: 0.7 }} />
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          </div>
          <pre className="docs-tabbed-codeblock-pre">
            <code>
              {tab2 === 'pnpm' && 'pnpm add @soraui/react @soraui/core lucide-react clsx'}
              {tab2 === 'npm' && 'npm install @soraui/react @soraui/core lucide-react clsx'}
              {tab2 === 'yarn' && 'yarn add @soraui/react @soraui/core lucide-react clsx'}
              {tab2 === 'bun' && 'bun add @soraui/react @soraui/core lucide-react clsx'}
            </code>
          </pre>
        </div>

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>2. Configure Vite Path Aliases</h3>
        <p>Ensure <code>vite.config.js</code> resolves <code>@</code> to <code>resources/js</code>:</p>
        <CodeBlock
          language="javascript"
          title="vite.config.js"
          code={`import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
});`}
        />

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>3. Import SoraUI CSS Tokens</h3>
        <p>Import the base tokens in <code>resources/css/app.css</code>:</p>
        <CodeBlock
          language="css"
          title="resources/css/app.css"
          code={`@import '@soraui/core/dist/index.css';

:root {
  --ui-primary: #0284c7;
  --ui-radius: 0.5rem;
}`}
        />

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>4. Add Components</h3>
        <div className="docs-tabbed-codeblock">
          <div className="docs-tabbed-codeblock-header">
            <div className="docs-tabbed-codeblock-tabs">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`docs-tabbed-codeblock-tab${tab3 === tab ? ' active' : ''}`}
                  onClick={() => setTab3(tab)}
                >
                  <Terminal size={12} style={{ opacity: 0.7 }} />
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          </div>
          <pre className="docs-tabbed-codeblock-pre">
            <code>{getCmd('add', tab3, 'button card dialog')}</code>
          </pre>
        </div>

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>5. Example Inertia Page</h3>
        <CodeBlock
          language="tsx"
          title="resources/js/Pages/Welcome.tsx"
          code={`import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Laravel + SoraUI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Zero runtime CSS variables with complete accessibility and Inertia React support.
          </p>
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}`}
        />
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go('/guides/vite')}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Vite</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go('/guides/react-router')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">React Router</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
