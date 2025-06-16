import { useQuery } from '@tanstack/vue-query'
import { pointApi } from '@/api/point'

export function useNewRecord() {
  return useQuery({
    queryKey: ['newRecord'],
    queryFn: () => pointApi.getNewRecord(),
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
  })
}
