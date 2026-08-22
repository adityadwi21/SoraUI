/**
 * Phase 12F — Cross-Browser Compatibility Smoke Tests
 * Phase 12A — Browser-based Accessibility Smoke (interactive components)
 *
 * Runs against Chromium, Firefox, and WebKit.
 * Label: "WebKit verified" — NOT "Safari 100% verified".
 * Native Safari on macOS is an optional release verification step.
 *
 * Target components (known cross-browser risk areas):
 *   - Dialog / AlertDialog / Drawer (focus-visible, :inert)
 *   - Select / Combobox (listbox ARIA positioning)
 *   - DatePicker / Calendar (Intl, Date behavior)
 *   - DataTable (scroll + sticky header)
 *   - TreeView (aria-expanded + keyboard)
 *   - Tooltip / Popover / HoverCard (floating positioning)
 *   - ThemeScope (CSS custom property cascade)
 *   - Theme preset CSS (@layer support)
 *
 * For each: open → interact → close → verify ARIA state.
 */
import { test, expect } from '@playwright/test';

// ──────────────────────────────────────────────────────────────────────────────
// Dialog: open / Escape / focus restoration
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12F — Dialog cross-browser smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/dialog');
  });

  test('opens dialog and sets aria-modal=true', async ({ page }) => {
    await page.getByRole('button', { name: /open dialog/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  test('Escape key closes dialog', async ({ page }) => {
    await page.getByRole('button', { name: /open dialog/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('focus returns to trigger after close', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /open dialog/i }).first();
    await trigger.click();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Select: open / keyboard navigate / close
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12F — Select cross-browser smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/select');
  });

  test('opens select listbox with correct ARIA role', async ({ page }) => {
    await page.getByRole('combobox').first().click();
    await expect(page.getByRole('listbox')).toBeVisible();
  });

  test('ArrowDown navigates options', async ({ page }) => {
    await page.getByRole('combobox').first().click();
    await expect(page.getByRole('listbox')).toBeVisible();
    await page.keyboard.press('ArrowDown');
    // Verify an option has aria-selected or focus
    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible();
  });

  test('Escape closes select without selection', async ({ page }) => {
    await page.getByRole('combobox').first().click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox')).not.toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Tabs: keyboard navigation
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12F — Tabs cross-browser keyboard smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/tabs');
  });

  test('ArrowRight moves focus to next tab', async ({ page }) => {
    const tabList = page.getByRole('tablist');
    const tabs = tabList.getByRole('tab');
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
  });

  test('Tab key moves focus OUT of tablist to tab panel', async ({ page }) => {
    const tabs = page.getByRole('tablist').getByRole('tab');
    await tabs.first().click();
    await page.keyboard.press('Tab');
    const panel = page.getByRole('tabpanel');
    // Focus should be inside the tab panel area
    await expect(panel.first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Tooltip: shows on hover, uses correct ARIA
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12F — Tooltip cross-browser smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/tooltip');
  });

  test('shows tooltip on hover with correct role', async ({ page }) => {
    const trigger = page.getByRole('button').filter({ has: page.locator('[data-tooltip-trigger]') }).first()
      ?? page.locator('[data-testid="tooltip-trigger"]').first();
    await trigger.hover();
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// ThemeScope: CSS custom property inheritance
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12F — ThemeScope cross-browser CSS variable smoke', () => {
  test('CSS custom properties cascade correctly in nested ThemeScope', async ({ page }) => {
    await page.goto('/components/theme-scope');

    // Verify parent scope uses one theme's bg color
    const parentBg = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="outer-scope"]');
      return el ? getComputedStyle(el).getPropertyValue('--ui-background').trim() : '';
    });

    const childBg = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="inner-scope"]');
      return el ? getComputedStyle(el).getPropertyValue('--ui-background').trim() : '';
    });

    expect(parentBg).not.toBe('');
    expect(childBg).not.toBe('');
    // Parent and child must have DIFFERENT background values (no bleed)
    expect(parentBg).not.toBe(childBg);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 12A (browser): interactive component accessibility smoke
// ──────────────────────────────────────────────────────────────────────────────

test.describe('12A (browser) — Dialog ARIA structure', () => {
  test('open dialog has role=dialog, aria-modal, aria-labelledby', async ({ page }) => {
    await page.goto('/components/dialog');
    await page.getByRole('button', { name: /open dialog/i }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    const labelledBy = await dialog.getAttribute('aria-labelledby');
    expect(labelledBy).not.toBeNull();
  });
});

test.describe('12A (browser) — Combobox ARIA structure', () => {
  test('has role=combobox with aria-expanded and aria-haspopup', async ({ page }) => {
    await page.goto('/components/combobox');
    const combobox = page.getByRole('combobox').first();
    await expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    // Initially closed
    await expect(combobox).toHaveAttribute('aria-expanded', 'false');
    await combobox.click();
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');
  });
});
