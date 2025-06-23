import { useMutation } from '@tanstack/vue-query'
import { authApi, type LoginRequest } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { useBonusBySchoolByWeek } from './useBonusBySchoolByWeek'

export function useLogin() {
  const authStore = useAuthStore()
  const { refresh } = useBonusBySchoolByWeek()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      if (data.status) {
        // 儲存 token 和 uid
        authStore.setAuth(data.data.token, data.data.uid)
      }
      refresh() // 搜尋登入使用者所在學校之當週紅利, 並更新搜尋選項
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}
