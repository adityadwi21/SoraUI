import React, { useState, useEffect } from 'react';
import { DocsLayout } from './components/docs-layout';
import { PlaygroundPage } from './pages/playground';
import { ComponentPage } from './pages/component-page';
import { BlockPage } from './pages/block-page';
import { TemplatePage } from './pages/template-page';
import { IntroductionPage } from './pages/guides/introduction-page';
import { InstallationPage } from './pages/guides/installation-page';
import { ThemingPage } from './pages/guides/theming-page';
import { ThemePresetsPage } from './pages/guides/theme-presets-page';
import { CLIReferencePage } from './pages/guides/cli-reference-page';
import { NextjsPage } from './pages/guides/nextjs-page';
import { VitePage } from './pages/guides/vite-page';
import { MigrationPage } from './pages/guides/migration-page';
import { McpGuidePage } from './pages/guides/mcp-guide-page';
import { SemverPage } from './pages/guides/semver-page';


import { getComponentDoc, getBlockDoc, getTemplateDoc } from './registry';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash ? window.location.hash.slice(1) : '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash ? window.location.hash.slice(1) : '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (currentPath === '/' || currentPath === '/guides/introduction') {
      return <IntroductionPage onNavigate={navigate} />;
    }
    if (currentPath === '/playground') {
      return <PlaygroundPage />;
    }
    if (currentPath === '/guides/installation') {
      return <InstallationPage />;
    }
    if (currentPath === '/guides/theming' || currentPath === '/theming') {
      return <ThemingPage />;
    }
    if (currentPath === '/guides/theme-presets') {
      return <ThemePresetsPage />;
    }
    if (currentPath === '/guides/cli-reference') {
      return <CLIReferencePage />;
    }
    if (currentPath === '/guides/nextjs') {
      return <NextjsPage />;
    }
    if (currentPath === '/guides/vite') {
      return <VitePage />;
    }
    if (currentPath === '/guides/migration') {
      return <MigrationPage />;
    }
    if (currentPath === '/guides/mcp-guide' || currentPath === '/guides/mcp') {
      return <McpGuidePage />;
    }
    if (currentPath === '/guides/semver') {
      return <SemverPage />;
    }


    // Dynamic Component route
    if (currentPath.startsWith('/components/')) {
      const compId = currentPath.replace('/components/', '');
      const doc = getComponentDoc(compId);
      if (doc) {
        return <ComponentPage doc={doc} onNavigate={navigate} />;
      }
    }

    // Dynamic Block route
    if (currentPath.startsWith('/blocks/')) {
      const blockId = currentPath.replace('/blocks/', '');
      const doc = getBlockDoc(blockId);
      if (doc) {
        return <BlockPage doc={doc} />;
      }
    }

    // Dynamic Template route
    if (currentPath.startsWith('/templates/')) {
      const templateId = currentPath.replace('/templates/', '');
      const doc = getTemplateDoc(templateId);
      if (doc) {
        return <TemplatePage doc={doc} />;
      }
    }

    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Page Not Found</h2>
        <p style={{ color: 'var(--ui-muted-foreground)' }}>The requested documentation page does not exist.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--ui-radius)',
            border: 'none',
            backgroundColor: 'var(--ui-primary)',
            color: 'var(--ui-primary-foreground)',
            cursor: 'pointer',
          }}
        >
          Return to Introduction
        </button>
      </div>
    );
  };

  return (
    <DocsLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </DocsLayout>
  );
};
