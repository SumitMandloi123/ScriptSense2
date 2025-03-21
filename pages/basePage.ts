import { Locator, Page } from '@playwright/test';

export default class BasePage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  // Getter method to access the page object in child classes
  protected get page(): Page {
    return this.#page;
  }
  // Common method to navigate to a URL
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  // Common method to click an element
  async clickElement(element: Locator) {
    await element.click();
  }

  // Common method to fill out a form field
  async setValueInTextField(element: Locator, value: string) {
    await element.fill(value);
  }

  // Common method to retrieve text from an element
  async getElementText(element: Locator): Promise<string> {
    return element.innerText();
  }

  async waitUntilVisible(element: Locator) {
    await element.waitFor({ state: 'visible' });
  }

  // Common method to wait for an element to be hidden
  async waitForElementHidden(element: Locator) {
    if (typeof element === 'string') {
      await this.page.waitForSelector(element, { state: 'hidden' });
    } else {
      await element.waitFor({ state: 'hidden' });
    }
  }

  // Common method to take a screenshot
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: fileName });
  }
}