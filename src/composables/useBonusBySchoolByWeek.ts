import { ref, onMounted } from 'vue'
import { useActivityWeeks } from '@/composables/useActivityWeeks'
import { useAuthStore } from '@/stores/auth'
import { pointApi } from '@/api/point'
import { computed } from 'vue'
import { watch } from 'vue'
import { useSearchStore } from '@/stores/search'

export function useBonusBySchoolByWeek() {
  const { activityWeeks, currentWeek, formatWeekText } = useActivityWeeks()
  const authStore = useAuthStore()
  const searchStore = useSearchStore()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const selectableWeeks = computed<{ id: number; name: string }[]>(() => {
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
  const fetchBonusData = async (uid: number, schoolName?: string, week?: number) => {
    if (!uid) {
      error.value = '用戶 ID 不能為空'
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await pointApi.getBonusBySchoolByWeek({
        uid,
        schoolName,
        week,
      })

      if (response.status) {
        searchStore.bonusData = response.data
      } else {
        error.value = response.message || '獲取數據失敗'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '網路錯誤'
      console.error('獲取積分數據失敗:', err)
    } finally {
      loading.value = false
    }
  }

  const stopWatcherSchoolName = watch(
    () => searchStore.bonusData?.school_name,
    (newSchoolName) => {
      if (newSchoolName) {
        searchStore.schoolName = newSchoolName
        stopWatcherSchoolName() // 停止監聽, 僅做初始賦值
      }
    },
    { immediate: true },
  )

  onMounted(() => {
    searchStore.selectedWeek = currentWeek.value || 1
    // 一開始載入時, 先使用 uid 與 currentWeek 來查詢 (沒有 schoolName, 會自動取得該uid學生的school name 與 bonus 資訊)
    if (authStore.uid && currentWeek.value) {
      fetchBonusData(Number(authStore.uid), undefined, currentWeek.value)
    }
  })

  return {
    // 響應式數據
    loading,
    error,

    // Computed 屬性
    weekText,
    selectableWeeks,

    // 查詢方法
    searchHandler: async (week: number, schoolName?: string) => {
      // 點擊"查詢"按鈕時, 使用 uid 與 schoolName 來查詢該學校在指定週次的 bonus 資訊
      await fetchBonusData(Number(authStore.uid), schoolName, week) // no return, only update bonusData inside useBonusBySchoolByWeek
    },

    // 重新載入當前數據
    refresh: async () => {
      if (authStore.userUid && currentWeek.value) {
        await fetchBonusData(Number(authStore.uid), undefined, currentWeek.value)
        searchStore.schoolName = searchStore.bonusData?.school_name || ''
        searchStore.selectedWeek = currentWeek.value
      }
    },
  }
}
