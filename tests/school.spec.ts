// import { expect } from '@playwright/test'
// import { test } from '../test-options'

// test('first week', async ({
//   page,
//   mockGetBonusByUserByWeekResponseNowFirst,
//   mockGetNewRecord,
//   mockGetLastWeekRecordEmpty,
//   loggedSchool
// }) => {
//   await expect(page.locator('#school-section')).toContainText('第1週 07/10(四) 中午12:00 ~ 07/16(三) 中午11:59 止')
//   await page.locator('#school-section').getByRole('button', { name: '上週戰績' }).click()
//   await expect(page.locator('#school-section')).toContainText('尚無上週戰績')
// })
//
// test('last week', async ({
//   page,
//   mockGetBonusByUserByWeekResponseNowLast,
//   mockGetNewRecord,
//   mockGetLastWeekRecord,
//   loggedSchool
// }) => {
//   await expect(page.locator('#school-section')).toContainText('第7週 08/21(四) 中午12:00 ~ 08/27(三) 中午11:59 止')
//   await page.locator('#school-section').getByRole('button', { name: '上週戰績' }).click()
//   await expect(page.locator('#school-section')).toContainText('第6週 08/14(四) 中午12:00 ~ 08/20(三) 中午11:59 止')
// })
//
// test('undefined week', async ({
//   page,
//   mockGetBonusByUserByWeekResponseNowUndefined,
//   mockGetNewRecord,
//   mockGetLastWeekRecord,
//   loggedSchool
// }) => {
//   await expect(page.locator('#school-section')).toContainText('活動尚未開始或已結束')
//   await expect(page.locator('#school-section')).not.toContainText('累積紅利')
//   await page.locator('#school-section').getByRole('button', { name: '上週戰績' }).click()
//   await expect(page.locator('#school-section')).toContainText('尚無上週戰績')
//   await expect(page.locator('#school-section')).not.toContainText('累積紅利')
// })
//
// test('not effect by clicking week of award during the first week', async ({
//   page,
//   mockGetBonusByUserByWeekResponseNowFirst,
//   mockGetNewRecord,
//   mockGetLastWeekRecordEmpty,
//   loggedAwards
// }) => {
//   await page.locator('#award-section').getByRole('button', { name: '第2週' }).click() // click other week on award section
//   await expect(page.locator('#school-section')).toContainText('第1週 07/10(四) 中午12:00 ~ 07/16(三) 中午11:59 止')
//   await page.locator('#school-section').getByRole('button', { name: '上週戰績' }).click()
//   await expect(page.locator('#school-section')).toContainText('尚無上週戰績')
// })
//
// test('not effect by clicking week of award during the last week', async ({
//   page,
//   mockGetBonusByUserByWeekResponseNowLast,
//   mockGetNewRecord,
//   mockGetLastWeekRecord,
//   loggedAwards
// }) => {
//   await page.locator('#award-section').getByRole('button', { name: '第2週' }).click() // click other week on award section
//   await expect(page.locator('#school-section')).toContainText('第7週 08/21(四) 中午12:00 ~ 08/27(三) 中午11:59 止')
//   await page.locator('#school-section').getByRole('button', { name: '上週戰績' }).click()
//   await expect(page.locator('#school-section')).toContainText('第6週 08/14(四) 中午12:00 ~ 08/20(三) 中午11:59 止')
// })

