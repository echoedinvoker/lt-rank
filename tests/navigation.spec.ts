import { expect } from '@playwright/test'
import { test } from '../test-options'

test('logo navigation', async ({ page, homePage }) => {
  await page.locator('header').getByRole('img').click()
  await expect(page).toHaveURL('https://uat.ltrust.tw/')
})

test('nav to school section', async ({ page, homePage }) => {
  await page.locator('header').getByRole('button', { name: '校際戰績' }).click()
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '最新戰績' })).toBeInViewport()
  await expect(page.getByRole('button', { name: '上週戰績' })).toBeInViewport()
})

test('nav to personal section', async ({ page, homePage }) => {
  await page.locator('header').getByRole('button', { name: '個人成就' }).click()
  await page.waitForTimeout(3000);
  await expect(page.getByRole('heading', { name: '每 週 任 務 紅 利' })).toBeInViewport()
})

test('nav to bonus section', async ({ page, homePage }) => {
  await page.locator('header').getByRole('button', { name: '紅利領取' }).click()
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '第1週' })).toBeInViewport()
  await expect(page.getByRole('button', { name: '第7週' })).toBeInViewport()
})

test('nav to rule section and back to top', async ({ page, homePage }) => {
  await page.locator('header').getByRole('button', { name: '活動辦法' }).click()
  await page.waitForTimeout(3000);
  await expect(page.getByRole('heading', { name: '活 動 辦 法' })).toBeInViewport()
  await expect(page.locator('button[aria-label="回到頂部"]')).toBeVisible()
  await page.locator('button[aria-label="回到頂部"]').click()
  await page.waitForTimeout(3000);
  await expect(page.getByRole('img', { name: 'Hero Section' })).toBeInViewport()
})
