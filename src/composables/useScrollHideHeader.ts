import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue'

export function useScrollHideHeader(isMobileMenuOpen: Ref<boolean>) {
  const lastScrollY = ref(0)
  const isScrollingDown = ref(false)
  const scrollThreshold = 10 // 滾動閾值，避免小幅滾動觸發

  // 檢查是否為小螢幕 (< 1024px, lg breakpoint)
  const isMobile = ref(window.innerWidth < 1024)

  // 只有在小螢幕且選單未開啟時才隱藏 header
  const isHeaderHidden = computed(() => {
    return isMobile.value && !isMobileMenuOpen.value && isScrollingDown.value
  })

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // 計算滾動差值
    const scrollDiff = currentScrollY - lastScrollY.value

    // 只有滾動距離超過閾值才觸發
    if (Math.abs(scrollDiff) > scrollThreshold) {
      isScrollingDown.value = scrollDiff > 0 && currentScrollY > 100 // 頁面頂部 100px 內不隱藏
      lastScrollY.value = currentScrollY
    }
  }

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024
    // 如果切換到桌面版，確保 header 顯示
    if (!isMobile.value) {
      isScrollingDown.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    lastScrollY.value = window.scrollY
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })

  return {
    isHeaderHidden
  }
}
