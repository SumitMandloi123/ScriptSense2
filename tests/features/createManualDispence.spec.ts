import { test } from "../../fixtures/pomFixture";
import testData from "../../resources/data/testData.json";

test.describe("Login and create a manual dispense", () => {
    test("Search patient and create a manual dispense", async ({ homePage }) => {
        await homePage.disablePrinter();
        await homePage.searchPatientByNHI(testData.idNHI);
        await homePage.createManualDispense(testData.doctorName, testData.medicineName);
    });
});
