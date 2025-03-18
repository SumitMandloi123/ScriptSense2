import { test as baseTest, BrowserContext, Page } from "@playwright/test";
import { SignInPage } from "../tests/pages/signinPage";
import { HomePage } from "../tests/pages/homePage";

let context: BrowserContext;
let page: Page;

type pages = {
    signinPage: SignInPage;
    homePage: HomePage;
};

const testPages = baseTest.extend<pages>({
    signinPage: async ({ browser }, use) => {
        // console.log("Launching browser...");
        context = await browser.newContext({ viewport: { width: 1400, height: 750 } });
        page = await context.newPage(); // Initialize page
        await use(new SignInPage(page));
    },
    homePage: async ({}, use) => {
        if (!page) {
            throw new Error("Page is not initialized. Make sure 'signinPage' runs first.");
        }
        await use(new HomePage(page));
    },
});

export const test = testPages;
export const expect = testPages.expect;


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
