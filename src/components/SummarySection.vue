<template>
  <section class="w-full px-9">
    <!-- 內容容器 -->
    <div
      class="bg-gradient-to-b sm:bg-gradient-to-r from-[#D66B11] to-[#932C11] px-2.5 sm:px-6 py-3 sm:py-5.5 mb-18 lg:mb-32 rounded-lg sm:rounded-xl max-w-[1098px] mx-auto"
    >
      <div
        class="flex flex-col items-center justify-center sm:space-y-8 px-5 sm:px-12 pb-4 sm:pb-24 rounded bg-lines-pattern responsive-box-shadow"
      >
        <!-- 頂部裝飾圖標 -->
        <div class="flex justify-center sm:mt-9 sm:mb-3">
          <div class="w-2/3 sm:w-5/6">
            <img :src="decoDespSvg" alt="Decoration Icons" class="w-full object-cover" />
          </div>
        </div>

        <!-- 描述文字 -->
        <div
          class="w-full max-w-[647px] font-normal text-black text-base text-[16px] sm:text-[26px] text-center tracking-[0] sm:leading-9"
        >
          <template v-for="(line, index) in mainContent.description" :key="index">
            {{ line }} <br />
          </template>
        </div>

        <!-- 資訊框 -->
        <div
          class="w-full max-w-[905px] rounded-[11px] bg-white shadow-md flex items-center justify-center px-5 my-6 sm:my-0"
        >
          <div
            class="w-full max-w-[781px] py-4 font-normal text-black text-base text-[15px] sm:text-[22px] text-center tracking-[0] sm:leading-9"
          >
            {{ mainContent.infoBox }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import decoDespSvg from '@/assets/deco-desp.svg'

// 促銷內容數據
const mainContent = {
  description: [
    '每天登入，紅利任務直接開領，',
    '個人滿500紅利翻倍賺，學校上榜全校一起領獎，',
    '這不只是你個人的挑戰，更是幫學校衝排行榜的戰爭！',
    '打開 LTrust，就像打開紅利提款機——',
    '任務完成越多，紅利拿越多，',
    '立即登入，開戰吧！',
  ],
  infoBox:
    '獲得的紅利可於 09/01（一）起兌換S.E.N.S.E.I AI解題、Qbot線上題庫、AI作文批閱等豐富的學習服務，累積越多，兌換越多！敬請期待！',
  callToAction: '立即挑戰任務 ‧ 搶紅利',
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

.custom-gradient {
  background: linear-gradient(
    to bottom,
    #fcd788 33%,
    /* offset="0.33" */ #fccc6d 49%,
    /* offset="0.49" */ #fcb028 82%,
    /* offset="0.82" */ #fca000 100% /* offset="1" */
  );
}

.bg-lines-pattern {
  position: relative;
  background: linear-gradient(to bottom, #fcd788 33%, #fccc6d 49%, #fcb028 82%, #fca000 100%);
  z-index: 0;
}

.bg-lines-pattern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* SVG 背景移到 pseudo element */
  background-image: url('@/assets/bg-lines.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: opacity(0.4);
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: -1;
}
</style>

<style scoped>
/* 響應式 box-shadow */
.responsive-box-shadow {
  box-shadow: inset 0 0 0 6px rgba(77, 17, 17, 0.9);
  /* 小螢幕預設 8px */
}

/* 大螢幕時使用 16px */
@media (min-width: 640px) {
  .responsive-box-shadow {
    box-shadow: inset 0 0 0 16px rgba(77, 17, 17, 0.9);
  }
}
</style>
