<template>
  <div class="w-full max-w-[795px] mx-auto mb-8 h-8">
    <button
      class="cta-button relative w-full max-w-[793px] h-[139px] mx-auto cursor-pointer flex items-center justify-center"
      @click="handleCTAClick">
      <!-- 按鈕背景 -->
      <img :src="btnMissionPage" alt="Mission Button Background"
        class="absolute inset-0 w-full object-cover transition-all duration-200" />
    </button>
  </div>
</template>

<script setup lang="ts">
import btnMissionPage from '@/assets/btn-missionpage.svg'

// CTA 按鈕點擊處理
const handleCTAClick = () => {
  // 在這裡添加按鈕點擊邏輯
  console.log('CTA button clicked!')
  // 例如：導航到任務頁面或打開彈窗
}
</script>

<style scoped>
.cta-button {
  /* hover 效果：放大並增加陰影 */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  /* 輕微放大 */
}

.cta-button:hover img {
  filter: brightness(1.1);
  /* 背景圖片稍微變亮 */
}

.cta-button:hover div {
  transform: translateY(-2px);
  /* 文字稍微上移 */
}

/* active 效果：按下時縮小 */
.cta-button:active {
  transform: scale(0.98);
  /* 按下時縮小 */
}

.cta-button:active img {
  filter: brightness(0.9);
  /* 背景圖片稍微變暗 */
}

.cta-button:active div {
  transform: translateY(1px);
  /* 文字稍微下移，模擬按下效果 */
}
</style>
