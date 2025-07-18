import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'

test('init status', async ({
  page,
  mockGetBonusInfo,
  mockGetBonusBySchoolByWeekResponse,
  mockGetBonusByUserByWeekResponse,
  loggedAwards }) => {
  const pm = new PageManager(page)
  await pm.awards.expectWeekSelected(3)
  await pm.awards.expectContainsText('No.7')
  await pm.awards.expectContainsText('測試學校')
  await pm.awards.expectContainsText('加油!!')
  await pm.awards.expectContainsText('達成!!')
})

test.only('select week', async ({
  page,
  mockGetBonusInfo,
  mockGetBonusBySchoolByWeekResponse,
  mockGetBonusByUserByWeekResponse,
  loggedAwards }) => {
  const pm = new PageManager(page)
  await pm.awards.selectWeek(6)
  await pm.awards.expectWeekNotSelected(3)
  await pm.awards.expectWeekSelected(6)
  await pm.awards.expectContainsText('無排名')
  await pm.awards.expectNotContainsText('達成!!')

})
