// import { test, expect } from "@fixtures/pomFixture";
// import testData from "@data/testData.json";

// test.describe("Login and create a manual dispense", () => {
//   test('Navigate to baseurl and login into system', async ({ signinPage }) => {
//     test.setTimeout(180000);
//     await signinPage.navigateTo("https://dev.scriptsense.co.nz/");
//     await signinPage.loginForm(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
//   });

//   test("Search patient and create a manual dispense", async ({ homePage }) => {
//     await homePage.disablePrinter();
//     await homePage.searchPatientByNHI(testData.idNHI); // Use idNHI from testData.json
//     await homePage.createManualDispense(testData.doctorName, testData.medicineName); // Use doctor & medicine name from testData.json
//   });
// });


import { expect } from '@playwright/test';
import dispenseData from '@data/dispenseData.json';
import DisablePrinter from '@pages/disablePrinter';
import SearchPatient from '@pages/searchPatient';
import CreateDispense from '@pages/createDispense';
import LandingPage from '@pages/landingPage'; 
import env from '@data/env';
import { test } from '@fixtures/pomFixture';

test.setTimeout(60000);

test.describe('Login and create a manual dispense', () => {
  
  test('Navigate to base URL and login into the system', async ({ header }) => {

    await header.login(env.AZB2C_USERNAME, env.AZB2C_PASSWORD);
    await expect(header.dispenseButton).toBeVisible();
  });

  test('Search patient and create a manual dispense', async ({ sharedPage }) => {

    const disablePrinter = new DisablePrinter(sharedPage);
    const landingPage = new LandingPage(sharedPage);
    const searchPatient = new SearchPatient(sharedPage);
    const createDispense = new CreateDispense(sharedPage);



    await disablePrinter.disablePrinter();
    await landingPage.navigateToDispense();
    await searchPatient.searchPatientByNHI(dispenseData.patient.NHI_id);
    await createDispense.createManualDispense(dispenseData.prescriber.name, dispenseData.medicine.name);
  });

});
