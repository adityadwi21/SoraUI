import { describe, it, expect } from 'vitest';
import * as SoraUI from '../src/index';
import registryJson from '../../../registry/registry.json';

describe('Phase 10.5A — Public API Snapshot & Identity Verification', () => {
  it('exports exactly all 44 primitives registered in canonical registry.json', () => {
    expect(registryJson.components.length).toBe(44);

    const componentMapping: Record<string, string> = {
      'button': 'Button',
      'input': 'Input',
      'label': 'Label',
      'card': 'Card',
      'badge': 'Badge',
      'textarea': 'Textarea',
      'separator': 'Separator',
      'skeleton': 'Skeleton',
      'typography': 'Typography',
      'tooltip': 'Tooltip',
      'popover': 'Popover',
      'tabs': 'Tabs',
      'accordion': 'Accordion',
      'dialog': 'Dialog',
      'dropdown': 'Dropdown',
      'select': 'Select',
      'toast': 'Toast',
      'calendar': 'Calendar',
      'date-picker': 'DatePicker',
      'combobox': 'Combobox',
      'file-uploader': 'FileUploader',
      'data-table': 'DataTable',
      'checkbox': 'Checkbox',
      'radio-group': 'RadioGroup',
      'switch': 'Switch',
      'slider': 'Slider',
      'input-otp': 'InputOTP',
      'number-input': 'NumberInput',
      'breadcrumb': 'Breadcrumb',
      'navigation-menu': 'NavigationMenu',
      'menubar': 'Menubar',
      'pagination': 'Pagination',
      'stepper': 'Stepper',
      'command-palette': 'CommandPalette',
      'alert-dialog': 'AlertDialog',
      'drawer': 'Drawer',
      'hover-card': 'HoverCard',
      'context-menu': 'ContextMenu',
      'progress': 'Progress',
      'avatar': 'Avatar',
      'collapsible': 'Collapsible',
      'timeline': 'Timeline',
      'statistic': 'Statistic',
      'tree-view': 'TreeView',
    };

    for (const comp of registryJson.components) {
      const exportName = componentMapping[comp.name];
      expect(exportName, `Missing mapping for registered component "${comp.name}"`).toBeDefined();
      expect((SoraUI as any)[exportName!], `Expected component "${exportName}" to be exported in @soraui/react`).toBeDefined();
    }
  });

  it('exports exactly all 14 blocks registered in canonical registry.json', () => {
    expect(registryJson.blocks.length).toBe(14);

    const blockMapping: Record<string, string> = {
      'login-form': 'LoginForm',
      'register-form': 'RegisterForm',
      'forgot-password-form': 'ForgotPasswordForm',
      'otp-verification': 'OTPVerification',
      'dashboard-shell': 'DashboardShell',
      'metric-grid': 'MetricGrid',
      'data-table-block': 'DataTableBlock',
      'hero-section': 'HeroSection',
      'feature-grid': 'FeatureGrid',
      'pricing-table': 'PricingTable',
      'faq-section': 'FAQSection',
      'footer-section': 'FooterSection',
      'multi-step-wizard': 'MultiStepWizard',
      'settings-form': 'SettingsForm',
    };

    for (const block of registryJson.blocks) {
      const exportName = blockMapping[block.id];
      expect(exportName, `Missing mapping for registered block "${block.id}"`).toBeDefined();
      expect((SoraUI as any)[exportName!], `Expected block "${exportName}" to be exported in @soraui/react`).toBeDefined();
    }
  });

  it('exports exactly all 4 page templates registered in canonical registry.json', () => {
    expect(registryJson.templates.length).toBe(4);

    const templateMapping: Record<string, string> = {
      'login-page': 'LoginPageTemplate',
      'dashboard-page': 'DashboardPageTemplate',
      'saas-landing-page': 'SaaSLandingPageTemplate',
      'settings-page': 'SettingsPageTemplate',
    };

    for (const tpl of registryJson.templates) {
      const exportName = templateMapping[tpl.id];
      expect(exportName, `Missing mapping for registered template "${tpl.id}"`).toBeDefined();
      expect((SoraUI as any)[exportName!], `Expected template "${exportName}" to be exported in @soraui/react`).toBeDefined();
    }
  });


  it('exports Theme Engine and ThemeScope primitives', () => {
    expect(SoraUI.ThemeProvider).toBeDefined();
    expect(SoraUI.ThemeScope).toBeDefined();
    expect(SoraUI.useTheme).toBeDefined();
  });
});
