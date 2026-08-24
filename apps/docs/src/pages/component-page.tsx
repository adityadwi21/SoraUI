import React, { useState, useMemo } from 'react';
import type { ComponentDoc } from '../registry/types';
import { COMPONENT_DOCS } from '../registry/components';
import { ComponentPreview } from '../components/component-preview';
import { PropTable } from '../components/prop-table';
import { CodeBlock } from '../components/code-block';
import { getManualComponentCode } from '../registry/manual-source';
import { Badge } from '@soraui/react';

export interface ComponentPageProps {
  doc: ComponentDoc;
  onNavigate?: (path: string) => void;
}

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

function getMinimalUsageSnippet(doc: ComponentDoc): string {
  switch (doc.id) {
    case 'label':
      return `<Label htmlFor="email">Your email address</Label>`;
    case 'button':
      return `<Button variant="primary">Button</Button>`;
    case 'input':
      return `<Input type="email" placeholder="Email" />`;
    case 'checkbox':
      return `<Checkbox id="terms" />`;
    case 'switch':
      return `<Switch id="airplane-mode" />`;
    case 'badge':
      return `<Badge>Badge</Badge>`;
    case 'textarea':
      return `<Textarea placeholder="Type your message here." />`;
    case 'select':
      return `<Select>\n  <SelectTrigger>\n    <SelectValue placeholder="Select a fruit" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple">Apple</SelectItem>\n    <SelectItem value="banana">Banana</SelectItem>\n  </SelectContent>\n</Select>`;
    case 'card':
      return `<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n  <CardFooter>\n    <p>Card Footer</p>\n  </CardFooter>\n</Card>`;
    default:
      return `<${doc.name} />`;
  }
}

import { Check, Copy, ChevronLeft, ChevronRight, ExternalLink, Info, FileCode } from 'lucide-react';
import { GitHubIcon } from '../components/brand-icons';

