import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { useAuthStore } from '@/stores/auth'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueQueryPlugin)

const handleSSOCallback = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const uid = urlParams.get('uid')
  const error = urlParams.get('error')

  // 處理錯誤情況
  if (error) {
    console.error('SSO 登入錯誤:', error)
    handleSSOError(error)
    clearURLParams(['error'])
    return
  }

  // 處理成功登入
  if (token && uid) {
    console.log('SSO 登入成功，設定認證狀態')

    // 使用現有的 auth store 設定認證
    const authStore = useAuthStore()
    authStore.setAuth(token, uid)

    // 清除 URL 中的敏感參數
    clearURLParams(['token', 'uid'])

    // 可選：顯示登入成功訊息
    showSuccessMessage('登入成功！')
  }
}

// 處理 SSO 錯誤
const handleSSOError = (error: string) => {
  const errorMessages: Record<string, string> = {
    'invalid_token': 'SSO 驗證失敗，請重新登入',
    'callback_failed': '登入處理失敗，請稍後再試',
    'missing_token': '登入資訊遺失，請重新登入',
    'login_failed': 'SSO 登入失敗，請重新嘗試'
  }

  const message = errorMessages[error] || 'SSO 登入失敗'

  // 顯示錯誤訊息（你可以根據專案需求調整顯示方式）
  console.error('SSO Error:', message)
  // 如果有全域的錯誤提示組件，可以在這裡使用
  // 例如：showErrorToast(message)
  alert(message) // 暫時使用 alert，建議後續改為更好的 UI 組件
}

// 清除 URL 參數
const clearURLParams = (params: string[]) => {
  const url = new URL(window.location.href)
  let hasChanges = false

  params.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      hasChanges = true
    }
  })

  if (hasChanges) {
    window.history.replaceState({}, document.title, url.toString())
  }
}

// 顯示成功訊息
const showSuccessMessage = (message: string) => {
  console.log('Success:', message)
  // 如果有全域的成功提示組件，可以在這裡使用
  // 例如：showSuccessToast(message)
}

// 在應用掛載前處理 SSO 回調
handleSSOCallback()

app.mount('#app')
