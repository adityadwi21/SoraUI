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

export interface VitePageProps {
  onNavigate?: (path: string) => void;
}

export const VitePage: React.FC<VitePageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [tab1, setTab1] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab2, setTab2] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab3, setTab3] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab4, setTab4] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [tab5, setTab5] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

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
    const fullText = `# Vite Installation\n\nInstall and configure Vite + React with SoraUI.\n\nhttps://github.com/adityadwi21/SoraUI`;
    navigator.clipboard.writeText(fullText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const getCmd = (type: 'init-t' | 'add' | 'create-vite' | 'init', tab: 'pnpm' | 'npm' | 'yarn' | 'bun', extra = '') => {
    if (type === 'init-t') {
      switch (tab) {
        case 'pnpm': return `pnpm dlx @soraui/cli@latest init -t vite ${extra}`.trim();
        case 'npm': return `npx @soraui/cli@latest init -t vite ${extra}`.trim();
        case 'yarn': return `yarn dlx @soraui/cli@latest init -t vite ${extra}`.trim();
        case 'bun': return `bunx --bun @soraui/cli@latest init -t vite ${extra}`.trim();
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
    if (type === 'create-vite') {
      switch (tab) {
        case 'pnpm': return 'pnpm create vite my-app --template react-ts';
        case 'npm': return 'npm create vite@latest my-app -- --template react-ts';
        case 'yarn': return 'yarn create vite my-app --template react-ts';
        case 'bun': return 'bun create vite my-app --template react-ts';
      }
    }
    if (type === 'init') {
      switch (tab) {
        case 'pnpm': return 'pnpm dlx @soraui/cli@latest init';
        case 'npm': return 'npx @soraui/cli@latest init';
        case 'yarn': return 'yarn dlx @soraui/cli@latest init';
        case 'bun': return 'bunx --bun @soraui/cli@latest init';
      }
    }
    return '';
  };

  return (
    <article className="docs-page sora-intro-manifesto">
      {/* ─── HEADER ─── */}
      <header className="docs-intro-header">
        <div className="docs-intro-header-top">
          <h1 className="docs-intro-title">Vite</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-copy-page-btn"
              onClick={handleCopyPage}
              title="Copy page markdown"
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: '#22c55e' }} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            <div className="docs-intro-nav-arrows">
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/nextjs')}
                title="Previous: Next.js"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/theming')}
                title="Next: Theming"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="docs-intro-lead">
          Install and configure Vite + React with SoraUI.
        </p>
      </header>

      {/* ─── STARTING CARDS ─── */}
      <div className="docs-intro-statement" style={{ margin: '1rem 0 0.875rem' }}>
        Choose the setup that matches your starting point.
      </div>

      <div className="docs-install-start-grid">
        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'theme-builder' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-theme-builder', 'theme-builder')}
        >
          <div className="docs-install-start-title">Use Theme Builder</div>
          <div className="docs-install-start-sub">
            Build your preset visually, preview your choices, and generate a setup command.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'cli' ? ' active' : ''}`}
          onClick={() => scrollToSection('use-the-cli', 'cli')}
        >
          <div className="docs-install-start-title">Use the CLI</div>
          <div className="docs-install-start-sub">
            Scaffold a supported template directly from the terminal.
          </div>
        </button>

        <button
          type="button"
          className={`docs-install-start-card${activeStartPoint === 'existing' ? ' active' : ''}`}
          onClick={() => scrollToSection('existing-project', 'existing')}
        >
          <div className="docs-install-start-title">Existing Project</div>
          <div className="docs-install-start-sub">
            Add SoraUI to an app you already created.
          </div>
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 1: USE THEME BUILDER
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="docs-intro-section" id="use-theme-builder" style={{ marginTop: '2.5rem' }}>
        <h2 className="docs-intro-h2">
          <span>Use Theme Builder</span>
          <a href="#use-theme-builder" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Build Your Preset</h3>
              <p className="docs-step-flow-desc">
                Build your preset visually, preview your choices, and generate a Vite-specific setup command.
              </p>
              <div style={{ marginTop: '0.625rem' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => go('/playground')}
                  style={{ fontWeight: 600 }}
                >
                  Open Theme Builder
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                Run the command generated by Theme Builder to create your Vite project:
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
                    onClick={() => copyText(getCmd('init-t', tab1), 'cmd1')}
                  >
                    {copiedCmd === 'cmd1' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('init-t', tab1)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">3</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Add Components</h3>
              <p className="docs-step-flow-desc">
                Add components on demand with the CLI:
              </p>
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
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd('add', tab2, 'button card dialog'), 'cmd2')}
                  >
                    {copiedCmd === 'cmd2' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('add', tab2, 'button card dialog')}</code>
                </pre>
              </div>

              <p className="docs-step-flow-desc" style={{ marginTop: '0.875rem' }}>
                Import and render the component in <code>src/App.tsx</code>:
              </p>
              <CodeBlock
                language="tsx"
                filename="src/App.tsx"
                code={`import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Button>Click me</Button>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 2: USE THE CLI
          ═════════════════════════════════════════════════════════════════════ */}
      <section className="docs-intro-section" id="use-the-cli" style={{ marginTop: '3rem' }}>
        <h2 className="docs-intro-h2">
          <span>Use the CLI</span>
          <a href="#use-the-cli" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                Initialize a new Vite project preconfigured with SoraUI:
              </p>
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
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd('init-t', tab3), 'cmd3')}
                  >
                    {copiedCmd === 'cmd3' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('init-t', tab3)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Add Components</h3>
              <p className="docs-step-flow-desc">
                Add components and start building your user interface:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab4 === tab ? ' active' : ''}`}
                        onClick={() => setTab4(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd('add', tab4, 'button'), 'cmd4')}
                  >
                    {copiedCmd === 'cmd4' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('add', tab4, 'button')}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          METHOD 3: EXISTING PROJECT
          ═════════════════════════════════════════════ */}
      <section className="docs-intro-section" id="existing-project" style={{ marginTop: '3rem' }}>
        <h2 className="docs-intro-h2">
          <span>Existing Project</span>
          <a href="#existing-project" className="docs-intro-anchor" aria-hidden>#</a>
        </h2>

        <div className="docs-step-flow">
          {/* Step 1 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">1</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Create Project</h3>
              <p className="docs-step-flow-desc">
                If you don't have an existing Vite project, scaffold one with <code>create-vite</code>:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab5 === tab ? ' active' : ''}`}
                        onClick={() => setTab5(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd('create-vite', tab5), 'cmd5')}
                  >
                    {copiedCmd === 'cmd5' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('create-vite', tab5)}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">2</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Configure tsconfig.json &amp; vite.config.ts</h3>
              <p className="docs-step-flow-desc">
                Ensure path aliases (<code>@/*</code>) are configured in <code>tsconfig.json</code> and <code>vite.config.ts</code>:
              </p>
              <CodeBlock
                language="typescript"
                filename="vite.config.ts"
                code={`import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`}
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="docs-step-flow-item">
            <div className="docs-step-flow-badge">3</div>
            <div className="docs-step-flow-body">
              <h3 className="docs-step-flow-title">Run the CLI</h3>
              <p className="docs-step-flow-desc">
                Run <code>@soraui/cli</code> init in your project root:
              </p>
              <div className="docs-tabbed-codeblock">
                <div className="docs-tabbed-codeblock-header">
                  <div className="docs-tabbed-codeblock-tabs">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`docs-tabbed-codeblock-tab${tab5 === tab ? ' active' : ''}`}
                        onClick={() => setTab5(tab)}
                      >
                        <Terminal size={12} style={{ opacity: 0.7 }} />
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="docs-tabbed-codeblock-copy"
                    onClick={() => copyText(getCmd('init', tab5), 'cmd6')}
                  >
                    {copiedCmd === 'cmd6' ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
                  </button>
                </div>
                <pre className="docs-tabbed-codeblock-pre">
                  <code>{getCmd('init', tab5)}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM PAGINATION ─── */}
      <nav className="docs-intro-pagination" aria-label="Pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn prev"
          onClick={() => go('/guides/nextjs')}
        >
          <ChevronLeft size={16} />
          <div className="docs-intro-pagination-text">
            <span className="docs-intro-pagination-label">Previous</span>
            <span className="docs-intro-pagination-title">Next.js Setup</span>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn next"
          onClick={() => go('/guides/theming')}
        >
          <div className="docs-intro-pagination-text" style={{ textAlign: 'right' }}>
            <span className="docs-intro-pagination-label">Next</span>
            <span className="docs-intro-pagination-title">Theming & Tokens</span>
          </div>
          <ChevronRight size={16} />
        </button>
      </nav>
    </article>
  );
};
