import { expect } from '@playwright/test'
import { test } from '../test-options'

test('current bonus', async ({
  page,
  mockGetBonusByUserByWeekResponse,
  loggedPersonal
}) => {
  await expect(
    page.locator('.grid', { hasText: '本週任務紅利已累積' }).getByText('33'),
  ).toBeVisible()
})
test('existing week', async ({
  page,
  mockGetBonusByUserByWeekResponse,
  loggedPersonal
}) => {
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第1週' }),
  ).toBeVisible()
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第2週' }),
  ).toBeVisible()
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第3週' }),
  ).toBeVisible()
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第5週' }),
  ).toBeVisible()
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第6週' }),
  ).toBeVisible()
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第7週' }),
  ).toBeVisible()
})
test('not existing week', async ({
  page,
  mockGetBonusByUserByWeekResponse,
  loggedPersonal
}) => {
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第4週' }),
  ).not.toBeVisible()
})
test('filtering week', async ({
  page,
  mockGetBonusByUserByWeekResponse,
  loggedPersonal
}) => {
  await expect(
    page.locator('section#award-section').getByRole('button', { name: '第99週' }),
  ).not.toBeVisible()
})
