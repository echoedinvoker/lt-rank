import { ref, reactive } from 'vue'
import { useLogin, useSocialLogin } from './useLogin'
import type { LoginRequest } from '@/api/auth'

const showLoginModal = ref(false)
const loginError = ref('')

const loginForm = reactive<LoginRequest>({
  account: '',
  password: '',
})

export function useLoginDialog() {
  const loginMutation = useLogin()
  const socialLoginMutation = useSocialLogin()

  const openLoginDialog = () => {
    showLoginModal.value = true
    loginError.value = ''
    loginForm.account = ''
    loginForm.password = ''
  }

  const closeLoginDialog = () => {
    showLoginModal.value = false
    loginError.value = ''
  }

  const handleLogin = async () => {
    if (!loginForm.account || !loginForm.password) {
      loginError.value = '請輸入帳號和密碼'
      return
    }

    try {
      loginError.value = ''
      await loginMutation.mutateAsync(loginForm)
      closeLoginDialog()
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        loginError.value = apiError.response?.data?.message || '登入失敗'
      } else {
        loginError.value = '登入失敗'
      }
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'line' | 'facebook') => {
    try {
      loginError.value = ''
      await socialLoginMutation.mutateAsync(provider)
      closeLoginDialog()
      console.log(`${provider} 登入成功`)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        loginError.value = apiError.response?.data?.message || `${provider} 登入失敗`
      } else {
        loginError.value = `${provider} 登入失敗`
      }
    }
  }

  return {
    // 狀態
    showLoginModal,
    loginError,
    loginForm,
    isLoading: loginMutation.isPending.value || socialLoginMutation.isPending.value,

    // 方法
    openLoginDialog,
    closeLoginDialog,
    handleLogin,
    handleSocialLogin,
  }
}
