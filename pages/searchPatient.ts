import BasePage from "@pages/basePage";

export default class SearchPatient extends BasePage {
 
  private get tabNHI() {  
    return this.page.locator("role=tab[name='By NHI']");  
  } // Locator for the NHI search tab  

  private get searchPatient() {  
    return this.page.locator("role=combobox[name='Search for patient']");  
  } // Locator for the patient search input field  

  private get searchButton() {  
    return this.page.locator("role=button[name='Search']");  
  } // Locator for the search button  

  private get optionPatientName() {  
    return this.page.locator("//*[contains(text(), '(ZAU8023) John Lee')]");  
  } // Locator for selecting a patient from search results  

  private get loadMoreButton() {  
    return this.page.locator("//div[contains(@class, 'mantine-Button-inner')]//div[contains(text(), 'Load More')]");  
  } // Locator for the 'Load More' button  

  async searchPatientByNHI(patientNHIID: string) {  
    await this.tabNHI.click(); // Clicks on the NHI search tab  
    await this.searchPatient.fill(patientNHIID); // Fills in the NHI ID  
    await this.searchButton.click(); // Clicks the search button  
    await this.page.waitForTimeout(1000); // Waits briefly for the results to load  
    await this.optionPatientName.click(); // Selects the matching patient from the results  
    await this.loadMoreButton.waitFor({ state: "visible", timeout : 0 }); // Ensures the 'Load More' button appears  
  }  
}
