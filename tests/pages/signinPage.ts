import { Page } from "@playwright/test";
import BasePage from "@pages/basePage";

export class SignInPage extends BasePage {
    
    // Define locators as class properties
    private loginIcon = "//button[@class='mantine-UnstyledButton-root mantine-auidlw']//*[name()='svg']";
    private usernameInput = "//input[@id='signInName']";
    private passwordInput = "//input[@id='password']";
    private signinButton = "//button[@id='next']";
    private dispenseLink = "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]//parent::div";

    constructor(page: Page) {
        super(page);
    }

    // Sign in to the website
    async loginForm(email: string, password: string) {
        const page1Promise = this.page.waitForEvent('popup');
        await this.clickElement(this.page.locator(this.loginIcon)); // Click login icon

        const page1 = await page1Promise;
        await this.setValueInTextField(page1.locator(this.usernameInput), email); // Fill username
        await this.setValueInTextField(page1.locator(this.passwordInput), password); // Fill password
        await this.clickElement(page1.locator(this.signinButton)); // Click sign-in button
        await this.page.waitForSelector(this.dispenseLink, { state: 'visible' }); // Wait for "Dispense" link
    }
}
