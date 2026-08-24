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

export interface AstroPageProps {
  onNavigate?: (path: string) => void;
}

export const AstroPage: React.FC<AstroPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tab1, setTab1] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab2, setTab2] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

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
    const fullText = `# Astro Installation\n\nInstall and configure Astro with React islands and SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
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
        case 'pnpm': return `pnpm dlx @soraui/cli@latest init -t astro ${extra}`.trim();
        case 'npm': return `npx @soraui/cli@latest init -t astro ${extra}`.trim();
        case 'yarn': return `yarn dlx @soraui/cli@latest init -t astro ${extra}`.trim();
        case 'bun': return `bunx --bun @soraui/cli@latest init -t astro ${extra}`.trim();
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
          <h1 className="docs-intro-title">Astro</h1>
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
                onClick={() => go('/guides/react-router')}
                title="Previous: React Router"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/manual')}
                title="Next: Manual"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Install and configure Astro with React Island architecture and SoraUI components.
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
            Customize Astro CSS variables and token palette.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'cli' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-the-cli', 'cli')}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Scaffold a pre-integrated Astro + React project.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'existing' ? ' active' : ''}`}
          onClick={() => scrollToSection('existing-project', 'existing')}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an existing Astro site.
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
          Configure and preview your cosmic theme preset for Astro:
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
          Scaffold a new Astro project preconfigured with React and SoraUI:
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
              onClick={() => copyText(getCmd('init-t', tab1), 'cmd-astro-init')}
              title="Copy command"
            >
              {copiedCmd === 'cmd-astro-init' ? <Check size={13} /> : <Copy size={13} />}
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

        <h3 className="docs-intro-h3">1. Add React to Astro</h3>
        <CodeBlock
          language="bash"
          code="npx astro add react"
        />

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>2. Install SoraUI</h3>
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

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>3. Import Tokens in Base Layout</h3>
        <CodeBlock
          language="astro"
          title="src/layouts/Layout.astro"
          code={`---
import '@soraui/core/dist/index.css';
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>`}
        />

        <h3 className="docs-intro-h3" style={{ marginTop: '1.5rem' }}>4. Use React Islands with Directives</h3>
        <p>Use interactive components with <code>client:load</code> or <code>client:visible</code>:</p>
        <CodeBlock
          language="astro"
          title="src/pages/index.astro"
          code={`---
import Layout from '../layouts/Layout.astro';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
---

<Layout title="Astro + SoraUI">
  <main class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-6">Astro Content-First with SoraUI</h1>
    
    <!-- Interactive Island -->
    <Dialog client:load>
      <DialogTrigger asChild>
        <Button variant="primary">Open Modal Island</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Interactive React Island</DialogTitle>
        <p class="text-sm text-muted-foreground mt-2">
          This dialog was hydrated client-side with zero overhead on static sections.
        </p>
      </DialogContent>
    </Dialog>
  </main>
</Layout>`}
        />
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go('/guides/react-router')}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">React Router</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go('/guides/manual')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Manual</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
