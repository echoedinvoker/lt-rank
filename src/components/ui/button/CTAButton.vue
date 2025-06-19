<template>
  <div class="w-full mx-auto">
    <button
      class="cta-button relative z-30 w-full h-full mx-auto cursor-pointer flex items-center justify-center"
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
import btnMissionPage from '@/assets/btn-missionpage.svg'
import { useTouchFeedback } from '@/composables/useTouchFeedback'

const {
  isPressed,
  handleTouchStart,
  handleTouchEnd,
  handleMouseEnter,
  handleMouseLeave
} = useTouchFeedback()

// CTA 按鈕點擊處理
const handleCTAClick = () => {
  const webUrl = import.meta.env.VITE_WEB_URL || 'https://ltutor-web-uat.utiltech.tw'
  window.location.href = `${webUrl}/tasks`
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
