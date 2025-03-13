// import { test, expect } from '@playwright/test';
import { test, expect } from "../../fixtures/pomFixture";


test.describe.serial("Login and create a manual dispense", () => {
  test('Navigate to baseurl and login into system', async ({ signinPage }) => {
    test.setTimeout(180000);
    await signinPage.navigateTo("https://dev.scriptsense.co.nz/");
    await signinPage.loginForm(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
  });

  test("Search patient and create a manual dispense", async ({ homePage }) => {
    await homePage.disablePrinter();
    await homePage.searchPatientByNHI("ZAU8023");
    await homePage.createManualDispense("Dummy", "Saradon");
  });
});
