import { expect } from '@playwright/test'
import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'

test('redirect to home page with credential', async ({ page }) => {
  const pm = new PageManager(page)
  await page.goto('/?uid=2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')
  await page.pause()
  await pm.header.expectLoggedIn()
})
test('title', async ({ page, homePage }) => {
  await expect(page).toHaveTitle('紅利提款機大賽｜LTrust');
})
