import { test as baseTest, BrowserContext, Page } from "@playwright/test";
import { HomePage } from "../tests/pages/homePage";

let context: BrowserContext;
let page: Page;

type pages = {
    homePage: HomePage;
};

const testPages = baseTest.extend<pages>({
    homePage: async ({ browser }, use) => {
        if (!page) {
            context = await browser.newContext({ storageState: "auth.json" }); // Load session
            page = await context.newPage(); // Initialize page
        }
        await use(new HomePage(page));
    },
});

export const test = testPages;
export const expect = testPages.expect;
