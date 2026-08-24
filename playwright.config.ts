import { defineConfig, devices } from "@playwright/test";

/**
 * SoraUI — Playwright Configuration (Phase 12)
 *
 * Projects:
 *   - chromium: Primary browser / CI gating
 *   - firefox: Cross-browser smoke
 *   - webkit:  Safari proxy. "WebKit verified" in CI context.
 *              Native Safari on macOS is an optional release verification step.
 *
 * Test folders:
 *   tests/browser-compat/   — 12C browser a11y smoke + 12E FOUC + 12F cross-browser
 *   tests/visual-regression/ — 12G visual snapshots
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  // Location of all Playwright tests
  testDir: "./tests",
  testMatch: [
    "**/browser-compat/**/*.spec.ts",
    "**/visual-regression/**/*.spec.ts",
  ],

  // Shared settings
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "html",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      // Labeled "WebKit verified" — approximates Safari rendering.
      // For native Safari verification, run on a macOS runner with Safari installed.
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Visual regression snapshot directory — committed to repo as baseline
  snapshotDir: "./tests/visual-regression/__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}-{projectName}{ext}",

  // Start dev server automatically when running locally (not in CI)
  webServer: process.env.CI
    ? undefined
    : {
        command: "pnpm --filter @soraui/docs dev",
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
