/**
 * Phase 12E — FOUC Prevention Test (Playwright)
 *
 * Verifies that the `getThemeInitScript()` from @soraui/core correctly applies
 * the `data-theme` attribute on the document BEFORE React hydrates, eliminating
 * Flash of Unstyled Content.
 *
 * This test runs in a real browser (Chromium/Firefox/WebKit) because it requires
 * actual CSS custom property evaluation — JSDOM cannot compute styles.
 *
 * Protocol:
 * 1. Load a page that injects getThemeInitScript() in <head> (before any JS).
 * 2. Intercept page BEFORE React runs.
 * 3. Assert data-theme is already set on <html>.
 * 4. Assert --ui-background computed style is non-empty.
 */
import { test, expect } from "@playwright/test";

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

test.describe("12E — FOUC Prevention: data-theme applied before React hydration", () => {
  for (const theme of THEMES) {
    test(`Theme "${theme}": data-theme present in initial HTML (no FOUC)`, async ({
      page,
    }) => {
      // Navigate to docs page that uses ThemeProvider with the specified theme
      await page.goto(`/?theme=${theme}`, { waitUntil: "domcontentloaded" });

      // Check data-theme BEFORE JavaScript runs (on domcontentloaded)
      const dataTheme = await page.evaluate(() =>
        document.documentElement.getAttribute("data-theme"),
      );

      expect(
        dataTheme,
        `[${theme}] data-theme attribute was not set before React hydration — FOUC detected.`,
      ).not.toBeNull();
    });

    test(`Theme "${theme}": --ui-background CSS variable resolves before hydration`, async ({
      page,
    }) => {
      await page.goto(`/?theme=${theme}`, { waitUntil: "domcontentloaded" });

      // Evaluate computed CSS custom property value
      const bg = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--ui-background")
          .trim(),
      );

      expect(
        bg.length,
        `[${theme}] --ui-background was empty before hydration — CSS tokens not applied`,
      ).toBeGreaterThan(0);
    });
  }

  test("ThemeScope: nested theme does not bleed into parent", async ({
    page,
  }) => {
    await page.goto("/theme-scope-test", { waitUntil: "networkidle" });

    // Parent (midnight) background
    const parentBg = await page.evaluate(() => {
      const parent = document.querySelector('[data-testid="parent-scope"]');
      return parent
        ? getComputedStyle(parent).getPropertyValue("--ui-background").trim()
        : null;
    });

    // Child (sky) background
    const childBg = await page.evaluate(() => {
      const child = document.querySelector('[data-testid="child-scope"]');
      return child
        ? getComputedStyle(child).getPropertyValue("--ui-background").trim()
        : null;
    });

    expect(parentBg).not.toBeNull();
    expect(childBg).not.toBeNull();
    expect(parentBg).not.toBe(childBg);
  });
});
