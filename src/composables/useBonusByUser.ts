import { useQuery } from '@tanstack/vue-query'
import { pointApi, type BonusByUserRequest } from '@/api/point'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useBonusByUser() {
  const authStore = useAuthStore()

  const uid = computed(() => authStore.uid)

  return useQuery({
    queryKey: ['bonusByUser', uid],
    queryFn: () => pointApi.getBonusByUserByWeek({ uid: Number(authStore.uid) } as BonusByUserRequest),
    enabled: computed(() => !!authStore.uid), // 只有當用戶已登入時才執行查詢
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
  })
}
