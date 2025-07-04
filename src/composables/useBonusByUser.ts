import { useQuery } from '@tanstack/vue-query'
import { pointApi, type BonusByUserRequest } from '@/api/point'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useActivityWeeks } from './useActivityWeeks'

export function useBonusByUser() {
  const authStore = useAuthStore()
  const { selectedWeek, activityWeeks } = useActivityWeeks()

  const uid = computed(() => authStore.uid)

  return useQuery({
    queryKey: ['bonusByUser', uid],
    queryFn: () =>
      pointApi.getBonusByUserByWeek({ uid: Number(authStore.uid) } as BonusByUserRequest),
    enabled: computed(() => !!authStore.uid), // 只有當用戶已登入時才執行查詢
    select: (data) => {
      selectedWeek.value = activityWeeks.value.find(weekConfig => weekConfig.week === data.data.now) || activityWeeks.value[0]

      const existingWeeks = Object.keys(data.data.data)
      activityWeeks.value = activityWeeks.value.filter(weekConfig => {
        return existingWeeks.includes(weekConfig.week.toString())
      })
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
  })
}
