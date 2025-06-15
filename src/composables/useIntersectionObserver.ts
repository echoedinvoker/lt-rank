import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(
  threshold = 0.1, // 當元素 10% 可見時觸發
  rootMargin = '0px 0px -50px 0px' // 提前 50px 觸發
) {
  const isVisible = ref(false)
  const targetRef = ref<HTMLElement>()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // 一旦可見就停止觀察，避免重複觸發
          observer?.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isVisible, targetRef }
}
