import { Locator, Page } from "@playwright/test";

export default class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        if (!page) {
            throw new Error("Page object is undefined!");
        }
        this.page = page;    
    }

    // Getter for the page object, allowing controlled access in child classes
    protected get(): Page {
        return this.page;
    }

    // Common method to navigate to a URL
    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.page.waitForTimeout(3000);   
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

    // Common method to wait for an element to be visible
    async waitForElementVisible(element: Locator | string) {
        if (typeof element === 'string') {
            await this.page.waitForSelector(element, { state: 'visible' });
        } else {
            await element.waitFor({ state: 'visible' });
        }
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
