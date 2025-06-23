import { ref } from 'vue'

export function useTouchFeedback() {
  const isPressed = ref(false)

  // 觸摸事件處理 (移動端)
  const handleTouchStart = () => {
    isPressed.value = true
  }

  const handleTouchEnd = () => {
    // 延遲重置狀態，讓用戶能看到效果
    setTimeout(() => {
      isPressed.value = false
    }, 150)
  }

  // 滑鼠事件處理 (桌面端)
  const handleMouseEnter = () => {
    isPressed.value = true
  }

  const handleMouseLeave = () => {
    isPressed.value = false
  }

  return {
    isPressed,
    handleTouchStart,
    handleTouchEnd,
    handleMouseEnter,
    handleMouseLeave,
  }
}
