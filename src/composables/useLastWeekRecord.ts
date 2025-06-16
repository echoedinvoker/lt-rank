import { useQuery } from '@tanstack/vue-query'
import { pointApi } from '@/api/point'

export function useLastWeekRecord() {
  return useQuery({
    queryKey: ['lastWeekRecord'],
    queryFn: () => pointApi.getLastWeekRecord(),
    staleTime: 5 * 60 * 1000, // 5 分鐘內不重新請求
  })
}
