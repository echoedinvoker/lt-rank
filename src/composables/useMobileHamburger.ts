import { ref, computed } from 'vue'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useAuthStore } from '@/stores/auth'

// 手機選單狀態
const isMobileMenuOpen = ref(false)

// 導航按鈕配置 (與 TheHeader.vue 保持一致)
const navButtons = [
  { text: '校際戰績', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '個人成就', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '紅利領取', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '活動辦法', color: 'bg-[#38a1db]', variant: 'default' as const },
]

const authButtons = {
  login: { text: '登入', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
  logout: { text: '登出', color: 'bg-[#c92a2e]', variant: 'destructive' as const }
}

export function useMobileHamburger() {
  // 使用 composables
  const authStore = useAuthStore()
  const { openLoginDialog } = useLoginDialog()

  // 根據登入狀態決定顯示的按鈕
  const visibleNavButtons = computed(() => {
    const authButton = authStore.isAuthenticated ? authButtons.logout : authButtons.login
    return [...navButtons, authButton]
  })

  // 切換手機選單顯示狀態 //
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  // 處理導航按鈕點擊 (與 TheHeader.vue 保持一致的邏輯)
  const handleNavClick = (buttonText: string) => {
    // 關閉選單
    toggleMobileMenu()

    if (buttonText === '登入') {
      openLoginDialog() // 使用 composable 開啟登入對話框
    } else if (buttonText === '登出') {
      authStore.clearAuth()
    } else {
      console.log(`Clicked: ${buttonText}`)
      // 這裡可以加入其他按鈕的處理邏輯
    }
  }

  return {
    // 狀態
    isMobileMenuOpen,
    visibleNavButtons,

    // 方法
    toggleMobileMenu,
    handleNavClick,
  }
}
