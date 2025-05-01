import { Page, expect } from '@playwright/test';
import BasePage from '@pages/basePage';

export class Landing extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get dispenseHeaderLink() {
    return this.page.locator(
      "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]",
    );
  }
  private get tabNHI() {
    return this.page.locator("role=tab[name='By NHI']");
  }
  private get searchPatientByNHIInput() {
    return this.page.locator("role=combobox[name='Search for patient']");
  }
  private get searchPatientButton() {
    return this.page.locator("role=button[name='Search']");
  }
  private get searchedPatientDropdown() {
    return this.page.locator("(//div[@role='option'])[1]");
  }
  private get manualDispenseButton() {
    return this.page.locator("role=link[name='Manual Dispense']");
  }

  //  Searches for a patient by NHI number.
  async searchPatientByNHI(patientNHIID: string) {
    await this.dispenseHeaderLink.click(); // Click the "Dispense" link
    await this.tabNHI.click(); // Click on the "By NHI" tab
    this.searchPatientByNHIInput.fill(patientNHIID); // Enter the patient's NHI in the search field
    await this.searchPatientButton.waitFor({ state: 'visible' });
    await this.searchPatientButton.click(); // Click the search button
    await this.searchedPatientDropdown.click(); // Select the patient from search results
    await this.manualDispenseButton.waitFor({ state: 'visible' });
    await expect(this.manualDispenseButton).toBeVisible();
    await this.manualDispenseButton.click(); // Click on the "Create Manual Dispense" button
  }
}