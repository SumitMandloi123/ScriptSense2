import { test as baseTest, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { SignInPage } from "../tests/pages/signinPage";
import { HomePage } from "../tests/pages/homePage";


let page;
type pages = {
    signinPage: SignInPage;
    homePage: HomePage
}

const testPages = baseTest.extend<pages>({
    signinPage: async ({ browser,context}, use) => {
    console.log("Launching browser...");
    context = await browser.newContext({viewport: { width: 1920, height: 1080 }}); // One context for all tests
    page = await context.newPage();
        await use(new SignInPage(page));
    },
    homePage: async ({  }, use) => {
        await use(new HomePage(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;
