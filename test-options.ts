import { test as base } from '@playwright/test';

export type TestOptions = {
  homePage: string;
  loginModal: string;
}

export const test = base.extend<TestOptions>({
  homePage: async ({ page }, use) => {
    await page.goto('/');
    await use('');
  },
  loginModal: async ({ page, homePage }, use) => {
    await page.getByRole('button', { name: '登入' }).click();
    await use('');
  }
});
