<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none" v-if="showParallax">
    <!-- 動態渲染裝飾圖片 -->
    <div
      v-for="(decoration, index) in decorations"
      :key="index"
      class="absolute inset-0 flex items-center justify-center"
    >
      <img
        :src="decoration.src"
        :alt="decoration.alt"
        :class="[
          'transition-transform ease-out',
          decoration.className || 'w-[1201px]',
          { 'opacity-0': !isLoaded, 'opacity-100': isLoaded }
        ]"
        :style="{
          transform: `translate(${parallaxOffset.x * decoration.speed}px, ${parallaxOffset.y * decoration.speed}px)`,
          transitionDuration: decoration.duration || '500ms'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 定義裝飾圖片的類型
interface DecorationItem {
  src: string
  alt: string
  speed: number // Parallax 移動速度倍數
  duration?: string // 過渡動畫時間
  className?: string // 自定義樣式類
}

// Props 定義
interface Props {
  decorations: DecorationItem[]
  isLoaded?: boolean
  showParallax?: boolean
  maxOffset?: number // 最大偏移量
}

const props = withDefaults(defineProps<Props>(), {
  isLoaded: true,
  showParallax: true,
  maxOffset: 30,
})
// Parallax 狀態
const parallaxOffset = ref({ x: 0, y: 0 })
let containerElement: HTMLElement | null = null

const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})

// 動態調整最大偏移量 - 手機端增加靈敏度
const dynamicMaxOffset = computed(() => {
  return isMobile.value ? props.maxOffset * 1.5 : props.maxOffset // 手機端增加 50% 靈敏度
})

// 統一處理位置計算的函數
const calculateOffset = (clientX: number, clientY: number) => {
  if (!containerElement) return

  const rect = containerElement.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // 計算相對於中心點的位置
  const posX = clientX - rect.left
  const posY = clientY - rect.top

  // 計算偏移量
  const offsetX = ((posX - centerX) / centerX) * dynamicMaxOffset.value
  const offsetY = ((posY - centerY) / centerY) * dynamicMaxOffset.value

  parallaxOffset.value = { x: offsetX, y: offsetY }
}

// 處理滑鼠移動的 Parallax 效果
const handleMouseMove = (event: MouseEvent) => {
  calculateOffset(event.clientX, event.clientY)
}

// 處理觸控移動的 Parallax 效果
const handleTouchMove = (event: TouchEvent) => {
  const touch = event.touches[0]
  if (touch) {
    calculateOffset(touch.clientX, touch.clientY)
  }
  // 移除 preventDefault() 以避免影響正常滾動
}

// 新增：觸控開始時也觸發 parallax
const handleTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  if (touch) {
    calculateOffset(touch.clientX, touch.clientY)
  }
}

// 重置 Parallax 效果
const resetParallax = () => {
  parallaxOffset.value = { x: 0, y: 0 }
}

// 組件掛載時設置事件監聽
onMounted(async () => {
  // 找到父容器元素
  containerElement = document.querySelector('[data-parallax-container]') as HTMLElement
  if (!containerElement) {
    // 如果沒有找到指定容器，使用父元素
    containerElement = document.querySelector('section') as HTMLElement
  }

  if (containerElement) {
    // 桌面端事件
    containerElement.addEventListener('mousemove', handleMouseMove)
    containerElement.addEventListener('mouseleave', resetParallax)

    // 手機端觸控事件
    containerElement.addEventListener('touchstart', handleTouchStart, { passive: true })
    containerElement.addEventListener('touchmove', handleTouchMove, { passive: false })
    containerElement.addEventListener('touchend', resetParallax)
    containerElement.addEventListener('touchcancel', resetParallax)
  }
})

// 組件卸載時清理事件監聽
onUnmounted(() => {
  if (containerElement) {
    // 清理桌面端事件
    containerElement.removeEventListener('mousemove', handleMouseMove)
    containerElement.removeEventListener('mouseleave', resetParallax)

    // 清理手機端事件
    containerElement.removeEventListener('touchstart', handleTouchStart)
    containerElement.removeEventListener('touchmove', handleTouchMove)
    containerElement.removeEventListener('touchend', resetParallax)
    containerElement.removeEventListener('touchcancel', resetParallax)
  }
})
</script>
