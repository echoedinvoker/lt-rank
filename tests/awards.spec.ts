import { expect } from '@playwright/test'
import { test } from '../test-options'

test('init status', async ({
  page,
  mockGetBonusInfo,
  mockGetBonusBySchoolByWeekResponse,
  mockGetBonusByUserByWeekResponse,
  loggedAwards }) => {
  await expect(page.locator('#award-section').getByRole('button', { name: '第3週' }))
    .toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.locator('#award-section')).toContainText('No.7')
  await expect(page.locator('#award-section')).toContainText('測試學校')
  await expect(page.locator('#award-section')).toContainText('加油!!')
  await expect(page.locator('#award-section')).toContainText('達成!!')
})

test.only('select week', async ({
  page,
  mockGetBonusInfo,
  mockGetBonusBySchoolByWeekResponse,
  mockGetBonusByUserByWeekResponse,
  loggedAwards }) => {
  await page.locator('#award-section').getByRole('button', { name: '第6週' }).click()
  await expect(page.locator('#award-section').getByRole('button', { name: '第3週' }))
    .toHaveCSS('background-color', 'rgb(0, 0, 0)')
  await expect(page.locator('#award-section').getByRole('button', { name: '第6週' }))
    .toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.locator('#award-section')).toContainText('無排名')
  await expect(page.locator('#award-section')).not.toContainText('達成!!')
})
