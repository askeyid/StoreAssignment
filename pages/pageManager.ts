import { Page } from "@playwright/test"
import { HomePage } from "./homePage"
import { CpanelLicencesPage } from "./cpanelLisencesPage"
import { CartPage } from "./cartPage"


export class PageManager {
    private readonly page: Page
    private readonly homePage: HomePage
    private readonly cpanelLicencesPage: CpanelLicencesPage
    private readonly cartPage: CartPage

    constructor(page: Page) {
        this.page = page
        this.homePage = new HomePage(page)
        this.cpanelLicencesPage = new CpanelLicencesPage(page)
        this.cartPage = new CartPage(page)
    }

    onHomePage() {
        return this.homePage
    }

    onCpanelLisencesPage() {
        return this.cpanelLicencesPage
    }

    onCartPage() {
        return this.cartPage
    }
}