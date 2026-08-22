import type { BlockDoc } from './types';

// Blocks
import { LoginForm } from '@soraui/react';
import { RegisterForm } from '@soraui/react';
import { ForgotPasswordForm } from '@soraui/react';
import { OTPVerification } from '@soraui/react';
import { DashboardShell } from '@soraui/react';
import { MetricGrid } from '@soraui/react';
import { DataTableBlock } from '@soraui/react';
import { HeroSection } from '@soraui/react';
import { FeatureGrid } from '@soraui/react';
import { PricingTable } from '@soraui/react';
import { FAQSection } from '@soraui/react';
import { FooterSection } from '@soraui/react';
import { MultiStepWizard } from '@soraui/react';
import { SettingsForm } from '@soraui/react';

export const BLOCK_DOCS: BlockDoc[] = [
  {
    id: 'login-form',
    name: 'Login Form',
    category: 'auth',
    description: 'Accessible login card with validation feedback, remember me checkbox, and OAuth slots.',
    dependencies: ['card', 'input', 'label', 'button', 'checkbox', 'separator'],
    tags: ['auth', 'login', 'form', 'card'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'string', default: "'Welcome back'", description: 'Header card title' },
      { name: 'description', type: 'string', default: "'Enter your credentials...'", description: 'Header card subtitle' },
      { name: 'socialProviders', type: 'SocialProvider[]', description: 'List of OAuth providers' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Submitting loading state' },
      { name: 'error', type: 'string', description: 'Server validation error message' },
      { name: 'onSubmit', type: '(data: { email, password, rememberMe }) => void', description: 'Form submission callback' },
      { name: 'onSocialLogin', type: '(providerId: string) => void', description: 'OAuth button click callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Form layout & card styling', 'Local validation error banner', 'Password field formatting', 'Loading state spinner on button', 'Keyboard submit & focus navigation'],
      consumerHandles: ['Authentication API endpoint calls', 'Session & token management', 'OAuth redirect / SDK triggers', 'Post-login routing'],
    },
    code: `<LoginForm
  socialProviders={[
    { id: 'google', label: 'Continue with Google' },
    { id: 'github', label: 'Continue with GitHub' },
  ]}
  onSubmit={(data) => console.log('Login data:', data)}
  onSocialLogin={(id) => console.log('Social login:', id)}
/>`,
    render: () => (
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <LoginForm
          socialProviders={[
            { id: 'google', label: 'Continue with Google' },
            { id: 'github', label: 'Continue with GitHub' },
          ]}
        />
      </div>
    ),
  },
  {
    id: 'register-form',
    name: 'Register Form',
    category: 'auth',
    description: 'Sign-up card with real-time password strength meter and terms acceptance checkbox.',
    dependencies: ['card', 'input', 'label', 'button', 'checkbox', 'separator', 'progress'],
    tags: ['auth', 'register', 'signup', 'form'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'string', default: "'Create an account'", description: 'Card title' },
      { name: 'description', type: 'string', default: "'Start building faster...'", description: 'Card subtitle' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Submitting loading state' },
      { name: 'onSubmit', type: '(data: { name, email, password }) => void', description: 'Registration callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Full layout and inputs', 'Live password strength indicator', 'Terms checkbox enforcement UI', 'Focus management and a11y alerts'],
      consumerHandles: ['User creation backend API', 'Email verification workflows', 'Password hashing/storage', 'User redirection'],
    },
    code: `<RegisterForm
  onSubmit={(data) => console.log('Register data:', data)}
/>`,
    render: () => (
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <RegisterForm />
      </div>
    ),
  },
  {
    id: 'forgot-password-form',
    name: 'Forgot Password Form',
    category: 'auth',
    description: 'Password reset request card with success notification and back link.',
    dependencies: ['card', 'input', 'label', 'button'],
    tags: ['auth', 'password', 'reset', 'form'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'string', default: "'Reset your password'", description: 'Card title' },
      { name: 'success', type: 'boolean', default: 'false', description: 'Whether reset email was sent' },
      { name: 'onSubmit', type: '(email: string) => void', description: 'Submission callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Email field validation UI', 'Success banner switch', 'Loading state', 'Back-to-login navigation trigger'],
      consumerHandles: ['Password reset email dispatcher API', 'Token generation & expiration'],
    },
    code: `<ForgotPasswordForm
  onSubmit={(email) => console.log('Reset email:', email)}
/>`,
    render: () => (
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <ForgotPasswordForm />
      </div>
    ),
  },
  {
    id: 'otp-verification',
    name: 'OTP Verification',
    category: 'auth',
    description: 'Two-factor authentication PIN code entry card with auto-advance and resend action.',
    dependencies: ['card', 'input-otp', 'button'],
    tags: ['auth', 'otp', '2fa', 'security'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'recipient', type: 'string', description: 'Masked email or phone recipient' },
      { name: 'length', type: 'number', default: '6', description: 'Number of OTP slots' },
      { name: 'onVerify', type: '(otp: string) => void', description: 'Verification callback' },
      { name: 'onResend', type: '() => void', description: 'Resend code callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Slot-by-slot PIN auto-advance', 'Clipboard paste distribution', 'Button activation on complete entry'],
      consumerHandles: ['2FA token verification API', 'SMS/Email gateway triggers'],
    },
    code: `<OTPVerification
  recipient="alex@example.com"
  onVerify={(code) => console.log('Verified code:', code)}
  onResend={() => console.log('Resend OTP')}
/>`,
    render: () => (
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <OTPVerification recipient="alex@example.com" />
      </div>
    ),
  },
  {
    id: 'dashboard-shell',
    name: 'Dashboard Shell',
    category: 'dashboard',
    description: 'Responsive dashboard shell with collapsible sidebar, topbar, and user profile menu.',
    dependencies: ['button', 'avatar', 'dropdown'],
    tags: ['dashboard', 'shell', 'sidebar', 'layout'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'navigation', type: 'NavigationItem[]', description: 'Sidebar navigation items', required: true },
      { name: 'brand', type: 'ReactNode', default: "'SoraUI'", description: 'Brand element' },
      { name: 'user', type: '{ name: string; email: string; avatar?: string }', description: 'Logged in user' },
      { name: 'onNavigate', type: '(item: NavigationItem) => void', description: 'Navigation click' },
    ],
    boundaryExplanation: {
      soraHandles: ['Sidebar collapsing and tablet/mobile toggling', 'Active route badge highlights', 'User profile dropdown menu', 'Consistent layout grid'],
      consumerHandles: ['Client router transitions', 'Permission checks & menu filtering', 'User auth logout logic'],
    },
    code: `<DashboardShell
  brand="Acme Console"
  navigation={[
    { id: 'overview', label: 'Overview', active: true },
    { id: 'analytics', label: 'Analytics', badge: 'New' },
    { id: 'settings', label: 'Settings' },
  ]}
>
  <div>Page Content</div>
</DashboardShell>`,
    render: () => (
      <div style={{ minHeight: '320px', border: '1px solid var(--ui-border, #e4e4e7)', borderRadius: 'var(--ui-radius, 0.5rem)', overflow: 'hidden' }}>
        <DashboardShell
          brand="Acme App"
          navigation={[
            { id: '1', label: 'Overview', active: true },
            { id: '2', label: 'Analytics', badge: 'Live' },
            { id: '3', label: 'Settings' },
          ]}
        >
          <div style={{ padding: '1rem' }}>Welcome to the workspace!</div>
        </DashboardShell>
      </div>
    ),
  },
  {
    id: 'metric-grid',
    name: 'Metric Grid',
    category: 'dashboard',
    description: 'Responsive KPI statistic grid with trend direction indicators and comparison periods.',
    dependencies: ['card', 'statistic'],
    tags: ['dashboard', 'metrics', 'stats', 'kpi'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'items', type: 'MetricItem[]', description: 'Array of metrics to display', required: true },
      { name: 'columns', type: '1 | 2 | 3 | 4', default: '4', description: 'Grid columns' },
    ],
    boundaryExplanation: {
      soraHandles: ['Responsive auto-fit card grid', 'Up/Down trend pills styling', 'Card shadow and token colors'],
      consumerHandles: ['Metric aggregation & telemetry fetching', 'Date range filtering'],
    },
    code: `<MetricGrid
  items={[
    { label: 'Total Revenue', value: '$128,430', trend: { value: '14.2%', direction: 'up' }, comparison: 'vs last month' },
    { label: 'Active Users', value: '14,200', trend: { value: '2.1%', direction: 'down' } },
    { label: 'Conversion Rate', value: '4.8%', trend: { value: '0.4%', direction: 'up' } },
    { label: 'Avg Session', value: '4m 12s' },
  ]}
/>`,
    render: () => (
      <MetricGrid
        items={[
          { label: 'Total Revenue', value: '$128,430', trend: { value: '14.2%', direction: 'up' }, comparison: 'vs last month' },
          { label: 'Active Users', value: '14,200', trend: { value: '2.1%', direction: 'down' } },
          { label: 'Conversion Rate', value: '4.8%', trend: { value: '0.4%', direction: 'up' } },
          { label: 'Avg Session', value: '4m 12s' },
        ]}
      />
    ),
  },
  {
    id: 'data-table-block',
    name: 'Data Table Block',
    category: 'dashboard',
    description: 'Interactive data table shell with search filtering, selection, bulk actions, and pagination.',
    dependencies: ['card', 'input', 'button', 'data-table', 'pagination'],
    tags: ['dashboard', 'table', 'crud', 'pagination', 'search'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'columns', type: 'DataTableColumn<T>[]', description: 'Column headers and accessors', required: true },
      { name: 'data', type: 'T[]', description: 'Records array', required: true },
      { name: 'totalCount', type: 'number', description: 'Total records count for pagination' },
      { name: 'onSearch', type: '(query: string) => void', description: 'Search input callback' },
      { name: 'onPageChange', type: '(page: number) => void', description: 'Page navigation callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Search toolbar & input UI', 'Row selection checkboxes', 'Bulk action toolbar trigger', 'Pagination controls'],
      consumerHandles: ['SQL / Database queries', 'Server-side search execution', 'Record deletion endpoints', 'CSV export generator'],
    },
    code: `<DataTableBlock
  columns={[
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
  ]}
  data={[
    { id: '1', name: 'Alice Adams', role: 'Engineer', status: 'Active' },
    { id: '2', name: 'Bob Baker', role: 'Designer', status: 'Active' },
  ]}
/>`,
    render: () => (
      <DataTableBlock
        columns={[
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'role', header: 'Role' },
          { accessorKey: 'status', header: 'Status' },
        ]}
        data={[
          { id: '1', name: 'Alice Adams', role: 'Engineer', status: 'Active' },
          { id: '2', name: 'Bob Baker', role: 'Designer', status: 'Active' },
          { id: '3', name: 'Charlie Clark', role: 'Product Lead', status: 'Pending' },
        ]}
      />
    ),
  },
  {
    id: 'hero-section',
    name: 'Hero Section',
    category: 'marketing',
    description: 'High-impact token-driven marketing hero section with ambient glow and call-to-action buttons.',
    dependencies: ['button', 'badge'],
    tags: ['marketing', 'hero', 'landing', 'cta'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'ReactNode', description: 'Headline copy', required: true },
      { name: 'description', type: 'ReactNode', description: 'Supporting copy', required: true },
      { name: 'primaryCta', type: '{ label, href, onClick }', description: 'Main CTA action' },
      { name: 'secondaryCta', type: '{ label, href, onClick }', description: 'Secondary action' },
    ],
    boundaryExplanation: {
      soraHandles: ['Radial token glow backdrop', 'Typography scale clamp', 'Dual CTA alignment', 'Showcase container wrapping'],
      consumerHandles: ['Product messaging copy', 'Analytics CTA tracking', 'Marketing funnel URLs'],
    },
    code: `<HeroSection
  title="Build Fast. Ship Less. Own Your UI."
  description="The lightweight, accessible UI component ecosystem engineered for developers who value performance and clean architecture."
  primaryCta={{ label: 'Get Started' }}
  secondaryCta={{ label: 'Documentation' }}
/>`,
    render: () => (
      <HeroSection
        title="Build Fast. Ship Less. Own Your UI."
        description="The lightweight, accessible UI component ecosystem engineered for developers who value performance and clean architecture."
        primaryCta={{ label: 'Get Started' }}
        secondaryCta={{ label: 'Documentation' }}
      />
    ),
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    category: 'marketing',
    description: 'Responsive multi-column feature showcase grid with icon badges.',
    dependencies: ['card', 'badge'],
    tags: ['marketing', 'features', 'grid'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'string', description: 'Section title', required: true },
      { name: 'features', type: 'FeatureItem[]', description: 'List of features', required: true },
      { name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Column count' },
    ],
    boundaryExplanation: {
      soraHandles: ['Responsive CSS grid layout', 'Icon container styling with accent tokens', 'Card elevating & hover transitions'],
      consumerHandles: ['Feature descriptions & copywriting', 'Custom iconography'],
    },
    code: `<FeatureGrid
  title="Everything you need to ship faster"
  features={[
    { id: '1', title: 'Zero Runtime Styling', description: 'Pure CSS variables mean 0ms stylesheet generation.' },
    { id: '2', title: 'Full Keyboard A11y', description: 'WAI-ARIA compliant with roving tabindex.' },
    { id: '3', title: '9 Space Themes', description: 'Light, dark, and ambient space palettes.' },
  ]}
/>`,
    render: () => (
      <FeatureGrid
        title="Everything you need to ship faster"
        features={[
          { id: '1', title: 'Zero Runtime Styling', description: 'Pure CSS variables mean 0ms stylesheet generation.' },
          { id: '2', title: 'Full Keyboard A11y', description: 'WAI-ARIA compliant with roving tabindex.' },
          { id: '3', title: '9 Space Themes', description: 'Light, dark, and ambient space palettes.' },
        ]}
      />
    ),
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    category: 'marketing',
    description: 'Tiered pricing table with monthly/annual switch toggle and feature checklists.',
    dependencies: ['card', 'button', 'badge', 'switch'],
    tags: ['marketing', 'pricing', 'plans', 'tier'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'plans', type: 'PricingPlan[]', description: 'Array of pricing tiers', required: true },
      { name: 'onBillingIntervalChange', type: '(interval: "monthly" | "annual") => void', description: 'Toggle callback' },
      { name: 'onSelectPlan', type: '(plan: PricingPlan) => void', description: 'Select plan action' },
    ],
    boundaryExplanation: {
      soraHandles: ['Billing interval switch UI', 'Highlighting popular tiers with primary border', 'Checkmark feature lists', 'Responsive columns'],
      consumerHandles: ['Stripe / payment checkout redirection', 'Subscription price calculation', 'Currency formatting'],
    },
    code: `<PricingTable
  plans={[
    { id: 'starter', name: 'Starter', price: '$0', features: ['1 Project', 'Community Discord'] },
    { id: 'pro', name: 'Pro', price: '$29', period: 'mo', popular: true, features: ['Unlimited Projects', 'Priority Support', 'Custom Themes'] },
    { id: 'enterprise', name: 'Enterprise', price: '$99', period: 'mo', features: ['Dedicated SLA', 'Custom Registry', 'Audit Logs'] },
  ]}
/>`,
    render: () => (
      <PricingTable
        plans={[
          { id: 'starter', name: 'Starter', price: '$0', features: ['1 Project', 'Community Discord'] },
          { id: 'pro', name: 'Pro', price: '$29', period: 'mo', popular: true, features: ['Unlimited Projects', 'Priority Support', 'Custom Themes'] },
          { id: 'enterprise', name: 'Enterprise', price: '$99', period: 'mo', features: ['Dedicated SLA', 'Custom Registry', 'Audit Logs'] },
        ]}
      />
    ),
  },
  {
    id: 'faq-section',
    name: 'FAQ Section',
    category: 'marketing',
    description: 'Frequently asked questions accordion block.',
    dependencies: ['accordion'],
    tags: ['marketing', 'faq', 'accordion'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'title', type: 'string', default: "'Frequently asked questions'", description: 'Section title' },
      { name: 'items', type: 'FAQItem[]', description: 'Questions and answers', required: true },
    ],
    boundaryExplanation: {
      soraHandles: ['Collapsible accordion triggers', 'Accessible ARIA expanded states', 'Smooth transition collapse'],
      consumerHandles: ['Product Q&A copywriting', 'Search / category filtering'],
    },
    code: `<FAQSection
  items={[
    { id: '1', question: 'Is SoraUI free for commercial use?', answer: 'Yes! SoraUI is 100% open source under the MIT License.' },
    { id: '2', question: 'Does SoraUI support Next.js App Router?', answer: 'Yes! All components support React Server Components and SSR.' },
  ]}
/>`,
    render: () => (
      <FAQSection
        items={[
          { id: '1', question: 'Is SoraUI free for commercial use?', answer: 'Yes! SoraUI is 100% open source under the MIT License.' },
          { id: '2', question: 'Does SoraUI support Next.js App Router?', answer: 'Yes! All components support React Server Components and SSR.' },
        ]}
      />
    ),
  },
  {
    id: 'footer-section',
    name: 'Footer Section',
    category: 'marketing',
    description: 'Responsive page footer with brand identity, newsletter subscription, and link columns.',
    dependencies: ['input', 'button', 'separator'],
    tags: ['marketing', 'footer', 'newsletter'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'columns', type: 'FooterColumn[]', description: 'Links columns', required: true },
      { name: 'brand', type: 'ReactNode', default: "'SoraUI'", description: 'Brand logo or title' },
      { name: 'onNewsletterSubmit', type: '(email: string) => void', description: 'Subscribe callback' },
    ],
    boundaryExplanation: {
      soraHandles: ['Multi-column link grid', 'Newsletter input & button alignment', 'Copyright footer divider'],
      consumerHandles: ['Mailing list API subscription', 'Privacy & Terms link routing'],
    },
    code: `<FooterSection
  columns={[
    { title: 'Product', links: [{ label: 'Components', href: '/components' }, { label: 'Themes', href: '/themes' }] },
    { title: 'Community', links: [{ label: 'GitHub', href: 'https://github.com' }] },
  ]}
  newsletter={{ title: 'Stay Updated' }}
/>`,
    render: () => (
      <FooterSection
        columns={[
          { title: 'Product', links: [{ label: 'Components', href: '#' }, { label: 'Themes', href: '#' }] },
          { title: 'Community', links: [{ label: 'GitHub', href: '#' }] },
        ]}
        newsletter={{ title: 'Stay Updated' }}
      />
    ),
  },
  {
    id: 'multi-step-wizard',
    name: 'Multi-Step Wizard',
    category: 'forms',
    description: 'Multi-step form wizard with progress stepper and back/next navigation.',
    dependencies: ['card', 'stepper', 'button'],
    tags: ['forms', 'wizard', 'stepper', 'flow'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'steps', type: 'WizardStep[]', description: 'Array of form steps', required: true },
      { name: 'onComplete', type: '() => void', description: 'Completion action' },
    ],
    boundaryExplanation: {
      soraHandles: ['Step number tracker header', 'Next/Back step transition state', 'Button disabled states'],
      consumerHandles: ['Draft state preservation', 'Step-by-step API validation', 'Final checkout or account submission'],
    },
    code: `<MultiStepWizard
  steps={[
    { id: '1', title: 'Account', component: <div>Step 1: Account Info</div> },
    { id: '2', title: 'Profile', component: <div>Step 2: Profile Details</div> },
    { id: '3', title: 'Review', component: <div>Step 3: Review & Submit</div> },
  ]}
  onComplete={() => console.log('Wizard complete!')}
/>`,
    render: () => (
      <MultiStepWizard
        steps={[
          { id: '1', title: 'Account', component: <div style={{ padding: '1rem 0' }}>Step 1: Account Setup</div> },
          { id: '2', title: 'Profile', component: <div style={{ padding: '1rem 0' }}>Step 2: Profile Customization</div> },
          { id: '3', title: 'Review', component: <div style={{ padding: '1rem 0' }}>Step 3: Review & Confirm</div> },
        ]}
      />
    ),
  },
  {
    id: 'settings-form',
    name: 'Settings Form',
    category: 'forms',
    description: 'Tabbed account settings form with switches, avatar upload, and security fields.',
    dependencies: ['card', 'tabs', 'input', 'label', 'button', 'switch', 'avatar'],
    tags: ['forms', 'settings', 'profile', 'account'],
    preview: { desktop: true, mobile: true },
    props: [
      { name: 'initialData', type: 'Record<string, any>', description: 'Default form values' },
      { name: 'onSave', type: '(data: Record<string, any>) => void', description: 'Save changes action' },
    ],
    boundaryExplanation: {
      soraHandles: ['General/Notifications/Security tabs switching', 'Form input layout & switches', 'Success message confirmation'],
      consumerHandles: ['Profile update mutation API', 'Avatar image upload to CDN', 'Password hashing & security verification'],
    },
    code: `<SettingsForm
  onSave={(data) => console.log('Saved settings:', data)}
/>`,
    render: () => <SettingsForm />,
  },
];
