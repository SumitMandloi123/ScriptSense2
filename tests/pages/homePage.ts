import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";
import homePageSelector from "../../resources/selectors/homePage.json";

export class HomePage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async disablePrinter() {
        await this.navigateTo("https://dev.scriptsense.co.nz/settings/printers");
        await this.page.waitForTimeout(2000);
        await this.page.locator(homePageSelector.homePage.chk_usePrintUtility.common).click();
        await this.page.waitForTimeout(2000);
    }

    async searchPatientByNHI(patientName: string) {
        await this.navigateTo("https://dev.scriptsense.co.nz/");
        await this.page.waitForTimeout(2000);
        await this.page.locator(homePageSelector.homePage.lnk_dispense.common).click();
        await this.page.locator(homePageSelector.homePage.tab_byNHI.common).click();
        await this.page.locator(homePageSelector.homePage.cbx_searchPatient.common).fill(patientName);
        await this.page.locator(homePageSelector.homePage.btn_searchPatient.common).click();
        await this.page.locator(homePageSelector.homePage.opt_patientResult.common).click();
        await this.page.waitForTimeout(7000);
    }

    async createManualDispence(prescriberName: string, medicineName: string) {
        await this.page.locator(homePageSelector.homePage.lnk_manualDispense.common).click();
        await this.page.locator(homePageSelector.homePage.cbx_searchPrescriber.common).fill(prescriberName);
        await this.page.locator(homePageSelector.homePage.opt_dummyDoctor.common).click();
        await this.page.locator(homePageSelector.homePage.cbx_searchMedicine.common).click();
        await this.page.locator(homePageSelector.homePage.cbx_searchMedicine.common).fill(medicineName);
        await this.page.locator(homePageSelector.homePage.opt_saradon.common).click();
        await this.page.locator(homePageSelector.homePage.txt_rxQtyOP.common).fill("2");
        await this.page.locator(homePageSelector.homePage.txt_instructions.common).click();
        await this.page.locator(homePageSelector.homePage.txt_instructions.common).fill("this is test");
        await this.page.locator(homePageSelector.homePage.btn_day13.common).click();
        await this.page.locator(homePageSelector.homePage.txt_totalRepeats.common).fill("1");
        await this.page.locator(homePageSelector.homePage.btn_endDispense.common).click();
        // await this.page.pause();
    }
}
