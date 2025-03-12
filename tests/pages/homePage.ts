import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class HomePage extends BasePage {
    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;

    }

    async disablePrinter() {
        // await this.page.goto("https://dev.scriptsense.co.nz/settings/printers");
        await this.navigateTo("https://dev.scriptsense.co.nz/settings/printers")
        await this.page.waitForTimeout(2000); // waits for 2 seconds
        await this.page.locator("//label[text()='Use Print Utility']").click();
        await this.page.waitForTimeout(2000);
    }

    async searchPatientByNHI(patientName) {
        await this.navigateTo("https://dev.scriptsense.co.nz/'")
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('link', { name: 'Dispense' }).click();
        await this.page.getByRole('tab', { name: 'By NHI' }).click();
        await this.page.getByRole('combobox', { name: 'Search for patient' }).fill(patientName);
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.getByRole("option", { name: "(ZAU8023) John Lee 01/01/2001 (unknown)" }).click();
        await this.page.waitForTimeout(7000); // waits for 2 seconds
    }
    async createManualDispence(prescriberName,medicineName) {
        await this.page.getByRole('link', { name: 'Manual Dispense' }).click();
        await this.page.getByRole('combobox', { name: 'Search for prescriber' }).fill(prescriberName);
        await this.page.getByText('Dummy Doctor').click();
        await this.page.getByRole('combobox', { name: 'Search by Medicine Name/' }).fill(medicineName);
        await this.page.getByRole('option').getByText('Saradon').click();
        await this.page.getByRole('textbox', { name: 'Rx Qty OP' }).fill('2');
        await this.page.getByRole('textbox', { name: 'Instructions' }).click();
        await this.page.getByRole('textbox', { name: 'Instructions' }).fill('this is test');
        await this.page.getByRole('button', { name: '13' }).click();
        await this.page.getByRole('textbox', { name: 'Total Repeats' }).fill('1');
        await this.page.getByRole('button', { name: 'End Dispense' }).click();
        await this.page.pause()
    }
}