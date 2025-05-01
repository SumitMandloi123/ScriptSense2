import dispenseData from '@data/dispenseData.json';
import { test } from '@fixtures/pomFixture';
test.setTimeout(150000);

test.describe('Scenario : 1 : Create A Manual Dispense And Process It', () => {
  test('Navigate to baseurl and login', async ({ header }) => {
    await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
  });
  test('Disable the printer', async ({ printer }) => {
    await printer.disablePrinter();
  });
  test('Search patient', async ({ landing }) => {
    await landing.searchPatientByNHI(dispenseData.patient.NHI_id);
  });
//   test('Add Medicines and Dispense', async ({ dispense }) => {
//     await dispense.addMedicines(
//       dispenseData.prescriber.name,
//       dispenseData.medicines,
//     );
//   });
//   test('Process Dispensed Medicine', async ({ dispense }) => {
//     const firstFinalMedName = dispenseData.medicines[0].finalMedName as string;
//     await dispense.processDispense(firstFinalMedName);
//     await dispense.certifiedRepeatCopyDataValidation();
//   });
});

// test.describe('Delete the latest dispensed Data from grid', () => {
//   test('Deleting the Dispense', async ({ dispense }) => {
//     await dispense.deleteRecordFromGrid(
//       dispenseData.deletingRecord, "delete"
//  );
// }); 
// });

// test.describe('Unrepeat the last dispense and delete it', () => {
//   test('Unrepeat the dispense', async ({ dispense }) => {
//     await dispense.deleteRecordFromGrid(
//       dispenseData.deletingRecord, "unrepeat"
//  );
// });  
// });

// test.describe('Scenario : 2 : Held Dispence And Process', () => {
//   test('Held Dispense Test', async ({ dispense }) => {
//     await dispense.heldDispense(
//       dispenseData.heldDispenseData.medicines[0].prescriber,
//       dispenseData.heldDispenseData.medicines[0].medicine,
//       dispenseData.heldDispenseData.medicines[0].dispQty,
//       dispenseData.heldDispenseData.medicines[0].finalMedName
//     );
//   });
// });

// test.describe('Scenario : 3 : Owing Dispence And Supply Owing', () => {
//   test('Owing Dispense Test', async ({ dispense }) => {
//     await dispense.owingDispense(
//       dispenseData.OwingDispenseData.medicines[0].prescriber,
//       dispenseData.OwingDispenseData.medicines[0].medicine,
//       dispenseData.OwingDispenseData.medicines[0].dispQty,
//       dispenseData.OwingDispenseData.medicines[0].finalMedName,
//       dispenseData.OwingDispenseData.medicines[0].givenQty,
//       dispenseData.OwingDispenseData.medicines[0].repeat,
//     );
//   });
// });

// test.describe('Scenario : 4 : Repeat Dispence', () => {
//   test('Repeat Dispense Test', async ({ dispense }) => {
//     await dispense.repeatDispense(
//       dispenseData.RepeatDispenseData.medicines[0].prescriber,
//       dispenseData.RepeatDispenseData.medicines[0].medicine,
//       dispenseData.RepeatDispenseData.medicines[0].dispQty,
//       dispenseData.RepeatDispenseData.medicines[0].finalMedName,
//       dispenseData.RepeatDispenseData.medicines[0].repeat,
//     );
//   });
// });

test.describe('Auto Dispensed the last manual dispensed medicines', () => {
  test('Auto Dispense', async ({ dispense }) => {
    await dispense.autoDispense(dispenseData.prescriber.name,dispenseData.autoDispenseMedicines);
  });
});




