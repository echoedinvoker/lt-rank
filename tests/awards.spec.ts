import { expect } from '@playwright/test'
import { test } from '../test-options'

test.only('show correct current bonus in personal section', async ({ page, loggedAwards }) => {
  await page.pause()
  await expect(page.getByRole('button', { name: '第2週' })).toHaveCSS('background-color', 'rgb(255, 255, 255)')
})
