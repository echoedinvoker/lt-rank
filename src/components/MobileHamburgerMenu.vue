<template>
  <div class="sm:hidden relative">
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="fixed top-0 left-0 w-full h-2/3 shadow-lg z-40"
        :style="{ top: headerHeight + 'px' }">
        <div class="h-full relative overflow-hidden">
          <nav class="h-full flex flex-col justify-evenly px-12 bg-[#38A1DBF2] opacity-95">
            <!-- Navigation Buttons -->
            <button v-for="button in visibleNavButtons" :key="button.text" @click="handleNavClick(button.text)" :class="`w-full py-3 px-4 rounded-[30.5px]
            ${['登入', '登出'].includes(button.text) ? 'bg-[#c92a2e]' : 'bg-transparent'}
            text-white text-[22px] font-['Inter'] cursor-pointer transition-all hover:opacity-90`">
              {{ button.text }}
            </button>
          </nav>
          <div class="fade-mask"></div> <!-- 底部淡出效果 -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMobileHamburger } from '@/composables/useMobileHamburger'

const { isMobileMenuOpen, visibleNavButtons, handleNavClick } = useMobileHamburger()

// 動態獲取 header 高度
const headerHeight = ref(0)

onMounted(() => {
  // 假設你的 header 有 id 或 class，這裡用常見的方式獲取
  const header = document.querySelector('header') || document.querySelector('.header')
  if (header) {
    headerHeight.value = header.offsetHeight
  } else {
    // 如果找不到 header，使用預設高度
    headerHeight.value = 64 // 預設 header 高度
  }
})
</script>

<style scoped>
/* 滑動動畫：從上往下滑出，從下往上收回 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  /* 從上方隱藏位置開始 */
}

.slide-down-leave-to {
  transform: translateY(-100%);
  /* 收回到上方隱藏位置 */
}

/* 底部淡出效果 */
.fade-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  /* 淡出區域高度，可調整 */
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8));
  pointer-events: none;
  /* 確保不會阻擋點擊事件 */
}
</style>
