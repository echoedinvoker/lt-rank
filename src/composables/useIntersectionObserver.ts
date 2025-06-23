import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  initialDelay = 0, // 初始延遲時間（毫秒）
) {
  const isVisible = ref(false)
  const targetRef = ref<HTMLElement>()
  let observer: IntersectionObserver | null = null

  const checkInitialVisibility = () => {
    if (!targetRef.value) return false

    const rect = targetRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight

    return rect.top < windowHeight && rect.bottom > 0
  }

  onMounted(() => {
    if (!targetRef.value) return

    if (checkInitialVisibility()) {
      // 如果初始就可見，加入小延遲讓動畫更自然
      setTimeout(() => {
        isVisible.value = true
      }, initialDelay)
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, targetRef }
}
