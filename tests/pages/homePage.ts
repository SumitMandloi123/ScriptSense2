import { Page } from "@playwright/test";
import BasePage from "./basePage";

export class HomePage extends BasePage {
    readonly page: Page;

    // Defined locators as simple string properties
    private toggleButtonPrintDisable = "//label[text()='Use Print Utility']";
    private dispenseLink = "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]";
    private tabNHI = "role=tab[name='By NHI']";
    private searchPatient = "role=combobox[name='Search for patient']";
    private searchButton = "role=button[name='Search']";
    private optionPatientName = "//*[contains(text(), '(ZAU8023) John Lee 01/01/2001 (unknown)')]";
    private manualDispenseButton = "role=link[name='Manual Dispense']";
    private prescriberSearchField = "role=combobox[name='Search for prescriber']";
    private optionPrescriberName = "text='Dummy Doctor'";
    private medicineSearchField = "//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input";
    private optionMedicineName = "role=option >> text='Saradon'";
    private rxQuantityField = "role=textbox[name='Rx Qty OP']";
    private instructionField = "role=textbox[name='Instructions']";
    private button13 = "role=button[name='13']";
    private totalRepeatCount = "role=textbox[name='Total Repeats']";
    private endDispenseButton = "role=button[name='End Dispense']";
    private loadMoreButton = "//div[contains(@class, 'mantine-Button-inner')]//div[contains(text(), 'Load More')]"

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    
    // Disables the printer by navigating to the settings page and clicking the toggle button.
     
    async disablePrinter() {
        await this.navigateTo("https://dev.scriptsense.co.nz/settings/printers"); // Navigate to the printer settings page
        await this.waitForElementVisible(this.toggleButtonPrintDisable); // Wait until the toggle button is visible
        await this.clickElement(this.page.locator(this.toggleButtonPrintDisable)); // Click the toggle button to disable the printer
        // await this.clickElement(this.page.locator(this.dispenseLink));
        await this.page.waitForTimeout(3000);   
    }

    
    //  Searches for a patient by NHI number.
     
    async searchPatientByNHI(patientNHIID: string) {
        await this.navigateTo("https://dev.scriptsense.co.nz/"); // Navigate to the homepage
        await this.clickElement(this.page.locator(this.dispenseLink)); // Click the "Dispense" link
        // await this.page.locator(this.dispenseLink).click({ force: true });

        await this.clickElement(this.page.locator(this.tabNHI)); // Click on the "By NHI" tab
        await this.setValueInTextField(this.page.locator(this.searchPatient), patientNHIID); // Enter the patient's NHI in the search field
        await this.clickElement(this.page.locator(this.searchButton)); // Click the search button
        await this.page.waitForTimeout(1000) // wait for patient to display
        // await this.clickElement(this.page.locator(this.optionPatientName)); // Select the patient from search results
        await this.page.locator(this.optionPatientName).click({force: true});
        await this.page.waitForSelector(this.loadMoreButton, { state: 'visible' }); // Wait for the "Load More Button" to be visible

    }

    //Creates a manual dispense for a patient.
    
    async createManualDispense(prescriberName: string, medicineName: string) {
        await this.clickElement(this.page.locator(this.manualDispenseButton)); // Click the "Manual Dispense" button
        await this.setValueInTextField(this.page.locator(this.prescriberSearchField), prescriberName); // Enter the prescriber's name
        await this.page.waitForTimeout(1500); //wait for 1.5 second
        await this.clickElement(this.page.locator(this.optionPrescriberName)); // Select the prescriber from the list
        await this.clickElement(this.page.locator(this.medicineSearchField)); // Click on the medicine search field
        await this.setValueInTextField(this.page.locator(this.medicineSearchField), medicineName); // Enter the medicine name
        await this.page.waitForTimeout(1500); //wait for 1.5 second
        await this.clickElement(this.page.locator(this.optionMedicineName)); // Select the medicine from the list
        await this.page.waitForTimeout(3000); //wait for medicine to selected
        await this.setValueInTextField(this.page.locator(this.rxQuantityField), "2"); // Enter the Rx quantity as "2"
        await this.clickElement(this.page.locator(this.instructionField)); // Click on the instruction field
        await this.setValueInTextField(this.page.locator(this.instructionField), "this is test"); // Enter prescription instructions
        await this.clickElement(this.page.locator(this.button13)); // Click the button labeled "13"
        await this.setValueInTextField(this.page.locator(this.totalRepeatCount), "1"); // Set the total repeat count to "1"
        await this.clickElement(this.page.locator(this.endDispenseButton)); // Click the "End Dispense" button to finalize the process
        await this.page.waitForTimeout(5000);
    }
}
