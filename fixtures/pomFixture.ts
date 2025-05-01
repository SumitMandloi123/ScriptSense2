import {
  test as baseTest,
  chromium,
  Page,
  BrowserContext,
  Browser,
} from '@playwright/test';
import { Dispense } from '@pages/dispensePage';
import Header from '@pages/header';
import { Landing } from '@pages/landingPage';
import AddPatient from '@pages/patientRegistration';
import { Printer } from '@pages/printerPage';
import Retail from '@pages/retailPage';
import Account from '@pages/accountPage';
import Order from '@pages/inventoryOrderPage'

type pages = {
  browser: Browser;
  sharedContext: BrowserContext;
  sharedPage: Page; // Renamed to avoid conflict
  header: Header;
  dispense: Dispense;
  printer: Printer;
  landing: Landing;
  patientRegistration: AddPatient;
  retailPage: Retail;
  accountPage: Account;
  order : Order;
};

const testPages = baseTest.extend<pages>({
  // Launch ONE browser for all tests
  browser: [
    // eslint-disable-next-line no-empty-pattern
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
  // @ts-ignore
  sharedContext: [
    async ({ browser }, use) => {
      console.log('Creating shared context...');
      const context = await browser.newContext();
      await use(context);
      console.log('Closing shared context...');
      await context.close();
    },
    { scope: 'worker' }, // Same context for all tests
  ],

  // Shared page for all tests
  //@ts-ignore
  sharedPage: [
    async ({ sharedContext }, use) => {
      console.log('Creating shared page...');
      const page = await sharedContext.newPage();
      await page.goto('/'); // Ensure the page starts fresh
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
  landing: async ({ sharedPage }, use) => {
    await use(new Landing(sharedPage));
  },
  printer: async ({ sharedPage }, use) => {
    await use(new Printer(sharedPage));
  },
  dispense: async ({ sharedPage }, use) => {
    await use(new Dispense(sharedPage));
  },
  patientRegistration: async ({ sharedPage }, use) => {
    await use(new AddPatient(sharedPage));
  },
  retailPage: async ({ sharedPage }, use) => {
    await use(new Retail(sharedPage));
  },
  accountPage: async ({ sharedPage }, use) => {
    await use(new Account(sharedPage));
  },
  order: async ({ sharedPage }, use) => {
    await use(new Order(sharedPage));
  },
});

export const test = testPages;
export const expect = testPages.expect;