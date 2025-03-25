import BasePage from "@pages/basePage";

export default class AddPatient extends BasePage { 

    private get addPatientButton(){
        return this.page.locator("//span[contains(text(), 'Add Patient')]");
    }

    private get fieldNHI(){
        return this.page.locator("//input[@placeholder='NHI']");
    }

    private get fieldName(){
        return this.page.locator("//input[@placeholder='First Name']");
    }

    private get fieldLastName(){
        return this.page.locator("//input[@placeholder='Last Name']");
    }

    private get fieldGender(){
        return this.page.locator("//input[@placeholder='Gender']");
    }

    private get genderMaleOption(){
        return this.page.locator("//div[text()='Male']");
    }

    private get fieldDOB(){
        return this.page.locator("(//label[contains(text(),'Date of Birth')]/following-sibling::div//input)[2]");
    }

    private get createButton(){
        return this.page.locator("//button[.//span[text()='Create']]");
    }

    private get manualDispenseButton() {  
        return this.page.locator("role=link[name='Manual Dispense']"); // Locator for the "Manual Dispense" button  
      }  


    async addPatient(nhi: string, firstName: string, lastName: string, dob: string) {
        await this.addPatientButton.click();
        await this.fieldNHI.fill(nhi);
        await this.fieldName.fill(firstName);
        await this.fieldLastName.fill(lastName);
        await this.fieldGender.click();
        await this.genderMaleOption.click();
        await this.fieldDOB.fill(dob);
        await this.createButton.click();
        await this.manualDispenseButton.waitFor({ state: "visible", timeout : 0 }); // Ensures the 'Load More' button appears  

        
    }
}
