import React from 'react';
import { Badge } from '@soraui/react';

export const SemverPage: React.FC = () => {
  return (
    <div className="docs-page sora-shadcn-page">
      <div className="sora-doc-header">
        <div className="sora-doc-title-row">
          <h1 className="sora-doc-title">Semantic Versioning Policy</h1>
        </div>
        <p className="sora-doc-lead">
          Our commitment to backward compatibility, predictable release cadence, and safe enterprise upgrades.
        </p>
        <div className="sora-doc-chips">
          <Badge variant="secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            Policy
          </Badge>
          <Badge variant="outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
            SemVer 2.0.0
          </Badge>
        </div>
      </div>

      <section className="sora-doc-section">
        <h2 id="version-format" className="sora-doc-h2">
          <span>Version Number Format</span>
          <a href="#version-format" className="sora-doc-anchor">#</a>
        </h2>
        <p className="sora-subtext">
          SoraUI strictly follows Semantic Versioning (<code>MAJOR.MINOR.PATCH</code>):
        </p>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <strong style={{ color: 'var(--docs-fg)' }}>MAJOR (e.g. 1.0.0 → 2.0.0)</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Breaking changes to component APIs, removed props, or fundamental architectural shifts. Includes automated codemods.
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <strong style={{ color: 'var(--docs-fg)' }}>MINOR (e.g. 0.1.0 → 0.2.0)</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              New components, new props, additive features, and theme presets without breaking existing code.
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid var(--docs-border)', borderRadius: 'var(--docs-radius)', background: 'var(--docs-bg-card)' }}>
            <strong style={{ color: 'var(--docs-fg)' }}>PATCH (e.g. 0.1.0 → 0.1.1)</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--docs-fg-muted)' }}>
              Bug fixes, accessibility improvements, style adjustments, and documentation updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
