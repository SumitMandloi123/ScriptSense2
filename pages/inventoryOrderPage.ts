import { expect } from '@playwright/test';
import BasePage from '@pages/basePage';

export default class Order extends BasePage {
    get placeOrderLabel() {
        return this.page.getByRole('tab', { name: 'Place Orders' });
    }
    get inventoryLabel() {
        return this.page.getByRole('tab', { name: 'Inventory' });
    }
    get sentOrdersLabel() {
        return this.page.getByRole('tab', { name: 'Sent Orders' });
    }
    get startManualOrderButton() {
        return this.page.getByRole('button', { name: 'Start Manual Order' });
    }
    get medicineSearchInput() {
        return this.page.getByRole('combobox', { name: 'Search by Medicine Name/' });
    }
    get selectDropdownOption() {
        return this.page.locator("(//div[contains(@class,'mantine-ScrollArea-root')]//div[@role='option'])[1]");
    }
    get quantityInput() {
        return this.page.getByRole('textbox', { name: 'Quantity' });
    }
    get continueButton() {
        return this.page.getByRole('button', { name: 'Continue' });
    }
    get customerEmailInput() {
        return this.page.getByRole('textbox', { name: 'Customer Email' });
    }
    get customerInstructionInput() {
        return this.page.getByRole('textbox', { name: 'Delivery Instructions' });
    }
    get customerReferenceInput() {
        return this.page.getByRole('textbox', { name: 'Reference Name' });
    }
    get sendOrderButton() {
        return this.page.getByRole('button', { name: 'Send Order' });
    }
    get confirmOrderButton() {
        return this.page.getByRole('button', { name: 'Confirm Order' });
    }
    get removeAddedItems() {
        return this.page.locator('(//tbody/tr/td[1]/div[1])[last()]');
    }
    async checkItemAddedForOrder(index: number) {
        return this.page.locator(`(//tbody/tr//td[3])[${index}]`);
    }
    get totalPriceOfItems() {
        return this.page.locator("//tbody/tr/td[11]/div[1]");
    }
    get totalPriceLabel() {
        return this.page.locator("//tfoot//th[11]");
    }
    get status() {
        return this.page.locator("//tbody//tr[1]//td[10]");
    }
    get calculateButton() {
        return this.page.getByRole('button', { name: 'Calculate' });
    }
    get discardOrderButton() {
        return this.page.getByRole('button', { name: 'Discard Order' });
    }
    get acceptOrderButton() {
        return this.page.getByRole('button', { name: 'Accept Order' });
    }
    get clearAllItemButton() {
        return this.page.getByRole('button', { name: 'Clear All Items' });
    }
    get yesButton() {
        return this.page.getByRole('button', { name: 'Yes' });
    }
    get inputFiledForDays() {
        return this.page.locator("//div[contains(text(), 'days')]/preceding-sibling::div//input[@type='text']")
    }
    get searchItemByInput() {
        return this.page.locator("//label[contains(., 'Search Items by')]/following-sibling::div//input")
    }
    get detailsOfMedicine() {
        return this.page.locator("(//tbody/tr[1])[1]")
    }
    get stockOnHandInput() {
        return this.page.locator("(//tbody/tr/td[5])[1]")
    }
    get pricePerPack() {
        return this.page.locator("(//tbody/tr/td[13]/div[1]/span)[1]")
    }
    get noRecordsToDisplay() {
        return this.page.locator("//div[contains(text(), 'No records to display')]")
    }

    get toasterOrderSuccess() {
        return this.page.locator("//div[contains(text(), 'Order successfully sent')]")
    }
    get toasterOrderConfirm() {
        return this.page.locator("//div[contains(text(), 'Order Confirmed')]")
    }
    get toasterOrderAccept() {
        return this.page.locator("//div[contains(text(), 'Order Accepted')]")
    }
    async inputFieldForSupplier(index: number) {
        return this.page.locator(`(//tbody/tr/td[14]/div[1]//input)[${index}]`)
    }
    get allOptionsOfSupplier() {
        return this.page.locator("(//div[@role='option'])");
    }
    get individualSupplierRadioButton() {
        return this.page.locator("//label[text()='Send to Individual Suppliers']/preceding::input[@type='radio'][1]")
    }
    async supplierNameFromTable(rowIndex: number) {
        return this.page.locator(`//tbody/tr[${rowIndex}]/td[8]`)
    }
    get entireToOneSupplierRadioButton() {
        return this.page.locator("//label[text()='Send entire order to one supplier']/preceding::input[@type='radio'][1]")
    }
    get selectSupplierDropdown() {
        return this.page.locator("(//input[@placeholder='Select supplier' and @type='search'])[2]")
    }
    get yesContinueButton() {
        return this.page.getByRole('button', { name: 'Yes, continue' });
    }
    async optionLocator(index: number) {
        return this.page.locator(`(//div[@role='option'])[${index}]`)
    }
    async selectOptionByText(text: string) {
        return this.page.locator(`//div[@role='option' and text()='${text}']`)
    }

