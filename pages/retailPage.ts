import { expect } from '@playwright/test';
import BasePage from '@pages/basePage';
export default class Retail extends BasePage {
    get retailButton() {
        return this.page.locator("//a[normalize-space()='Retail']");
    }
    get patientSearchDropdown() {
        return this.page.locator("//span[contains(text(),'Patient Search')]");
    }
    get internalSearchButton() {
        return this.page.locator("//button[span[text()='Internal Search']]");
    }
    get searchByNHIbutton() {
        return this.page.locator("//button[span[text()='By NHI']]");
    }
    get searchByNHIinput() {
        return this.page.locator("//input[@placeholder='Enter NHI']");
    }
    get searchByFindNHIinput() {
        return this.page.locator("//input[@placeholder='Enter full name']");
    }
    get searchByFindNHIdobInput() {
        return this.page.locator("//input[@placeholder='DD/MM/YYYY']");
    }
    get searchByFindNHIbutton() {
        return this.page.locator("//button[span[text()='Find NHI']]");
    }
    get searchForPatientInput() {
        return this.page.locator(
            "//input[@placeholder='Enter Name/Mobile/Email/Address']",
        );
    }
    get retailSearch() {
        return this.page.locator(
            "//button[@type='button' and normalize-space()='Retail Search']",
        );
    }
    get retailInput() {
        return this.page.locator(
            "//input[@placeholder='Search by Medicine Name/Pharmacode/Barcode']",
        );
    }
    get selectPatientFromDropdown() {
        return this.page.locator(
            "(//div[@role='listbox']//div[@aria-selected])[1]",
        );
    }
    get searchButton() {
        return this.page.locator("role=button[name='Search']");
    }
    get changePatientButton() {
        return this.page.locator("//span[normalize-space()='Change Patient']");
    }
    get patientName() {
        return this.page.locator("//div[@aria-label='patientName']").textContent();
    }
    get findDispenseByPatientButton() {
        return this.page.locator(
            "//button[@type='button' and normalize-space()='Find Dispenses By Patient']",
        );
    }
    get findDispenseByBarcodeButton() {
        return this.page.locator(
            "//button[@type='button' and normalize-space()='Find Dispenses By Barcode']",
        );
    }
    get barcodeInput() {
        return this.page.locator(
            "//input[@placeholder='Barcode']",
        );
    }
    get addToBillIcon() {
        return this.page.locator('//tbody/tr[1]/td[1]/button[1]');
    }
    get totalAddedBill() {
        return this.page.locator('//tbody/tr//td[7]//div[1]//span');
    }
    get totalPriceOfItems() {
        return this.page.locator('//tbody/tr//td[7]//div[1]//span');
    }
    get removeAddedBill() {
        return this.page.locator('(//tbody/tr/td[1]/div[1])[last()]');
    }
    get cashPaymentButton() {
        return this.page.locator("//span[normalize-space()='Cash Payment']");
    }
    get electronicPayment(){
        return this.page.locator("//span[normalize-space()='Electronic Payment']");
    }
    get bankPaymentButton() {
        return this.page.locator("//span[normalize-space()='Bank Payment']");
    }
    get chargeToAccountSearch() {
        return this.page.locator("//label[text()='Search Payment Accounts']//parent::div//div/input");
    }
    get selectDropdownOption() {
        return this.page.locator("(//div[contains(@class,'mantine-ScrollArea-root')]//div[@role='option'])[1]");
    }
    get openPreviousBillButton() {
        return this.page.locator("//span[normalize-space()='Open Previous Bill']");
    }
    get printTaxInvoiceButton() {
        return this.page.locator("//span[normalize-space()='Print Tax Invoice']");
    }
    get billDateHeader() {
        return this.page.locator("//div[@title='Bill Date']");
    }
    get overlay() {
        return this.page.locator(
            "//div[contains(@class,'mantine-Overlay-root mantine')]",
        );
    }
    get totalBillItems() {
        return this.page.locator("//th[contains(text(),'Total items:')]");
    }
    get totalPriceLabel() {
        return this.page.locator(
            "//th[contains(text(),'Total items:')]//parent::tr//th[last()]",
        );
    }
    get newBillButton() {
        return this.page.locator("//span[text()='New Bill']")
    }

