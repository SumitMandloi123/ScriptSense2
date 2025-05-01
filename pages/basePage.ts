import { Page } from '@playwright/test';

export default class BasePage {
  readonly #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  // Getter method to access the page object in child classes
  protected get page(): Page {
    return this.#page;
  }
}