export const ComponentPage: React.FC<ComponentPageProps> = ({ doc, onNavigate }) => {
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');
  const [pkgManager, setPkgManager] = useState<PackageManager>('pnpm');
  const [pageCopied, setPageCopied] = useState(false);
  const [manualExpanded, setManualExpanded] = useState(false);

  // Find previous and next components in registry
  const { prevComp, nextComp } = useMemo(() => {
    const idx = COMPONENT_DOCS.findIndex((c) => c.id === doc.id);
    return {
      prevComp: idx > 0 ? COMPONENT_DOCS[idx - 1] : null,
      nextComp: idx < COMPONENT_DOCS.length - 1 ? COMPONENT_DOCS[idx + 1] : null,
    };
  }, [doc.id]);

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate full markdown for "Copy Page"
  const handleCopyPage = async () => {
    const md = `# ${doc.name}

${doc.description}

## Installation

\`\`\`bash
npx @soraui/cli add ${doc.id}
\`\`\`

## Usage

\`\`\`tsx
import { ${doc.name} } from '@soraui/react';

${getMinimalUsageSnippet(doc)}
\`\`\`

## API Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
${doc.props.map((p) => `| ${p.name} | \`${p.type}\` | \`${p.default || '-'}\` | ${p.description} |`).join('\n')}
`;

    try {
      await navigator.clipboard.writeText(md);
      setPageCopied(true);
      setTimeout(() => setPageCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  // CLI Command based on package manager
  const getCliCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'pnpm':
        return `pnpm dlx @soraui/cli add ${doc.id}`;
      case 'npm':
        return `npx @soraui/cli add ${doc.id}`;
      case 'yarn':
        return `yarn dlx @soraui/cli add ${doc.id}`;
      case 'bun':
        return `bunx @soraui/cli add ${doc.id}`;
    }
  };

  // Package install command based on package manager
  const getPkgInstallCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'pnpm':
        return `pnpm add @soraui/react`;
      case 'npm':
        return `npm install @soraui/react`;
      case 'yarn':
        return `yarn add @soraui/react`;
      case 'bun':
        return `bun add @soraui/react`;
    }
  };

  const manualSourceCode = getManualComponentCode(doc.id, doc.name);
  const minimalUsage = getMinimalUsageSnippet(doc);

  return (
    <div className="docs-page sora-shadcn-page">
      {/* ─── 1. HEADER ─── */}
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">{doc.name}</h1>

          {/* Quick Header Actions */}
          <div className="sora-doc-header-actions">
            {/* Copy Page Button */}
            <button
              type="button"
              className={`sora-btn-pill${pageCopied ? ' sora-btn-pill--success' : ''}`}
              onClick={handleCopyPage}
              title="Copy full page markdown"
              aria-label="Copy Page Markdown"
            >
              {pageCopied ? (
                <>
                  <Check size={13} />
                  <span>Copied Page</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Page</span>
                </>
              )}
            </button>

            {/* Quick Prev / Next jump buttons */}
            <div className="sora-quick-nav">
              {prevComp && (
                <button
                  type="button"
                  className="sora-quick-nav-btn"
                  onClick={() => handleNav(`/components/${prevComp.id}`)}
                  title={`Previous: ${prevComp.name}`}
                >
                  <ChevronLeft size={13} />
                  <span>{prevComp.name}</span>
                </button>
              )}
              {nextComp && (
                <button
                  type="button"
                  className="sora-quick-nav-btn"
                  onClick={() => handleNav(`/components/${nextComp.id}`)}
                  title={`Next: ${nextComp.name}`}
                >
                  <span>{nextComp.name}</span>
                  <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="sora-doc-lead">{doc.description}</p>

        {/* Badges / Links bar */}
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Level {doc.level}
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            {doc.category}
          </Badge>
          <Badge
            variant={doc.status === 'stable' ? 'success' : 'warning'}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
          >
            {doc.status}
          </Badge>

          <a
            href={`https://github.com/adityadwi21/SoraUI/tree/main/packages/react/src/components/${doc.id}`}
            target="_blank"
            rel="noreferrer"
            className="sora-doc-link-chip"
          >
            <GitHubIcon size={13} />
            <span>Source</span>
            <ExternalLink size={11} style={{ opacity: 0.6 }} />
          </a>

          {doc.accessibility?.role && (
            <span className="sora-doc-badge-neutral">
              ARIA: <code>{doc.accessibility.role}</code>
            </span>
          )}
        </div>
      </div>

      {/* ─── 2. MAIN HERO PREVIEW ─── */}
      {doc.examples[0] && (
        <div className="sora-hero-preview-section">
          <ComponentPreview code={doc.examples[0].code}>
            {doc.examples[0].render()}
          </ComponentPreview>
        </div>
      )}

      {/* Context Alert / Callout */}
      <div className="sora-doc-callout">
        <div className="sora-doc-callout-icon">
          <Info size={16} />
        </div>
        <div className="sora-doc-callout-content">
          {doc.id === 'label' ? (
            <p>
              For form fields, use the <code>&lt;Label htmlFor="..."&gt;</code> component paired with form controls like <code>Input</code> or <code>Checkbox</code> for built-in label click-to-focus and screen reader accessibility.
            </p>
          ) : (
            <p>
              This component is part of SoraUI design system with zero runtime CSS dependencies and full theme customization support.
            </p>
          )}
        </div>
      </div>

      {/* ─── 3. INSTALLATION ─── */}
      <section className="sora-doc-section">
        <h2 id="installation" className="sora-doc-h2">
          <span>Installation</span>
          <a href="#installation" className="sora-doc-anchor" aria-label="Link to Installation section">#</a>
        </h2>

        {/* Segmented Tab: CLI / Manual */}
        <div className="sora-tabs-container">
          <div className="sora-segmented-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={installTab === 'cli'}
              className={`sora-segmented-tab${installTab === 'cli' ? ' active' : ''}`}
              onClick={() => setInstallTab('cli')}
            >
              CLI
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={installTab === 'manual'}
              className={`sora-segmented-tab${installTab === 'manual' ? ' active' : ''}`}
              onClick={() => setInstallTab('manual')}
            >
              Manual
            </button>
          </div>
        </div>

        {/* CLI Tab Content */}
        {installTab === 'cli' ? (
          <div className="sora-tab-content">
            <p className="sora-subtext">Install dependencies:</p>

            {/* Package Manager Selectors */}
            <div className="sora-pm-tabs">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  className={`sora-pm-btn${pkgManager === pm ? ' active' : ''}`}
                  onClick={() => setPkgManager(pm)}
                >
                  {pm}
                </button>
              ))}
            </div>

            <CodeBlock code={getCliCommand(pkgManager)} language="bash" />
          </div>
        ) : (
          /* Manual Tab Content */
          <div className="sora-tab-content">
            <div className="sora-step-list">
              <div className="sora-step-item">
                <span className="sora-step-num">1</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">Install the following dependencies:</p>
                  <div className="sora-pm-tabs">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        className={`sora-pm-btn${pkgManager === pm ? ' active' : ''}`}
                        onClick={() => setPkgManager(pm)}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                  <CodeBlock code={getPkgInstallCommand(pkgManager)} language="bash" />
                </div>
              </div>

              <div className="sora-step-item">
                <span className="sora-step-num">2</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">Copy and paste the following code into your project:</p>

                  <div className="sora-manual-code-wrapper">
                    <div className="sora-manual-header">
                      <div className="sora-file-badge">
                        <FileCode size={13} />
                        <span>components/ui/{doc.id}.tsx</span>
                      </div>
                      <button
                        type="button"
                        className="sora-expand-btn"
                        onClick={() => setManualExpanded((v) => !v)}
                      >
                        {manualExpanded ? 'Collapse' : 'Expand'}
                      </button>
                    </div>

                    <div className={`sora-manual-code-container${manualExpanded ? ' expanded' : ' collapsed'}`}>
                      <CodeBlock code={manualSourceCode} language="typescript" filename={`components/ui/${doc.id}.tsx`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sora-step-item">
                <span className="sora-step-num">3</span>
                <div className="sora-step-body">
                  <p className="sora-step-text">Update the import paths to match your project setup.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── 4. USAGE ─── */}
      <section className="sora-doc-section">
        <h2 id="usage" className="sora-doc-h2">
          <span>Usage</span>
          <a href="#usage" className="sora-doc-anchor" aria-label="Link to Usage section">#</a>
        </h2>

        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
          <CodeBlock code={`import { ${doc.name} } from '@soraui/react';`} language="typescript" />
          <CodeBlock code={minimalUsage} language="tsx" />
        </div>
      </section>

      {/* ─── 5. EXAMPLES & VARIATIONS ─── */}
      {doc.examples.length > 0 && (
        <section className="sora-doc-section">
          <div style={{ display: 'grid', gap: '3rem' }}>
            {doc.examples.map((ex, index) => {
              const exampleSlug = ex.id || `example-${index}`;
              return (
                <div key={ex.id || index} className="sora-example-block">
                  <h2 id={exampleSlug} className="sora-doc-h2">
                    <span>{ex.title}</span>
                    <a href={`#${exampleSlug}`} className="sora-doc-anchor" aria-label={`Link to ${ex.title}`}>#</a>
                  </h2>
                  {ex.description && <p className="sora-subtext">{ex.description}</p>}
                  <ComponentPreview code={ex.code}>{ex.render()}</ComponentPreview>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── 6. API REFERENCE / PROPS ─── */}
      <section className="sora-doc-section">
        <h2 id="api-reference" className="sora-doc-h2">
          <span>API Reference</span>
          <a href="#api-reference" className="sora-doc-anchor" aria-label="Link to API Reference section">#</a>
        </h2>

        <PropTable props={doc.props} />

        {/* Theming Tokens */}
        {doc.themingTokens && doc.themingTokens.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 id="theming-tokens" className="sora-doc-h3">
              <span>CSS Variables &amp; Tokens</span>
              <a href="#theming-tokens" className="sora-doc-anchor" aria-label="Link to CSS Variables section">#</a>
            </h3>
            <p className="sora-subtext">The following CSS custom properties control the appearance of this component:</p>
            <div className="sora-tokens-list">
              {doc.themingTokens.map((token) => (
                <div key={token} className="sora-token-item">
                  <code>{token}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accessibility & Keyboard Support */}
        {doc.accessibility && (
          <div style={{ marginTop: '2rem' }}>
            <h3 id="accessibility" className="sora-doc-h3">
              <span>Accessibility &amp; WAI-ARIA</span>
              <a href="#accessibility" className="sora-doc-anchor" aria-label="Link to Accessibility section">#</a>
            </h3>
            <div className="sora-a11y-box">
              {doc.accessibility.role && (
                <p style={{ fontSize: '0.875rem', color: 'var(--docs-fg-muted)', marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--docs-fg)' }}>ARIA Role: </strong>
                  <code style={{ fontSize: '0.8125rem' }}>{doc.accessibility.role}</code>
                </p>
              )}

              {doc.accessibility.aria?.length ? (
                <div style={{ marginBottom: '0.875rem' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--docs-fg)', marginBottom: '0.375rem' }}>
                    ARIA Attributes:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
                    {doc.accessibility.aria.map((a, i) => (
                      <li key={i}>
                        <code style={{ fontSize: '0.8125rem', color: 'var(--docs-fg)' }}>{a.attribute}</code>: {a.usage}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {doc.accessibility.keyboard?.length ? (
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--docs-fg)', marginBottom: '0.375rem' }}>
                    Keyboard Navigation:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
                    {doc.accessibility.keyboard.map((k, i) => (
                      <li key={i}>
                        <strong style={{ color: 'var(--docs-fg)' }}>{k.key}</strong>: {k.action}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
