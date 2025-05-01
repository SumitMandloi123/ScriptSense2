// import retailData from '@data/retailData.json';
// import { test } from '@fixtures/pomFixture';
// test.setTimeout(120000);

// test.describe('Scenario : 1 : Search A Patient And Make A Cash/Bank Payment', () => {
//   test('Login', async ({ header }) => {
//     await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
//   });
//   test('Search For Patient For Bill', async ({ retailPage }) => {
//     await retailPage.searchPatientForBill(retailData.patientDetails);
//   });
//   test('Add the Bills By Patient And Verify The Details', async ({ retailPage }) => {
//     await retailPage.findDispensesAndAddForBill(retailData.dispensesDetails,'patient');
//     await retailPage.validateAddedBills(retailData.dispensesDetails,'patient');
//   });
//   test('Add the Bills By Barcode And Verify The Details', async ({ retailPage }) => {
//     await retailPage.findDispensesAndAddForBill(retailData.dispensesDetails,"barcode");
//     await retailPage.validateAddedBills(retailData.dispensesDetails,'barcode');
//   });
//   test('Add the Retail Items And Verify The Details', async ({ retailPage }) => {
//     await retailPage.searchPatientForBill(retailData.patientDetails);
//     await retailPage.findDispensesAndAddForBill(retailData.dispensesDetails,"retail");
//     await retailPage.validateAddedBills(retailData.dispensesDetails,'retail');
//   });
//   test('Navigate to account, search for a account and make payment', async ({ accountPage,retailPage }) => {
//     await accountPage.searchAccountAndMakePayment(retailData.dispensesDetails.paymentAccountName,retailPage);
//     await retailPage.validateAddedBills(retailData.dispensesDetails,'barcode');
//   });
//     test('Create a EFTPOS connection and make electronic payment of dispense Items', async ({ retailPage }) => {
//     await retailPage.createEFTPOSconnection(retailData.eftposConnection)
//     await retailPage.searchPatientForBill(retailData.patientDetails);
//     await retailPage.findDispensesAndAddForBill(retailData.dispensesDetails,'patient');
//     await retailPage.validateAddedBills(retailData.dispensesDetails,'electronicPayment');
//   });
// });