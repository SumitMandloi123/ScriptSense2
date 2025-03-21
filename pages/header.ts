import BasePage from '@pages/basePage';
import MSALPopup from '@pages/MSALPopup';

export default class Header extends BasePage {
  
  get dispenseButton() {  
    return this.page.locator(  
      "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]",  
    ); // Locator for the "Dispense" button  
  }  

  get loginButton() {  
    return this.page.locator(  
      "//button[@class='mantine-UnstyledButton-root mantine-auidlw']//*[name()='svg']",  
    ); // Locator for the login button (Note: This XPath is fragile due to dynamically generated class names)  
  }  

  async login(email: string, password: string) {  
    const popupPage = this.page.waitForEvent('popup'); // Waits for a popup event after clicking the login button  
    await this.loginButton.click(); // Clicks the login button to open the authentication popup  
    const popup = new MSALPopup(await popupPage); // Creates an instance of MSALPopup with the new popup page  
    await popup.login(email, password); // Calls the login method on the popup to enter credentials  
    await this.waitUntilVisible(this.dispenseButton); // Waits until the "Dispense" button is visible, indicating a successful login  
  }  
}  
