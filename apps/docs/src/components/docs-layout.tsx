import React, { useState } from 'react';
import { COMPONENT_DOCS } from '../registry/components';
import { BLOCK_DOCS } from '../registry/blocks';
import { TEMPLATE_DOCS } from '../registry/templates';
import { GUIDE_DOCS } from '../registry/guides';
import { SearchDialog } from './search-dialog';
import { Badge, Button } from '@soraui/react';

export interface DocsLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group components by category
  const componentCategories = ['General', 'Forms', 'Navigation', 'Feedback', 'Overlays', 'Data Display', 'Layout'] as const;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ui-background, #ffffff)', color: 'var(--ui-foreground, #0c1a2b)' }}>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={onNavigate} />

      {/* Top Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          width: '100%',
          borderBottom: '1px solid var(--ui-border, #e4e4e7)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: 'inherit',
            }}
            className="docs-mobile-menu-btn"
          >
            ☰
          </button>
          <div
            onClick={() => onNavigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 800, fontSize: '1.25rem', color: 'var(--ui-primary, #0ea5e9)' }}
          >
            SoraUI
            <Badge variant="secondary" style={{ fontSize: '0.6875rem' }}>v0.1.0</Badge>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--ui-radius, 0.375rem)',
              border: '1px solid var(--ui-border, #e4e4e7)',
              backgroundColor: 'var(--ui-muted, #f4f4f5)',
              color: 'var(--ui-muted-foreground, #71717a)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            <span>Search docs...</span>
            <kbd style={{ fontSize: '0.6875rem', backgroundColor: 'var(--ui-background, #ffffff)', padding: '0.125rem 0.25rem', borderRadius: '3px', border: '1px solid var(--ui-border, #e4e4e7)' }}>
              ⌘K
            </kbd>
          </button>

          <Button
            variant={currentPath === '/playground' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onNavigate('/playground')}
          >
            🎨 Playground
          </Button>

          <a
            href="https://github.com/soraui/soraui"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', fontSize: '1.125rem', marginLeft: '0.25rem' }}
            title="GitHub"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: '260px',
            borderRight: '1px solid var(--ui-border, #e4e4e7)',
            padding: '1.5rem 1rem',
            overflowY: 'auto',
            height: 'calc(100vh - 60px)',
            position: 'sticky',
            top: '60px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Getting Started */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
              Getting Started
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {GUIDE_DOCS.map((guide) => {
                const href = `/guides/${guide.id}`;
                const isActive = currentPath === href;
                return (
                  <button
                    key={guide.id}
                    onClick={() => onNavigate(href)}
                    style={{
                      textAlign: 'left',
                      padding: '0.375rem 0.5rem',
                      borderRadius: 'var(--ui-radius, 0.375rem)',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--ui-muted, #f4f4f5)' : 'transparent',
                      color: isActive ? 'var(--ui-primary, #0ea5e9)' : 'inherit',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    {guide.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Components Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.5rem', paddingLeft: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Components</span>
              <span style={{ fontSize: '0.6875rem', opacity: 0.8 }}>44</span>
            </div>
            {componentCategories.map((cat) => {
              const comps = COMPONENT_DOCS.filter((c) => c.category === cat);
              if (comps.length === 0) return null;

              return (
                <div key={cat} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ui-muted-foreground, #71717a)', padding: '0.25rem 0.5rem' }}>
                    {cat}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                    {comps.map((comp) => {
                      const href = `/components/${comp.id}`;
                      const isActive = currentPath === href;
                      return (
                        <button
                          key={comp.id}
                          onClick={() => onNavigate(href)}
                          style={{
                            textAlign: 'left',
                            padding: '0.3125rem 0.5rem',
                            borderRadius: 'var(--ui-radius, 0.375rem)',
                            border: 'none',
                            backgroundColor: isActive ? 'var(--ui-muted, #f4f4f5)' : 'transparent',
                            color: isActive ? 'var(--ui-primary, #0ea5e9)' : 'inherit',
                            fontWeight: isActive ? 600 : 400,
                            fontSize: '0.8125rem',
                            cursor: 'pointer',
                          }}
                        >
                          {comp.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Blocks Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.5rem', paddingLeft: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Blocks</span>
              <span style={{ fontSize: '0.6875rem', opacity: 0.8 }}>14</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {BLOCK_DOCS.map((block) => {
                const href = `/blocks/${block.id}`;
                const isActive = currentPath === href;
                return (
                  <button
                    key={block.id}
                    onClick={() => onNavigate(href)}
                    style={{
                      textAlign: 'left',
                      padding: '0.3125rem 0.5rem',
                      borderRadius: 'var(--ui-radius, 0.375rem)',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--ui-muted, #f4f4f5)' : 'transparent',
                      color: isActive ? 'var(--ui-primary, #0ea5e9)' : 'inherit',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    {block.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Templates Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ui-muted-foreground, #71717a)', marginBottom: '0.5rem', paddingLeft: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Templates</span>
              <span style={{ fontSize: '0.6875rem', opacity: 0.8 }}>4</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {TEMPLATE_DOCS.map((template) => {
                const href = `/templates/${template.id}`;
                const isActive = currentPath === href;
                return (
                  <button
                    key={template.id}
                    onClick={() => onNavigate(href)}
                    style={{
                      textAlign: 'left',
                      padding: '0.3125rem 0.5rem',
                      borderRadius: 'var(--ui-radius, 0.375rem)',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--ui-muted, #f4f4f5)' : 'transparent',
                      color: isActive ? 'var(--ui-primary, #0ea5e9)' : 'inherit',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    {template.name}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main
          style={{
            flex: 1,
            padding: '2.5rem 3rem',
            maxWidth: '1000px',
            minWidth: 0,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
