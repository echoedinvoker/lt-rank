export function useScrollUtils() {
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

  // 計算滾動時間 (根據距離動態調整)
  const calculateScrollDuration = (distance: number, minDuration = 400, maxDuration = 1500, speedFactor = 3) => {
    return Math.min(Math.max(distance / speedFactor, minDuration), maxDuration)
  }

  // 滾動到頂部
  const scrollToTop = () => {
    const currentPosition = window.scrollY
    const duration = calculateScrollDuration(currentPosition)
    smoothScrollTo(0, duration)
  }

  // 滾動到指定元素
  const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId)
    if (!element) return false

    const elementRect = element.getBoundingClientRect()
    const elementPosition = window.scrollY + elementRect.top
    const targetPosition = Math.max(0, elementPosition - offset)

    const currentPosition = window.scrollY
    const distance = Math.abs(targetPosition - currentPosition)
    const duration = calculateScrollDuration(distance)

    smoothScrollTo(targetPosition, duration)
    return true
  }

  return {
    smoothScrollTo,
    calculateScrollDuration,
    scrollToTop,
    scrollToElement
  }
}
