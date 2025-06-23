import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const uid = ref<string | null>(localStorage.getItem('user_uid'))

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userUid = computed(() => uid.value)

  // Actions
  const setAuth = (newToken: string, newUid: string) => {
    token.value = newToken
    uid.value = newUid

    // 持久化到 localStorage
    localStorage.setItem('auth_token', newToken)
    localStorage.setItem('user_uid', newUid)
  }

  const clearAuth = () => {
    token.value = null
    uid.value = null

    // 清除 localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_uid')
  }

  // 驗證 token 有效性
  const validateAuth = async (): Promise<boolean> => {
    if (!token.value) return false

    try {
      const isValid = await authApi.validateToken()
      if (!isValid) {
        clearAuth()
      }
      return isValid
    } catch {
      clearAuth()
      return false
    }
  }

  return {
    // State
    token,
    uid,

    // Getters
    isAuthenticated,
    userUid,

    // Actions
    setAuth,
    clearAuth,
    validateAuth,
  }
})
