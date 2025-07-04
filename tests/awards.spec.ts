import { expect } from '@playwright/test'
import { test } from '../test-options'

test('selected week btn', async ({ page, mockApi, loggedAwards }) => {
  await page.pause()
  await expect(page.getByRole('button', { name: '第3週' })).toHaveCSS('background-color', 'rgb(255, 255, 255)')
})
