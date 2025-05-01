import { expect } from '@playwright/test';
import BasePage from '@pages/basePage';
export default class Account extends BasePage {
    get searchAccountInput(){
            return  this.page.getByRole('combobox', { name: 'Search Accounts Show accounts' })
    }
    get selectDropdownOption() {
        return this.page.locator("(//div[contains(@class,'mantine-ScrollArea-root')]//div[@role='option'])[1]");
    }
    get accountName() {
        return this.page.locator("//label//div[text()='Account Name']//parent::div//parent::label//parent::div//input");
    }
    get reconcilePaymentButton(){
        return this.page.locator("(//table[contains(@class,'mantine-Table-root')])[2]//tbody//tr[1]//td[1]//button")
    }
    async searchAccountAndMakePayment(paymentAccountName:any,retailPage:any) {
       await this.page.goto('/account') 
       await retailPage.waitForGraphqlResolved();
       await this.searchAccountInput.fill(paymentAccountName);
       await this.selectDropdownOption.click();
       await this.accountName.waitFor({ state: 'visible' });
       await this.page.waitForTimeout(3000);
       const expectedAccountName= await this.accountName.getAttribute('value');
       expect(paymentAccountName).toBe(expectedAccountName);
       await this.reconcilePaymentButton.click();
       await retailPage.waitForGraphqlResolved();
       await this.page.waitForLoadState()
       await this.page.waitForTimeout(3000);

    }
}