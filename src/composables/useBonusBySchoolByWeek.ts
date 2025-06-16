import { ref, onMounted } from "vue"
import { useActivityWeeks } from '@/composables/useActivityWeeks'
import { useAuthStore } from "@/stores/auth"
import { pointApi, type BonusBySchoolResponse } from '@/api/point'

export function useBonusBySchoolByWeek() {

  const { currentWeek } = useActivityWeeks()
  const authStore = useAuthStore()

  const bonusData = ref<BonusBySchoolResponse['data'] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

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
        week
      })

      if (response.status) {
        bonusData.value = response.data
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

  onMounted(() => {
    // 一開始載入時, 先使用 uid 與 currentWeek 來查詢 (沒有 schoolName, 會自動取得該uid學生的school name 與 bonus 資訊)
    if (authStore.uid && currentWeek.value) {
      fetchBonusData(Number(authStore.uid), undefined, currentWeek.value)
    }
  })

  return {
    // 響應式數據
    bonusData,
    loading,
    error,

    // 查詢方法
    searchHandler: async (week: number, schoolName?: string) => {
      // 點擊"查詢"按鈕時, 使用 uid 與 schoolName 來查詢該學校在指定週次的 bonus 資訊
      await fetchBonusData(Number(authStore.uid), schoolName, week) // no return, only update bonusData inside useBonusBySchoolByWeek
    },

    // 重新載入當前數據
    refresh: () => {
      if (authStore.userUid && currentWeek.value) {
        fetchBonusData(Number(authStore.userUid), undefined, currentWeek.value)
      }
    }
  }
}
