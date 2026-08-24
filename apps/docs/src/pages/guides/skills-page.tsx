import React, { useState } from 'react';
import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export interface SkillsPageProps {
  onNavigate?: (path: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [pkgTab, setPkgTab] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyPage = async () => {
    const text = `# Skills\n\nGive your AI assistant deep knowledge of SoraUI components, patterns, and best practices.\n\nhttps://github.com/adityadwi21/SoraUI`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const getSkillCommand = () => {
    switch (pkgTab) {
      case 'pnpm':
        return 'pnpm dlx skills add soraui';
      case 'npm':
        return 'npx skills add soraui';
      case 'yarn':
        return 'yarn dlx skills add soraui';
      case 'bun':
        return 'bunx --bun skills add soraui';
      default:
        return 'pnpm dlx skills add soraui';
    }
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(getSkillCommand()).catch(() => {});
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="docs-page sora-shadcn-page">
      {/* Header */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Skills</h1>
          <div className="docs-intro-actions">
            <button
              type="button"
              className="docs-intro-copy-btn"
              onClick={handleCopyPage}
              title="Copy Page Markdown"
              aria-label="Copy Page Markdown"
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
                onClick={() => go('/guides/cli-reference')}
                title="Previous: CLI Reference"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="docs-intro-nav-arrow-btn"
                onClick={() => go('/guides/mcp-guide')}
                title="Next: MCP Server"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <p className="sora-doc-lead">
          Give your AI assistant deep knowledge of SoraUI components, patterns, and best practices.
        </p>
      </div>

      {/* Intro Description */}
      <div style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--docs-fg-muted)', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 1.25rem' }}>
          Skills give AI assistants like Claude Code, Cursor, and Gemini CLI project-aware context about SoraUI. When installed, your AI assistant knows how to find, install, compose, and customize components using the correct APIs and patterns for your project.
        </p>

        <p style={{ margin: '0 0 0.75rem', color: 'var(--docs-fg)', fontWeight: 500 }}>
          For example, you can ask your AI assistant to:
        </p>

        <ul style={{ margin: '0 0 1.5rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <em style={{ color: 'var(--docs-fg)' }}>&ldquo;Add a login form with email and password fields.&rdquo;</em>
          </li>
          <li>
            <em style={{ color: 'var(--docs-fg)' }}>&ldquo;Create a settings page with a form for updating profile information.&rdquo;</em>
          </li>
          <li>
            <em style={{ color: 'var(--docs-fg)' }}>&ldquo;Build a dashboard with a sidebar, stats cards, and a data table.&rdquo;</em>
          </li>
          <li>
            <em style={{ color: 'var(--docs-fg)' }}>&ldquo;Switch to Midnight theme preset&rdquo;</em>
          </li>
          <li>
            <em style={{ color: 'var(--docs-fg)' }}>&ldquo;Can you add a hero section with gradient badge and action buttons?&rdquo;</em>
          </li>
        </ul>

        <p style={{ margin: 0 }}>
          The skill reads your project&apos;s <code>soraui.config.json</code> and canonical registry, providing the assistant with your framework, aliases, installed components, theme preset, and base tokens so it can generate 100% correct, accessible code on the first try.
        </p>
      </div>

      {/* Install Section */}
      <section className="docs-intro-section" style={{ marginTop: '2.5rem' }}>
        <h2 id="install" className="docs-intro-h2">
          <span>Install</span>
          <a href="#install" className="docs-intro-anchor">#</a>
        </h2>

        <div className="docs-tabbed-codeblock" style={{ marginTop: '1rem' }}>
          <div className="docs-tabbed-codeblock-header">
            <div className="docs-tabbed-codeblock-tabs">
              <button
                type="button"
                className={`docs-tabbed-codeblock-tab ${pkgTab === 'pnpm' ? 'active' : ''}`}
                onClick={() => setPkgTab('pnpm')}
              >
                <Terminal size={12} />
                <span>pnpm</span>
              </button>
              <button
                type="button"
                className={`docs-tabbed-codeblock-tab ${pkgTab === 'npm' ? 'active' : ''}`}
                onClick={() => setPkgTab('npm')}
              >
                <span>npm</span>
              </button>
              <button
                type="button"
                className={`docs-tabbed-codeblock-tab ${pkgTab === 'yarn' ? 'active' : ''}`}
                onClick={() => setPkgTab('yarn')}
              >
                <span>yarn</span>
              </button>
              <button
                type="button"
                className={`docs-tabbed-codeblock-tab ${pkgTab === 'bun' ? 'active' : ''}`}
                onClick={() => setPkgTab('bun')}
              >
                <span>bun</span>
              </button>
            </div>

            <button
              type="button"
              className="docs-tabbed-codeblock-copy"
              onClick={handleCopyCmd}
              title="Copy Command"
              aria-label="Copy Command"
            >
              {copiedCmd ? <Check size={13} style={{ color: '#22c55e' }} /> : <Copy size={13} />}
            </button>
          </div>

          <pre className="docs-tabbed-codeblock-pre">
            <code>{getSkillCommand()}</code>
          </pre>
        </div>

        <p className="docs-intro-note" style={{ marginTop: '1rem' }}>
          This installs the SoraUI skill into your project. Once installed, your AI assistant automatically loads it when working with SoraUI components.
        </p>

        <p className="docs-intro-note" style={{ marginTop: '0.5rem' }}>
          Learn more about skills at{' '}
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--docs-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}
          >
            skills.sh <ExternalLink size={12} />
          </a>.
        </p>
      </section>

      {/* What's Included Section */}
      <section className="docs-intro-section" style={{ marginTop: '3rem' }}>
        <h2 id="whats-included" className="docs-intro-h2">
          <span>What&apos;s Included</span>
          <a href="#whats-included" className="docs-intro-anchor">#</a>
        </h2>
        <p className="docs-intro-note">
          The skill provides your AI assistant with the following knowledge:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '1.25rem' }}>
          <div>
            <h3 id="project-context" className="docs-intro-h3" style={{ margin: '0 0 0.4rem' }}>
              Project Context
            </h3>
            <p className="docs-intro-note" style={{ margin: 0 }}>
              On every interaction, the skill runs <code>soraui doctor --json</code> to inspect your project&apos;s configuration: framework (Next.js, Vite, Laravel, React Router, Astro, Manual), styling mode, component directory paths, installed primitives, and active theme preset.
            </p>
          </div>

          <div>
            <h3 id="cli-commands" className="docs-intro-h3" style={{ margin: '0 0 0.4rem' }}>
              CLI Commands
            </h3>
            <p className="docs-intro-note" style={{ margin: 0 }}>
              Full reference for all CLI commands: <code>init</code>, <code>add</code>, <code>list</code>, <code>search</code>, <code>diff</code>, and <code>doctor</code>. Includes flags, dry-run mode, automatic dependency resolution, presets, and templates.
            </p>
          </div>

          <div>
            <h3 id="theming-and-customization" className="docs-intro-h3" style={{ margin: '0 0 0.4rem' }}>
              Theming and Customization
            </h3>
            <p className="docs-intro-note" style={{ margin: 0 }}>
              How 24 semantic CSS variables (<code>--ui-*</code>), OKLCH/HEX colors, dark mode, custom colors, border radius, and component variants work without runtime CSS overhead.
            </p>
          </div>

          <div>
            <h3 id="registry-authoring" className="docs-intro-h3" style={{ margin: '0 0 0.4rem' }}>
              Registry Authoring
            </h3>
            <p className="docs-intro-note" style={{ margin: 0 }}>
              How to build and publish custom component registries: <code>registry.json</code> format, item types, file objects, dependencies, CSS variables, building, hosting, and user configuration.
            </p>
          </div>

          <div>
            <h3 id="mcp-server" className="docs-intro-h3" style={{ margin: '0 0 0.4rem' }}>
              MCP Server
            </h3>
            <p className="docs-intro-note" style={{ margin: 0 }}>
              Setup and tools for the SoraUI MCP server (<code>@soraui/mcp</code>), which lets AI assistants search, browse, inspect, and install components from registries.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="docs-intro-section" style={{ marginTop: '3rem' }}>
        <h2 id="how-it-works" className="docs-intro-h2">
          <span>How It Works</span>
          <a href="#how-it-works" className="docs-intro-anchor">#</a>
        </h2>

        <ol style={{ margin: '1rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--docs-fg-muted)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
          <li>
            <strong style={{ color: 'var(--docs-fg)' }}>Project detection:</strong> The skill activates when it finds a <code>soraui.config.json</code> or <code>package.json</code> with <code>@soraui/*</code> in your project.
          </li>
          <li>
            <strong style={{ color: 'var(--docs-fg)' }}>Context injection:</strong> It runs <code>soraui doctor --json</code> to read your project configuration and injects the result into the assistant&apos;s context.
          </li>
          <li>
            <strong style={{ color: 'var(--docs-fg)' }}>Pattern enforcement:</strong> The assistant follows SoraUI composition rules: zero hardcoded hex colors, strict accessibility attributes (<code>role</code>, <code>aria-*</code>, focus management), and decoupled callbacks.
          </li>
          <li>
            <strong style={{ color: 'var(--docs-fg)' }}>Component discovery:</strong> The assistant uses <code>soraui search</code>, <code>soraui add</code>, or MCP tools to find components and their documentation before generating code.
          </li>
        </ol>
      </section>

      {/* Learn More Section */}
      <section className="docs-intro-section" style={{ marginTop: '3rem' }}>
        <h2 id="learn-more" className="docs-intro-h2">
          <span>Learn More</span>
          <a href="#learn-more" className="docs-intro-anchor">#</a>
        </h2>

        <ul style={{ margin: '1rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.9375rem' }}>
          <li>
            <a
              href="#/guides/cli-reference"
              onClick={(e) => { e.preventDefault(); go('/guides/cli-reference'); }}
              style={{ color: 'var(--docs-accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              CLI
            </a>
            <span style={{ color: 'var(--docs-fg-muted)' }}>: Full CLI command reference</span>
          </li>
          <li>
            <a
              href="#/guides/mcp-guide"
              onClick={(e) => { e.preventDefault(); go('/guides/mcp-guide'); }}
              style={{ color: 'var(--docs-accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              MCP Server
            </a>
            <span style={{ color: 'var(--docs-fg-muted)' }}>: Connect the MCP server for AI coding agent access</span>
          </li>
          <li>
            <a
              href="#/guides/theming"
              onClick={(e) => { e.preventDefault(); go('/guides/theming'); }}
              style={{ color: 'var(--docs-accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              Theming
            </a>
            <span style={{ color: 'var(--docs-fg-muted)' }}>: CSS variables and customization</span>
          </li>
          <li>
            <a
              href="#/guides/theme-presets"
              onClick={(e) => { e.preventDefault(); go('/guides/theme-presets'); }}
              style={{ color: 'var(--docs-accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              Theme Presets
            </a>
            <span style={{ color: 'var(--docs-fg-muted)' }}>: 9 cosmic theme presets gallery</span>
          </li>
          <li>
            <a
              href="https://skills.sh"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--docs-accent)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              skills.sh <ExternalLink size={12} />
            </a>
            <span style={{ color: 'var(--docs-fg-muted)' }}>: Learn more about AI skills</span>
          </li>
        </ul>
      </section>

      {/* Bottom Pagination */}
      <div className="docs-intro-pagination">
        <button
          type="button"
          className="docs-intro-pagination-btn"
          onClick={() => go('/guides/cli-reference')}
        >
          <ChevronLeft size={16} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)' }}>Previous</div>
            <div style={{ fontWeight: 600 }}>CLI Reference</div>
          </div>
        </button>

        <button
          type="button"
          className="docs-intro-pagination-btn"
          onClick={() => go('/guides/mcp-guide')}
          style={{ textAlign: 'right' }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)' }}>Next</div>
            <div style={{ fontWeight: 600 }}>MCP Server</div>
          </div>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
