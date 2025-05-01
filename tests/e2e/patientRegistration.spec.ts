// import patientData from '@data/patientRegistration.json';
// import { test } from '@fixtures/pomFixture';

// test.setTimeout(120000);

// test.describe('Patient Registration Flow', () => {
//   test('Navigate to baseurl and login', async ({ header }) => {
//     await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
//   });
//   test('Click on Add Patient and enter details', async ({
//     patientRegistration,
//     landing,
//   }) => {
//     await landing.dispenseHeaderLink.click();
//     await patientRegistration.addPatient(
//       patientData.patient.NHI,
//       patientData.patient.firstName,
//       patientData.patient.lastName,
//       patientData.patient.gender,
//       patientData.patient.DOB,
//     );
//   });

//   test('Register the patient', async ({ patientRegistration }) => {
//     await patientRegistration.register(
//       patientData.register.institutionName,
//       patientData.register.category,
//       patientData.register.registerDate,
//       patientData.register.exitDate,
//     );
//   });
// });