    get dontOrderUntilNextDispenseCheckbox() {
        return this.page.locator("//div//label[normalize-space(text())=\"Don't order until next dispense\"]");
    }
    get dontOrderUntilNextDispenseInput() {
        return this.page.locator("//div//label[normalize-space(text())=\"Don't order until next dispense\"]/parent::div//parent::div/input");
    }
    get dontOrder() {
        return this.page.locator("//div//label[normalize-space(text())=\"Don't Order\"]")
    }
    get dontOrderInput() {
        return this.page.locator("//div//label[normalize-space(text())=\"Don't Order\"]/parent::div//parent::div/input")
    }

    get orderDisabledPopup() {
        return this.page.locator("//div[normalize-space()='This item is currently disabled for ordering. Are you sure you want to add it to the order list?']")
    }
    get confirmButton() {
        return this.page.locator("//span[normalize-space()='Confirm']");
    }
    get medicineName() {
        return this.page.locator("(//tbody/tr[1]/td[3]/div)")
    }
    get cancelButton() {
        return this.page.getByRole('button', { name: 'Cancel' });
    }
    get updateInventoryButton() {
        return this.page.getByRole('button', { name: 'Update Inventory Item' });
    }
    get toasterInventoryUpdate() {
        return this.page.locator("//div[contains(text(), 'Inventory item updated successfully')]")
    }

    async totalPriceOfAddedItems() {
        await this.totalPriceLabel.waitFor({ state: 'visible' });
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
        const roundedValue = Math.round(totalSumOfItems * 100) / 100;

        expect(roundedValue).toBe(cleanedTotalPrice);
    }

