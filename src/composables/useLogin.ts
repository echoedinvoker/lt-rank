import { useMutation } from '@tanstack/vue-query'
import { authApi, type LoginRequest } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

export function useLogin() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authApi.login(credentials)

      if (!response.status) {
        const error = new Error(response.message || '登入失敗');
        (error as any).response = { data: { message: response.message } }
        throw error
      }

      return response
    },
    onSuccess: (data) => {
      if (data.status) {
        // 儲存 token 和 uid
        authStore.setAuth(data.data.token, data.data.uid)
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
      throw error
    },
  })
}

export function useSocialLogin() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (provider: 'google' | 'line' | 'facebook') => {
      const response = await authApi.socialLogin(provider)

      if (!response.status) {
        const error = new Error(response.message || '社群登入失敗');
        (error as any).response = { data: { message: response.message } }
        throw error
      }

      return response
    },
    onSuccess: (data) => {
      if (data.status) {
        authStore.setAuth(data.data.token, data.data.uid)
      }
    },
    onError: (error) => {
      console.error('Social login failed:', error)
      throw error
    },
  })
}
