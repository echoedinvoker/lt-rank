import { ref } from 'vue'
import { useActivityWeeks } from '@/composables/useActivityWeeks'
import { useAuthStore } from '@/stores/auth'
import { pointApi } from '@/api/point'
import { computed } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useQuery } from '@tanstack/vue-query'

export function useBonusBySchoolByWeek() {
  const { activityWeeks, formatWeekText } = useActivityWeeks()
  const authStore = useAuthStore()
  const searchStore = useSearchStore()

  const selectableWeeks = computed<{ id: string; name: string }[]>(() => {
    return activityWeeks.value.map((week) => ({
      id: week.week,
      name: `第${week.week}週`,
    }))
  })

  const weekText = computed(() => {
    const weekConfig = activityWeeks.value.find((week) => week.week === searchStore.selectedWeek)!
    return formatWeekText(weekConfig)
  })

  // 獲取積分數據的通用方法
  const fetchBonusData = async (uid: number, schoolName?: string, week?: string) => {
    if (!uid) {
      throw new Error('用戶未登錄或 UID 無效')
    }

    try {
      const response = await pointApi.getBonusBySchoolByWeek({
        uid,
        schoolName,
        week,
      })

      if (response.status) {
        return response.data
      } else {
        throw new Error(response.message || '獲取積分數據失敗')
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('獲取積分數據時發生未知錯誤')
    }
  }

  const queryParams = computed(() => ({
    uid: authStore.userUid,
    schoolName: searchStore.schoolNameSearch,
    week: searchStore.selectedWeekSearch,
  }))

  const schoolNameResult = ref('學校名稱')
  const bonusResult = ref('19,999,999')

  const { data, isLoading, error } = useQuery({
    enabled: computed(() => !!authStore.uid),
    queryKey: ['bonusBySchoolByWeek', queryParams],
    queryFn: () => fetchBonusData(
      Number(authStore.uid),
      searchStore.schoolNameSearch,
      searchStore.selectedWeekSearch
    ),
    select: (data) => {
      schoolNameResult.value = data.school_name || '學校名稱'
      bonusResult.value = formatNumber(data.BONUS) || '19,999,999'
      return data
    },
    retry: false
  })

  function formatNumber(num: number | string): string {
    if (typeof num === 'number') {
      return num.toLocaleString('zh-TW')
    }
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }


  return {
    // 響應式數據
    data,
    schoolNameResult,
    bonusResult,
    isLoading,
    error,

    // Computed 屬性
    weekText,
    selectableWeeks,

    // Search Handler
    searchHandler: () => searchStore.handleSearch()
  }
}
