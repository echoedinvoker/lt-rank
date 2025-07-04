import { expect } from '@playwright/test'
import { test } from '../test-options'

test('current bonus', async ({ page, logged }) => {
  await page.route('*/**/point/getBonusByUserByWeek', (route) => {
    route.fulfill({
      body: JSON.stringify({
        status: true,
        data: {
          data: {
            '1': 11,
            '2': 22,
            '3': 33,
            '4': 44,
            '5': 55,
            '6': 66,
            '7': 0,
          },
          now: '2',
        },
        message: 'success',
      }),
    })
  })
  await page.locator('header').getByRole('button', { name: '個人成就' }).click()
  await page.waitForTimeout(3000);
  await expect(page.locator('.grid', { hasText: '本週任務紅利已累積' }).getByText('22')).toBeVisible()
})
