import React from 'react';
import { DashboardShell, type DashboardShellProps } from '../blocks/dashboard/dashboard-shell';
import { SettingsForm, type SettingsFormProps } from '../blocks/forms/settings-form';

export interface SettingsPageTemplateProps {
  shellProps: Omit<DashboardShellProps, 'children'>;
  settingsProps: SettingsFormProps;
  pageTitle?: string;
  pageDescription?: string;
}

export function SettingsPageTemplate({
  shellProps,
  settingsProps,
  pageTitle = 'Account & Preferences',
  pageDescription = 'Manage your profile credentials, notification channels, and security settings.',
}: SettingsPageTemplateProps) {
  return (
    <DashboardShell {...shellProps}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--ui-foreground, #0c1a2b)' }}>
            {pageTitle}
          </h1>
          <p style={{ color: 'var(--ui-muted-foreground, #71717a)', margin: 0, fontSize: 'var(--sora-text-sm, 0.875rem)' }}>
            {pageDescription}
          </p>
        </div>

        <SettingsForm {...settingsProps} />
      </div>
    </DashboardShell>
  );
}
