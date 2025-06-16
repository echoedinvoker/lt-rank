import { authApi } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { useQueryClient } from '@tanstack/vue-query'

export function useLogout() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  const logout = () => {
    // 清除 API 儲存的資料
    authApi.logout()

    // 清除 store 狀態
    authStore.clearAuth()

    // 清除所有 query cache
    queryClient.clear()
  }

  return { logout }
}
