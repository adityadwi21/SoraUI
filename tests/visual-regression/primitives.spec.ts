/**
 * Phase 12G — Visual Regression Tests (Playwright toHaveScreenshot)
 *
 * Uses Playwright's built-in screenshot comparison with explicit `maxDiffPixels` threshold.
 * Baselines are committed to the repository for deterministic CI comparisons.
 *
 * Design decisions (locked by user review):
 * - Uses `toHaveScreenshot()` with `maxDiffPixels`, NOT percentage diff.
 * - Baseline snapshots are stored in tests/visual-regression/__snapshots__/
 * - Scope: Critical primitives × 9 themes × Desktop (1280px) + Mobile (375px)
 * - ThemeScope nesting isolation: midnight parent / sky child
 *
 * Per-snapshot threshold: maxDiffPixels: 50
 * This means up to 50 pixels can change before CI fails.
 * Adjust per-test if a component has intentional animations.
 *
 * To update baseline snapshots, run:
 *   pnpm playwright test --update-snapshots
 */
import { test, expect, type Page } from "@playwright/test";

const THEMES = [
  "sky",
  "cloud",
  "horizon",
  "aurora",
  "twilight",
  "midnight",
  "nebula",
  "eclipse",
  "starlight",
] as const;
const DESKTOP_VIEWPORT = { width: 1280, height: 900 };
const MOBILE_VIEWPORT = { width: 375, height: 812 };
const MAX_DIFF_PIXELS = 50;

// ──────────────────────────────────────────────────────────────────────────────
// Helper: navigate + set theme + wait for stability
// ──────────────────────────────────────────────────────────────────────────────

async function gotoWithTheme(
  page: Page,
  path: string,
  theme: string,
  viewport = DESKTOP_VIEWPORT,
) {
  await page.setViewportSize(viewport);
  await page.goto(`${path}?theme=${theme}`, { waitUntil: "networkidle" });
  // Wait for fonts and animations to settle
  await page.waitForTimeout(300);
}

// ──────────────────────────────────────────────────────────────────────────────
// Button visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test.describe(`12G — Button [${theme}]`, () => {
    test(`all variants — desktop`, async ({ page }) => {
      await gotoWithTheme(page, "/visual-test/button", theme, DESKTOP_VIEWPORT);
      await expect(
        page.locator('[data-testid="button-gallery"]'),
      ).toHaveScreenshot(`button-all-variants-${theme}-desktop.png`, {
        maxDiffPixels: MAX_DIFF_PIXELS,
      });
    });

    test(`all variants — mobile`, async ({ page }) => {
      await gotoWithTheme(page, "/visual-test/button", theme, MOBILE_VIEWPORT);
      await expect(
        page.locator('[data-testid="button-gallery"]'),
      ).toHaveScreenshot(`button-all-variants-${theme}-mobile.png`, {
        maxDiffPixels: MAX_DIFF_PIXELS,
      });
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Input states visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test.describe(`12G — Input [${theme}]`, () => {
    test(`states (default, error, disabled) — desktop`, async ({ page }) => {
      await gotoWithTheme(page, "/visual-test/input", theme, DESKTOP_VIEWPORT);
      await expect(
        page.locator('[data-testid="input-states"]'),
      ).toHaveScreenshot(`input-states-${theme}-desktop.png`, {
        maxDiffPixels: MAX_DIFF_PIXELS,
      });
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Card visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test(`12G — Card [${theme}] — desktop`, async ({ page }) => {
    await gotoWithTheme(page, "/visual-test/card", theme, DESKTOP_VIEWPORT);
    await expect(page.locator('[data-testid="card-demo"]')).toHaveScreenshot(
      `card-${theme}-desktop.png`,
      { maxDiffPixels: MAX_DIFF_PIXELS },
    );
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Badge visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test(`12G — Badge variants [${theme}] — desktop`, async ({ page }) => {
    await gotoWithTheme(page, "/visual-test/badge", theme, DESKTOP_VIEWPORT);
    await expect(
      page.locator('[data-testid="badge-gallery"]'),
    ).toHaveScreenshot(`badge-${theme}-desktop.png`, {
      maxDiffPixels: MAX_DIFF_PIXELS,
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Dialog visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test(`12G — Dialog (open state) [${theme}] — desktop`, async ({ page }) => {
    await gotoWithTheme(page, "/visual-test/dialog", theme, DESKTOP_VIEWPORT);
    // Open the dialog before screenshotting
    await page.getByRole("button", { name: /open dialog/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("body")).toHaveScreenshot(
      `dialog-open-${theme}-desktop.png`,
      { maxDiffPixels: MAX_DIFF_PIXELS },
    );
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// DataTable visual regression
// ──────────────────────────────────────────────────────────────────────────────

for (const theme of THEMES) {
  test(`12G — DataTable [${theme}] — desktop`, async ({ page }) => {
    await gotoWithTheme(
      page,
      "/visual-test/data-table",
      theme,
      DESKTOP_VIEWPORT,
    );
    await expect(
      page.locator('[data-testid="datatable-demo"]'),
    ).toHaveScreenshot(`datatable-${theme}-desktop.png`, {
      maxDiffPixels: MAX_DIFF_PIXELS,
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// 12G — ThemeScope nesting isolation (midnight parent + sky child)
// ──────────────────────────────────────────────────────────────────────────────

test.describe("12G — ThemeScope nesting isolation visual test", () => {
  test("midnight parent / sky child — no theme bleed — desktop", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/visual-test/theme-scope", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    // Capture entire test section
    await expect(
      page.locator('[data-testid="theme-scope-isolation"]'),
    ).toHaveScreenshot("theme-scope-midnight-parent-sky-child-desktop.png", {
      maxDiffPixels: MAX_DIFF_PIXELS,
    });
  });

  test("midnight parent / sky child — no theme bleed — mobile", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/visual-test/theme-scope", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    await expect(
      page.locator('[data-testid="theme-scope-isolation"]'),
    ).toHaveScreenshot("theme-scope-midnight-parent-sky-child-mobile.png", {
      maxDiffPixels: MAX_DIFF_PIXELS,
    });
  });
});
