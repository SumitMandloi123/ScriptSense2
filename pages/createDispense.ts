import BasePage from "@pages/basePage";

export default class CreateDispense extends BasePage {  
  private get manualDispenseButton() {  
    return this.page.locator("role=link[name='Manual Dispense']"); // Locator for the "Manual Dispense" button  
  }  

  private get prescriberSearchField() {  
    return this.page.locator("role=combobox[name='Search for prescriber']"); // Input field for searching prescribers  
  }  

  private get optionPrescriberName() {  
    return this.page.locator("//div[contains(text(),'Dummy Doctor')]"); // Selects a specific prescriber  
  }  

  private get medicineSearchField() {  
    return this.page.locator("//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input"); // Input field for medicine search  
  }  

  private get optionMedicineName() {  
    return this.page.locator("(//div[contains(text(),'Paracetamol + Codeine (Relieve) (Mylan)')])[1]"); // Selects a specific medicine from the list  
  }  

  private get rxQuantityField() {  
    return this.page.locator("(//div[contains(text(),'Total Rx Qty')]//following::input)[1]"); // Input field for prescription quantity  
  }  

  private get instructionField() {  
    return this.page.locator("role=textbox[name='Instructions']"); // Input field for adding instructions  
  }  

  private get button13() {  
    return this.page.locator("role=button[name='13']"); // Button labeled "13"
  }  

  private get totalRepeatCount() {  
    return this.page.locator("role=textbox[name='Total Repeats']"); // Input field for total repeat count  
  }  

  private get addItemButton(){
    return this.page.locator("//span[normalize-space()='Add Item']"); //Add item button
  }

  private get endDispenseButton() {  
    return this.page.locator("//span[normalize-space()='End Dispense']"); // Button to finalize and add the dispense item  
  }  

  private getMedicineSearchField(index: number) {
    return this.page.locator(`(//div[contains(@class,'mantine-Grid-col mantine-cpt84w')]//input)[${index}]`);
}

private getOptionMedicine(name: string) {
    return this.page.locator(`(//div[contains(text(),'${name}')])[1]`);
}

private getTotalRepeatsField(index: number) {
    return this.page.locator(`(//label[text()='Total Repeats']/following-sibling::div//input)[${index}]`);
}

private getTotalDaysField(index: number) {
    return this.page.locator(`(//label[text()='Days']/following-sibling::div//input)[${index}]`);
}

private getDispQtyField(index: number) {
  return this.page.locator(`(//label[.//div[text()='Disp Qty']]/following-sibling::div//input[@type='text'])[${index}]`);
}



  async createManualDispense(prescriberName: string, medicineName: string) {  
    await this.manualDispenseButton.click(); // Clicks on "Manual Dispense" button  
    await this.prescriberSearchField.fill(prescriberName); // Enters the prescriber's name  
    await this.optionPrescriberName.click(); // Selects the prescriber from suggestions  
    await this.page.waitForTimeout(5000);
    await this.medicineSearchField.click(); // Clicks the medicine search field  
    await this.medicineSearchField.fill(medicineName); // Enters the medicine name  
    await this.optionMedicineName.waitFor({ state: "visible"});
    await this.optionMedicineName.click(); // Selects the desired medicine  
    await this.page.waitForTimeout(5000); // Waits for UI to process selection  
    await this.rxQuantityField.fill("2"); // Fills in the Rx quantity  
    await this.instructionField.click(); // Clicks on the instruction field  
    await this.instructionField.fill("this is test"); // Adds instructions for the prescription  
    await this.button13.click(); // Clicks on button "13" (assumed selection step)  
    await this.totalRepeatCount.fill("1"); // Sets total repeat count to 1  
    await this.endDispenseButton.click(); // Clicks on "Add Item" to complete dispense  
    await this.page.waitForTimeout(5000); // Waits for the dispense process to complete  
    console.log("Dispense Successful"); // Logs success message  
  }  

  async selectMultipleMedicine(prescriberName: string, medicines: { name: string, repeats: string, dispQty: string, days:string }[]) {
    await this.manualDispenseButton.click(); // Clicks on "Manual Dispense" button  
    await this.prescriberSearchField.fill(prescriberName);
    await this.optionPrescriberName.click();
    await this.page.waitForTimeout(5000);

    for (let i = 0; i < medicines.length; i++) {
        const index = i + 1;

        
        await this.getMedicineSearchField(index).click();
        await this.getMedicineSearchField(index).fill(medicines[i].name);

        
        await this.getOptionMedicine(medicines[i].name).waitFor({ state: "visible" });
        await this.getOptionMedicine(medicines[i].name).click();
        await this.page.waitForTimeout(2000);

        
        await this.getDispQtyField(index).fill(medicines[i].dispQty)
        await this.getTotalRepeatsField(index).fill(medicines[i].repeats);
        await this.getTotalDaysField(index).fill(medicines[i].days);

        
        if (i < medicines.length - 1) {
            await this.addItemButton.click();
            await this.page.waitForTimeout(2000); // Ensure form reloads before the next iteration
        }
    }

    await this.endDispenseButton.click();
    await this.page.waitForTimeout(5000);
    console.log("Dispense Successful for multiple items");
}

}  
