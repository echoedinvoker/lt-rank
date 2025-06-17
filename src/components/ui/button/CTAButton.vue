<template>
  <div class="w-full mx-auto h-[125px]">
    <button
      class="cta-button relative z-50 w-full h-full mx-auto cursor-pointer flex items-center justify-center"
      :class="{ 'is-active': isPressed }"
      @click="handleCTAClick"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <!-- 按鈕背景 -->
      <img :src="btnMissionPage" alt="Mission Button Background"
        class="absolute inset-0 w-full object-cover transition-all duration-200" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import btnMissionPage from '@/assets/btn-missionpage.svg'

const isPressed = ref(false)

// CTA 按鈕點擊處理
const handleCTAClick = () => {
  console.log('CTA button clicked!')
}

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
</script>

<style scoped>
.cta-button {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

/* 使用 class 替代 hover 偽類 */
.cta-button.is-active {
  transform: scale(1.05);
}

.cta-button.is-active img {
  filter: brightness(1.1);
}

/* 保留 active 效果用於點擊反饋 */
.cta-button:active {
  transform: scale(0.98);
}

.cta-button:active img {
  filter: brightness(0.9);
}
</style>
