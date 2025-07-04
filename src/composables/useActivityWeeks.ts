import { onMounted } from 'vue'
import { ref, computed } from 'vue'
import { useBonusByUser } from './useBonusByUser'

export interface WeekConfig {
  week: string
  start: string
  end: string
}

// 將活動週次配置定義在外部，讓所有組件共享同一份資料
const activityWeeks = ref<WeekConfig[]>([
  { week: '99', start: '07/01', end: '07/09' },
  { week: '1', start: '07/10', end: '07/16' },
  { week: '2', start: '07/17', end: '07/23' },
  { week: '3', start: '07/24', end: '07/30' },
  { week: '4', start: '07/31', end: '08/06' },
  { week: '5', start: '08/07', end: '08/13' },
  { week: '6', start: '08/14', end: '08/20' },
  { week: '7', start: '08/21', end: '08/27' },
])

const selectedWeek = ref<WeekConfig>(activityWeeks.value[0])

export function useActivityWeeks() {

  // 格式化週次文字
  const formatWeekText = (weekConfig: WeekConfig) => {
    const currentYear = new Date().getFullYear()
    const [startMonth, startDay] = weekConfig.start.split('/').map(Number)
    const [endMonth, endDay] = weekConfig.end.split('/').map(Number)

    const startDate = new Date(currentYear, startMonth - 1, startDay, 12, 0, 0)
    const endDate = new Date(currentYear, endMonth - 1, endDay, 11, 59, 59)

    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    const startWeekday = weekdays[startDate.getDay()]
    const endWeekday = weekdays[endDate.getDay()]

    return `第${weekConfig.week}週 ${weekConfig.start}(${startWeekday}) 中午12:00 ~ ${weekConfig.end}(${endWeekday}) 中午11:59 止`
  }

  // 找到當前週次索引
  const getCurrentWeekIndex = () =>
    activityWeeks.value.findIndex((weekConfig) => {
      return weekConfig.week === selectedWeek.value.week
    })

  const selectedWeekText = computed(() => {
    return formatWeekText(selectedWeek.value)
  })

  // 當前週數 - 如果沒有符合的話輸出第一週的 week number
  const currentWeek = computed(() => {
    const currentIndex = getCurrentWeekIndex()
    return currentIndex === -1 ? 1 : activityWeeks.value[currentIndex].week
  })

  // 當前週次文字
  const currentWeekText = computed(() => {
    const currentIndex = getCurrentWeekIndex()
    return currentIndex === -1
      ? '活動尚未開始或已結束'
      : formatWeekText(activityWeeks.value[currentIndex])
  })

  // 上週文字
  const lastWeekText = computed(() => {
    const currentIndex = getCurrentWeekIndex()
    return currentIndex <= 0
      ? '尚無上週戰績'
      : formatWeekText(activityWeeks.value[currentIndex - 1])
  })

  onMounted(() => {
    const index = getCurrentWeekIndex()
    if (index !== -1) {
      selectedWeek.value = activityWeeks.value[index]
    } else {
      selectedWeek.value = activityWeeks.value[0] // 如果沒有當前週，則選擇第一週
    }
  })

  return {
    selectedWeek,
    selectedWeekText,
    activityWeeks,
    currentWeek,
    currentWeekText,
    lastWeekText,
    getCurrentWeekIndex,
    formatWeekText,
  }
}
