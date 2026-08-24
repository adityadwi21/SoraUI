import React from 'react';
import { Badge } from '@soraui/react';
import { CodeBlock } from '../../components/code-block';

export const ThemePresetsPage: React.FC = () => {
  const themes = [
    { name: 'Sky', id: 'sky', primary: '#0ea5e9', bg: '#ffffff', darkBg: '#09090b', desc: 'Modern cyan blue palette (default)' },
    { name: 'Cloud', id: 'cloud', primary: '#64748b', bg: '#ffffff', darkBg: '#0f172a', desc: 'Neutral slate gray minimal palette' },
    { name: 'Aurora', id: 'aurora', primary: '#10b981', bg: '#ffffff', darkBg: '#064e3b', desc: 'Vibrant emerald green nature palette' },
    { name: 'Horizon', id: 'horizon', primary: '#f97316', bg: '#ffffff', darkBg: '#431407', desc: 'Warm sunset orange energetic palette' },
    { name: 'Twilight', id: 'twilight', primary: '#8b5cf6', bg: '#ffffff', darkBg: '#2e1065', desc: 'Deep violet dreamscape palette' },
    { name: 'Midnight', id: 'midnight', primary: '#3b82f6', bg: '#09090b', darkBg: '#030712', desc: 'True dark mode high contrast palette' },
    { name: 'Nebula', id: 'nebula', primary: '#ec4899', bg: '#ffffff', darkBg: '#500724', desc: 'Cosmic pink futuristic palette' },
    { name: 'Eclipse', id: 'eclipse', primary: '#eab308', bg: '#ffffff', darkBg: '#422006', desc: 'Solar gold luminous palette' },
    { name: 'Starlight', id: 'starlight', primary: '#06b6d4', bg: '#ffffff', darkBg: '#083344', desc: 'Crisp teal aquatic palette' },
  ];

  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Theme Presets</h1>
        </div>
        <p className="sora-doc-lead">
          SoraUI includes 9 pre-engineered, accessible color palettes ready for instant use via CSS custom properties.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            9 Presets
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            WCAG AA
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="presets-grid" className="sora-doc-h2">
          <span>Available Presets</span>
          <a href="#presets-grid" className="sora-doc-anchor">#</a>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {themes.map((t) => (
            <div
              key={t.id}
              style={{
                border: '1px solid var(--docs-border)',
                borderRadius: 'var(--docs-radius)',
                padding: '1.25rem',
                background: 'var(--docs-bg-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: t.primary,
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--docs-fg)' }}>{t.name}</h3>
                  <code style={{ fontSize: '0.75rem', color: 'var(--docs-fg-muted)' }}>data-theme=&quot;{t.id}&quot;</code>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--docs-fg-muted)', lineHeight: 1.5 }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sora-doc-section">
        <h2 id="how-to-apply" className="sora-doc-h2">
          <span>How to Apply a Preset</span>
          <a href="#how-to-apply" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">Import the corresponding CSS preset and apply the <code>data-theme</code> attribute to your root element:</p>
        <CodeBlock
          language="tsx"
          code={`// 1. Import preset stylesheet
import '@soraui/core/dist/tokens/themes/aurora.css';

// 2. Set theme on html or container
<html data-theme="aurora">
  <body>...</body>
</html>`}
        />
      </section>
    </div>
  );
};
