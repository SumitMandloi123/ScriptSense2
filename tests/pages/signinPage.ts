import { Page } from "@playwright/test";
import BasePage from "./basePage";

export class SignInPage extends BasePage {
    readonly page: Page;

    // Defined locators as simple string properties
    private loginIcon = "//button[@class='mantine-UnstyledButton-root mantine-auidlw']//*[name()='svg']";
    private usernameInput = "//input[@id='signInName']";
    private passwordInput = "//input[@id='password']";
    private signinButton = "//button[@id='next']";
    private dispenseLink = "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]";


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Sign in to the Website

    async loginForm(email: string, password: string) {
        const page1Promise = this.page.waitForEvent('popup');
        await this.clickElement(this.page.locator(this.loginIcon)); // Using clickElement from BasePage to click login icon

        const page1 = await page1Promise;
        await this.setValueInTextField(page1.locator(this.usernameInput), email); // Using setValueInTextField from basePage method to fill username.
        await this.setValueInTextField(page1.locator(this.passwordInput), password);   // Using setValueInTextField method from basePage to fill password
        await this.clickElement(page1.locator(this.signinButton)); // Using clickElement from BasePage to click sign in button
        await this.page.waitForSelector(this.dispenseLink, { state: 'visible' }); // Wait for the "Dispense" link to be visible

    }
}
