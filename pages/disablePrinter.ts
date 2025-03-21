import BasePage from "@pages/basePage";

export default class DisablePrinter extends BasePage {  
  private get toggleButtonPrintDisable() {  
    return this.page.locator("//label[text()='Use Print Utility']"); // Locator for the toggle button to disable printing  
  }  

  async disablePrinter() {  
    await this.navigateTo("https://dev.scriptsense.co.nz/settings/printers"); // Navigates to the printer settings page  
    await this.toggleButtonPrintDisable.waitFor(); // Waits for the toggle button to be visible  
    await this.toggleButtonPrintDisable.click(); // Clicks the toggle button to disable printing  
    await this.page.waitForTimeout(3000); // Waits for the UI update after clicking  
    await this.navigateTo("https://dev.scriptsense.co.nz/"); // Navigates back to the home page  
  }  
}  
