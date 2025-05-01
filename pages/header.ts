import { expect } from '@playwright/test';
import BasePage from '@pages/basePage';
import MSALPopup from './MSALPopup';

export default class Header extends BasePage {
   get dispenseButton() {
    return this.page.locator(
      "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]",
    );
  }

  private get loginButton() {
    // TODO: This xpath looks very flaky as it has random generated tag name
    return this.page.locator(
      "//button[@class='mantine-UnstyledButton-root mantine-auidlw']//*[name()='svg']",
    );
  }

  async login(email: string, password: string) {
    const popupPage = this.page.waitForEvent('popup');
    await this.loginButton.click();
    const popup = new MSALPopup(await popupPage);
    await popup.login(email, password);
    await this.dispenseButton.waitFor({ state: 'visible' });
    await expect(this.dispenseButton).toBeVisible();

  }
}