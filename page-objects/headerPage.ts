import { Locator, Page, expect } from "@playwright/test";

export class HeaderPage {
  readonly header: Locator;

  constructor(private page: Page) {
    this.header = this.page.locator('header');
  }

  button(name: string): Locator {
    return this.header.getByRole('button', { name });
  }

  async navigateToSchool() {
    await this.button('校際戰績').click()
    await this.page.waitForTimeout(3000)
  }

  async navigateToPersonal() {
    await this.button('個人成就').click()
    await this.page.waitForTimeout(3000)
  }

  async navigateToAwards() {
    await this.button('紅利領取').click()
    await this.page.waitForTimeout(3000)
  }

  async navigateToRules() {
    await this.button('活動辦法').click()
    await this.page.waitForTimeout(3000)
  }

  async clickLogo() {
    await this.header.getByRole('img').click()
  }

  async clickLogin() {
    await this.button('登入').click();
  }

  async clickLogout() {
    await this.button('登出').click();
  }

  async clickSignup() {
    await this.button('註冊').click();
  }

  async expectLoggedOut() {
    await expect(this.button('登出')).not.toBeVisible();
    await expect(this.button('登入')).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.button('登出')).toBeVisible();
    await expect(this.button('登入')).not.toBeVisible();
  }

}
