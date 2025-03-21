// import { Page } from "@playwright/test";
// import BasePage from "@pages/basePage";

// export class SignInPage extends BasePage {
//     private loginIcon = "//button[@class='mantine-UnstyledButton-root mantine-auidlw']//*[name()='svg']";
//     private usernameInput = "//input[@id='signInName']";
//     private passwordInput = "//input[@id='password']";
//     private signinButton = "//button[@id='next']";
//     private dispenseLink = "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]//parent::div";

//     constructor(page: Page) {
//         super(page);
//     }

//     async loginForm(email: string, password: string) {
//         const page1Promise = this.getPage().waitForEvent('popup'); // Wait for the popup to open
//         await this.clickElement(this.getPage().locator(this.loginIcon)); // Click login icon

//         const page1 = await page1Promise;
//         await this.setValueInTextField(page1.locator(this.usernameInput), email); // Fill in username
//         await this.setValueInTextField(page1.locator(this.passwordInput), password); // Fill in password
//         await this.clickElement(page1.locator(this.signinButton)); // Click sign-in button
//         await this.getPage().waitForSelector(this.dispenseLink, { state: 'visible' }); // Wait for the "Dispense" link
//         console.log("loggin successful");
//     }
// }




import BasePage from '@pages/basePage';

export default class MSALPopup extends BasePage {

  private get usernameInput() {  
    return this.page.locator("//input[@id='signInName']");  
  } // Locator for the username input field  

  private get passwordInput() {  
    return this.page.locator("//input[@id='password']");  
  } // Locator for the password input field  

  private get signInButton() {  
    return this.page.locator("//button[@id='next']");  
  } // Locator for the sign-in button  

  async login(username: string, password: string) {  
    await this.usernameInput.fill(username); // Fills in the username  
    await this.passwordInput.fill(password); // Fills in the password  
    await this.signInButton.click(); // Clicks the sign-in button to log in  
  }  
}
