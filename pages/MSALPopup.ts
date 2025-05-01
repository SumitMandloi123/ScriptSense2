import BasePage from './basePage';

export default class MSALPopup extends BasePage {
  private get usernameInput() {
    return this.page.locator("//input[@id='signInName']");
  }

  private get passwordInput() {
    return this.page.locator("//input[@id='password']");
  }

  private get signInButton() {
    return this.page.locator("//button[@id='next']");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}