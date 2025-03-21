// import { Page } from "@playwright/test";
// import BasePage from "pages/basePage";

// export class HomePage extends BasePage {
//     private toggleButtonPrintDisable = "//label[text()='Use Print Utility']";
//     private dispenseLink = "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]//parent::div";
//     private tabNHI = "role=tab[name='By NHI']";
//     private searchPatient = "role=combobox[name='Search for patient']";
//     private searchButton = "role=button[name='Search']";
//     private optionPatientName = "//*[contains(text(), 'John Lee')]";
//     // private optionPatientName = "//*[contains(text(), '(ZAU8023) Eddie VAN HALEN')]";
//     private manualDispenseButton = "role=link[name='Manual Dispense']";
//     private prescriberSearchField = "role=combobox[name='Search for prescriber']";
//     // private optionPrescriberName = "text='Dummy Doctor'";
//     private optionPrescriberName = "text='(90ZGZA) Duane Michael Garcia'";
//     private medicineSearchField = "//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input";
//     private optionMedicineName = "//div[contains(text(), 'Saradon')]";
//     private rxQuantityField = "role=textbox[name='Rx Qty OP']";
//     private instructionField = "role=textbox[name='Instructions']";
//     private button13 = "role=button[name='13']";
//     private totalRepeatCount = "role=textbox[name='Total Repeats']";
//     private endDispenseButton = "role=button[name='End Dispense']";
//     private loadMoreButton = "//div[contains(@class, 'mantine-Button-inner')]//div[contains(text(), 'Load More')]";

//     constructor(page: Page) {
//         super(page);
//     }

//     async disablePrinter() {
//         await this.navigateTo("https://dev.scriptsense.co.nz/settings/printers"); // Open printer settings
//         await this.waitForElementVisible(this.toggleButtonPrintDisable); // Ensure toggle button is visible
//         await this.clickElement(this.getPage().locator(this.toggleButtonPrintDisable)); // Click to disable the printer
//         await this.getPage().waitForTimeout(3000); // Wait for changes
//     }

//     async searchPatientByNHI(patientNHIID: string) {
//         await this.navigateTo("https://dev.scriptsense.co.nz/"); // Open homepage
//         await this.clickElement(this.getPage().locator(this.dispenseLink)); // Click "Dispense"
//         await this.clickElement(this.getPage().locator(this.tabNHI)); // Open "By NHI" tab
//         await this.setValueInTextField(this.getPage().locator(this.searchPatient), patientNHIID); // Enter NHI ID
//         await this.clickElement(this.getPage().locator(this.searchButton)); // Click search button
//         await this.getPage().waitForTimeout(1000); // Wait for results
//         await this.clickElement(this.getPage().locator(this.optionPatientName)); // Select patient
//         await this.page.waitForTimeout(5000);
//         await this.getPage().waitForSelector(this.loadMoreButton, { state: 'visible' }); // Ensure patient details load
//     }

//     async createManualDispense(prescriberName: string, medicineName: string) {
//         await this.clickElement(this.getPage().locator(this.manualDispenseButton)); // Open "Manual Dispense"
//         await this.setValueInTextField(this.getPage().locator(this.prescriberSearchField), prescriberName); // Enter prescriber name
//         await this.getPage().waitForTimeout(1500); // Wait for results
//         await this.clickElement(this.getPage().locator(this.optionPrescriberName)); // Select prescriber
//         await this.clickElement(this.getPage().locator(this.medicineSearchField)); // Focus on medicine field
//         await this.setValueInTextField(this.getPage().locator(this.medicineSearchField), medicineName); // Enter medicine
//         await this.getPage().waitForTimeout(1500); // Wait for medicine list
//         await this.clickElement(this.getPage().locator(this.optionMedicineName)); // Select medicine
//         await this.getPage().waitForTimeout(3000); // Wait for selection
//         await this.setValueInTextField(this.getPage().locator(this.rxQuantityField), "2"); // Set Rx quantity
//         await this.clickElement(this.getPage().locator(this.instructionField)); // Focus on instruction field
//         await this.setValueInTextField(this.getPage().locator(this.instructionField), "this is test"); // Enter instructions
//         await this.clickElement(this.getPage().locator(this.button13)); // Click "13" button
//         await this.setValueInTextField(this.getPage().locator(this.totalRepeatCount), "1"); // Set total repeats
//         await this.clickElement(this.getPage().locator(this.endDispenseButton)); // Finalize dispense
//         await this.getPage().waitForTimeout(5000); // Wait for completion
//         await console.log("Dispense Successful");
//     }
// }


import BasePage from "@pages/basePage";

export default class LandingPage extends BasePage {

  private get dispenseLink() {  
    return this.page.locator(  
      "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]//parent::div"  
    ); // Locator for the "Dispense" link inside its parent div  
  }  

  async navigateToDispense() {  
    await this.dispenseLink.click(); // Clicks on the "Dispense" link to navigate to the dispense page  
  }  
}  


