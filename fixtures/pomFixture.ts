import { test as baseTest, BrowserContext, Page } from "@playwright/test";
import { SignInPage } from "../tests/pages/signinPage";
import { HomePage } from "../tests/pages/homePage";

type Pages = {
    signinPage: SignInPage;
    homePage: HomePage;
};

export const test = baseTest.extend<Pages>({
    signinPage: async ({ page }, use) => {
        // Initialize SignInPage with Playwright's provided page
        const signinPage = new SignInPage(page);
        await use(signinPage);
    },

    homePage: async ({ page }, use) => {
        // Initialize HomePage with the same page
        const homePage = new HomePage(page);
        await use(homePage);
    },
});

export const expect = test.expect;



// import { test as baseTest, BrowserContext, Page } from "@playwright/test";
// import { HomePage } from "../tests/pages/homePage";

// let context: BrowserContext;
// let page: Page;

// type pages = {
//     homePage: HomePage;
// };

// const testPages = baseTest.extend<pages>({
//     homePage: async ({ browser }, use) => {
//         if (!page) {
//             context = await browser.newContext({ storageState: "auth.json" }); // Load session
//             page = await context.newPage(); // Initialize page
//         }
//         await use(new HomePage(page));
//     },
// });

// export const test = testPages;
// export const expect = testPages.expect;
