<template>
  <Transition name="fade">
    <button
      v-show="showScrollToTop"
      aria-label="回到頂部"
      @click="scrollToTop"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      class="fixed bottom-6 right-6 z-50 bg-[#BF0244] text-white p-3 rounded-full shadow-lg/30 transition-all duration-300"
      :class="{
        'is-pressed': isPressed,
        'hover:bg-blue-700 hover:shadow-2xl/30 hover:scale-110': !isPressed,
      }"
    >
      <svg class="w-[45px] h-[45px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { useTouchFeedback } from '@/composables/useTouchFeedback'
import { useScrollUtils } from '@/composables/useScrollUtils'
import { ref, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue'

const props = defineProps<{
  section: ComponentPublicInstance | null
}>()

const showScrollToTop = ref(false)
const { scrollToTop } = useScrollUtils()

const { isPressed, handleTouchStart, handleTouchEnd, handleMouseEnter, handleMouseLeave } =
  useTouchFeedback()

const handleScroll = () => {
  if (props.section?.$el) {
    const heroBottom = props.section.$el.offsetTop + props.section.$el.offsetHeight
    showScrollToTop.value = window.scrollY > heroBottom
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 按鈕淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 按壓狀態樣式 - 使用原生 CSS */
.is-pressed {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.3); /* shadow-xl */
  transform: scale(1.1); /* scale-110 */
}

/* 保留 active 效果用於點擊反饋 */
button:active {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1); /* shadow-md */
  transform: scale(0.95) translateY(4px); /* scale-95 translate-y-1 */
}
</style>
