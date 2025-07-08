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

    // 更嚴格的可見性檢查：元素頂部必須完全進入視窗且有足夠的可見區域
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const elementHeight = rect.height
    const visibleRatio = visibleHeight / elementHeight

    // 只有當可見比例達到 threshold 且元素頂部在視窗內時才認為初始可見
    return visibleRatio >= threshold && rect.top < windowHeight * 0.8
  }

  onMounted(() => {
    if (!targetRef.value) return

    // 總是設置 observer，即使初始可見也要監聽
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible.value) {
            isVisible.value = true
          }
          // 一旦觸發就停止觀察
          observer?.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(targetRef.value)

    // 檢查初始可見性，如果可見則立即顯示
    if (checkInitialVisibility()) {
      setTimeout(() => {
        isVisible.value = true
        // 添加類型檢查確保 targetRef.value 存在
        if (targetRef.value && observer) {
          observer.unobserve(targetRef.value)
        }
      }, initialDelay)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, targetRef }
}

