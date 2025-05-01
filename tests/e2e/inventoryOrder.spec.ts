// import orderMedsDetails from '@data/orderMedicineData.json';
// import { test } from '@fixtures/pomFixture';
// test.setTimeout(90000);
// test.describe('Inventory Order: Place and order and verify the details of ordered medicine and also verify the updated inventory stock', () => {
//   test('Login', async ({ header, order }) => {
//     await header.login(process.env.LOGIN_USERNAME as string , process.env.LOGIN_PASSWORD as string);
//   });
//   test('Scenerio 1: Navigate to place order page and start manual order and send Order', async ({
//     order,
//   }) => {
//     await order.createManualOrder(orderMedsDetails.medicineDetails, 'normal');
//     await order.confirmSendOffer('sendOrder');
//     await order.sendOrderConfirmation('sendOrder');
//   });
//   test('Scenerio 2: Navigate to place order page and start manual order and confirm Order', async ({
//     order,
//   }) => {
//     await order.createManualOrder(orderMedsDetails.medicineDetails, 'normal');
//     await order.confirmSendOffer('confirmOrder');
//     await order.sendOrderConfirmation('confirmOrder');
//   });
//   test('Scenerio 3: Navigate to place order page and start manual order and send Order for s29 medicine', async ({
//     order,
//   }) => {
//     await order.createManualOrder(orderMedsDetails.medicineDetails, 's29');
//     await order.confirmSendOffer('sendOrder');
//     await order.sendOrderConfirmation('sendOrder');
//   });

//   test('Scenerio 4: Search medicine in Inventory and navigate to place order then confirm accept and check the updated stock in hand ', async ({
//     order,
//   }) => {
//     await order.verifyTheUpadatedQuantityInInventory(
//       orderMedsDetails.medicineDetails,
//     );
//   });
//   test('Scenerio 5: Navigate to the place Order page, add the medicines and click on "clear all itmes" button ', async ({
//     order,
//   }) => {
//     await order.clearAllItems(orderMedsDetails.medicineDetails);
//   });

//   test('Scenerio 6: Navigate to place order page and start manual order and Discard Order', async ({
//     order,
//   }) => {
//     await order.discardOrder(
//       orderMedsDetails.medicineDetails,
//     );
//   });
//   test('Scenerio 7: Navigate to place order page and auto calculate for required days', async ({
//     order,
//   }) => {
//     await order.autoCalculateStock(
//       orderMedsDetails.medicineDetails.daysForAutoCalculate,
//     );
//   });
//   test('Scenerio 8: Navigate to place order for entire to One Supplier', async ({
//     order,
//   }) => {
//     await order.selectSupplierFromDropdown(
//       orderMedsDetails.medicineDetails, "entireToOneSupplier"
//     );
//   });
//   test('Scenerio 9: Navigate to place order for individual Supplier', async ({
//     order,
//   }) => {
//     await order.selectSupplierFromDropdown(
//       orderMedsDetails.medicineDetails,
//       'individualSupplier',
//     );
//   });
//   test('Scenerio 10: Diable the Medicine to order till next dispense', async ({
//     order,
//   }) => {
//     await order.checkWarningMassage(
//       orderMedsDetails.medicineDetails,
//       "Don't order till next dispense",
//     );
//   });
//   test('Scenerio 11: Dont Order', async ({ order }) => {
//     await order.checkWarningMassage(
//       orderMedsDetails.medicineDetails,
//       'Dont Order',
//     );
//   });
// });