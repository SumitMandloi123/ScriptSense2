import { test, expect} from "../../fixtures/pomFixture";
import testData from "../../resources/data/testData.json"; 

test.describe("Login and create a manual dispense", () => {
  test('Navigate to baseurl and login into system', async ({ signinPage }) => {
    test.setTimeout(60000);
    await signinPage.navigateTo("https://dev.scriptsense.co.nz/");
    await signinPage.loginForm(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    await console.log("login successful");
  });


  test("Search patient and create a manual dispense", async ({ homePage }) => {
    await homePage.disablePrinter();
    await homePage.searchPatientByNHI(testData.idNHI); // Use idNHI from testData.json
    await homePage.createManualDispense(testData.doctorName, testData.medicineName); // Use doctor & medicine name from testData.json
  });
});


// import { test } from "../../fixtures/pomFixture";
// import testData from "../../resources/data/testData.json";

// test.describe("Login and create a manual dispense", () => {
//     test("Search patient and create a manual dispense", async ({ homePage }) => {
//         await homePage.disablePrinter();
//         await homePage.searchPatientByNHI(testData.idNHI);
//         await homePage.createManualDispense(testData.doctorName, testData.medicineName);
        
//     });
// });
