import { ref, reactive } from 'vue'
import { useLogin } from './useLogin'
import type { LoginRequest } from '@/api/auth'

const showLoginModal = ref(false)
const loginError = ref('')

const loginForm = reactive<LoginRequest>({
  account: '',
  password: '',
})

export function useLoginDialog() {
  const loginMutation = useLogin()

  const openLoginDialog = () => {
    showLoginModal.value = true
    // 清空之前的錯誤訊息和表單
    loginError.value = ''
    loginForm.account = ''
    loginForm.password = ''
  }

  // 關閉登入對話框
  const closeLoginDialog = () => {
    showLoginModal.value = false
    loginError.value = ''
  }

  // 處理登入提交
  const handleLogin = async () => {
    if (!loginForm.account || !loginForm.password) {
      loginError.value = '請輸入帳號和密碼'
      return
    }

    try {
      loginError.value = ''

      await loginMutation.mutateAsync(loginForm)

      // 登入成功，關閉彈窗
      closeLoginDialog()
      console.log('登入成功')
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        loginError.value = apiError.response?.data?.message || '登入失敗'
      } else {
        loginError.value = '登入失敗'
      }
    }
  }

  return {
    // 狀態
    showLoginModal,
    loginError,
    loginForm,
    isLoading: loginMutation.isPending,

    // 方法
    openLoginDialog,
    closeLoginDialog,
    handleLogin,
  }
}
