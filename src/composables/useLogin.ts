import { useMutation } from '@tanstack/vue-query'
import { authApi, type LoginRequest } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

export function useLogin() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      if (data.status) {
        // 儲存 token 和 uid
        authStore.setAuth(data.data.token, data.data.uid)
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}
