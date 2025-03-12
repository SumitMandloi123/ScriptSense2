import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";
import loginPageSelector from "../../resources/selectors/loginPage.json";

export class SignInPage extends BasePage {
    readonly page: Page;
    private readonly emailIdTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async enterEmailId(emailId: string) {
        await this.setValueInTextField(this.emailIdTextBox, emailId);
    }

    async enterPassword(password: string) {
        await this.setValueInTextField(this.passwordTextBox, password);
    }

    async clickSignInButton() {
        await this.clickElement(this.signInButton);
    }

    async loginForm(email, password) {
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.locator(loginPageSelector.login.btn_signInPopUp.common).click();
        const page1 = await page1Promise;
        let emailLocator = page1.locator(loginPageSelector.login.tb_emailInput.common)
        let passLocator = page1.locator(loginPageSelector.login.tb_passInput.common)
        let submitButton = page1.locator(loginPageSelector.login.btn_signIn.common)
        await this.setValueInTextField(emailLocator, email)
        await this.setValueInTextField(passLocator, password)
        await this.clickElement(submitButton);
        await this.page.waitForTimeout(10000); // waits for 2 seconds

    }
    
}