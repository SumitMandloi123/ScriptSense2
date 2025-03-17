import { Locator, Page } from "@playwright/test";

export default class BasePage {
    protected readonly page: Page; // Page object

    constructor(page: Page) {
        if (!page) {
            throw new Error("Page object is undefined!");
        }
        this.page = page;
    }

    // Getter method to access the page object in child classes
    protected getPage(): Page {
        return this.page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url); // Navigate to the given URL
        await this.page.waitForTimeout(3000); // Wait for page load
    }

    async clickElement(element: Locator) {
        await element.click(); // Click the specified element
    }

    async setValueInTextField(element: Locator, value: string) {
        await element.fill(value); // Fill the given value in the text field
    }

    async getElementText(element: Locator): Promise<string> {
        return element.innerText(); // Get and return the text content of the element
    }

    async waitForElementVisible(element: Locator | string) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'visible' }); // Wait until the selector is visible
        } else {
            await element.waitFor({ state: 'visible' }); // Wait until the element is visible
        }
    }

    async waitForElementHidden(element: Locator) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'hidden' }); // Wait until the selector is hidden
        } else {
            await element.waitFor({ state: 'hidden' }); // Wait until the element is hidden
        }
    }

    async takeScreenshot(fileName: string) {
        await this.page.screenshot({ path: fileName }); // Capture a screenshot and save it
    }
}
