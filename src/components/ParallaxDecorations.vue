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
import { ref, onMounted, onUnmounted } from 'vue'

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
  enableDeviceOrientation?: boolean // 是否啟用設備方向感應
}

const props = withDefaults(defineProps<Props>(), {
  isLoaded: true,
  showParallax: true,
  maxOffset: 30,
  enableDeviceOrientation: true
})

// Parallax 狀態
const parallaxOffset = ref({ x: 0, y: 0 })
let containerElement: HTMLElement | null = null

// 檢測是否為移動設備
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 處理滑鼠移動的 Parallax 效果
const handleMouseMove = (event: MouseEvent) => {
  if (!containerElement) return

  const rect = containerElement.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // 計算滑鼠相對於中心點的位置
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  // 計算偏移量
  const offsetX = ((mouseX - centerX) / centerX) * props.maxOffset
  const offsetY = ((mouseY - centerY) / centerY) * props.maxOffset

  parallaxOffset.value = { x: offsetX, y: offsetY }
}

// 處理設備方向變化的 Parallax 效果
const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
  if (!props.enableDeviceOrientation) return

  // 獲取設備的傾斜角度 (beta: 前後傾斜, gamma: 左右傾斜)
  const beta = event.beta || 0   // 前後傾斜 (-180 到 180)
  const gamma = event.gamma || 0 // 左右傾斜 (-90 到 90)

  // 將角度轉換為偏移量
  // beta: 0度為水平，正值向前傾斜，負值向後傾斜
  // gamma: 0度為水平，正值向右傾斜，負值向左傾斜
  const offsetX = (gamma / 90) * props.maxOffset  // 左右傾斜轉換為 X 軸偏移
  const offsetY = (beta / 180) * props.maxOffset  // 前後傾斜轉換為 Y 軸偏移

  parallaxOffset.value = { x: offsetX, y: offsetY }
}
// 重置 Parallax 效果
const resetParallax = () => {
  parallaxOffset.value = { x: 0, y: 0 }
}

// 請求設備方向權限 (iOS 13+ 需要)
const requestDeviceOrientationPermission = async () => {
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.warn('無法獲取設備方向權限:', error)
      return false
    }
  }
  return true // 非 iOS 或舊版本直接返回 true
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
    // 桌面端：滑鼠事件
    if (!isMobile()) {
      containerElement.addEventListener('mousemove', handleMouseMove)
      containerElement.addEventListener('mouseleave', resetParallax)
    }

    // 移動端：設備方向事件
    if (isMobile() && props.enableDeviceOrientation) {
      const hasPermission = await requestDeviceOrientationPermission()
      if (hasPermission) {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
      } else {
        console.warn('設備方向權限被拒絕，無法啟用移動端 Parallax 效果')
      }
    }
  }
})

// 組件卸載時清理事件監聽
onUnmounted(() => {
  if (containerElement) {
    containerElement.removeEventListener('mousemove', handleMouseMove)
    containerElement.removeEventListener('mouseleave', resetParallax)
  }

  // 清理設備方向事件監聽
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
})
</script>
