import { describe, it, expect } from 'vitest';
import { getScaffoldPagePrompt } from '../src/prompts/scaffold-page';
import { getBuildCustomBlockPrompt } from '../src/prompts/build-custom-block';

describe('Phase 11 — MCP Prompts', () => {
  it('generates scaffold-page prompt with proper parameters', () => {
    const prompt = getScaffoldPagePrompt({ pageType: 'e-commerce checkout', theme: 'sky' });
    expect(prompt.messages.length).toBe(1);
    expect(prompt.messages[0].content.text).toContain('e-commerce checkout');
    expect(prompt.messages[0].content.text).toContain('sky');
    expect(prompt.messages[0].content.text).toContain('ThemeProvider');
  });

  it('generates build-custom-block prompt with architectural rules', () => {
    const prompt = getBuildCustomBlockPrompt({
      blockName: 'UserAnalyticsCard',
      category: 'analytics',
      primitivesToUse: 'Card, Statistic, Button',
    });
    expect(prompt.messages.length).toBe(1);
    expect(prompt.messages[0].content.text).toContain('UserAnalyticsCard');
    expect(prompt.messages[0].content.text).toContain('Pure presentation');
  });
});
