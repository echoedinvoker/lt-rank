import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  initialDelay = 0,
) {
  const isVisible = ref(false)
  const targetRef = ref<HTMLElement>()
  let observer: IntersectionObserver | null = null

  const checkInitialVisibility = () => {
    if (!targetRef.value) return false

    const rect = targetRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const elementHeight = rect.height
    const visibleRatio = visibleHeight / elementHeight

    const isInitiallyVisible = visibleRatio >= threshold && rect.top < windowHeight * 0.8

    // Debug 訊息
    // console.log('🔍 Initial Visibility Check:', {
    //   elementHeight,
    //   visibleHeight,
    //   visibleRatio,
    //   threshold,
    //   rectTop: rect.top,
    //   windowHeight,
    //   maxTop: windowHeight * 0.8,
    //   isInitiallyVisible,
    //   userAgent: navigator.userAgent
    // })

    return isInitiallyVisible
  }

  onMounted(() => {
    if (!targetRef.value) return

    // console.log('🚀 Setting up IntersectionObserver for:', targetRef.value.className)

    // 使用更寬鬆的配置以提高跨平台兼容性
    observer = new IntersectionObserver(
      ([entry]) => {
        // console.log('👁️ IntersectionObserver triggered:', {
        //   isIntersecting: entry.isIntersecting,
        //   intersectionRatio: entry.intersectionRatio,
        //   boundingClientRect: entry.boundingClientRect,
        //   rootBounds: entry.rootBounds,
        //   isVisible: isVisible.value,
        //   userAgent: navigator.userAgent
        // })

        if (entry.isIntersecting && !isVisible.value) {
          // console.log('✅ Element became visible via IntersectionObserver')
          isVisible.value = true
          observer?.unobserve(entry.target)
        }
      },
      {
        threshold: [0, threshold], // 使用多個閾值
        rootMargin
      },
    )

    observer.observe(targetRef.value)

    // 檢查初始可見性，如果可見則立即顯示
    if (checkInitialVisibility()) {
      // console.log('⚡ Element initially visible, showing immediately')
      setTimeout(() => {
        if (!isVisible.value) {
          isVisible.value = true
          if (targetRef.value && observer) {
            observer.unobserve(targetRef.value)
          }
        }
      }, initialDelay)
    }

    // 添加滾動事件監聽作為備用方案
    const handleScroll = () => {
      if (!isVisible.value && targetRef.value) {
        const rect = targetRef.value.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // 更寬鬆的可見性檢查
        if (rect.top < windowHeight && rect.bottom > 0) {
          // console.log('📜 Element became visible via scroll backup')
          isVisible.value = true
          window.removeEventListener('scroll', handleScroll)
          observer?.unobserve(targetRef.value)
        }
      }
    }

    // 添加滾動監聽作為備用
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 清理函數
    const cleanup = () => {
      window.removeEventListener('scroll', handleScroll)
    }

    // 保存清理函數到 observer 對象上
    if (observer) {
      (observer as any).cleanup = cleanup
    }
  })

  onUnmounted(() => {
    if (observer) {
      (observer as any).cleanup?.()
      observer.disconnect()
    }
  })

  return { isVisible, targetRef }
}

