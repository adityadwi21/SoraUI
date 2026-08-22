import React from 'react';

export const SemverPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ui-primary, #0ea5e9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Release Governance
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>
          Semantic Versioning & Deprecation Policy
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--ui-muted-foreground)', lineHeight: 1.6 }}>
          SoraUI follows strict Semantic Versioning (SemVer 2.0) with formal stability and API freeze guarantees.
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Release Channels</h2>
        <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li><strong>Major (X.0.0):</strong> Breaking public API changes, prop renames, or removal of deprecated components. Minimum 1 minor cycle deprecation warning in console prior to removal.</li>
          <li><strong>Minor (0.X.0):</strong> New components, blocks, themes, hooks, or backwards-compatible feature additions.</li>
          <li><strong>Patch (0.0.X):</strong> Bug fixes, accessibility patches, documentation updates, and performance optimizations with 0 API impact.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Public API Stability Guarantee</h2>
        <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
          All 44 core components in <code>@soraui/react</code>, the design tokens in <code>@soraui/core</code>, and the registry schema in <code>@soraui/mcp</code> are verified by automated contract regression tests before every release. Any modification to public exports triggers an automated CI gate block.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Deprecation Lifecycle</h2>
        <ol style={{ lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li><strong>Announcement:</strong> Deprecated APIs are marked with JSDoc <code>@deprecated</code> tags with replacement recommendations.</li>
          <li><strong>Runtime Warning:</strong> In development mode, SoraUI emits non-intrusive console warnings with upgrade hints.</li>
          <li><strong>Grace Period:</strong> APIs remain operational for at least one minor release cycle before removal in the next major version.</li>
        </ol>
      </section>
    </div>
  );
};
