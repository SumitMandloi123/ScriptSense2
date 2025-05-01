import { Page } from '@playwright/test';
import dispenseData from '@data/dispenseData.json';
import editDispenseData from '@data/editDispenseData.json'
import { expect } from '@fixtures/pomFixture';
import BasePage from '@pages/basePage';

export class Dispense extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get manualDispenseButton() {
    return this.page.locator("role=link[name='Manual Dispense']");
  }
  private get searchPrescriberField() {
    return this.page.locator("role=combobox[name='Search for prescriber']");
  }
  private get searchedPrescriberDropdown() {
    return this.page.locator(`//div[@role="listbox"]//div[@aria-selected]`);
  }
  private get searchMedicineField() {
    return this.page.locator(
      "//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input",
    );
  }
  private get searchedMedicineDropdown() {
    return this.page.locator("//div[@description='LYNPARZA TAB 150MG 56']");
  }
  private get rxQuantityField() {
    return this.page.locator(
      "//div[text()='Total Rx Qty']//parent::div//parent::label//parent::div//input",
    );
  }
  private get instructionField() {
    return this.page.locator("//textarea[@placeholder='Instructions']");
  }
  private get instructionPredefinedOption() {
    return this.page.locator("//button[@title='Cal13']");
  }
  private get totalRepeatField() {
    return this.page.locator(
      "//label[text()='Total Repeats']//parent::div//parent::label//parent::div//input",
    );
  }
  private get endDispenseButton() {
    return this.page.locator("//button[normalize-space()='Submit Dispense']")
  }
  private get updateDispenseButton() {
    return this.page.locator("//button[normalize-space()='Update Dispense']")
  }
  private get loadMoreButton() {
    return this.page.locator(
      "//div[contains(@class, 'mantine-Button-inner')]//div[contains(text(), 'Load More')]",
    );
  }
  private get patientNameLabel() {
    return this.page.locator("(//div[@aria-label='patientName'])[2]");
  }
  private getMedicineSearchField(index: number) {
    return this.page.locator(
      `(//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input)[${index}]`,
    );
  }

  private getOptionMedicine(name: string) {
    return this.page.locator(`(//div[contains(text(),'${name}')])[1]`);
  }

  private getTotalRepeatsField(index: number) {
    return this.page.locator(
      `(//label[text()='Total Repeats']/following-sibling::div//input)[${index}]`,
    );
  }

  private getTotalDaysField(index: number) {
    return this.page.locator(
      `(//label[text()='Days']/following-sibling::div//input)[${index}]`,
    );
  }
  private get addItemButton() {
    return this.page.locator("//span[normalize-space()='Add Item']");
  }
  private getDispQtyField(index: number) {
    return this.page.locator(
      `(//label[.//div[text()='Disp Qty']]/following-sibling::div//input[@type='text'])[${index}]`,
    );
  }
  get prescriberNameFromDetailSection() {
    return this.page.locator(
      "(//*[name()='svg' and contains(@class,'arrow-left')]//following::div[@class='mantine-Grid-col mantine-10g25be']//child::div)[21]",
    );
  }
  get prescriberNameFromSummary() {
    return this.page.locator("//main//div[@aria-label='PrescriberName']");
  }

  get processButton() {
    return this.page.locator(
      "//button[contains(@class,'mantine-Button-root') and .//span[text()='Process']]",
    );
  }
  get processDispenseButton() {
    return this.page.locator(
      "//button[contains(@class,'mantine-Button-root') and .//span[text()='Process Dispense']]",
    );
  }
  get summaryNHIID() {
    return this.page.locator(
      "(//main//div[contains(@class,'mantine-hpmcve')]//div[contains(@class,'mantine-Text-root')])[2]",
    );
  }
  getMedicineCount(finalMedName: string) {
    return this.page.locator(
      `(//div[@title='Medicine']//following::tr//td//div[contains(text(),'${finalMedName}')]//parent::div//ancestor::tr//child::div)[5]//child::span[2]`,
    );
  }

  // Method to get UI medicine names
  async getDispensedMedicineNames() {
    return await this.page
      .locator(
        "//div[contains(@class,'mantine-Grid-root mantine-d6xt58')]//child::div[@class='mantine-Grid-col mantine-1hm39fd']",
      )
      .allTextContents();
  }

  async getTotalDispensedMedicineCount() {
    const countText = await this.page
      .locator("//span[contains(text(),'Items:')]")
      .textContent();
    if (countText) {
      const match = countText.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return 0;
  }

  get patientNHIFromSummary() {
    return this.page
      .locator("//div[@aria-label='certifiedRepeats']//div[@aria-label='NHI']")
      .textContent();
  }

  get medicineNameFromSummary() {
    return this.page
      .locator("(//div[contains(text(),'SCID')]//following-sibling::div)[2]")
      .textContent();
  }

  async getPrintDate() {
    const text = await this.page
      .locator("//div[@aria-label='printDate']")
      .textContent();
    return text ? text.slice(12).trim() : '';
  }

  get currentDate() {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}/${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}/${today.getFullYear()}`;
  }

  async dispQty() {
    const text = await this.page
      .locator("(//div[contains(text(),'SCID')]//following-sibling::div)[3]")
      .textContent();
    if (text) {
      const match = text.match(/Quantity:\s*(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }
    return 0;
  }

  async totalRepeats() {
    const text = await this.page
      .locator("(//div[contains(text(),'SCID')]//following-sibling::div)[3]")
      .textContent();
    const match = text?.match(/Repeats Available:\s*(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getSCIDFromTop() {
    return await this.page
      .locator(
        "//button[contains(@class, 'mantine-UnstyledButton-root')]/preceding-sibling::div/span[@class='mantine-Text-root mantine-1tohvyn']",
      )
      .textContent();
  }

  async getSCIDFromSummary() {
    const text = await this.page
      .locator("//div[@aria-label='scid']")
      .textContent();
    if (text) {
      const match = text.match(/SCID:\s*(\S+)/);
      return match ? match[1] : null;
    }
    return null;
  }

  async getFundingInfo() {
    return await this.page
      .locator("//input[@data-cy='prescription-item-funding-info']")
      .inputValue();
  }

  async getClinicName() {
    return await this.page
      .locator("(//div[@aria-label='clinicName'])[1]")
      .textContent();
  }
  async clinicNameSummary() {
    return await this.page
      .locator(
        "//div[@aria-label='certifiedRepeats']//div[@aria-label='clinicName']",
      )
      .textContent();
  }

  async fundingInfoSummary() {
    const text = await this.page
      .locator("//div[@aria-label='fundingCategory']")
      .textContent();
    if (text) {
      return text.replace('Funding:', '').trim();
    }
    return null;
  }

  async getPrescriptionRxNumber() {
    const text = await this.page
      .locator("//div[contains(text(),'Rx No.:')]")
      .textContent();
    if (text) {
      return text.slice(8).trim();
    }
    return null;
  }

  async prescriptionRxNumberFromSummary() {
    const text = await this.page
      .locator("//span[@aria-label='prescriptionNumber']")
      .textContent();
    if (text) {
      return text.slice(21).trim();
    }
    return null;
  }
  async editPrescriptionRxNumberFromSummary() {
    const text = await this.page
      .locator("(//main//div[@aria-label='RxNO'])[1]")
      .textContent();
    if (text) {
      return text.trim();
    }
    return null;
  }

  async getRepeatDispenseDate() {
    const buttonText = await this.page
      .locator("//div[label[contains(text(),'Before')]]//button")
      .textContent();
    return buttonText ? buttonText.trim() : null;
  }

  async repeatDispenseDateSummary() {
    const text = await this.page
      .locator("//div[@aria-label='repeatDate']")
      .textContent();
    if (text) {
      return text.slice(21).trim();
    }
    return null;
  }
  get getManualTab() {
    return this.page.locator(
      "(//span[normalize-space()='prescription']//ancestor::a//following-sibling::a)[1]",
    );
  }
  get dispQtyInput() {
    return this.page.locator(
      "//div[text()='Disp Qty']//parent::div//parent::label/parent::div//child::input",
    );
  }
  get holdButton() {
    return this.page.locator("//span[normalize-space()='Hold Items']");
  }
  async patientName() {
    const text = await this.page
      .locator("(//div[@aria-label='patientName'])[4]")
      .textContent();
    return text?.trim() || '';
  }
  getMedicineFromGrid(finalMedName: string) {
    return this.page.locator(
      `(//tbody//td[2]//span[contains(@aria-label, "${finalMedName.toLocaleLowerCase()}")])[last()]`,
    );
  }

  get patientNHIFromSummaryHold() {
    return this.page
      .locator("//main//div[@aria-label='PatientNhi']")
      .textContent();
  }
  get patientNHIFromOwingSummary() {
    return this.page
      .locator("//main//div[@aria-label='PatientNhi']")
      .textContent();
  }
  async getDOBFromSummary() {
    const text = await this.page
      .locator("(//div[@aria-label='patientDob'])")
      .textContent();
    return text ? text.trim().slice(5) : '';
  }
  async getDOBFromOwingSummary() {
    const text = await this.page
      .locator("//main//div[contains(text(),'Dob')]")
      .textContent();
    return text ? text.trim().slice(5) : '';
  }
  async getItemCount() {
    const text = await this.page
      .locator("(//div[@aria-label='itemCount'])")
      .textContent();
    return text ? parseInt(text.trim().replace(/\D/g, ''), 10) : 0;
  }
  get medicineNameFromSummaryHold() {
    return this.page
      .locator("//main//div[@aria-label='medicationName']")
      .textContent();
  }
  async fundingInfoSummaryHold() {
    const text = await this.page
      .locator("//main//div[@aria-label='category']")
      .textContent();
    return text?.trim() || '';
  }
  async prescriptionRxNumberSummaryHold() {
    const text = await this.page
      .locator("(//main//div[@aria-label='RxNO'])[last()]")
      .textContent();
    return text?.trim() || '';
  }
  async getMedicinePrice() {
    const priceElement = await this.page.locator(
      "(//div[contains(@class,'mantine-ScrollArea-viewport')])[2]//div[contains(text(),'$')]",
    );
    const text = await priceElement.textContent();
    return text?.match(/\$\d+/)?.[0] || null;
  }

  async getMedicinePriceFromSummary() {
    const priceElement = await this.page.locator(
      "(//main//div[@aria-label='totalCost'])[1]",
    );
    const text = await priceElement.textContent();
    return text?.match(/\$\d+/)?.[0] || null;
  }
  get givenQtyInput() {
    return this.page.locator(
      "//label[contains(text(),'Qty Given')]//parent::div//following-sibling::div/input",
    );
  }
  get supplyOwingButton() {
    return this.page.locator("//span[normalize-space()='Supply Owing']");
  }

  get giveOwingButton() {
    return this.page.locator("//span[normalize-space()='Give Owing']");
  }
  async fundingInfoSummaryOwing() {
    const text = await this.page
      .locator("//main//div[@aria-label='category']")
      .textContent();
    return text?.trim().slice(0, 2) || '';
  }

  get totalRepeatsLabel() {
    return this.page.locator("//div[contains(text(),'Total Repeats')]");
  }

  get totaltRepeatsInput() {
    return this.page.locator("//label[text()='Total Repeats']/following-sibling::div//input");
  }
  async pricePerPacket() {
    const element = await this.page.locator("//span[contains(normalize-space(), '$') and contains(normalize-space(), '/') and (contains(normalize-space(), 'CAP') or contains(normalize-space(), 'TAB'))]");
    const text = await element.textContent();
    const trimmed = text?.trim() || '';
    let match;
    if (trimmed.includes("CAP"))
      match = trimmed.match(/\/(\d+)\s*CAP/);
    else
      match = trimmed.match(/\/(\d+)\s*TAB/);
    return match ? match[1] : null;

  }
  get removePrescriberIcon() {
    return this.page.locator("(//button//*[local-name()='svg'])[13]");
  }
  async getSuppliedValue() {
    const element = await this.page.locator(
      "//div[contains(text(), 'Supplied')]",
    );
    const text = await element.textContent();
    return text?.match(/\d+/)?.[0] || null;
  }
  async instructionFromSummary() {
    return (
      await this.page
        .locator("(//div[@aria-label='medicationName']//parent::div/div)[4]")
        .textContent()
    )?.trim();
  }

  async instructionFromInstructionBox() {
    const instructionTextArea = this.page.locator(
      "//textarea[@placeholder='Instructions']",
    );
    return (await instructionTextArea.inputValue()).trim();
  }

  async enterTheRepeatValues() {
    const inputValues =
      dispenseData.RepeatDispenseData.medicines[0].inputValues;
    const inputBoxes = await this.page.locator(
      "//div[@role='dialog']//tr/td[2]//child::input",
    );
    const inputElements = await inputBoxes.all();

    for (let i = 0; i < inputElements.length; i++) {
      if (inputValues[i] !== undefined) {
        await inputElements[i].fill(inputValues[i].toString());
      }
    }
  }

  async enterInstructionValues() {
    const instructionValues =
      dispenseData.RepeatDispenseData.medicines[0].instructions;

    const instructionBoxes = await this.page.locator(
      "//div[@role='dialog']//tr/td[3]//child::input",
    );
    const instructionElements = await instructionBoxes.all();

    for (let i = 0; i < instructionElements.length; i++) {
      if (instructionValues[i] !== undefined) {
        await instructionElements[i].fill(instructionValues[i]);
      }
    }
  }
  get variableRepeatIcon() {
    return this.page.locator(
      "//button[@data-cy='prescription-item-variable-repeats']//*[name()='svg']",
    );
  }
  async getLastNumericFromGrid(finalMedName: string) {
    const elements = await this.page.locator(
      `//tbody//td[2]//span[contains(@aria-label, "${finalMedName.toLocaleLowerCase()}")]`,
    );
    const count = await elements.count();
    for (let i = count - 1; i >= 0; i--) {
      const text = await elements.nth(i).textContent();
      if (text && /^\d+$/.test(text.trim())) {
        return elements.nth(i);
      }
    }
    return null;
  }
  async getLastNumericFromGridTemporary(finalMedName: string) {
    const elements = await this.page.locator(
      `//tbody//td[2]//span[contains(@aria-label, "${finalMedName}")]`,
    );
    const count = await elements.count();
    for (let i = count - 1; i >= 0; i--) {
      const text = await elements.nth(i).textContent();
      if (text && /^\d+$/.test(text.trim())) {
        return elements.nth(i);
      }
    }
    return null;
  }
  get editButton() {
    return this.page.locator("//span[normalize-space()='Edit']");
  }

  get openInFullViewButton() {
    return this.page.locator("//button[.//div[text()='Open in full view']]");
  }

  get expectedPatientName() {
    return this.page
      .locator(
        "//div[contains(@class,'mantine-ScrollArea-viewport')]//div[@aria-label='patientName']",
      )
  }
  private getShortPrescriberName(fullName: string): string {
    const trimmed = fullName.replace(/\s+/g, ' ').trim().split(' ');
    return trimmed.map((word, i) => (i === 0 ? word[0] : word)).join(' ');
  }
  async totalRepeatsFromSummary() {
    const text = await this.page.locator("//div[contains(text(),'repeats available before')]").textContent();
    const trimmedText = text?.trim() || '';
    const match = trimmedText.match(/\d+/);
    return match ? match[0] : null;
  }
  get rxInputField() {
    return this.page.locator("(//label[normalize-space()='Default Rx Code']/following-sibling::div//input)[2]")
  }

  get unrepeatButton(){
    return this.page.locator("//button[.//div[text()='Unrepeat']]");
  }
  get unrepeatedDispenseToaster() {
    return this.page.locator("//*[contains(text(), 'Initial dispense can’t be unrepeated')]");
  }
  get deleteSuccessfulToaster(){
    return this.page.locator("//*[contains(text(), 'Delete successful')]")
  }
  get unrepeatSuccessfulToaster(){
    return this.page.locator("//*[contains(text(), 'Unrepeat successful')]")
  }
  get prescriptionSuccessfulToaster(){
    return this.page.locator("//*[contains(text(), 'Prescription updated succesfully')]")
  }
  
  get continueButton(){
    return this.page.locator("//span[normalize-space()='Continue']");
  }
  get deleteButton(){
    return this.page.locator("//button[.//div[text()='Delete']]")
  }
  getSecondLastMedicineFromGrid(finalMedName: string) {
    return this.page.locator(
      `(//tbody//td[2]//span[contains(@aria-label, "${finalMedName}")])[last()-1]`,
    );
  }
  getPatientNHIFromSummaryOwingDynamic(index: number) {
    return this.page.locator(`(//main//div[@aria-label='PatientNhi'])[${index}]`);
  }
  
  getFundingInfoDynamic(index: number) {
    return this.page.locator(`(//input[@data-cy='prescription-item-funding-info'])[${index}]`);
  }
  
  fundingInfoSummaryOwingDynamic(index: number) {
    return this.page.locator(`(//div[@aria-label='category'])[${index}]`);
  }
  
  getPrescriptionRxNumberDynamic(index: number) {
    return this.page.locator(`(//div[contains(text(),'Rx No.:')])[${index}]`);
  }
  
  prescriptionRxNumberSummaryHoldDynamic(index: number) {
    return this.page.locator(`(//main//div[@aria-label='RxNO'])[${index}]`);
  }
  
  totalRepeatsLabelDynamic(index: number) {
    return this.page.locator(`(//div[contains(text(),'Total Repeats')])[${index}]`);
  }
  
  instructionFieldDynamic(index: number) {
    return this.page.locator(`(//textarea[@placeholder='Instructions'])[${index}]`);
  }
  
  patientNameFromSummaryDynamic(index: number) {
    return this.page.locator(`(//div[@aria-label='patientName'])[${index}]`);
  }
  
  prescriberNameDynamic(index: number) {
    return this.page.locator(`(//div[@aria-label='PrescriberName'])[${index}]`);
  }
  
  instructionPredefinedOptionDynamic(calNumber: number, index: number) {
    return this.page.locator(`(//button[@title='Cal${calNumber}'])[${index}]`);
  }
  

  async createManualDispense(prescriberName: string, medicineName: string) {
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.waitFor({ state: 'visible' });
    await this.searchedPrescriberDropdown.click();
    await this.searchMedicineField.fill(medicineName);
    await this.searchedMedicineDropdown.waitFor({ state: 'visible' });
    await this.searchedMedicineDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.rxQuantityField.fill('2');
    await this.instructionField.fill('this is test');
    await this.instructionPredefinedOption.click();
    await this.totalRepeatField.fill('1');
    await this.page.waitForTimeout(1000);
    await this.patientNameLabel.click();
    await this.endDispenseButton.waitFor({ state: 'visible' });
    await this.endDispenseButton.click();

  }

  async addMedicines(
    prescriberName: string,
    medicines: { name: string; repeats: string; dispQty: string }[],
  ) {
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.click();

    for (let i = 0; i < medicines.length; i++) {
      const index = i + 1;
      await this.getMedicineSearchField(index).click();
      await this.getMedicineSearchField(index).fill(medicines[i].name);
      await this.searchedPrescriberDropdown.click();
      await this.page.waitForTimeout(2000);
      await this.getDispQtyField(index).fill(medicines[i].dispQty);
      await this.getTotalRepeatsField(index).fill(medicines[i].repeats);
      if (i < medicines.length - 1) {
        await this.addItemButton.click();
        await this.page.waitForTimeout(2000);
      }
    }
    await this.endDispenseButton.click();
    await this.page.waitForTimeout(3000);
    await this.loadMoreButton.waitFor({state:'visible'});

    const getFirstWord = (text: string) => text.split(' ')[0].toLowerCase();
    const jsonFirstWords = dispenseData.medicines.map((med) =>
      getFirstWord(med.name),
    );
    const uiMedicineNames = await this.getDispensedMedicineNames();
    const uiFirstWords = uiMedicineNames.map((name) => getFirstWord(name));
    expect(jsonFirstWords).toEqual(uiFirstWords);

    const jsonMedicineCount = dispenseData.medicines.length;

    const uiMedicineCount = await this.getTotalDispensedMedicineCount();
    expect(uiMedicineCount).toBe(jsonMedicineCount);
    const expectedNhiId = dispenseData.patient.NHI_id; //
    const actualNhiId = await this.summaryNHIID.textContent();
    expect(actualNhiId?.trim()).toBe(expectedNhiId);
  }

  async processDispense(finalMedName: string) {
    const medicineCountLocator = this.getMedicineFromGrid(finalMedName);
    await medicineCountLocator.waitFor({ state: 'visible' });
    await medicineCountLocator.click();
    await this.page.waitForTimeout(2000);
    await this.processButton.click();
    await this.page.waitForTimeout(5000);
    await this.processDispenseButton.click();
    await this.page.waitForTimeout(5000);
  }

  async certifiedRepeatCopyDataValidation() {
    const prescriberNameDetail = await this.getShortPrescriberName(dispenseData.prescriber.name);
    const prescriberNameSummary =
      await this.prescriberNameFromSummary.textContent();

    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromSummary;

    const expectedMedicineNames = (await this.getDispensedMedicineNames()).map(
      (name) => name.trim(),
    );
    const actualMedicineName =
      (await this.medicineNameFromSummary)?.trim() || '';

    const expectedCurrentDate = await this.currentDate;
    const actualCurrentDate = await this.getPrintDate();

    const expectedSCID = await this.getSCIDFromTop();
    const actualSCID = await this.getSCIDFromSummary();

    const expectedFundingCode = await this.getFundingInfo();
    const actualFundingCode = await this.fundingInfoSummary();

    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.prescriptionRxNumberFromSummary();

    const expectedRepeatDispenseDate = await this.getRepeatDispenseDate();
    const actualRepeatDispenseDate = await this.repeatDispenseDateSummary();

    const expectedClinicName = await this.getClinicName();
    const actualClinicName = await this.clinicNameSummary();
    expect(expectedClinicName).toBe(actualClinicName);
    expect(expectedCurrentDate).toBe(actualCurrentDate);
    expect(expectedRepeatDispenseDate).toBe(actualRepeatDispenseDate);

    expect(prescriberNameSummary?.toLocaleLowerCase()).toBe(
      prescriberNameDetail.toLocaleLowerCase(),
    );
    expect(expectedNhiID).toBe(actualNhiID);
    expect(expectedMedicineNames).toContain(actualMedicineName);
    expect(expectedSCID).toBe(actualSCID);
    expect(expectedFundingCode).toBe(actualFundingCode);
    expect(expectedRxNumber).toBe(actualRxNumber);
  }

  async heldDispense(
    prescriberName: string,
    med: string,
    dispQty: string,
    medicineName: string,
  ) {
    await this.getManualTab.click();
    await this.manualDispenseButton.click();
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.waitFor({ state: 'visible' });
    await this.searchedPrescriberDropdown.click();
    await this.searchMedicineField.fill(med);
    await this.searchedPrescriberDropdown.click();
    await this.getOptionMedicine(med).click();
    await this.dispQtyInput.fill(dispQty);
    await this.holdButton.click();
    await this.endDispenseButton.click();
    await this.page.waitForTimeout(3000);
    await this.loadMoreButton.waitFor({ state: 'visible' });
    const medicineLocator = this.getMedicineFromGrid(medicineName);
    await medicineLocator.waitFor({ state: 'visible' });
    const text = await medicineLocator.textContent();
    const trimmedText = text?.trim();

    expect(trimmedText).toBe('H');
    await medicineLocator.click();
    await this.processButton.click();
    await this.processDispenseButton.waitFor({ state: 'visible' });
    await this.processDispenseButton.click();
    await this.expectedPatientName.waitFor({ state: 'visible' });
    const expectedPatientName = await this.expectedPatientName.textContent();
    const actualFullName = await this.patientName();
    expect(expectedPatientName).toBe(actualFullName);

    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromSummaryHold;
    expect(expectedNhiID).toBe(actualNhiID);

    const expectedDOB = dispenseData.patient.DOB;
    const actualDOB = await this.getDOBFromSummary();

    expect(expectedDOB).toBe(actualDOB);

    const printMed = await this.page.locator(
      "//label[text()='Print Name']//parent::div//input[@type='hidden']",
    );
    const expectedMedValue = await printMed.getAttribute('value');
    const actualMedicineName = await this.medicineNameFromSummaryHold;
    expect(expectedMedValue?.trim()).toBe(actualMedicineName?.trim());

    const expectedFundingCode = await this.getFundingInfo();
    const actualFundingCode = await this.fundingInfoSummaryHold();
    expect(expectedFundingCode).toBe(actualFundingCode); 

    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.prescriptionRxNumberSummaryHold();
    expect(expectedRxNumber).toBe(actualRxNumber); 

    const expectedMedicinePrice = await this.getMedicinePrice();
    const actualMedicinePrice = await this.getMedicinePriceFromSummary();
    // expect(actualMedicinePrice).toBe(expectedMedicinePrice); // TODO : Will Run correct when ticket no NH-4145 will resolve
  }

  async owingDispense(
    prescriberName: string,
    medicineName: string,
    dispQty: string,
    finalMedName: string,
    givenQty: string,
    repeat: string,
  ) {
    await this.getManualTab.click();
    await this.manualDispenseButton.click();
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.waitFor({ state: 'visible' });
    await this.searchedPrescriberDropdown.click();
    await this.searchMedicineField.fill(medicineName);
    await this.searchedPrescriberDropdown.click();
    await this.page.waitForTimeout(1000);
    await this.dispQtyInput.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.dispQtyInput.fill(dispQty);
    await this.page.waitForTimeout(500);
    await this.givenQtyInput.fill(givenQty);
    await this.totalRepeatField.fill(repeat);
    const expectedFundingCode = await this.getFundingInfo();
    await this.endDispenseButton.click();
    const actualOwingQuantity = await this.page
      .locator("//main//div[@aria-label='owingQuantity']")
      .textContent();
    const extractedOwing = actualOwingQuantity?.replace(/\D/g, '');
    expect(Number(extractedOwing)).toBe(parseInt(dispQty) - parseInt(givenQty));

    const expectedPatientName1 = await this.page
      .locator(
        "//div[contains(@class,'mantine-ScrollArea-viewport')]//div[@aria-label='patientName']",
      )
      .textContent();
    const actualFullName1 = await this.patientName();
    expect(expectedPatientName1).toBe(actualFullName1);

    const expectedNhiID1 = dispenseData.patient.NHI_id;
    const actualNhiID1 = await this.patientNHIFromOwingSummary;
    expect(expectedNhiID1).toBe(actualNhiID1);
    const expectedDOB1 = dispenseData.patient.DOB;
    const actualDOB1 = await this.getDOBFromOwingSummary();
    expect(expectedDOB1).toBe(actualDOB1); 

    const expectedItemCount = await this.page
      .locator(
        "//label[text()='Print Name']//parent::div//input[@type='hidden']",
      )
      .count();
    const actualItemCount = await this.getItemCount();
    expect(actualItemCount).toBe(expectedItemCount);

    const printMed = await this.page.locator(
      "//label[text()='Print Name']//parent::div//input[@type='hidden']",
    );
    const expectedMedValue = await printMed.getAttribute('value');
    const actualMedicineName = await this.medicineNameFromSummaryHold;
    expect(expectedMedValue?.trim()).toBe(actualMedicineName?.trim());

    const actualFundingCode = await this.fundingInfoSummaryOwing();
    expect(expectedFundingCode).toBe(actualFundingCode);

    const medicineLocator = this.getMedicineFromGrid(finalMedName);
    await medicineLocator.waitFor({ state: 'visible' });
    await medicineLocator.click();

    const expectedMedicinePrice = await this.getMedicinePrice();
    const actualMedicinePrice = await this.getMedicinePriceFromSummary();
    // expect(actualMedicinePrice).toBe(expectedMedicinePrice); // TODO:  Need to check its breaking intermittently

    await this.page.waitForTimeout(3000);
    await this.supplyOwingButton.click();
    await this.page.waitForTimeout(3000);
    await this.giveOwingButton.click();
    await this.page.waitForTimeout(5000);

    const expectedPatientName = await this.page
      .locator(
        "//div[contains(@class,'mantine-ScrollArea-viewport')]//div[@aria-label='patientName']",
      )
      .textContent();
    const actualFullName = await this.patientName();
    expect(expectedPatientName).toBe(actualFullName);

    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromOwingSummary;
    expect(expectedNhiID).toBe(actualNhiID);

    const expectedDOB = dispenseData.patient.DOB;
    const actualDOB = await this.getDOBFromOwingSummary();
    expect(expectedDOB).toBe(actualDOB);

    expect(expectedFundingCode).toBe(actualFundingCode);
    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.prescriptionRxNumberSummaryHold();
    expect(expectedRxNumber).toBe(actualRxNumber);

    const actualSuppliedValue = await this.getSuppliedValue();
    expect(Number(actualSuppliedValue)).toBe(
      parseInt(dispQty) - parseInt(givenQty),
    );

    const expectedInstruction = await this.instructionFromInstructionBox();
    const actualInstruction = await this.instructionFromSummary();
    expect(actualInstruction).toBe(expectedInstruction);
  }

  async repeatDispense(
    prescriberName: string,
    medicineName: string,
    dispQty: string,
    finalMedName: string,
    repeat: string,
  ) {

    await this.getManualTab.click();
    await this.manualDispenseButton.click();
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.waitFor({ state: 'visible' });
    await this.searchedPrescriberDropdown.click();
    await this.searchMedicineField.fill(medicineName);
    await this.getOptionMedicine(medicineName).waitFor({
      state: 'visible',
    });
    await this.getOptionMedicine(medicineName).click();
    await this.page.waitForTimeout(2000);
    await this.dispQtyInput.fill('');
    await this.dispQtyInput.fill(dispQty);
    await this.totalRepeatField.fill(repeat);
    await this.variableRepeatIcon.click();
    await this.enterTheRepeatValues();
    await this.enterInstructionValues();
    await this.variableRepeatIcon.click();
    await this.endDispenseButton.click();
    await this.page.waitForTimeout(5000);
    await this.loadMoreButton.waitFor({ state: 'visible' });
    const lastNumberElement = await this.getLastNumericFromGrid(finalMedName);
    if (lastNumberElement) {
      await lastNumberElement.waitFor({ state: 'visible' });
      await lastNumberElement.click();
    }
    await this.page.waitForTimeout(2000);
    await this.processButton.click();
    await this.processDispenseButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(5000);
    const actualDispenseQuantity = await this.dispQtyInput.inputValue();
    const expectedDispenseQuantity =
      dispenseData.RepeatDispenseData.medicines[0].inputValues[0].toString();
    expect(actualDispenseQuantity).toBe(expectedDispenseQuantity);

    const actualInstructionFromBox = await this.instructionFromInstructionBox();
    const expectedInstructions = dispenseData.RepeatDispenseData.medicines[0].instructions[0];
    expect(actualInstructionFromBox).toContain(expectedInstructions);

    await this.processDispenseButton.click();
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.prescriberNameFromSummary.waitFor({ state: 'visible' })
    //Verify Prescriber Name
    const expectedPrescriberName = this.getShortPrescriberName(prescriberName);
    const actualPrescriberName = await this.prescriberNameFromSummary.textContent();
    expect(actualPrescriberName?.trim()).toBe(expectedPrescriberName)

    const expectedCurrentDate = await this.currentDate;
    const actualCurrentDate = await this.getPrintDate();
    expect(expectedCurrentDate).toBe(actualCurrentDate);

    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromSummary;
    expect(expectedNhiID).toBe(actualNhiID);

    const printMed = await this.page.locator(
      "//label[text()='Print Name']//parent::div//input[@type='hidden']",
    );
    const expectedMedValue = await printMed.getAttribute('value');
    const actualMedicineName = await this.medicineNameFromSummaryHold;
    expect(expectedMedValue?.trim()).toBe(actualMedicineName?.trim());

    const expectedSCID = await this.getSCIDFromTop();
    const actualSCID = await this.getSCIDFromSummary();
    expect(expectedSCID).toBe(actualSCID);

    const expectedRepeatDispenseDate = await this.getRepeatDispenseDate();
    const actualRepeatDispenseDate = await this.repeatDispenseDateSummary();
    expect(expectedRepeatDispenseDate).toBe(actualRepeatDispenseDate);

    const expectedFundingCode = await this.getFundingInfo();
    const actualFundingCode = await this.fundingInfoSummary();
    expect(expectedFundingCode).toBe(actualFundingCode);

    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.prescriptionRxNumberSummaryHold();
    expect(expectedRxNumber).toBe(actualRxNumber);
    const expectedClinicName = await this.getClinicName();
    const actualClinicName = await this.clinicNameSummary();
    expect(expectedClinicName).toBe(actualClinicName);
    const expectedInstruction = await this.instructionFromInstructionBox();
    const actualInstruction = await this.instructionFromSummary();
    expect(actualInstruction).toBe(expectedInstruction);
  }

  async editDispenseOwing(finalMedName: string) {

    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.getManualTab.click();   // This button is for doing manual dispense once again
    await this.manualDispenseButton.waitFor({ state: 'visible' });
    await this.manualDispenseButton.click();
    const lastNumberElement = await this.getLastNumericFromGrid(finalMedName);
    if (lastNumberElement) {
      await lastNumberElement.waitFor({ state: "visible" });
      await lastNumberElement.click();
    }
    await this.editButton.click();
    await this.openInFullViewButton.click();
    await this.page.waitForTimeout(5000);

    const dispQtyStr = await this.getDispQtyField(1).inputValue();
    const dispQty = Number(dispQtyStr.trim());
    const halfQty = Math.floor(dispQty / 2);
    await this.givenQtyInput.fill(halfQty.toString());


    const detailFromEditDispenseOwing = editDispenseData.editDispenseOwing.medicine[0];
    await this.instructionField.fill(detailFromEditDispenseOwing.instruction);
    await this.updateDispenseButton.click();

    const expectedInstruction = editDispenseData.editDispenseOwing.medicine[0].instruction
    const actualInstruction = await this.instructionFromInstructionBox();
    expect(actualInstruction).toBe(expectedInstruction);

    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromOwingSummary;
    expect(actualNhiID).toBe(expectedNhiID);

    const expectedFundingCode = await this.getFundingInfo();
    const actualFundingCode = await this.fundingInfoSummaryOwing();
    expect(expectedFundingCode).toBe(actualFundingCode);

    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.editPrescriptionRxNumberFromSummary()
    expect(actualRxNumber).toBe(expectedRxNumber);

    const expectedPatientName = await this.patientNameLabel.textContent();
    const actualPatientName = await this.patientName();
    expect(expectedPatientName).toBe(actualPatientName)

    const expectedMedicinePrice= await this.getMedicinePrice();
    const actualMedicinePrice= await this.getMedicinePriceFromSummary();
    expect(actualMedicinePrice).toBe(expectedMedicinePrice) 
    //TODO:  Need to check assertion for price is breaking intermittently

    const expectedPrescriberName = this.getShortPrescriberName(editDispenseData.editDispense.medicine[0].prescriber);
    const actualPrescriberName = await this.prescriberNameFromSummary.textContent();
    expect(actualPrescriberName?.trim()).toBe(expectedPrescriberName)

    const expectedRepeats = editDispenseData.editDispense.medicine[0].repeat
    const actualRepeats = await this.totalRepeatsFromSummary();
    expect(Number(actualRepeats)).toBe(Number(expectedRepeats));

    const actualOwingQuantity = await this.page
      .locator("//main//div[@aria-label='owingQuantity']")
      .textContent();
    const extractedOwing = actualOwingQuantity?.replace(/\D/g, '');
    expect(Number(extractedOwing)).toBe(dispQty - halfQty);
  }
  async editDispensedMedicine(finalMedName: string) {
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.getManualTab.click();
    await this.manualDispenseButton.waitFor({ state: 'visible' });
    await this.manualDispenseButton.click();
    const lastNumberElement = await this.getLastNumericFromGrid(finalMedName);
    if (lastNumberElement) {
      await lastNumberElement.waitFor({ state: "visible" });
      await lastNumberElement.click();
    }
    await this.editButton.click();
    await this.openInFullViewButton.click();
    await this.page.waitForTimeout(5000);
    const detail = editDispenseData.editDispense.medicine[0];
    await this.getDispQtyField(1).fill(detail.dispQty);
    await this.totalRepeatsLabel.dblclick()
    await this.page.waitForTimeout(500);
    await this.totaltRepeatsInput.fill(detail.repeat)

    const dispenseInputValue = (await this.getDispQtyField(1).inputValue()).trim();
    const packetPerPriceValue = await this.pricePerPacket();

    expect(Number(dispenseInputValue)).toBe(Number(packetPerPriceValue));

    await this.instructionField.fill(detail.instruction);
    await this.removePrescriberIcon.click();
    await this.searchPrescriberField.fill(detail.prescriber); // Enter the prescriber's name
    await this.searchedPrescriberDropdown.waitFor({ state: 'visible' });
    await this.searchedPrescriberDropdown.click(); // Select the prescriber from the list
    await this.updateDispenseButton.click();
    await this.page.locator("//span[normalize-space()='Return To Inbox']").waitFor({ state: 'visible' });


    //Verify medicine name
    const actualMedicineName = (await this.medicineNameFromSummaryHold)?.trim() || "";
    const expectedMedicineName = await dispenseData.medicines[0].name;
    const expectedFirstWord = expectedMedicineName.split(" ")[0].toLowerCase();
    const actualFirstWord = actualMedicineName.split(" ")[0].toLowerCase();
    expect(actualFirstWord).toBe(expectedFirstWord);

    //verify instruction
    const expectedInstruction = editDispenseData.editDispense.medicine[0].instruction
    const actualInstruction = await this.instructionFromInstructionBox();
    expect(actualInstruction).toBe(expectedInstruction);


    //verify NhiID
    const expectedNhiID = dispenseData.patient.NHI_id;
    const actualNhiID = await this.patientNHIFromOwingSummary;
    expect(actualNhiID).toBe(expectedNhiID);

    //Verify Funding Code
    const expectedFundingCode = await this.getFundingInfo();
    const actualFundingCode = await this.fundingInfoSummaryOwing();
    expect(expectedFundingCode).toBe(actualFundingCode);

    //Verify Rx Number
    const expectedRxNumber = await this.getPrescriptionRxNumber();
    const actualRxNumber = await this.prescriptionRxNumberSummaryHold()
    expect(actualRxNumber).toBe(expectedRxNumber);


    //Verify Patient Name
    const expectedPatientName = await this.patientNameLabel.textContent();
    const actualPatientName = await this.patientName();
    expect(expectedPatientName?.trim()).toBe(actualPatientName)

    //Verify Medicine Price
    const expectedMedicinePrice= await this.getMedicinePrice();
    const actualMedicinePrice= await this.getMedicinePriceFromSummary();
    expect(actualMedicinePrice).toBe(expectedMedicinePrice)

    //Verify Prescriber Name
    const expectedPrescriberName = this.getShortPrescriberName(editDispenseData.editDispense.medicine[0].prescriber);
    const actualPrescriberName = await this.prescriberNameFromSummary.textContent();
    expect(actualPrescriberName?.trim()).toBe(expectedPrescriberName)

    // Verify total repeats
    const expectedRepeats = detail.repeat;
    const actualRepeats = await this.totalRepeatsFromSummary();
    expect(Number(actualRepeats)).toBe(Number(expectedRepeats));
  }

  async deleteRecordFromGrid(dispenseData :{medicine:string, dispQty:string, finalMedName:string, prescriber:string, repeat:string} , scenerio:string){
    const { medicine, dispQty, finalMedName, prescriber, repeat } = dispenseData;
    await this.getManualTab.click();
    await this.manualDispenseButton.waitFor({ state: 'visible' });
    await this.manualDispenseButton.click();
    await this.searchPrescriberField.fill(prescriber);
    const searchedPrescriberDropdown = await this.searchedPrescriberDropdown; 
    await searchedPrescriberDropdown.waitFor({state : 'visible'})
    await searchedPrescriberDropdown.click();
    await this.searchMedicineField.fill(medicine); 
    await this.getOptionMedicine(medicine).waitFor({ state: "visible" });
    await this.getOptionMedicine(medicine).click();
    await this.page.waitForTimeout(3000);
    await this.dispQtyInput.fill(dispQty);
    await this.totalRepeatField.fill(repeat);
    await this.endDispenseButton.click();
    await this.page.waitForTimeout(3000);
    await this.loadMoreButton.waitFor({ state: 'visible' });
    const lastMedicineLocator = this.getMedicineFromGrid(finalMedName);
    await lastMedicineLocator.waitFor({ state: "visible" }); 
    await lastMedicineLocator.click(); 
    
    
    if(scenerio=="unrepeat"){
    await this.processButton.click();
    await this.processDispenseButton.click();
    await this.page.waitForTimeout(3000);
    await this.loadMoreButton.waitFor({ state: 'visible' });
    const actualRxNumberTextInitial = await this.getPrescriptionRxNumber();
    const actualRxNumberInitial = actualRxNumberTextInitial!.split('/')[1]; 
    expect(Number(actualRxNumberInitial)).toBe(2);
    await this.getSecondLastMedicineFromGrid(finalMedName).click();
    await this.editButton.click();
    await this.openInFullViewButton.click();
    const actualRxNumberTextFinal = await this.getPrescriptionRxNumber();
    const actualRxNumberFinal = actualRxNumberTextFinal!.split('/')[1]; 
    expect(Number(actualRxNumberFinal)).toBe(1);
    const initialRxValueBeforeSlash= actualRxNumberInitial.split('/')[0];
    const medicineLocatorSecondLast = this.getSecondLastMedicineFromGrid(finalMedName);
    await this.getSecondLastMedicineFromGrid(finalMedName).click();
    await this.editButton.click();
    await this.unrepeatButton.click();
    await this.unrepeatedDispenseToaster.waitFor({state:'visible'});
    await expect(this.unrepeatedDispenseToaster).toContainText("Initial dispense can’t be unrepeated");
    await this.editButton.waitFor({state:'visible'})
    await this.editButton.click();
    await medicineLocatorSecondLast.waitFor({ state: "visible" }); 
    await medicineLocatorSecondLast.click();
    await lastMedicineLocator.click();
    await this.editButton.click();   
    await this.unrepeatButton.click();
    await this.unrepeatSuccessfulToaster.waitFor({state:'visible'});
    await expect(this.unrepeatSuccessfulToaster).toContainText("Unrepeat successful");
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await lastMedicineLocator.click();
    await this.editButton.click();
    await this.unrepeatButton.click()
    await this.unrepeatedDispenseToaster.waitFor({state:'visible'});
    await expect(this.unrepeatedDispenseToaster).toContainText("Initial dispense can’t be unrepeated");
    await this.deleteButton.waitFor({state:'visible'})
    await this.deleteButton.click();
    await this.page.waitForTimeout(500);
    await this.continueButton.click();
    await this.page.waitForTimeout(500);
    await this.deleteSuccessfulToaster.waitFor({state:'visible'});
    await expect(this.deleteSuccessfulToaster).toContainText("Delete successful");
    await this.loadMoreButton.waitFor({ state: 'visible' });
    if(await lastMedicineLocator.isVisible()){
    await lastMedicineLocator.click();
    await this.editButton.click();
    await this.openInFullViewButton.click();
    await this.page.reload();
    await this.page.waitForLoadState();
    const finalRxValueBeforeSlashText = await this.getPrescriptionRxNumber();
    const finalRxValueBeforeSlash= finalRxValueBeforeSlashText!.split('/')[0];
    expect(finalRxValueBeforeSlash).not.toBe(initialRxValueBeforeSlash); 
    }
      
    }
    else if(scenerio=="delete"){
    await this.editButton.click();;
    await this.unrepeatButton.click()
    await this.unrepeatedDispenseToaster.waitFor({state:'visible'});
    await expect(this.unrepeatedDispenseToaster).toContainText("Initial dispense can’t be unrepeated");
    await this.deleteButton.waitFor({state:'visible'})
    await this.deleteButton.click();
    await this.continueButton.click();
    await this.deleteSuccessfulToaster.waitFor({state:'visible'});
    await expect(this.deleteSuccessfulToaster).toContainText("Delete successful");
    await this.loadMoreButton.waitFor({ state: 'visible' });
    
  }    
  }

  async editMultipleMedicines() {
    await this.loadMoreButton.waitFor({ state: 'visible' });
  
    for (let i = 0; i < editDispenseData.editMultipleMedicine.length; i++) {
      const finalMedName = editDispenseData.editMultipleMedicine[i].finalMedName;
      const lastNumberElement = await this.getLastNumericFromGrid(finalMedName ?? '');
      if (lastNumberElement) {
        await lastNumberElement.waitFor({ state: 'visible' });
        await lastNumberElement.click();
      }
    }
  
    await this.editButton.click();
    await this.openInFullViewButton.click();
    await this.page.reload();
    await this.page.waitForLoadState();    
  
    for (let i = 0; i < editDispenseData.editMultipleMedicine.length; i++) {
      const detail = editDispenseData.editMultipleMedicine[i];
  
      await this.getDispQtyField(i + 1).fill(detail.dispQty);
      await this.totalRepeatsLabelDynamic(i + 1).dblclick();
      await this.page.waitForTimeout(500);
      await this.totaltRepeatsInput.fill(detail.repeats);
      await this.instructionFieldDynamic(i + 1).fill(' ');
      await this.instructionPredefinedOptionDynamic(Number(detail.selectInstruction), i + 1).click();
    }
  
    await this.updateDispenseButton.click();
    await this.page.locator("//span[normalize-space()='Return To Inbox']").waitFor({ state: 'visible' });
  
    for (let i = 0; i < editDispenseData.editMultipleMedicine.length; i++) {
  
      // //verify instruction
      // const expectedInstruction = await this.instructionFromInstructionBoxDynamic(i + 1);
      // const actualInstruction = await this.instructionFromSummaryDynamic(i + 1);
      // expect(actualInstruction).toBe(expectedInstruction);
  
      // Verify NHI ID
      const expectedNhiID = dispenseData.patient.NHI_id;
      const actualNhiID = (await this.getPatientNHIFromSummaryOwingDynamic(i + 1).textContent())?.trim();
      expect(actualNhiID).toBe(expectedNhiID);
  
      // Verify Funding Code
      const expectedFundingCode = (await this.getFundingInfoDynamic(i + 1).inputValue()).trim();
      const actualFundingCode = (await this.fundingInfoSummaryOwingDynamic(i + 1).textContent())?.trim().slice(0, 2) || "";
      expect(expectedFundingCode).toBe(actualFundingCode);
  
      // Verify Rx Number
      const expectedRxNumber = (await this.getPrescriptionRxNumberDynamic(i + 1).textContent())?.slice(8).trim();
      const actualRxNumber = (await this.prescriptionRxNumberSummaryHoldDynamic(i * 2 + 1).textContent())?.trim();
      expect(actualRxNumber).toBe(expectedRxNumber);
  
      // Verify Patient Name
      const expectedPatientName = await this.patientNameLabel.textContent();
      const actualPatientName = (await this.patientNameFromSummaryDynamic(i + 1).textContent())?.trim() || "";
      expect(expectedPatientName?.trim()).toBe(actualPatientName);
  
      // Verify Prescriber Name
      const expectedPrescriberName = this.getShortPrescriberName(dispenseData.prescriber.name);
      const actualPrescriberName = (await this.prescriberNameDynamic(i + 1).innerText()).trim();
      expect(actualPrescriberName).toBe(expectedPrescriberName);
    }
  }


  get autoDispenseButton(){
    return this.page.locator("//span[normalize-space()='Auto Dispense']")
  }
  async totalRepeatsFromSection(index:number){
    return this.page.locator(`(//section//div[contains(text(),'repeats available before')])[${index}]`)
  }
  async rxNumberFromSection(index:number){
    return this.page.locator(`(//section//div[@aria-label="RxNO"])[${index}]`)
  }
  get itemCountFromSection(){
    return this.page.locator("//section//div[@aria-label='itemCount']")
  }
  get finalPriceFromSection(){
    return this.page.locator("(//section//div[@aria-label='totalCost'])[last()]")
  }
  async priceOfEachMedicine(index:number){
    return this.page.locator(`(//section//div[@aria-label='totalCost'])[${index}]`)
  }
  async noFurtherRepeatsAvailable(index: number) {
    return this.page.locator(`(//div[text()='No Further Repeats Left'])[${index}]`);
  }
  get crossButtonFromSection(){
    return this.page.locator("(//section//button[@type='button'])[1]")
  }
  

  async autoDispense(prescriberName:string,medicines: any[]) {
    await this.loadMoreButton.waitFor({ state: 'visible' });
    await this.getManualTab.click();
    await this.manualDispenseButton.waitFor({ state: 'visible' });
    await this.manualDispenseButton.click();  
    await this.searchPrescriberField.fill(prescriberName);
    await this.searchedPrescriberDropdown.click();

    //Below loop is for doing dispense of medicines
    for (let i = 0; i < medicines.length; i++) {
      const index = i + 1;
      await this.getMedicineSearchField(index).click();
      await this.getMedicineSearchField(index).fill(medicines[i].name);
      await this.searchedPrescriberDropdown.click();
      await this.page.waitForTimeout(2000);  
      await this.getTotalRepeatsField(index).fill(medicines[i].repeats);
      if (i < medicines.length - 1) {
        await this.addItemButton.click();
        await this.page.waitForTimeout(2000);
      }
    }
    await this.endDispenseButton.click();
    await this.page.waitForTimeout(3000);
    await this.loadMoreButton.waitFor({ state: 'visible' });
    // await this.page.pause();

    //Below is the loop in which two loops are there first is to select medicines in grid table and second is for verifying the details.
    for(let i=0;i<medicines[0].repeats;i++){
      for (let i = 0; i < medicines[0].repeats; i++) {
        const finalMedName = medicines[i].finalMedName;
        const lastNumberElement = await this.getLastNumericFromGridTemporary(finalMedName ?? '');
        if (lastNumberElement) {
          await lastNumberElement.waitFor({ state: 'visible' });
          await lastNumberElement.click();
        }
      }
      await this.autoDispenseButton.click();
      await this.prescriptionSuccessfulToaster.waitFor({state:'visible'});
      await expect(this.prescriptionSuccessfulToaster).toContainText("Prescription updated succesfully");
      await this.prescriptionSuccessfulToaster.waitFor({state:'hidden'});
      const expectedRepeatsAvailable= Number(medicines[i].repeats) -(i+1)
      const expectedRxNUmber= Number(medicines[i].repeats) + i-1;
      const priceArray: number[] = [];
      if(expectedRepeatsAvailable>=1 && expectedRxNUmber<=medicines[0].repeats){
        for(let i=0;i<medicines[0].repeats;i++){
          const index=i+1
          //Verify Repeats
          const textForRepeats = await (await this.totalRepeatsFromSection(index)).textContent();
          const actutalRepeatsAvailable = textForRepeats?.match(/\d+/)?.[0] ? +textForRepeats.match(/\d+/)![0] : 0;  
          expect(actutalRepeatsAvailable).toBe(expectedRepeatsAvailable) 
          //Verify RxNumber
          const textForRx = await (await this.rxNumberFromSection(index)).textContent();
          const actutalRxNumber = textForRx?.match(/\/(\d+)$/)?.[1] ? +textForRx.match(/\/(\d+)$/)![1] : 0;
          expect(actutalRxNumber).toBe(expectedRxNUmber) 
          const textForInividualPrice = await (await this.priceOfEachMedicine(index)).textContent();
          const price = textForInividualPrice?.match(/\d+(\.\d+)?/)?.[0] ? +textForInividualPrice.match(/\d+(\.\d+)?/)![0] : 0;
          priceArray.push(price);
        }
        //Verify ItemCount
        const textForCount = await this.itemCountFromSection.textContent();
        const actualItemCount = textForCount?.match(/\d+/)?.[0] ? +textForCount.match(/\d+/)![0] : 0;
        const expectedItemCount= Number(medicines[0].repeats)
        expect(actualItemCount).toBe(expectedItemCount);
        //Verify Final Price
        const expectedFinallPrice = priceArray.reduce((sum, price) => sum + price, 0);
        const textForFinalPrice = await this.finalPriceFromSection.textContent();
        const actualFinalPrice = textForFinalPrice?.match(/\$(\d+(\.\d+)?)/)?.[1] ? +textForFinalPrice.match(/\$(\d+(\.\d+)?)/)![1] : 0;
        expect(actualFinalPrice).toBe(expectedFinallPrice)
        await this.crossButtonFromSection.click();
        await this.loadMoreButton.waitFor({state:"visible"});
      }
      else{
        for(let i=0;i<medicines[0].repeats;i++){
          const index=i+1
          const locator = await this.noFurtherRepeatsAvailable(index); 
          const text = await locator.textContent(); 
          expect(text?.trim()).toBe("No Further Repeats Left");   
          break;   
        }
      }
      
    }
  }
        
}





