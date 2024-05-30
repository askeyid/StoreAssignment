import { Locator, Page, expect } from "@playwright/test";
import { HelperBase as util } from "./helperBase";

export class CartPage {

    readonly page: Page
    readonly ipAddress: Locator
    readonly orderSummary: Locator
    readonly continueBtn: Locator
    readonly reviewLicenseTitle: Locator
    readonly reviewLicenseCyclePrice: Locator
    readonly reviewAddonTitle: Locator
    readonly reviewAddonCyclePrice: Locator
    readonly checkoutBtn: Locator
    readonly reviewLicenseDueTodayPrice: Locator
    readonly reviewAddonDueTodayPrice: Locator
    
    // Personal Information fields locators
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailAddressInput: Locator
    readonly phoneNumberInput: Locator
    
    // Billing Address fields locators
    readonly companyNameInput: Locator
    readonly streetAddressInput: Locator
    readonly streetAddress2Input: Locator
    readonly cityInput: Locator
    readonly stateSelectInput: Locator
    readonly postCodeInput: Locator
    readonly countryInput: Locator
    readonly taxIdInput: Locator
    
    // Account Security fields locators        
    readonly passwordInput: Locator
    readonly confirmPasswordInput: Locator
    
    // Terms & Conditions fields locators
    readonly termsAndConditionsCheckbox: Locator
    
    // Payment Details fields locators
    readonly cardNumberInput: Locator
    readonly cardExpiryDateInput: Locator
    readonly cardCvvInput: Locator
    readonly cardNameInput: Locator
    
    readonly completeOrderBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.ipAddress = page.locator('#customfield11')
        this.orderSummary = page.locator('#orderSummary')
        this.continueBtn = page.locator('#btnCompleteProductConfig')
        this.reviewLicenseTitle = page.locator('.item:has-text("Licenses")').locator('.item-title')
        this.reviewLicenseCyclePrice = page.locator('.item:has-text("Licenses")').locator('.item-price .cycle')
        this.reviewLicenseDueTodayPrice = page.locator('.item:has-text("Licenses")').locator('.item-price span:not(.cycle)')
        this.reviewAddonTitle = page.locator('.item:has-text("Addon")').locator('.item-title')
        this.reviewAddonCyclePrice = page.locator('.item:has-text("Addon")').locator('.item-price .cycle')
        this.reviewAddonDueTodayPrice = page.locator('.item:has-text("Addon")').locator('.item-price span:not(.cycle)')
        this.checkoutBtn = page.locator('#checkout')
        this.firstNameInput = page.locator('#inputFirstName')
        this.lastNameInput = page.locator('#inputLastName')
        this.emailAddressInput = page.locator('#inputEmail')
        this.phoneNumberInput = page.locator('#inputPhone')
        this.companyNameInput = page.locator('#inputCompanyName')
        this.streetAddressInput = page.locator('#inputAddress1')
        this.streetAddress2Input = page.locator('#inputAddress2')
        this.cityInput = page.locator('#inputCity')
        this.stateSelectInput = page.locator('#stateselect')
        this.postCodeInput = page.locator('#inputPostcode')
        this.countryInput = page.locator('#inputCountry')
        this.taxIdInput = page.locator('#inputTaxId')
        this.passwordInput = page.locator('#inputNewPassword1')
        this.confirmPasswordInput = page.locator('#inputNewPassword2')
        this.termsAndConditionsCheckbox = page.locator('#iCheck-accepttos_custom')
        this.cardNumberInput = page.locator('#inputCardNumber')
        this.cardExpiryDateInput = page.locator('#inputCardExpiry')
        this.cardCvvInput = page.locator('#inputCardCVV')
        this.cardNameInput = page.locator('#inputDescription')
        this.completeOrderBtn = page.locator('#btnCompleteOrder')
    }

    async fillIpAddressInput(ipAddress: string) {
        await this.ipAddress.fill(ipAddress)
    }

    async selectAddon(addon: string) {
        const addonLocator = this.page.locator('.card', { hasText: `${addon}`}).first()
        const addonAddBtn = addonLocator.locator('.panel-add')

        await addonAddBtn.click()
    }

    async getOrderSummaryItemPrice(item: string) {
        const locatorText = await this.orderSummary.locator('.clearfix', { hasText: item }).locator('.pull-right').textContent()
        return util.getNumberFromText(locatorText)
    }

    async continue() {
        await this.continueBtn.click()
        await this.checkoutBtn.waitFor({state: "visible"})
    }

    async getReviewCheckoutDueTodayLicensePrice() {
        const locatorText = await this.reviewLicenseDueTodayPrice.textContent()
        return util.getNumberFromText(locatorText)
    }

    async getReviewCheckoutDueTodayAddonPrice() {
        const locatorText = await this.reviewAddonDueTodayPrice.textContent()
        return util.getNumberFromText(locatorText)
    }

    async checkout() {
        await this.checkoutBtn.click()
        await this.completeOrderBtn.waitFor({state: "visible"})
    }

    async verifyCheckoutTabTableData(productType: string, ipAddress: string, recurringPrice: string, dueTodayPrice: string) {
        const row = this.page.getByRole('row', { name: productType})
        const errorMessage = (value: string) => `Expected row to contain value '${value}'`
        
        await expect(row.getByText(recurringPrice), errorMessage(recurringPrice)).toBeVisible()
        await expect(row.getByText(ipAddress), errorMessage(ipAddress)).toBeVisible()
        await expect(row.getByText(dueTodayPrice), errorMessage(dueTodayPrice)).toBeVisible()
    }

    async verifyPersonalInformationFieldsVisibility() {
        await expect(this.firstNameInput).toBeVisible()
        await expect(this.lastNameInput).toBeVisible()
        await expect(this.emailAddressInput).toBeVisible()
        await expect(this.phoneNumberInput).toBeVisible()
    }

    async verifyBillingAddressFieldsVisibility() {
        await expect(this.companyNameInput).toBeVisible()
        await expect(this.streetAddressInput).toBeVisible()
        await expect(this.streetAddress2Input).toBeVisible()
        await expect(this.cityInput).toBeVisible()
        await expect(this.stateSelectInput).toBeVisible()
        await expect(this.postCodeInput).toBeVisible()
        await expect(this.countryInput).toBeVisible()
        await expect(this.taxIdInput).toBeVisible()
    }

    async verifyAccountSecurityFieldsVisibility() {
        await expect(this.passwordInput).toBeVisible()
        await expect(this.confirmPasswordInput).toBeVisible()
    }

    async verifyTermsAndConditionsFieldsVisibility() {
        await expect(this.termsAndConditionsCheckbox).toBeVisible()
    }

    async verifyPaymentDetailsFieldsVisibility() {
        await expect(this.cardNumberInput).toBeVisible()
        await expect(this.cardExpiryDateInput).toBeVisible()
        await expect(this.cardCvvInput).toBeVisible()
        await expect(this.cardNameInput).toBeVisible()
    }

}