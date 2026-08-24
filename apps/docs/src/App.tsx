import React, { useState, useEffect } from 'react';
import { DocsLayout } from './components/docs-layout';
import { HomePage } from './pages/home-page';
import { PlaygroundPage } from './pages/playground';
import { ComponentPage } from './pages/component-page';
import { BlockPage } from './pages/block-page';
import { TemplatePage } from './pages/template-page';
import { IntroductionPage } from './pages/guides/introduction-page';
import { ComponentsIndexPage } from './pages/guides/components-index-page';
import { InstallationPage } from './pages/guides/installation-page';
import { ChangelogPage } from './pages/guides/changelog-page';
import { ThemingPage } from './pages/guides/theming-page';
import { ThemePresetsPage } from './pages/guides/theme-presets-page';
import { CLIReferencePage } from './pages/guides/cli-reference-page';
import { NextjsPage } from './pages/guides/nextjs-page';
import { VitePage } from './pages/guides/vite-page';
import { LaravelPage } from './pages/guides/laravel-page';
import { ReactRouterPage } from './pages/guides/react-router-page';
import { AstroPage } from './pages/guides/astro-page';
import { ManualPage } from './pages/guides/manual-page';
import { MigrationPage } from './pages/guides/migration-page';
import { SkillsPage } from './pages/guides/skills-page';
import { McpGuidePage } from './pages/guides/mcp-guide-page';
import { SemverPage } from './pages/guides/semver-page';

import { getComponentDoc, getBlockDoc, getTemplateDoc } from './registry';

function normalizeRoute(route: string): string {
  const r = route.toLowerCase().replace(/\/+$/, '') || '/';

  if (r === '' || r === '/' || r === '/home') return '/';
  if (r === '/intro' || r === '/introduction' || r === '/guides/intro' || r === '/guides/introduction') return '/guides/introduction';
  if (r === '/components' || r === '/guide/components' || r === '/guides/components') return '/components';
  if (r === '/install' || r === '/installation' || r === '/guides/install' || r === '/guides/installation') return '/guides/installation';
  if (r === '/theming' || r === '/themes' || r === '/guides/themes' || r === '/guides/theming') return '/guides/theming';
  if (r === '/theme-presets' || r === '/presets' || r === '/guides/presets' || r === '/guides/theme-presets') return '/guides/theme-presets';
  if (r === '/cli' || r === '/cli-reference' || r === '/guides/cli' || r === '/guides/cli-reference') return '/guides/cli-reference';
  if (r === '/skills' || r === '/guides/skills') return '/guides/skills';
  if (r === '/mcp' || r === '/mcp-guide' || r === '/guides/mcp' || r === '/guides/mcp-guide') return '/guides/mcp-guide';
  if (r === '/changelog' || r === '/guides/changelog') return '/guides/changelog';
  if (r === '/next' || r === '/nextjs' || r === '/guides/next' || r === '/guides/nextjs') return '/guides/nextjs';
  if (r === '/vite' || r === '/guides/vite') return '/guides/vite';
  if (r === '/laravel' || r === '/guides/laravel') return '/guides/laravel';
  if (r === '/react-router' || r === '/remix' || r === '/guides/remix' || r === '/guides/react-router') return '/guides/react-router';
  if (r === '/astro' || r === '/guides/astro') return '/guides/astro';
  if (r === '/manual' || r === '/guides/manual') return '/guides/manual';
  if (r === '/migration' || r === '/migrate' || r === '/guides/migration') return '/guides/migration';
  if (r === '/semver' || r === '/versioning' || r === '/guides/semver') return '/guides/semver';
  if (r === '/playground' || r === '/theme-builder') return '/playground';
  if (r === '/blocks') return '/blocks/login-form';
  if (r === '/templates') return '/templates/dashboard-page';

  return r;
}

function parseHash(hashString: string): { route: string; anchor?: string } {
  let raw = hashString ? (hashString.startsWith('#') ? hashString.slice(1) : hashString) : '/';
  if (!raw || raw === '' || raw === '/') return { route: '/' };

  // Remove query string if any
  const queryIdx = raw.indexOf('?');
  if (queryIdx !== -1) {
    raw = raw.substring(0, queryIdx);
  }

  // Check if there is an in-page anchor e.g. /guides/nextjs#cli-init or /#cli-init
  let routePart = raw;
  let anchorPart: string | undefined = undefined;

  const hashIdx = raw.indexOf('#');
  if (hashIdx !== -1) {
    routePart = raw.substring(0, hashIdx);
    anchorPart = raw.substring(hashIdx + 1);
  }

  if (routePart && !routePart.startsWith('/')) {
    routePart = '/' + routePart;
  }

  const normalized = normalizeRoute(routePart);
  return anchorPart ? { route: normalized, anchor: anchorPart } : { route: normalized };
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    const parsed = parseHash(window.location.hash);
    return parsed.route || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      if (parsed.route) {
        setCurrentPath(parsed.route);
        if (parsed.anchor) {
          setTimeout(() => {
            const el = document.getElementById(parsed.anchor!);
            if (el) {
              const yOffset = -80;
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 50);
        }
      } else if (parsed.anchor) {
        // Just an anchor on the current page
        const el = document.getElementById(parsed.anchor);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    const parsed = parseHash(path);
    if (parsed.route) {
      setCurrentPath(parsed.route);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (currentPath === '/guides/introduction') {
      return <IntroductionPage onNavigate={navigate} />;
    }
    if (currentPath === '/components') {
      return <ComponentsIndexPage onNavigate={navigate} />;
    }
    if (currentPath === '/playground') {
      return <PlaygroundPage />;
    }
    if (currentPath === '/guides/installation') {
      return <InstallationPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/changelog') {
      return <ChangelogPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/theming') {
      return <ThemingPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/theme-presets') {
      return <ThemePresetsPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/cli-reference') {
      return <CLIReferencePage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/nextjs') {
      return <NextjsPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/vite') {
      return <VitePage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/laravel') {
      return <LaravelPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/react-router') {
      return <ReactRouterPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/astro') {
      return <AstroPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/manual') {
      return <ManualPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/migration') {
      return <MigrationPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/skills') {
      return <SkillsPage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/mcp-guide') {
      return <McpGuidePage onNavigate={navigate} />;
    }
    if (currentPath === '/guides/semver') {
      return <SemverPage onNavigate={navigate} />;
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
        return <BlockPage doc={doc} onNavigate={navigate} />;
      }
    }

    // Dynamic Template route
    if (currentPath.startsWith('/templates/')) {
      const templateId = currentPath.replace('/templates/', '');
      const doc = getTemplateDoc(templateId);
      if (doc) {
        return <TemplatePage doc={doc} onNavigate={navigate} />;
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

  // Homepage: rendered OUTSIDE DocsLayout (no sidebar)
  if (currentPath === '/') {
    return <HomePage onNavigate={navigate} />;
  }

  return (
    <DocsLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </DocsLayout>
  );
};