    get disconnectedEFTPOSlabel(){
        return this.page.locator("//span[text()='EFTPOS Disconnected']");
    }
    get pairOrRepairTerminalInput(){
        return this.page.locator("//label[text()='Pair new or re-pair existing terminal']//parent::div//parent::div//input[@placeholder='Terminal Serial Number']");
    }
    get terminalDescriptionInput(){
        return this.page.locator("//label[text()='Pair new or re-pair existing terminal']//parent::div//parent::div//input[@placeholder='Description']");
    }
    get pairButton(){
        return this.page.locator("//label[text()='Pair new or re-pair existing terminal']//parent::div//parent::div//button");
    }
    get currentlyConnectedHeader(){
        return this.page.locator("//div[text()='Currently connected']");
    }
    get connectedTerminalName(){
        return this.page.locator("//div[text()='Currently connected']//parent::div//div[contains(text(),'Terminal Serial Number')]");
    }
    get closeIconButton(){
        return this.page.locator("(//section//button[contains(@class,'mantine-UnstyledButton') and @type='button'])[1]");
    }
    async searchPatientForBill(retailData: {name:string, searchType:string, NHI:string,DOB:string}) {
        const { name, searchType, NHI, DOB } = retailData;
        await this.page.reload()
        await this.retailButton.click();
        await this.patientSearchDropdown.waitFor({ state: 'visible' });
        if(!await this.internalSearchButton.isVisible())
        await this.patientSearchDropdown.click();

        if (searchType.toLocaleLowerCase() == 'internal') {
            await this.internalSearchButton.click();
            await this.searchForPatientInput.fill(name);
            await this.searchButton.click();
            await this.searchForPatientInput.click();
        } else if (searchType.toLocaleLowerCase() == 'bynhi') {
            await this.searchByNHIbutton.click();
            await this.searchByNHIinput.fill(NHI);
            await this.searchButton.click();
            await this.searchByNHIinput.click();
        } else if (searchType.toLocaleLowerCase() == 'findnhi') {
            await this.searchByFindNHIbutton.click();
            await this.searchByFindNHIinput.fill(name);
            await this.searchByFindNHIdobInput.fill(DOB);
            await this.searchButton.click();
            await this.searchByFindNHIinput.click();
        } else
            expect(false, `Please enter valid search type : ${searchType}`).toBe(
                true,
            );

        await this.selectPatientFromDropdown.waitFor({ state: 'visible' });
        await this.selectPatientFromDropdown.click();
        await this.changePatientButton.waitFor({ state: 'visible' });
        const actualPatientName = await this.patientName;
        expect(actualPatientName?.trim()).toBe(name);
    }
    async waitForGraphqlResolved() {
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/graphql') && response.status() === 200
            ),
        ]);
    }
    async findDispensesAndAddForBill(dispensesDetails: { numberOfBill:number, retailItem:string[], itemBarcode:string }, dispenseBy: string) {
        const { numberOfBill, retailItem, itemBarcode } = dispensesDetails;
        if (dispenseBy.toLocaleLowerCase() == 'patient') {
            await this.findDispenseByPatientButton.click();
            await this.billDateHeader.waitFor({ state: 'visible' });
            for (let index = 0; index < numberOfBill; index++) {
                await this.addToBillIcon.click()
                this.waitForGraphqlResolved();
                await this.page.waitForSelector(
                    "//div[contains(@class,'mantine-Overlay-root mantine')]",
                    { state: 'hidden' },
                );
            }
            const actualTotalAddedBills = await this.totalAddedBill.count();
            expect(actualTotalAddedBills).toBe(numberOfBill);
            await this.removeAddedBill.click();
            await this.page.waitForTimeout(1000);
            await this.page.waitForSelector(
                "//div[contains(@class,'mantine-Overlay-root mantine')]",
                { state: 'hidden' },
            );
        } else if (dispenseBy.toLocaleLowerCase() == 'barcode') {
            await this.findDispenseByBarcodeButton.click();
            await this.barcodeInput.waitFor({ state: 'visible' });
            await this.barcodeInput.fill(itemBarcode);
            await this.barcodeInput.press('Enter');
            await this.page.waitForTimeout(3000);
            await this.page.waitForSelector(
                "//div[contains(@class,'mantine-Overlay-root mantine')]",
                { state: 'hidden' },
            );

        } else if (dispenseBy.toLocaleLowerCase() == 'retail') {
            await this.waitForGraphqlResolved()
            await this.page.waitForTimeout(20000);
            await this.retailSearch.click()
           for (let index = 0; index < retailItem.length; index++) {
                await this.retailInput.waitFor({ state: 'visible' });
                await this.retailInput.fill(retailItem[index]);
                await this.retailInput.press("Backspace");
                await this.page.waitForTimeout(1000);
                await this.selectDropdownOption.click();
                await this.page.waitForTimeout(1000);
                await this.page.waitForSelector(
                    "//div[contains(@class,'mantine-Overlay-root mantine')]",
                    { state: 'hidden' },
                );
            }
        } else
            expect(false, `Please enter valid dispense type : ${dispenseBy}`).toBe(
                true,
            );
    }
    async validateAddedBills(dispensesDetails: {paymentAccountName:string},dispenseBy: string) {
        const{paymentAccountName} = dispensesDetails;
        await this.page.waitForSelector(
            "//div[contains(@class,'mantine-Overlay-root mantine')]",
            { state: 'hidden' },
        );
        await this.totalBillItems.waitFor({ state: 'visible' });
        const updatedActualBills = await this.totalAddedBill.count();
        const expectedTotalBills = await this.totalBillItems.textContent();
        const cleanedTotalItems =
            parseInt((expectedTotalBills ?? '').replace(/\D/g, ''), 10) || 0;
        expect(updatedActualBills).toBe(cleanedTotalItems);
        if (dispenseBy.toLocaleLowerCase() == 'barcode') {
            await this.chargeToAccountSearch.fill(paymentAccountName)
            await this.selectDropdownOption.click();
            await this.bankPaymentButton.click();
        }
        else if(dispenseBy.toLocaleLowerCase() == 'electronicpayment'){
            await this.electronicPayment.click();
        }
        else
            await this.cashPaymentButton.click();

        await this.openPreviousBillButton.waitFor({ state: 'visible' });
        await this.openPreviousBillButton.click();
        await this.printTaxInvoiceButton.waitFor({ state: 'visible' });

        const totalItems = await this.totalPriceOfItems.elementHandles();
        const totalPrice = await this.totalPriceLabel.textContent();
        const trimmedTotalPrice = totalPrice?.trim() || '';
        const cleanedTotalPrice = parseFloat(
            trimmedTotalPrice.replace(/[^0-9.]/g, ''),
        );
        let totalSumOfItems = 0;
        for (const element of totalItems) {
            const price = await element.textContent();
            const trimmedPrice = price?.trim() || '';
            const cleanedPrice = parseFloat(trimmedPrice.replace(/[^0-9.]/g, ''));
            totalSumOfItems = totalSumOfItems + cleanedPrice;
        }
        expect(totalSumOfItems).toBe(cleanedTotalPrice);
        await this.newBillButton.click()
    }
    async createEFTPOSconnection(eftposConnection:{serialNo:string,description:string}){
        const {serialNo,description}= eftposConnection;
        await this.page.goto('/billing') 
        this.waitForGraphqlResolved();
        await this.disconnectedEFTPOSlabel.waitFor({ state: 'visible' });
        await this.disconnectedEFTPOSlabel.click();
        await this.pairOrRepairTerminalInput.fill(serialNo);
        await this.terminalDescriptionInput.fill(description)
        await this.pairButton.click();
        await this.currentlyConnectedHeader.waitFor({ state: 'visible' });
        expect(await this.currentlyConnectedHeader.isVisible()).toBe(true);
        const extractTerminalName = await this.connectedTerminalName.textContent();
        const cleanedExtractTerminalName= extractTerminalName?.trim() || '';
        expect(cleanedExtractTerminalName.includes(serialNo)).toBe(true);
        await this.closeIconButton.click();

    }
  
}