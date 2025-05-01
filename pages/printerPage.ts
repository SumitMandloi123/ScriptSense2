import { Page, expect } from '@playwright/test';
import BasePage from '@pages/basePage';

export class Printer extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  private get printButton() {
    return this.page.locator("//label[text()='Use Print Utility']");
  }

  private get dispenseHeaderLink() {
    return this.page.locator(
      "//a[contains(@class, 'mantine-Text-root') and contains(text(), 'Dispense')]",
    );
  }
  // Disables the printer by navigating to the settings page and clicking the toggle button.
  async disablePrinter() {
    await this.page.goto('/settings/printers'); // Navigate to the printer settings page
    await this.printButton.waitFor({ state: 'visible' }); // Wait until the toggle button is visible
    await this.printButton.click(); // Click the toggle button to disable the printer
    await this.dispenseHeaderLink.waitFor({ state: 'visible' }); // Wait until the dispenseHeaderLinkn is visibl
    await expect(this.dispenseHeaderLink).toBeVisible();
  }
}