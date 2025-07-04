import { test as base } from '@playwright/test'

export type TestOptions = {
  homePage: string
  loginModal: string
  logged: string
  loggedPersonal: string
  loggedAwards: string
}

export const test = base.extend<TestOptions>({
  homePage: async ({ page }, use) => {
    await page.goto('/')
    await use('')
  },
  loginModal: async ({ page, homePage }, use) => {
    await page.getByRole('button', { name: '登入' }).click()
    await use('')
  },
  logged: async ({ page, loginModal }, use) => {
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
    await use('')
  },
  loggedPersonal: async ({ page, logged }, use) => {
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
    await page.waitForTimeout(3000)
    use('')
  },
  loggedAwards: async ({ page, loggedPersonal }, use) => {
    await page.locator('header').getByRole('button', { name: '紅利領取' }).click()
    await page.waitForTimeout(3000);
    use('')
  }
})
