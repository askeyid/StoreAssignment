import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import {cartPage as cart, cpanelLicencesPage as cpanel} from '../test-data/testData.json'
import { HelperBase as util } from '../pages/helperBase';

test.beforeEach(async({page}) => {
  await page.goto('/')
})

test('Verify Checkout Information when ordering product', async ({ page }) => {
    const pm = new PageManager(page)
    
    await pm.onHomePage().openCpanelLisencesPage()
    await pm.onCpanelLisencesPage().orderLicense(cpanel.licenseName)
    await pm.onCartPage().fillIpAddressInput(cart.ipAddress)
    await pm.onCartPage().selectAddon(cart.addonName)

    // save recurcive prices for future checking data on other tabs
    const addonRecuringPrice = await pm.onCartPage().getOrderSummaryItemPrice(cart.addonName)
    const licenseRecuringPrice = util.addPrices((await pm.onCartPage().getOrderSummaryItemPrice(cart.licenseName)), addonRecuringPrice)

    await pm.onCartPage().continue()

    await expect(pm.onCartPage().reviewLicenseTitle).toContainText(cart.licenseName)
    await expect(pm.onCartPage().reviewAddonTitle).toContainText(cart.addonName)
    await expect(pm.onCartPage().reviewLicenseCyclePrice).toContainText(licenseRecuringPrice)
    await expect(pm.onCartPage().reviewAddonCyclePrice).toContainText(addonRecuringPrice)
    
    // save due todat prices for future checking data on Checkout tab
    const licenseDueTodayPrice = await pm.onCartPage().getReviewCheckoutDueTodayLicensePrice()
    const addonDueTodayPrice = await pm.onCartPage().getReviewCheckoutDueTodayAddonPrice()
    
    await pm.onCartPage().checkout()

    await pm.onCartPage().verifyCheckoutTabTableData(cart.licenseName, cart.ipAddress, licenseRecuringPrice, licenseDueTodayPrice)
    await pm.onCartPage().verifyCheckoutTabTableData(cart.addonName, cart.ipAddress, addonRecuringPrice, addonDueTodayPrice)

    // verify all the fields accessebility
    await pm.onCartPage().verifyPersonalInformationFieldsVisibility()
    await pm.onCartPage().verifyBillingAddressFieldsVisibility()
    await pm.onCartPage().verifyAccountSecurityFieldsVisibility()
    await pm.onCartPage().verifyTermsAndConditionsFieldsVisibility()
    await pm.onCartPage().verifyPaymentDetailsFieldsVisibility()

    await expect(pm.onCartPage().completeOrderBtn).toBeVisible()
    await expect(pm.onCartPage().completeOrderBtn).toBeDisabled()
})