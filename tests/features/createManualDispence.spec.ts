// import { test, expect } from '@playwright/test';
import { test, expect } from "../../fixtures/pomFixture";

test.describe("Login and create a manual dispense", () => {
  test('Navigate to baseurl and login into system', async ({ signinPage }) => {
    test.setTimeout(180000);
    await signinPage.navigateTo("https://dev.scriptsense.co.nz/")
    await signinPage.loginForm("arun.yadav@scriptsense.co.nz", "Arun@12345")
  });
  test("Search patient and create a manual dispense", async ({ homePage }) => {
    await homePage.disablePrinter();
    await homePage.searchPatientByNHI("ZAU8023");
    await homePage.createManualDispence("Dummy", "saradon");
  })
})
