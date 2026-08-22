export const RECIPE_KEYS = ['auth_flow', 'dashboard', 'saas_landing', 'settings_tabs'] as const;
export type RecipeKey = (typeof RECIPE_KEYS)[number];

export function handleComposeRecipe(params: {
  recipe: RecipeKey;
  theme?: string | undefined;
  mode?: 'light' | 'dark' | undefined;
}) {
  const { recipe, theme = 'sky', mode = 'light' } = params;

  switch (recipe) {
    case 'auth_flow':
      return {
        recipeVersion: '1.0',
        pattern: 'auth_flow',
        theme: theme ?? 'sky',
        mode: mode ?? 'light',
        requiredComponents: ['card', 'input', 'label', 'button', 'separator', 'badge'],
        requiredBlocks: ['login-form'],
        generatedCode: `'use client';

import React from 'react';
import { ThemeProvider, ThemeScope, LoginForm, Card, CardContent } from '@soraui/react';
import '@soraui/react/styles';

export default function AuthPage() {
  const handleLogin = async (data: { email: string; password?: string }) => {
    // Consumer implementation: Call authentication API / OAuth provider
    console.log('Login submitted:', data);
  };

  return (
    <ThemeProvider defaultTheme="${theme ?? 'sky'}" defaultMode="${mode ?? 'light'}">
      <main className="sora-auth-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <ThemeScope theme="${theme ?? 'sky'}">
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={() => console.log('Navigate to forgot password')}
          />
        </ThemeScope>
      </main>
    </ThemeProvider>
  );
}
`,
      };

    case 'dashboard':
      return {
        recipeVersion: '1.0',
        pattern: 'dashboard',
        theme: theme ?? 'sky',
        mode: mode ?? 'light',
        requiredComponents: ['button', 'avatar', 'dropdown', 'card', 'statistic', 'input', 'data-table', 'pagination'],
        requiredBlocks: ['dashboard-shell', 'metric-grid', 'data-table-block'],
        generatedCode: `'use client';

import React from 'react';
import {
  ThemeProvider,
  DashboardShell,
  MetricGrid,
  DataTableBlock,
} from '@soraui/react';
import '@soraui/react/styles';

export default function DashboardPage() {
  const metrics = [
    { title: 'Total Revenue', value: '$45,231.89', trend: { value: '+20.1%', isPositive: true } },
    { title: 'Subscriptions', value: '+2,350', trend: { value: '+180.1%', isPositive: true } },
    { title: 'Active Now', value: '+573', trend: { value: '+19%', isPositive: true } },
  ];

  return (
    <ThemeProvider defaultTheme="${theme ?? 'sky'}" defaultMode="${mode ?? 'light'}">
      <DashboardShell
        user={{ name: 'Alex Rivera', email: 'alex@example.com', role: 'Administrator' }}
        onLogout={() => console.log('User logged out')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MetricGrid metrics={metrics} />
          <DataTableBlock />
        </div>
      </DashboardShell>
    </ThemeProvider>
  );
}
`,
      };

    case 'saas_landing':
      return {
        recipeVersion: '1.0',
        pattern: 'saas_landing',
        theme: theme ?? 'sky',
        mode: mode ?? 'light',
        requiredComponents: ['button', 'badge', 'card', 'switch', 'accordion', 'input', 'separator'],
        requiredBlocks: ['hero-section', 'feature-grid', 'pricing-table', 'faq-section', 'footer-section'],
        generatedCode: `'use client';

import React from 'react';
import {
  ThemeProvider,
  HeroSection,
  FeatureGrid,
  PricingTable,
  FAQSection,
  FooterSection,
} from '@soraui/react';
import '@soraui/react/styles';

export default function LandingPage() {
  return (
    <ThemeProvider defaultTheme="${theme ?? 'sky'}" defaultMode="${mode ?? 'light'}">
      <div className="sora-landing-wrapper">
        <HeroSection
          badgeText="✨ SoraUI v1.0 Released"
          title="Build Next-Gen Web Experiences"
          description="A lightweight, token-driven, accessible UI component library built for developer speed."
          primaryCtaText="Get Started"
          onPrimaryCta={() => console.log('Primary CTA clicked')}
        />
        <FeatureGrid />
        <PricingTable onSelectPlan={(plan) => console.log('Selected plan:', plan)} />
        <FAQSection />
        <FooterSection />
      </div>
    </ThemeProvider>
  );
}
`,
      };

    case 'settings_tabs':
      return {
        recipeVersion: '1.0',
        pattern: 'settings_tabs',
        theme: theme ?? 'sky',
        mode: mode ?? 'light',
        requiredComponents: ['button', 'avatar', 'dropdown', 'card', 'tabs', 'input', 'label', 'switch'],
        requiredBlocks: ['dashboard-shell', 'settings-form'],
        generatedCode: `'use client';

import React from 'react';
import {
  ThemeProvider,
  DashboardShell,
  SettingsForm,
} from '@soraui/react';
import '@soraui/react/styles';

export default function SettingsPage() {
  const handleSave = (updatedProfile: any) => {
    console.log('Saved profile:', updatedProfile);
  };

  return (
    <ThemeProvider defaultTheme="${theme ?? 'sky'}" defaultMode="${mode ?? 'light'}">
      <DashboardShell
        user={{ name: 'Alex Rivera', email: 'alex@example.com' }}
      >
        <SettingsForm onSave={handleSave} />
      </DashboardShell>
    </ThemeProvider>
  );
}
`,
      };

    default:
      throw new Error(`Unknown recipe pattern "${recipe}". Available: auth_flow, dashboard, saas_landing, settings_tabs`);
  }
}
