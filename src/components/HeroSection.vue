<template>
  <section>
    <img
      src="@/assets/hero-B.png"
      alt="Hero Section"
      class="w-full h-auto object-cover min-h-[800px] hidden sm:block"
      loading="lazy"
    />
    <!-- 大螢幕熱氣球 - 左側 -->
    <img
      src="@/assets/ballon-left-B.svg"
      alt="Hot Air Balloon Left"
      class="hidden sm:block absolute top-[16%] left-[8%] w-[5%] h-auto floating-balloon-left"
      loading="lazy"
    />
    <!-- 大螢幕熱氣球 - 右側 -->
    <img
      src="@/assets/ballon-right-B.svg"
      alt="Hot Air Balloon Right"
      class="hidden sm:block absolute top-[11%] right-[10%] w-[13%] h-auto floating-balloon-right"
      loading="lazy"
    />

    <img
      src="@/assets/hero-S.png"
      alt="Hero Section"
      class="w-full h-auto object-cover sm:hidden"
      loading="lazy"
    />
    <!-- 小螢幕熱氣球 - 左側 -->
    <img
      src="@/assets/ballon-left-S.svg"
      alt="Hot Air Balloon Left"
      class="sm:hidden absolute top-[18%] left-[10%] w-[8%] h-auto floating-balloon-left"
      loading="lazy"
    />

    <!-- 小螢幕熱氣球 - 右側 -->
    <img
      src="@/assets/ballon-right-S.svg"
      alt="Hot Air Balloon Right"
      class="sm:hidden absolute top-[15%] right-[6%] w-[15%] h-auto floating-balloon-right"
      loading="lazy"
    />
  </section>
</template>

<style scoped>
/* 左側熱氣球漂浮動畫 - 較慢的節奏 */
.floating-balloon-left {
  animation: float-left 4s ease-in-out infinite;
}

/* 右側熱氣球漂浮動畫 - 較快的節奏，增加變化 */
.floating-balloon-right {
  animation: float-right 3.5s ease-in-out infinite 0.5s; /* 延遲0.5秒開始 */
}

@keyframes float-left {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes float-right {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
