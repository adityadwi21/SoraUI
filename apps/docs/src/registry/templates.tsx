import type { TemplateDoc } from './types';

// Templates
import { LoginPageTemplate } from '@soraui/react';
import { DashboardPageTemplate } from '@soraui/react';
import { SaaSLandingPageTemplate } from '@soraui/react';
import { SettingsPageTemplate } from '@soraui/react';

export const TEMPLATE_DOCS: TemplateDoc[] = [
  {
    id: 'login-page',
    name: 'Login Page Template',
    category: 'auth',
    description: 'Full split-screen authentication page layout with brand quote.',
    blocks: ['login-form'],
    dependencies: ['card', 'input', 'label', 'button', 'checkbox', 'separator'],
    tags: ['auth', 'login', 'template', 'split'],
    preview: { desktop: true, mobile: true },
    code: `<LoginPageTemplate
  brandName="SoraUI"
  brandTagline="Build fast. Ship less. Own your UI."
/>`,
    render: () => (
      <div style={{ height: '450px', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: 'var(--ui-radius, 0.5rem)', overflow: 'hidden' }}>
        <LoginPageTemplate brandName="Acme SaaS" />
      </div>
    ),
  },
  {
    id: 'dashboard-page',
    name: 'Dashboard Page Template',
    category: 'dashboard',
    description: 'Full dashboard page composing DashboardShell, MetricGrid, and DataTableBlock.',
    blocks: ['dashboard-shell', 'metric-grid', 'data-table-block'],
    dependencies: ['button', 'avatar', 'dropdown', 'card', 'statistic', 'input', 'data-table', 'pagination'],
    tags: ['dashboard', 'kpi', 'table', 'shell', 'template'],
    preview: { desktop: true, mobile: true },
    code: `<DashboardPageTemplate
  shellProps={{
    navigation: [{ id: '1', label: 'Overview', active: true }],
  }}
  metricsProps={{
    items: [{ label: 'Revenue', value: '$45,200', trend: { value: '12%', direction: 'up' } }],
  }}
  tableProps={{
    columns: [{ accessorKey: 'name', header: 'Name' }],
    data: [{ id: '1', name: 'Acme Project' }],
  }}
/>`,
    render: () => (
      <div style={{ height: '480px', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: 'var(--ui-radius, 0.5rem)', overflow: 'hidden' }}>
        <DashboardPageTemplate
          shellProps={{
            brand: 'Console',
            navigation: [
              { id: '1', label: 'Overview', active: true },
              { id: '2', label: 'Projects' },
            ],
          }}
          metricsProps={{
            items: [
              { label: 'Revenue', value: '$45,200', trend: { value: '12%', direction: 'up' } },
              { label: 'Users', value: '3,840', trend: { value: '4%', direction: 'up' } },
            ],
          }}
          tableProps={{
            columns: [
              { accessorKey: 'name', header: 'Project' },
              { accessorKey: 'status', header: 'Status' },
            ],
            data: [
              { id: '1', name: 'Alpha Core', status: 'Running' },
              { id: '2', name: 'Beta API', status: 'Deployed' },
            ],
          }}
        />
      </div>
    ),
  },
  {
    id: 'saas-landing-page',
    name: 'SaaS Landing Page Template',
    category: 'marketing',
    description: 'Full marketing landing page composing HeroSection, FeatureGrid, PricingTable, FAQSection, and FooterSection.',
    blocks: ['hero-section', 'feature-grid', 'pricing-table', 'faq-section', 'footer-section'],
    dependencies: ['button', 'badge', 'card', 'switch', 'accordion', 'input', 'separator'],
    tags: ['marketing', 'landing', 'saas', 'template'],
    preview: { desktop: true, mobile: true },
    code: `<SaaSLandingPageTemplate
  hero={{ title: 'Next-Gen Architecture', description: 'Zero-runtime style library' }}
  features={{ title: 'Features', features: [{ id: '1', title: 'Fast', description: 'Sub-1ms load' }] }}
  pricing={{ plans: [{ id: '1', name: 'Pro', price: '$29', features: ['All features'] }] }}
  faq={{ items: [{ id: '1', question: 'Is it free?', answer: 'Yes, MIT license.' }] }}
  footer={{ columns: [{ title: 'Links', links: [{ label: 'Docs', href: '#' }] }] }}
/>`,
    render: () => (
      <div style={{ maxHeight: '500px', overflowY: 'auto', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: 'var(--ui-radius, 0.5rem)' }}>
        <SaaSLandingPageTemplate
          hero={{ title: 'Ship Faster with SoraUI', description: 'Zero runtime styling, pure CSS tokens, full keyboard accessibility.' }}
          features={{ title: 'Key Advantages', features: [{ id: '1', title: 'Lightweight', description: '< 1.5 KB per primitive' }, { id: '2', title: 'Themable', description: '9 preset palettes' }] }}
          pricing={{ plans: [{ id: '1', name: 'Hobby', price: '$0', features: ['Unlimited Dev'] }, { id: '2', name: 'Pro', price: '$19', popular: true, features: ['Support', 'Templates'] }] }}
          faq={{ items: [{ id: '1', question: 'Can I use this commercially?', answer: 'Yes! SoraUI is 100% open source under the MIT license.' }] }}
          footer={{ columns: [{ title: 'Product', links: [{ label: 'Overview', href: '#' }] }] }}
        />
      </div>
    ),
  },
  {
    id: 'settings-page',
    name: 'Settings Page Template',
    category: 'settings',
    description: 'Full account and preferences configuration page.',
    blocks: ['dashboard-shell', 'settings-form'],
    dependencies: ['button', 'avatar', 'dropdown', 'card', 'tabs', 'input', 'label', 'switch'],
    tags: ['settings', 'preferences', 'profile', 'template'],
    preview: { desktop: true, mobile: true },
    code: `<SettingsPageTemplate
  shellProps={{
    navigation: [{ id: 'settings', label: 'Settings', active: true }],
  }}
  settingsProps={{}}
/>`,
    render: () => (
      <div style={{ height: '480px', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: 'var(--ui-radius, 0.5rem)', overflow: 'hidden' }}>
        <SettingsPageTemplate
          shellProps={{
            brand: 'Admin',
            navigation: [{ id: '1', label: 'Account Settings', active: true }],
          }}
          settingsProps={{}}
        />
      </div>
    ),
  },
];
