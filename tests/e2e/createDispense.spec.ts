import { expect } from '@playwright/test';
import dispenseData from '@data/dispenseData.json';
import DisablePrinter from '@pages/disablePrinter';
import SearchPatient from '@pages/searchPatient';
import CreateDispense from '@pages/createDispense';
import LandingPage from '@pages/landingPage';
import { test } from '@fixtures/pomFixture';

test.setTimeout(60000);

test.describe('Login and create a manual dispense', () => {
  
  test('Navigate to base URL and login into the system', async ({header }) => {
    await header.login(process.env.LOGIN_USERNAME as string, process.env.LOGIN_PASSWORD as string);
    await expect(header.dispenseButton).toBeVisible();
  });

  test('Disable the printer', async ({ sharedPage }) => {
    const disablePrinter = new DisablePrinter(sharedPage);
    await disablePrinter.disablePrinter();
  });

  test('Search for a patient', async ({ sharedPage }) => {
    const landingPage = new LandingPage(sharedPage);
    const searchPatient = new SearchPatient(sharedPage);

    await landingPage.navigateToDispense();
    await searchPatient.searchPatientByNHI(dispenseData.patient.NHI_id);
  });

  test('Select multiple medicines for dispense', async ({ sharedPage }) => {
    const createDispense = new CreateDispense(sharedPage);
    await createDispense.selectMultipleMedicine(dispenseData.prescriber.name, dispenseData.medicines);
  });



});