    async waitForInventoryToLoad() {
        await this.waitForGraphqlResolved();
        await this.page.reload();
        await this.page.waitForLoadState();
    }
    get inventoryHeader() {
        return this.page.locator("//a[text()='Inventory']")
    }
    async waitForLoader() {
        await this.page.waitForSelector(
            "//div[contains(@class,'mantine-Overlay-root mantine')]",
            { state: 'hidden' },
        );
    }
    get patientNameS29Input() {
        return this.page.locator("//input[@placeholder='Patient Name']");
    }
    get prescriberNameS29Input() {
        return this.page.locator("//input[@placeholder='Prescriber Name']");
    }
    get closeIcon() {
        return this.page.locator("(//section//button)[1]");
    }
    async waitForGraphqlResolved() {
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/graphql') && response.status() === 200
            ),
        ]);
    }
    async searchMedicine(meds: string[], quantity: string) {
        await this.page.waitForLoadState();
        for (let index = 0; index < meds.length; index++) {
            await this.page.waitForTimeout(2000);
            await this.medicineSearchInput.fill(meds[index]); 
            await this.medicineSearchInput.press("Backspace");
            await this.selectDropdownOption.waitFor({ state: 'visible' });
            await this.selectDropdownOption.click();
            await this.page.waitForTimeout(1000);
            await this.quantityInput.fill(quantity);
            await this.page.waitForTimeout(1000);
            await this.continueButton.click();
            await this.waitForLoader();
            const addedMeds = await this.checkItemAddedForOrder(index + 1);
            await addedMeds.waitFor({ state: 'visible' });
        }
    }
    async confirmSendOffer(orderType: string) {
        if (orderType == 'confirmOrder')
            await this.confirmOrderButton.click();
        else
            await this.sendOrderButton.click();
        await this.continueButton.click();
        await this.page.waitForTimeout(1000);
    }

    async sendOrderConfirmation(orderType: string) {
        await this.waitForLoader();
        const status = await this.status.textContent();
        if (orderType == 'confirmOrder')
            expect(status).toEqual("Processed by Supplier");
        else
            expect(status).toEqual("Sent");
    }
    async createManualOrder(orderMedsDetails: { medicineNames: string[], s29Meds: string[], quantity: string, patientName: string, prescrierName: string, costomerEmail: string, deliveryInstruction: string, referenceName: string }, medicineType: string) {
        const { medicineNames, s29Meds, quantity, patientName, prescrierName, costomerEmail, deliveryInstruction, referenceName } = orderMedsDetails;
        await this.page.waitForLoadState();
        await this.inventoryHeader.click();
        await this.inventoryLabel.click();
        await this.waitForLoader()
        await this.placeOrderLabel.click();
        await this.waitForGraphqlResolved()
        await this.startManualOrderButton.click();
        if (medicineType == "s29") {
            await this.searchMedicine(s29Meds, quantity);
            await this.patientNameS29Input.fill(patientName);
            await this.page.waitForTimeout(700);
            await this.customerEmailInput.click();
            await this.prescriberNameS29Input.fill(prescrierName);
            await this.page.waitForTimeout(700);
            await this.customerEmailInput.click();
        }
        else
            await this.searchMedicine(medicineNames, quantity)

        await this.customerEmailInput.fill(costomerEmail);
        await this.customerInstructionInput.fill(deliveryInstruction);
        await this.customerReferenceInput.fill(referenceName);
        await this.customerInstructionInput.click();
        await this.totalPriceOfAddedItems()

        if (!(medicineType == "s29") && medicineNames.length > 1) {
            await this.removeAddedItems.waitFor({ state: 'visible' });
            await this.removeAddedItems.click()
        }
    }
    async autoCalculateStock(days: string) {
        await this.inventoryHeader.click();
        await this.waitForLoader()
        await this.placeOrderLabel.click();
        await this.waitForLoader();
        if (await this.discardOrderButton.isVisible() && await this.discardOrderButton.isEnabled()) {
            await this.discardOrderButton.click();
            await this.waitForLoader();

        }
        await this.waitForInventoryToLoad();
        await this.inputFiledForDays.fill(days)
        await this.calculateButton.click();
        await this.page.waitForTimeout(5000);
        await this.removeAddedItems.waitFor({ state: 'visible' });
        const totalItems = await this.totalPriceOfItems.elementHandles();
        expect(totalItems.length).toBeGreaterThan(0);
    }
    async searchItemFromInventory(item: string) {
        await this.page.reload();
        await this.detailsOfMedicine.waitFor({ state: 'visible' });
        await this.searchItemByInput.waitFor({ state: 'visible' });
        await this.searchItemByInput.fill(item);
        await this.searchItemByInput.press('Backspace')
        const sohText = await this.stockOnHandInput.textContent();
        const stockOnHand = Number(sohText?.trim() || '0');
        const text = await this.pricePerPack.textContent();
        const trimmed = text?.trim() || '';
        const match = trimmed.match(/\/\s*(\d+(?:\.\d+)?)/);
        const numberAfterSlash = Number(match ? parseFloat(match[1]) : null);
        const itemDetails = { "stockOnHand": stockOnHand, "numberAfterSlash": numberAfterSlash }
        return itemDetails;
    }
    async verifyTheUpadatedQuantityInInventory(orderMedsDetails: { checkTheUpdateStockForMed: string[], quantity: string, referenceName: string, costomerEmail: string, deliveryInstruction: string }) {
        const { checkTheUpdateStockForMed, quantity, costomerEmail, referenceName, deliveryInstruction } = orderMedsDetails;
        await this.inventoryHeader.waitFor({ state: 'visible' });
        await this.inventoryHeader.click();
        await this.page.waitForTimeout(2000);
        const itemDetails = await this.searchItemFromInventory(checkTheUpdateStockForMed[0]);
        await this.placeOrderLabel.click();
        await this.handleDiscardOrderButton();
        await this.searchMedicine(checkTheUpdateStockForMed, quantity)
        await this.customerEmailInput.fill(costomerEmail);
        await this.customerInstructionInput.fill(deliveryInstruction);
        await this.customerReferenceInput.fill(referenceName);
        await this.customerInstructionInput.click()
        await this.confirmSendOffer("confirmOrder")
        await this.waitForLoader()
        await this.detailsOfMedicine.waitFor({ state: 'visible' });
        await this.detailsOfMedicine.click();
        await this.acceptOrderButton.waitFor({ state: 'visible' });
        await this.acceptOrderButton.click();
        await this.toasterOrderAccept.waitFor({ state: 'visible' });
        const toasterText1 = await this.toasterOrderAccept.textContent();
        expect(toasterText1?.trim()).toContain('Order Accepted');
        await this.closeIcon.click()
        await this.inventoryLabel.click();
        await this.page.reload();
        await this.page.waitForLoadState();
        await this.detailsOfMedicine.waitFor({ state: 'visible' });
        await this.searchItemByInput.waitFor({ state: 'visible' });
        await this.searchItemByInput.fill(checkTheUpdateStockForMed[0]);
        await this.searchItemByInput.press('Backspace')
        await this.page.waitForTimeout(2000);
        await this.detailsOfMedicine.waitFor({ state: 'visible' });
        await this.detailsOfMedicine.click();
        await this.closeIcon.waitFor({ state: 'visible' });
        await this.closeIcon.click()
        await this.page.reload();
        await this.page.waitForLoadState();
        await this.searchItemByInput.fill(checkTheUpdateStockForMed[0]);
        await this.searchItemByInput.press('Backspace')
        await this.page.waitForTimeout(3000);
        const SOHtextfinal = await this.stockOnHandInput.textContent();
        const stockOnHandFinal = Number(SOHtextfinal?.trim() || '0');
        const finalStock = itemDetails.stockOnHand + ((itemDetails.numberAfterSlash) * (Number(quantity)));
        expect(stockOnHandFinal).toBe(finalStock);

    }
    async handleDiscardOrderButton() {
        await this.discardOrderButton.waitFor({ state: 'visible' })
        if (await this.discardOrderButton.isVisible() && await this.discardOrderButton.isEnabled()) {
            await this.discardOrderButton.click();
            await this.waitForLoader();
            await this.startManualOrderButton.click()
        }
        else {
            await this.startManualOrderButton.click();
        }
    }
    async clearAllItems(orderMedsDetails: { medicineNames: string[], quantity: string }) {
        const { medicineNames, quantity } = orderMedsDetails
        await this.inventoryHeader.click();
        await this.waitForLoader()
        await this.placeOrderLabel.click();
        await this.waitForLoader()
        await this.waitForGraphqlResolved();
        await this.handleDiscardOrderButton();
        await this.searchMedicine(medicineNames, quantity)
        await this.clearAllItemButton.click();
        await this.yesButton.click();
        const text = await this.noRecordsToDisplay.textContent();
        const noRecordsToDisplayText = text?.trim() || '0';
        expect(noRecordsToDisplayText).toContain("No records to display");
    }
    async discardOrder(orderMedsDetails: { medicineNames: string[], quantity: string, costomerEmail: string, deliveryInstruction: string, referenceName: string }) {
        const { medicineNames, quantity, costomerEmail, deliveryInstruction, referenceName } = orderMedsDetails
        await this.inventoryHeader.click();
        await this.waitForLoader()
        await this.placeOrderLabel.click();
        await this.waitForLoader()
        await this.waitForGraphqlResolved();
        await this.handleDiscardOrderButton();
        await this.searchMedicine(medicineNames, quantity)
        await this.customerEmailInput.fill(costomerEmail);
        await this.customerInstructionInput.fill(deliveryInstruction);
        await this.customerReferenceInput.fill(referenceName);
        await this.customerInstructionInput.click()
        await this.discardOrderButton.click();
        await this.page.reload()
        await this.page.waitForLoadState();
        await this.noRecordsToDisplay.waitFor({ state: 'visible' })
        const text = await this.noRecordsToDisplay.textContent();
        const noRecordsToDisplayText = text?.trim() || '0';
        expect(noRecordsToDisplayText).toContain("No records to display");
        await expect(this.customerEmailInput).toBeDisabled();
        await expect(this.customerInstructionInput).toBeDisabled();
        await expect(this.customerReferenceInput).toBeDisabled();
        await expect(this.medicineSearchInput).toBeDisabled();
        await expect(this.confirmOrderButton).toBeDisabled();
        await expect(this.sendOrderButton).toBeDisabled();

    }

    async selectSupplierFromDropdown(orderMedsDetails: { medicineNames: string[], quantity: string, costomerEmail: string, deliveryInstruction: string, referenceName: string, supplier: string }, orderType: string) {
        const { medicineNames, quantity, costomerEmail, deliveryInstruction, referenceName, supplier } = orderMedsDetails
        await this.inventoryHeader.click();
        await this.waitForLoader()
        await this.placeOrderLabel.click();
        await this.waitForLoader()
        await this.waitForGraphqlResolved();
        await this.handleDiscardOrderButton();
        await this.searchMedicine(medicineNames, quantity)
        await this.customerEmailInput.fill(costomerEmail);
        await this.customerInstructionInput.fill(deliveryInstruction);
        await this.customerReferenceInput.fill(referenceName);
        await this.customerInstructionInput.click()
        const initialSuppliers: string[] = [];

        for (let i = 1; i <= medicineNames.length; i++) {
            const supplierField = await this.inputFieldForSupplier(i * 2);
            await supplierField.click();
            const options = await this.allOptionsOfSupplier.allTextContents();
            let optionIndex = options.findIndex(option => option.trim() === supplier);
            if (optionIndex === -1) {
                optionIndex = 0;
            }
            if (await (await this.optionLocator(optionIndex + 1)).isVisible()) {
                (await this.optionLocator(optionIndex + 1)).click();
            } else {
                (await this.optionLocator(1)).click();
            }
            const name = await supplierField.inputValue();
            if (name) initialSuppliers.push(name.trim());
        }

        await this.sendOrderButton.click();
        if (orderType === "individualSupplier") {
            await this.individualSupplierRadioButton.click();
            await this.continueButton.click();
            await this.toasterOrderSuccess.waitFor({ state: 'visible' });
            const toasterText1 = await this.toasterOrderSuccess.textContent();
            expect(toasterText1?.trim()).toContain('Order successfully sent');
            await this.waitForLoader();
            const finalSuppliers: string[] = [];

            for (let i = 1; i <= medicineNames.length; i++) {
                const name = await (await this.supplierNameFromTable(1)).textContent();
                if (name) finalSuppliers.push(name.trim());
            }
            finalSuppliers.forEach(supplier => {
                expect(initialSuppliers).toContain(supplier);
            });
        }
        else if (orderType === "entireToOneSupplier") {
            await this.entireToOneSupplierRadioButton.click();
            await this.selectSupplierDropdown.waitFor({state:'visible'})
            await this.selectSupplierDropdown.click();
            (await this.selectOptionByText(supplier)).click();
            await this.continueButton.click();
            await this.yesContinueButton.click();
            await this.toasterOrderSuccess.waitFor({ state: 'visible' });
            const toasterText1 = await this.toasterOrderSuccess.textContent();
            expect(toasterText1?.trim()).toContain('Order successfully sent');
            await this.waitForLoader();
            const text = await (await this.supplierNameFromTable(1)).textContent();
            const supplierName = text?.trim() || '0';
            expect(supplierName).toBe(supplier)

        }
    }

    async checkWarningMassage(orderMedsDetails: { warningCheckMedicine: string}, checkBox: string) {
        const { warningCheckMedicine } = orderMedsDetails
        await this.inventoryHeader.waitFor({ state: 'visible' });
        await this.inventoryHeader.click();
        await this.waitForGraphqlResolved();
        await this.waitForLoader()
            await this.searchItemByInput.fill(warningCheckMedicine);
            await this.searchItemByInput.press('Backspace')
            await this.page.waitForTimeout(2000);
            await this.detailsOfMedicine.waitFor({ state: 'visible' });
            await this.detailsOfMedicine.click();
            await this.page.waitForTimeout(3000)
            if (checkBox == "Don't order till next dispense") {
                await this.dontOrderUntilNextDispenseCheckbox.waitFor({ state: 'visible' });
                if(!(await this.dontOrderUntilNextDispenseInput.isChecked()))
                await this.dontOrderUntilNextDispenseCheckbox.click();
                
                if(await this.dontOrderInput.isChecked())
                    await this.dontOrder.click();

            }
             if (checkBox == "Dont Order") {
                await this.dontOrder.waitFor({ state: 'visible' });
                if(!(await this.dontOrderInput.isChecked()))
                    await this.dontOrder.click();
                if(await this.dontOrderUntilNextDispenseInput.isChecked())
                    await this.dontOrderUntilNextDispenseCheckbox.click();
            }
            await this.updateInventoryButton.click();
            await this.toasterInventoryUpdate.waitFor({ state: 'visible' })
            const toasterText = await this.toasterInventoryUpdate.textContent();
            expect(toasterText?.trim()).toContain('Inventory item updated successfully');
            await this.page.keyboard.press('Escape');
            await this.placeOrderLabel.click();
            await this.handleDiscardOrderButton();
            await this.medicineSearchInput.fill(warningCheckMedicine);
            await this.page.waitForTimeout(1000)
            await this.selectDropdownOption.waitFor({ state: 'visible' });
            await this.selectDropdownOption.click();
            await this.page.waitForTimeout(1000)
            expect(await this.orderDisabledPopup).toContainText("This item is currently disabled for ordering. Are you sure you want to add it to the order list?")
            await this.cancelButton.click();
}
}
