<template>
  <div class="flex items-center smooth-transition">
    <LogoIcon
      class="cursor-pointer transition hover:scale-105 active:scale-95"
      :class="{ 'is-active': isPressedLogo }"
      @click="handleLogoClick"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script setup lang="ts">
import { useTouchFeedback } from '@/composables/useTouchFeedback'
import LogoIcon from '@/components/ui/icon/LogoIcon.vue'

const {
  isPressed: isPressedLogo,
  handleTouchStart,
  handleTouchEnd,
  handleMouseEnter,
  handleMouseLeave,
} = useTouchFeedback()

const handleLogoClick = () => {
  // Handle logo click event, e.g., navigate to home page
  const webUrl = import.meta.env.VITE_WEB_URL || 'https://ltutor-web-uat.utiltech.tw'
  window.location.href = webUrl
}
</script>

<style scoped>
.logo-button {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

/* 使用 class 替代 hover 偽類 */
.logo-button.is-active {
  transform: scale(1.05);
}

.logo-button.is-active img {
  filter: brightness(1.1);
}

/* 保留 active 效果用於點擊反饋 */
.logo-button:active {
  transform: scale(0.98);
}

.logo-button:active img {
  filter: brightness(0.9);
}
</style>
