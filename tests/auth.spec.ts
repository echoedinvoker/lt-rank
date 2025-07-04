import { expect } from '@playwright/test'
import { test } from '../test-options'

test('login with correct credential', async ({ page, loginModal }) => {
  await page.route('*/**/login', (route) => {
    route.fulfill({
      body: JSON.stringify({
        status: true,
        data: {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
          uid: '1',
          name: '測試使用者',
        },
        message: 'success',
      }),
    })
  })
  await page.getByPlaceholder('請輸入帳號').fill('testuser')
  await page.getByPlaceholder('請輸入密碼').fill('testpassword')
  await page.locator('form').getByRole('button', { name: '登入' }).click()
  await expect(page.locator('header').getByRole('button', { name: '登出' })).toBeVisible()
})

test('login but server error', async ({ page, loginModal }) => {
  await page.route('*/**/login', (route) => { route.fulfill({ status: 500 })})
  await page.getByPlaceholder('請輸入帳號').fill('wronguser')
  await page.getByPlaceholder('請輸入密碼').fill('wrongpassword')
  await page.locator('form').getByRole('button', { name: '登入' }).click()
  await expect(page.getByText('登入失敗')).toBeVisible()
})

test('login with wrong credential', async ({ page, loginModal }) => {
  await page.route('*/**/login', (route) => { route.fulfill({
    body: JSON.stringify({
      status: false,
      data: null,
      message: '驗證失敗'
    }),
  })})
  await page.getByPlaceholder('請輸入帳號').fill('wronguser')
  await page.getByPlaceholder('請輸入密碼').fill('wrongpassword')
  await page.locator('form').getByRole('button', { name: '登入' }).click()
  await expect(page.getByText('驗證失敗')).toBeVisible()
})

test('title', async ({ page, homePage }) => {
  await expect(page).toHaveTitle('紅利提款機大賽｜LTrust');
})
