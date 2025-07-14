import { expect, Locator, Page } from "@playwright/test"

export class SchoolPage {
  readonly schoolSection: Locator;

  constructor(private page: Page) {
    this.schoolSection = this.page.locator('#school-section');
  }

  async clickLastWeekResults() {
    await this.schoolSection.getByRole('button', { name: '上週戰績' }).click()
  }

  async expectWeekInfo(weekText: string) {
    await expect(this.schoolSection).toContainText(weekText)
  }

  async expectNoLastWeekResults() {
    await expect(this.schoolSection).toContainText('尚無上週戰績')
  }

  async expectActivityNotStarted() {
    await expect(this.schoolSection).toContainText('活動尚未開始或已結束')
    await expect(this.schoolSection).not.toContainText('累積紅利')
  }
}
