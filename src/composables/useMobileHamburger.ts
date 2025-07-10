import { ref, computed } from 'vue'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useAuthStore } from '@/stores/auth'
import { useMainComponent } from '@/composables/useMainComponent'
import { useScrollUtils } from '@/composables/useScrollUtils'

const sectionIdMap = {
  校際戰績: 'school-section',
  個人成就: 'personal-section',
  紅利領取: 'award-section',
  活動辦法: 'rule-section',
}

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
  login: [
    {text: '登入', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
    {text: '註冊', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
  ],
  logout: [{ text: '登出', color: 'bg-[#c92a2e]', variant: 'destructive' as const }],
}

export function useMobileHamburger() {
  const authStore = useAuthStore()
  // const { openLoginDialog } = useLoginDialog()
  const { forceShowSection: forceShowMainSection } = useMainComponent()
  const { scrollToElement } = useScrollUtils()

  // 根據登入狀態決定顯示的按鈕
  const visibleNavButtons = computed(() => {
    const authButton = authStore.isAuthenticated ? authButtons.logout : authButtons.login
    return [...navButtons, ...authButton]
  })

  // 切換手機選單顯示狀態 //
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  // 滾動到指定 section (支援 LazySection)
  const scrollToSection = async (sectionId: string) => {
    // 先強制顯示 LazySection
    forceShowMainSection(sectionId)

    // 等待 DOM 更新和動畫完成
    await new Promise((resolve) => setTimeout(resolve, 800))

    // 動態獲取 header 高度
    const headerElement = document.querySelector('.header') as HTMLElement
    const headerHeight = headerElement ? headerElement.offsetHeight : 0
    const offset = headerHeight + 40 // header 高度加一點 padding

    scrollToElement(sectionId, offset)
  }

  // 處理導航按鈕點擊 (與 TheHeader.vue 保持一致的邏輯)
  const handleNavClick = (buttonText: string) => {
    // 關閉選單
    if (isMobileMenuOpen.value) {
      toggleMobileMenu()
    }

    if (buttonText === '登入') {
      // openLoginDialog() // 使用 composable 開啟登入對話框
      window.location.href = 'https://vendor.ltrust.tw/login?vendor=4a4da231-c514-47d2-93f6-7be70c770a84'
    } else if (buttonText === '註冊') {
      window.location.href = 'https://ltrust.tw/signup'
    } else if (buttonText === '登出') {
      authStore.clearAuth()
    } else {
      const sectionId = sectionIdMap[buttonText as keyof typeof sectionIdMap]

      if (sectionId) {
        scrollToSection(sectionId)
      }
    }
  }

  return {
    // 狀態
    isMobileMenuOpen,
    visibleNavButtons,

    // 方法
    toggleMobileMenu,
    handleNavClick,
    scrollToSection,
  }
}
