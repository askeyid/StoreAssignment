import { Locator, Page } from '@playwright/test';

export class HomePage {

  readonly page: Page
  readonly cPanelLicenses: Locator

  constructor(page: Page) {
    this.page = page
    this.cPanelLicenses = page.locator(':text-is("cPanel Licenses")~a')
  }

  async openCpanelLisencesPage() {
    await this.cPanelLicenses.click()
  }

}