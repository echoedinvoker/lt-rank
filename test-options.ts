import { test as base } from '@playwright/test'

export type TestOptions = {
  mockLoginResponse: string
  mockLoginResponseUnexpectedError: string
  mockLoginResponseWrongCredential: string
  mockGetNewRecord: string
  mockGetNewRecordEmpty: string
  mockGetLastWeekRecord: string
  mockGetLastWeekRecordEmpty: string
  mockGetBonusInfo: string
  mockGetBonusBySchoolByWeekResponse: string
  mockGetBonusByUserByWeekResponse: string
  mockGetBonusByUserByWeekResponseNowFirst: string
  mockGetBonusByUserByWeekResponseNowLast: string
  mockGetBonusByUserByWeekResponseNowUndefined: string
  homePage: string
  loginModal: string
  logged: string
  loggedSchool: string
  loggedPersonal: string
  loggedAwards: string
}

export const test = base.extend<TestOptions>({
  mockLoginResponse: async ({ page }, use) => {
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
    use('')
  },
  mockLoginResponseUnexpectedError: async ({ page }, use) => {
    await page.route('*/**/login', (route) => {
      route.fulfill({ status: 500 })
    })
    await use('')
  },
  mockLoginResponseWrongCredential: async ({ page }, use) => {
    await page.route('*/**/login', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: false,
          data: null,
          message: '驗證失敗',
        }),
      })
    })
    await use('')
  },
  mockGetNewRecord: async ({ page }, use) => {
    await page.route('*/**/point/getNewRecord', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            record: [
              {
                school_name: '立人高中',
                BONUS: '125',
              },
              {
                school_name: '啟英高中',
                BONUS: '100',
              },
              {
                school_name: '新民高中',
                BONUS: '100',
              },
              {
                school_name: '國立臺灣海洋大學附屬基隆海事高級中等學校補校',
                BONUS: '50',
              },
              {
                school_name: '馬公高中',
                BONUS: '50',
              },
            ],
            startTime: '2025-07-03 12:00:00',
            endTime: '2025-07-09 11:59:59',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetNewRecordEmpty: async ({ page }, use) => {
    await page.route('*/**/point/getNewRecord', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            record: [],
            startTime: '2025-07-03 12:00:00',
            endTime: '2025-07-09 11:59:59',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetLastWeekRecord: async ({ page }, use) => {
    await page.route('*/**/point/getLastWeekRecord', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            record: [
              {
                school_name: '啟英高中',
                BONUS: '111',
              },
              {
                school_name: '立人高中',
                BONUS: '95',
              },
              {
                school_name: '新民高中',
                BONUS: '88',
              },
              {
                school_name: '國立臺灣海洋大學附屬基隆海事高級中等學校補校',
                BONUS: '50',
              },
              {
                school_name: '馬公高中',
                BONUS: '50',
              },
            ],
            startTime: '2025-06-26 12:00:00',
            endTime: '2025-07-02 11:59:59',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetLastWeekRecordEmpty: async ({ page }, use) => {
    await page.route('*/**/point/getLastWeekRecord', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            record: [
            ],
            startTime: '2025-06-26 12:00:00',
            endTime: '2025-07-02 11:59:59',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusInfo: async ({ page }, use) => {
    await page.route('*/**/point/getBonusInfo', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            user: {
              '1': 0,
              '2': 0,
              '3': 1,
              '4': 0,
              '5': 0,
              '6': 0,
              '7': 0,
            },
            school: {
              '1': 0,
              '2': 0,
              '3': 0,
              '4': 0,
              '5': 0,
              '6': 0,
              '7': 0,
            },
            schoolLV: {
              '1': 0,
              '2': 1,
              '3': 7,
              '4': 5,
              '5': 4,
              '6': 0,
              '7': 3,
            },
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusBySchoolByWeekResponse: async ({ page }, use) => {
    await page.route('*/**/point/getBonusBySchoolByWeek', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            school_name: '測試學校',
            BONUS: 100,
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusByUserByWeekResponse: async ({ page }, use) => {
    await page.route('*/**/point/getBonusByUserByWeek', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            data: {
              '99': 999,
              '1': 11,
              '2': 22,
              '3': 33,
              // '4': 44,
              '5': 55,
              '6': 66,
              '7': 0,
            },
            now: '3',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusByUserByWeekResponseNowFirst: async ({ page }, use) => {
    await page.route('*/**/point/getBonusByUserByWeek', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            data: {
              '99': 999,
              '1': 11,
              '2': 22,
              '3': 33,
              // '4': 44,
              '5': 55,
              '6': 66,
              '7': 0,
            },
            now: '1',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusByUserByWeekResponseNowLast: async ({ page }, use) => {
    await page.route('*/**/point/getBonusByUserByWeek', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            data: {
              '99': 999,
              '1': 11,
              '2': 22,
              '3': 33,
              // '4': 44,
              '5': 55,
              '6': 66,
              '7': 0,
            },
            now: '7',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  mockGetBonusByUserByWeekResponseNowUndefined: async ({ page }, use) => {
    await page.route('*/**/point/getBonusByUserByWeek', (route) => {
      route.fulfill({
        body: JSON.stringify({
          status: true,
          data: {
            data: {
              '99': 999,
              '1': 11,
              '2': 22,
              '3': 33,
              // '4': 44,
              '5': 55,
              '6': 66,
              '7': 0,
            },
            now: '99',
          },
          message: 'success',
        }),
      })
    })
    await use('')
  },
  homePage: async ({ page }, use) => {
    await page.goto('/')
    await use('')
  },
  loginModal: async ({ page, homePage }, use) => {
    await page.getByRole('button', { name: '登入' }).click()
    await use('')
  },
  logged: async ({ page }, use) => {
    await page.goto('/?uid=2&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')
    await use('')
  },
  loggedSchool: async ({ page, logged }, use) => {
    await page.locator('header').getByRole('button', { name: '校際戰績' }).click()
    await page.waitForTimeout(3000)
    use('')
  },
  loggedPersonal: async ({ page, logged }, use) => {
    await page.locator('header').getByRole('button', { name: '個人成就' }).click()
    await page.waitForTimeout(3000)
    use('')
  },
  loggedAwards: async ({ page, loggedPersonal }, use) => {
    await page.locator('header').getByRole('button', { name: '紅利領取' }).click()
    await page.waitForTimeout(3000)
    use('')
  },
})
