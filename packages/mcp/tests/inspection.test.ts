import { describe, it, expect } from 'vitest';
import {
  handleInspectComponent,
  handleInspectBlock,
  handleInspectTemplate,
  handleInspectTheme,
} from '../src/index';

describe('Phase 11 — MCP Detailed Inspection Contract', () => {
  it('inspects Level 1, 2, and 3 primitive components', () => {
    const btn = handleInspectComponent({ name: 'button' });
    expect(btn.level).toBe(1);

    const dialog = handleInspectComponent({ name: 'dialog' });
    expect(dialog.level).toBe(2);

    const calendar = handleInspectComponent({ name: 'calendar' });
    expect(calendar.level).toBe(3);
  });

  it('inspects all 14 blocks with boundary separation', () => {
    const blockIds = [
      'login-form',
      'register-form',
      'forgot-password-form',
      'otp-verification',
      'dashboard-shell',
      'metric-grid',
      'data-table-block',
      'hero-section',
      'feature-grid',
      'pricing-table',
      'faq-section',
      'footer-section',
      'multi-step-wizard',
      'settings-form',
    ];

    expect(blockIds.length).toBe(14);

    for (const id of blockIds) {
      const block = handleInspectBlock({ id });
      expect(block.id).toBe(id);
      expect(block.boundaryExplanation.soraHandles).toBeDefined();
      expect(block.boundaryExplanation.consumerHandles).toBeDefined();
    }
  });

  it('inspects all 4 page templates', () => {
    const tmplIds = ['login-page', 'dashboard-page', 'saas-landing-page', 'settings-page'];
    for (const id of tmplIds) {
      const tmpl = handleInspectTemplate({ id });
      expect(tmpl.id).toBe(id);
      expect(tmpl.blocks.length).toBeGreaterThan(0);
    }
  });

  it('inspects all 9 theme presets', () => {
    const themeIds = ['sky', 'cloud', 'horizon', 'aurora', 'twilight', 'midnight', 'nebula', 'eclipse', 'starlight'];
    for (const id of themeIds) {
      const theme = handleInspectTheme({ id });
      expect(theme.id).toBe(id);
      expect(theme.mode).toMatch(/^(light|dark)$/);
    }
  });
});
