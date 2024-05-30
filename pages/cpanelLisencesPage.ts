import { Page } from "@playwright/test";

export class CpanelLicencesPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async orderLicense(licenseName: string) {
        const orderNowBtn = this.page.locator('.product', { hasText: `${licenseName}`}).locator('.btn-order-now')
        await orderNowBtn.click()
    }

}