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

export interface ReactRouterPageProps {
  onNavigate?: (path: string) => void;
}

export const ReactRouterPage: React.FC<ReactRouterPageProps> = ({ onNavigate }) => {
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
    const fullText = `# React Router Installation\n\nInstall and configure React Router v7 with SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const getCmd = (type: 'init-t' | 'add', tab: 'pnpm' | 'npm' | 'yarn' | 'bun', extra = '') => {
    if (type === 'init-t') {
      switch (tab) {
        case 'pnpm': return `pnpm dlx @soraui/cli@latest init -t react-router ${extra}`.trim();
        case 'npm': return `npx @soraui/cli@latest init -t react-router ${extra}`.trim();
        case 'yarn': return `yarn dlx @soraui/cli@latest init -t react-router ${extra}`.trim();
        case 'bun': return `bunx --bun @soraui/cli@latest init -t react-router ${extra}`.trim();
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
          <h1 className="docs-intro-title">React Router</h1>
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
                onClick={() => go('/guides/laravel')}
                title="Previous: Laravel"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/astro')}
                title="Next: Astro"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Install and configure React Router v7 (formerly Remix) with SoraUI.
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
            Generate customized tokens and theme scope.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'cli' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-the-cli', 'cli')}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Scaffold a preconfigured React Router v7 template.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'existing' ? ' active' : ''}`}
          onClick={() => scrollToSection('existing-project', 'existing')}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an existing React Router app.
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
          Customize your design tokens visually and copy the CSS variables directly:
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
          Scaffold a new React Router v7 project pre-configured with SoraUI tokens and components:
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
              onClick={() => copyText(getCmd('init-t', tab1), 'cmd-init-t')}
              title="Copy command"
            >
              {copiedCmd === 'cmd-init-t' ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>
          <pre className="docs-tabbed-codeblock-pre">
            <code>{getCmd('init-t', tab1)}</code>
          </pre>
        </div>
      </section>

      {/* ─── SECTION 3: EXISTING PROJECT ─── */}
      <section className="docs-intro-section" id="existing-project">
        <h2 className="docs-intro-h2">
          <span>Manual / Existing Project Setup</span>
          <a href="#existing-project" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <h3 className="docs-intro-h3">1. Install Packages</h3>
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
              {tab2 === 'pnpm' && 'pnpm add @soraui/react @soraui/core lucide-react'}
              {tab2 === 'npm' && 'npm install @soraui/react @soraui/core lucide-react'}
              {tab2 === 'yarn' && 'yarn add @soraui/react @soraui/core lucide-react'}
              {tab2 === 'bun' && 'bun add @soraui/react @soraui/core lucide-react'}
            </code>
          </pre>
        </div>

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>2. Setup Root Styles</h3>
        <p>Import SoraUI tokens inside <code>app/root.tsx</code> or <code>app/app.css</code>:</p>
        <CodeBlock
          language="tsx"
          title="app/root.tsx"
          code={`import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import '@soraui/core/dist/index.css';
import './app.css';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}
        />

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>3. Add and Use Components</h3>
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
            <code>{getCmd('add', tab3, 'button dialog tabs')}</code>
          </pre>
        </div>

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>4. Example Route Component</h3>
        <CodeBlock
          language="tsx"
          title="app/routes/home.tsx"
          code={`import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function Home() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>React Router v7 + SoraUI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Full SSR support, clean server actions, and accessible UI components.
          </p>
          <Button variant="primary">Explore Components</Button>
        </CardContent>
      </Card>
    </main>
  );
}`}
        />
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go('/guides/laravel')}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Laravel</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go('/guides/astro')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Astro</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
