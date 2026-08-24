import React, { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge, Button, Input, Switch, Slider, Avatar, AvatarFallback,
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@soraui/react';
import { CodeBlock } from '../../components/code-block';

export interface IntroductionPageProps {
  onNavigate: (path: string) => void;
}

export const IntroductionPage: React.FC<IntroductionPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('developer@soraui.dev');
  const [notifs, setNotifs] = useState(true);
  const [cpu, setCpu] = useState(72);

  const copyCLI = () => {
    navigator.clipboard.writeText('npx @soraui/cli init').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: '⚡', title: 'Zero Runtime Styling', desc: '100% native CSS custom properties. 0ms stylesheet generation, 0 KB runtime parser.' },
    { icon: '🛡️', title: 'Source Code Ownership', desc: 'Components copy into your repo. No vendor lock-in, no npm abstractions. You own the AST.' },
    { icon: '♿', title: 'WCAG AA Accessible', desc: 'Full keyboard navigation, focus trapping, screen-reader alerts, accessible dialogs.' },
    { icon: '🤖', title: 'AI-Native MCP Server', desc: 'Built-in MCP stdio server for Claude, Cursor, and Gemini. Zero hallucination component search.' },
  ];

  return (
    <div className="docs-page sora-shadcn-page" style={{ position: 'relative' }}>
      <div className="docs-hero-glow" aria-hidden />

      {/* ── HERO ── */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
        <button type="button" className="docs-hero-announce" onClick={() => onNavigate('/guides/installation')}>
          <span aria-hidden>✨</span>
          <span>SoraUI v0.1.0 is now live on NPM</span>
          <span className="docs-hero-announce-arrow">Read guide →</span>
        </button>

        <h1 className="docs-hero-h1">
          Build fast. Ship less.{' '}
          <span className="docs-hero-grad">Own your UI.</span>
        </h1>

        <p className="docs-hero-sub">
          An open-source, token-first React UI construction system. 44 accessible primitives,
          14 production blocks, 9 cosmic themes, and native AI MCP tooling with{' '}
          <strong>zero runtime CSS overhead</strong>.
        </p>

        <div className="docs-hero-actions">
          <button type="button" className="docs-btn-primary" id="hero-get-started" onClick={() => onNavigate('/guides/installation')}>
            Get Started →
          </button>
          <button type="button" className="docs-btn-outline" id="hero-browse" onClick={() => onNavigate('/components/button')}>
            Browse Components
          </button>
          <button type="button" className="docs-copy-pill" id="hero-cli" onClick={copyCLI} title="Click to copy">
            <span className="docs-copy-pill-dollar" aria-hidden>$</span>
            <span>npx @soraui/cli init</span>
            <span>{copied ? '✓' : '📋'}</span>
          </button>
        </div>
      </div>

      {/* ── SHOWCASE ── */}
      <section className="sora-doc-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 id="interactive-showcase" className="sora-doc-h2" style={{ marginTop: 0 }}>
              <span>Interactive Showcase</span>
              <a href="#interactive-showcase" className="sora-doc-anchor">#</a>
            </h2>
            <p className="sora-subtext">Real SoraUI primitives — live and interactive.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('/playground')}>Open Playground ↗</Button>
        </div>

        <div style={{
          padding: '1.75rem',
          borderRadius: 'var(--docs-radius)',
          border: '1px solid var(--docs-border)',
          background: 'var(--docs-canvas-bg)',
          backgroundImage: 'radial-gradient(var(--docs-canvas-dot) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}>
          <div className="docs-showcase-grid">
            {/* Card 1 */}
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                  <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
                  <div>
                    <CardTitle style={{ fontSize: '0.9375rem' }}>Sora Admin</CardTitle>
                    <CardDescription style={{ fontSize: '0.8125rem' }}>Pro Plan · Active</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label htmlFor="sc-email" style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Email</label>
                  <Input id="sc-email" value={email} onChange={e => setEmail(e.target.value)} size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Push Alerts</span>
                  <Switch id="sc-notifs" checked={notifs} onCheckedChange={setNotifs} />
                </div>
              </CardContent>
              <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ fontSize: '0.9375rem' }}>System Metrics</CardTitle>
                  <Badge variant="success">99.98% SLA</Badge>
                </div>
                <CardDescription style={{ fontSize: '0.8125rem' }}>Live telemetry</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cpu">
                  <TabsList style={{ width: '100%', marginBottom: '0.875rem' }}>
                    <TabsTrigger value="cpu" style={{ flex: 1 }}>CPU</TabsTrigger>
                    <TabsTrigger value="mem" style={{ flex: 1 }}>Memory</TabsTrigger>
                    <TabsTrigger value="io" style={{ flex: 1 }}>I/O</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cpu">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                        <span>Allocation</span><strong>{cpu}%</strong>
                      </div>
                      <Slider value={cpu} onValueChange={(v: number) => setCpu(v)} max={100} id="sc-cpu" />
                      <div style={{ display: 'flex', gap: '0.375rem' }}>
                        <Badge variant="secondary">4 Cores</Badge>
                        <Badge variant="outline">0ms Jitter</Badge>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="mem">
                    <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground)', margin: 0 }}>
                      Memory: <strong>32.4 MB</strong> / 512 MB
                    </p>
                  </TabsContent>
                  <TabsContent value="io">
                    <p style={{ fontSize: '0.875rem', color: 'var(--ui-muted-foreground)', margin: 0 }}>
                      <strong>1.4k req/s</strong> · 0ms parse overhead
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="sora-doc-section">
        <h2 id="features" className="sora-doc-h2">
          <span>Engineered for Performance &amp; Scale</span>
          <a href="#features" className="sora-doc-anchor">#</a>
        </h2>
        <div className="docs-feature-grid">
          {features.map(f => (
            <div key={f.title} className="docs-feature-card">
              <div className="docs-feature-icon" aria-hidden>{f.icon}</div>
              <div className="docs-feature-title">{f.title}</div>
              <div className="docs-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICKSTART ── */}
      <section className="sora-doc-section">
        <h2 id="quickstart" className="sora-doc-h2">
          <span>Quickstart in 30 Seconds</span>
          <a href="#quickstart" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          Initialize SoraUI in your Vite or Next.js project:
        </p>
        <CodeBlock
          language="bash"
          code={`# 1. Initialize
npx @soraui/cli init

# 2. Add components
npx @soraui/cli add button card dialog select

# 3. Import & use
import { Button, Card, ThemeProvider } from '@soraui/react';`}
        />
        <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <button type="button" className="docs-btn-primary" onClick={() => onNavigate('/guides/installation')}>Installation Guide →</button>
          <button type="button" className="docs-btn-outline" onClick={() => onNavigate('/guides/theming')}>Theming Guide</button>
        </div>
      </section>
    </div>
  );
};
