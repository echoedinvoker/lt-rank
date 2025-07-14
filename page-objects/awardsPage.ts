import { expect, Locator, Page } from "@playwright/test";

export class AwardsPage {
  readonly awardsSection: Locator;

  constructor(private page: Page) {
    this.awardsSection = this.page.locator('#award-section');
  }

  async expectContainsText(text: string) {
    await expect(this.awardsSection).toContainText(text);
  }

  async expectNotContainsText(text: string) {
    await expect(this.awardsSection).not.toContainText(text);
  }

  weekButton(weekNumber: number): Locator {
    return this.awardsSection.getByRole('button', { name: `第${weekNumber}週` });
  }

  expectWeekButton(weekNumber: number) {
    return expect(this.weekButton(weekNumber))
  }

  async selectWeek(weekNumber: number) {
    await this.weekButton(weekNumber).click()
  }

  async expectWeekSelected(weekNumber: number) {
    await this.expectWeekButton(weekNumber)
      .toHaveCSS('background-color', 'rgb(255, 255, 255)')
  }

  async expectWeekNotSelected(weekNumber: number) {
    await this.expectWeekButton(weekNumber)
      .toHaveCSS('background-color', 'rgb(0, 0, 0)')
  }

  async expectWeekVisible(weekNumber: number) {
    await this.expectWeekButton(weekNumber)
      .toBeVisible()
  }

  async expectWeekNotVisible(weekNumber: number) {
    await this.expectWeekButton(weekNumber)
      .not.toBeVisible()
  }
}
