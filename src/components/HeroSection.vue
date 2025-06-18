<template>
  <section class="relative">
    <!-- 骨架屏 - 在圖片載入前保持空間 -->
    <div
      v-if="!isImageLoaded"
      class="w-full min-h-[800px] bg-transparent hidden sm:block"
      :class="{ 'sm:block': true, 'block sm:hidden': false }"
    >
      <!-- 可選：添加淡淡的載入指示器 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin opacity-30"></div>
      </div>
    </div>

    <!-- 大螢幕熱氣球背景 -->
    <img
      ref="heroImage"
      src="@/assets/hero-B.png"
      alt="Hero Section"
      class="w-full h-auto object-cover min-h-[800px] hidden sm:block transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }"
      @load="onImageLoad('heroImage')"
      @error="onImageError('heroImage')"
    />
    <!-- 大螢幕熱氣球 - 左側 -->
    <img
      src="@/assets/ballon-left-B.svg"
      alt="Hot Air Balloon Left"
      class="hidden sm:block absolute top-[16%] left-[8%] w-[5%] h-auto floating-balloon-left transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }"
    />
    <!-- 大螢幕熱氣球 - 右側 -->
    <img
      src="@/assets/ballon-right-B.svg"
      alt="Hot Air Balloon Right"
      class="hidden sm:block absolute top-[11%] right-[10%] w-[13%] h-auto floating-balloon-right transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }"
    />

    <!-- 骨架屏 for 小螢幕背景 - 在圖片載入前保持空間 -->
    <div
      v-if="!isImageSmallLoaded"
      class="w-full min-h-[800px] bg-transparent sm:hidden"
      :class="{ 'sm:block': true, 'block sm:hidden': false }"
    >
      <!-- 可選：添加淡淡的載入指示器 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin opacity-30"></div>
      </div>
    </div>

    <!-- 小螢幕熱氣球背景 -->
    <img
      ref="heroImageSmall"
      src="@/assets/hero-S.png"
      alt="Hero Section"
      class="w-full h-auto object-cover sm:hidden transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }"
      @load="onImageLoad('heroImageSmall')"
      @error="onImageError('heroImageSmall')"
    />
    <!-- 小螢幕熱氣球 - 左側 -->
    <img
      src="@/assets/ballon-left-S.svg"
      alt="Hot Air Balloon Left"
      class="sm:hidden absolute top-[18%] left-[10%] w-[8%] h-auto floating-balloon-left transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }"
    />

    <!-- 小螢幕熱氣球 - 右側 -->
    <img
      src="@/assets/ballon-right-S.svg"
      alt="Hot Air Balloon Right"
      class="sm:hidden absolute top-[15%] right-[6%] w-[15%] h-auto floating-balloon-right transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const imageLoaded = ref<Array<'heroImage' | 'heroImageSmall'>>([])

const isImageLoaded = computed(() => {
  return imageLoaded.value.includes('heroImage')
})

const isImageSmallLoaded = computed(() => {
  return imageLoaded.value.includes('heroImageSmall')
})

// 預載入關鍵圖片到記憶體
onMounted(() => {
  const preloadImages = [
    '/src/assets/hero-B.png',
    '/src/assets/hero-S.png'
  ]

  preloadImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
})

const onImageLoad = (image: 'heroImage' | 'heroImageSmall') => {
  imageLoaded.value.push(image)
}

const onImageError = (image: 'heroImage' | 'heroImageSmall') => {
  console.error('Hero image failed to load')
  imageLoaded.value.push(image)
}
</script>
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
