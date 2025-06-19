import { ref, computed } from 'vue'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useAuthStore } from '@/stores/auth'
import { useMainComponent } from '@/composables/useMainComponent'

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
  login: { text: '登入', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
  logout: { text: '登出', color: 'bg-[#c92a2e]', variant: 'destructive' as const }
}

export function useMobileHamburger() {
  const authStore = useAuthStore()
  const { openLoginDialog } = useLoginDialog()
  const { forceShowSection: forceShowMainSection } = useMainComponent()

  // 根據登入狀態決定顯示的按鈕
  const visibleNavButtons = computed(() => {
    const authButton = authStore.isAuthenticated ? authButtons.logout : authButtons.login
    return [...navButtons, authButton]
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
    await new Promise(resolve => setTimeout(resolve, 800))

    const element = document.getElementById(sectionId)

    if (element) {
      // 重新計算元素位置，因為 LazySection 可能改變了佈局
      const elementRect = element.getBoundingClientRect()
      const elementPosition = window.scrollY + elementRect.top

      // 動態獲取 header 高度
      const headerElement = document.querySelector('.header') as HTMLElement
      const headerHeight = headerElement ? headerElement.offsetHeight : 0

      // 計算目標位置，只減去 header 高度加一點 padding
      const offsetPosition = Math.max(0, elementPosition - headerHeight - 20) // 確保不會是負數

      // 計算滾動距離
      const currentPosition = window.scrollY
      const distance = Math.abs(offsetPosition - currentPosition)

      // 根據距離計算滾動時間 (最小300ms，最大1500ms)
      const duration = Math.min(Math.max(distance / 3, 300), 1500)

      // 自定義平滑滾動動畫
      smoothScrollTo(offsetPosition, duration)
    }
  }

  // 自定義平滑滾動函數
  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // 使用 easeInOutCubic 緩動函數讓滾動更自然
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  // 處理導航按鈕點擊 (與 TheHeader.vue 保持一致的邏輯)
  const handleNavClick = (buttonText: string) => {

    // 關閉選單
    if (isMobileMenuOpen.value) {
      toggleMobileMenu()
    }

    if (buttonText === '登入') {
      openLoginDialog() // 使用 composable 開啟登入對話框
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
    smoothScrollTo, // export for scrollToTop
  }
}
