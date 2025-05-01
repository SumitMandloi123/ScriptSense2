// import dispenseData from '@data/dispenseData.json';
// import { test } from '@fixtures/pomFixture';

// test.setTimeout(70000);

// test.describe('Scenario : 1 : Create A Manual Dispense', () => {
//   test('Navigate to baseurl and login', async ({ header }) => {
//   await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
//   });
//   test('Disable the printer', async ({ printer }) => {
//     await printer.disablePrinter();
//   });
//   test('Search patient', async ({ landing }) => {
//     await landing.searchPatientByNHI(dispenseData.patient.NHI_id);
//   });
//   test('Add Medicines and Dispense', async ({ dispense }) => {
//     await dispense.addMedicines(
//       dispenseData.prescriber.name,
//       dispenseData.medicines,
//     );
//   });
// });

// test.describe('Scenario : 2 : Edit A Dispensed Medicine', () => {
//   test('Edit the Details and Verify it on the summary screen', async ({ dispense }) => {
//     const firstFinalMedName = dispenseData.medicines[0].finalMedName;
//     await dispense.editDispensedMedicine(firstFinalMedName ?? '');
//   });
// });

// test.describe('Scenario : 3 : Create A Supply Owing In Edit Workflow', () => {
//   test('Edit the Details and Verify it on the summary screen', async ({ dispense }) => {
//     const firstFinalMedName = dispenseData.medicines[0].finalMedName;
//     await dispense.editDispenseOwing(firstFinalMedName ?? '');
//   });
// });


// test.describe('Scenario : 4 : Edit Multiple Medicine', () => {
//   test('Edit multiple medicine', async ({ dispense }) => {
//     await dispense.editMultipleMedicines();
//   });
// });