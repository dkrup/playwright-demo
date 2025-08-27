import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [
        ["github"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
      ]
    : [["html", { outputFolder: "playwright-report", open: "on-failure" }]],

  outputDir: "test-results",

  use: {
    // baseURL: process.env.BASE_URL || 'http://localhost:3000',

    trace: "on-first-retry", // сохранит trace.zip при первом ретрае
    screenshot: "only-on-failure", // скриншоты только на фейлах
    video: "on-first-retry", // видео при первом ретрае
    // headless: true, // в CI и так headless
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
