import {
  test as baseTest,
  chromium,
  Page,
  BrowserContext,
  Browser,
} from '@playwright/test';
import Header from '@pages/header'
import HomePage from '@pages/landingPage';

type pages = {
  browser: Browser;
  sharedContext: BrowserContext;
  sharedPage: Page; // Renamed to avoid conflict
  header: Header;
  homePage: HomePage;
};

const testPages = baseTest.extend<pages>({
  // Launch ONE browser for all tests
  browser: [
    async ({}, use) => {
      console.log('Launching shared browser...');
      const browser = await chromium.launch({ headless: true }); // Use true for CI
      await use(browser);
      console.log('Closing shared browser...');
      await browser.close();
    },
    { scope: 'worker' }, // Only one browser for all tests
  ],

  // Shared browser context
  sharedContext: [
    async ({ browser }, use) => {
      console.log('Creating shared context...');
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1020 },
      });
      await use(context);
      console.log('Closing shared context...');
      await context.close();
    },
    { scope: 'worker' }, // Same context for all tests
  ],

  // Shared page for all tests
  sharedPage: [
    async ({ sharedContext }, use) => {
      console.log('Creating shared page...');
      const page = await sharedContext.newPage();
      await page.goto("https://dev.scriptsense.co.nz/"); // Ensure the page starts fresh
      await use(page);
      console.log('Closing shared page...');
      await page.close();
    },
    { scope: 'worker' }, // Same page for all tests
  ],

  // POM Fixtures (dependent on shared `sharedPage`)
  header: async ({ sharedPage }, use) => {
    await use(new Header(sharedPage));
  },

  homePage: async ({ sharedPage }, use) => {
    await use(new HomePage(sharedPage));
  },
});

export const test = testPages;
export const expect = testPages.expect;