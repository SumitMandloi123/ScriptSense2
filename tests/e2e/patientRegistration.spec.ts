import { expect } from '@playwright/test';
import patientData from '@data/patientRegistration.json';
import LandingPage from '@pages/landingPage';
import PatientRegistration from '@pages/PatientRegistration';
import { test } from '@fixtures/pomFixture';

test.setTimeout(60000);

test.describe('Patient Registration Flow', () => {

  test('Navigate to base URL and login into the system', async ({ header }) => {
    await header.login(process.env.LOGIN_USERNAME as string, process.env.LOGIN_PASSWORD as string);
    await expect(header.dispenseButton).toBeVisible();
  });

  test('Click on Dispense in Landing Page', async ({ sharedPage }) => {
    const landingPage = new LandingPage(sharedPage);
    await landingPage.navigateToDispense();
  });

  test('Click on Add Patient and enter details', async ({ sharedPage }) => {
    const patientReg = new PatientRegistration(sharedPage);

    await patientReg.addPatient(
      patientData.patient.NHI,  
      patientData.patient.firstName,
      patientData.patient.lastName,
      patientData.patient.DOB
    );
    
  });

});
