import { expect } from '@playwright/test'
import { test } from '../test-options'

test('redirect to home page with credential', async ({ page }) => {
  await page.goto('/?uid=2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')
  await expect(page.locator('header').getByRole('button', { name: '登出' })).toBeVisible()
})
test('title', async ({ page, homePage }) => {
  await expect(page).toHaveTitle('紅利提款機大賽｜LTrust');
})
