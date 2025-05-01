import { expect } from '@playwright/test';
import BasePage from '@pages/basePage';

export default class AddPatient extends BasePage {
  private get addPatientButton() {
    // Locator for the 'Add Patient' button
    return this.page.locator("//span[contains(text(), 'Add Patient')]");
  }

  private get inputNHI() {
    // Locator for the NHI input field
    return this.page.locator("//input[@placeholder='NHI']");
  }

  private get inputFirstName() {
    // Locator for the First Name input field
    return this.page.locator("//input[@placeholder='First Name']");
  }

  private get inputLastName() {
    // Locator for the Last Name input field
    return this.page.locator("//input[@placeholder='Last Name']");
  }

  private get inputGender() {
    // Locator for the Gender input field
    return this.page.locator("//input[@placeholder='Gender']");
  }

  private genderOption(gender: string) {
    // Function to locate gender options based on the gender passed
    return this.page.locator(`//div[@role='option' and text()='${gender}']`);
  }

  private get inputDOB() {
    // Locator for the Date of Birth input field
    return this.page.locator(
      "(//label[contains(text(),'Date of Birth')]/following-sibling::div//input)[2]",
    );
  }

  private get createButton() {
    // Locator for the 'Create' button
    return this.page.locator("//button[.//span[text()='Create']]");
  }

  private get manualDispenseButton() {
    // Locator for the 'Manual Dispense' button
    return this.page.locator("role=link[name='Manual Dispense']");
  }

  get patientNameText() {
    // Locator for the patient's name text on the page
    return this.page.locator(
      "//div[@class='mantine-b6zkvl mantine-ScrollArea-viewport']//div[@aria-label='patientName']",
    );
  }

  get patientAgeText() {
    // Locator for the patient's age text on the page
    return this.page.locator(
      "//div[@class='mantine-Group-root mantine-k3ov3c']//div[3]",
    );
  }

  private async selectOption(value: string) {
    // Method to select a gender option
    await this.inputGender.click();
    await this.genderOption(value).click();
  }

  get registerButton() {
    return this.page.locator("//span[normalize-space()='Register']");
  }

  registerCategory(category: string) {
    return this.page.locator(`//button[@aria-label='Register${category}']`);
  }

  get startDateInputField() {
    return this.page.locator(
      "//label[contains(text(), 'Start Date')]/following-sibling::div//input",
    );
  }

  get institutionInputField() {
    return this.page.locator(
      "//label[contains(text(), 'Institution')]/following-sibling::div//input",
    );
  }

  get registerButtonInForm() {
    return this.page.locator(
      "//button[@type='submit']//span[contains(text(),'Register')]",
    );
  }

  exitCategoryButton(category: string) {
    return this.page.locator(`//button[@aria-label='Exit${category}']`);
  }

  get endDateInputField() {
    return this.page.locator(
      "//label[contains(text(), 'End Date')]/following-sibling::div//input",
    );
  }
  get removeAlreadyAddedCategory() {
    return this.page.locator("//button[contains(@aria-label,'Exit')]");
  }
  get exitButton() {
    return this.page.locator("//span[normalize-space()='Exit']");
  }

  // Method to fill the patient details form
  async addPatient(
    nhi: string,
    firstName: string,
    lastName: string,
    gender: string,
    dob: string,
  ) {
    await this.addPatientButton.click();
    await this.inputNHI.fill(nhi);
    await this.inputFirstName.fill(firstName);
    await this.inputLastName.fill(lastName);
    await this.selectOption(gender);
    await this.inputDOB.fill(dob);
    await this.createButton.click();
    await this.manualDispenseButton.waitFor({ state: 'visible', timeout: 0 }); // Ensures the 'Manual Dispense' button appears
    const actualPatientName = await this.patientNameText.textContent();
    const expectedPatientFullName = firstName + ' ' + lastName;
    expect(expectedPatientFullName.trim()).toBe(actualPatientName);
  }

  async register(
    institutionName: string,
    category: string,
    registerDate: string,
    exitDate: string,
  ) {
    await this.registerButton.click();
    await this.page.waitForTimeout(5000);
    //Check if a service already registed and remove it.
    if(await this.removeAlreadyAddedCategory.isVisible()){
    this.removeAlreadyAddedCategory.click()
    await this.endDateInputField.fill(exitDate);
    await this.exitButton.click();
    await this.registerCategory(category).waitFor({ state: 'visible' });
    }

    await this.registerCategory(category).click();
    await this.page.waitForTimeout(3000);
    await this.startDateInputField.fill(registerDate);
    if (category != 'CDOS') {
      await this.institutionInputField.fill(institutionName);
    }
    await this.registerButtonInForm.click({ force: true });
    await this.exitCategoryButton(category).waitFor({ state: 'visible' });
    expect(await this.exitCategoryButton(category).isVisible()).toBe(true);
    await this.exitCategoryButton(category).click();
    await this.endDateInputField.fill(exitDate);
    await this.exitButton.click();
    await this.registerCategory(category).waitFor({ state: 'visible' });
    expect(await this.registerCategory(category).isVisible()).toBe(true);

    //To Do need to handle the for LTC service
  }
}