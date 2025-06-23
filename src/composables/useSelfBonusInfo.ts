import { useQuery } from '@tanstack/vue-query'
import { pointApi, type GetBonusInfoRequest } from '@/api/point'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function useSelfBonusInfo() {
  const authStore = useAuthStore()
  const { uid } = storeToRefs(authStore)

  return useQuery({
    queryKey: ['self-bonus-info', uid],
    queryFn: () => pointApi.getBonusInfo({ uid: Number(authStore.uid) } as GetBonusInfoRequest),
    enabled: computed(() => !!authStore.uid), // 只有當用戶已登入時才執行查詢
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
  })
}
