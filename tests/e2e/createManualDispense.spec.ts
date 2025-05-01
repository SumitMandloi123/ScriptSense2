// import dispenseData from '@data/dispenseData.json';
// import { test } from '@fixtures/pomFixture';
// test.setTimeout(120000);

// test.describe('Login and create a manual dispense', () => {
//   test('Navigate to baseurl and login into system', async ({ header }) => {
//     await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
//   });
//   test('Disable the printer', async ({ printer }) => {
//     await printer.disablePrinter();
//   });
//   test('Search patient and create a manual dispense', async ({
//     landing,
//     dispense,
//   }) => {
//     await landing.searchPatientByNHI(dispenseData.patient.NHI_id);
//     await dispense.createManualDispense(
//       dispenseData.prescriber.name,
//       dispenseData.medicine.name,
//     );
//   });
// });




