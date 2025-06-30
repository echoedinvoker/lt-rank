<template>
  <section class="relative" data-parallax-container>
    <!-- 骨架屏 - 在圖片載入前保持空間 -->
    <div v-if="!isImageLoaded" class="w-full min-h-[800px] bg-transparent hidden sm:block"
      :class="{ 'sm:block': true, 'block sm:hidden': false }"></div>

    <!-- 大螢幕熱氣球背景 -->
    <img ref="heroImage" src="@/assets/bg-intro.png" alt="Hero Section"
      class="w-full h-auto object-cover min-h-[800px] hidden sm:block transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }" @load="onImageLoad('heroImage')"
      @error="onImageError('heroImage')" />
    <!-- Parallax 裝飾圖片 - 只在大螢幕顯示 -->
    <ParallaxDecorations
      v-if="isDesktop"
      :decorations="desktopDecorations"
      :is-loaded="isImageLoaded"
      :show-parallax="isImageLoaded"
      :max-offset="30"
      class="hidden sm:block"
    />

    <!-- 大螢幕熱氣球 - 左側 -->
    <img src="@/assets/ballon-left-B.svg" alt="Hot Air Balloon Left"
      class="hidden sm:block absolute top-[16%] left-[8%] w-[5%] h-auto floating-balloon-left transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }" />
    <!-- 大螢幕熱氣球 - 右側 -->
    <img src="@/assets/ballon-right-B.svg" alt="Hot Air Balloon Right"
      class="hidden sm:block absolute top-[11%] right-[10%] w-[13%] h-auto floating-balloon-right transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }" />

    <!-- 骨架屏 for 小螢幕背景 - 在圖片載入前保持空間 -->
    <div v-if="!isImageSmallLoaded" class="w-full min-h-[800px] bg-transparent sm:hidden"
      :class="{ 'sm:block': true, 'block sm:hidden': false }">
      <!-- 可選：添加淡淡的載入指示器 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin opacity-30"></div>
      </div>
    </div>

    <!-- 小螢幕熱氣球背景 -->
    <img ref="heroImageSmall" src="@/assets/sm-intro.png" alt="Hero Section"
      class="w-full h-auto object-cover sm:hidden transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }"
      @load="onImageLoad('heroImageSmall')" @error="onImageError('heroImageSmall')" />

    <!-- 小螢幕 Parallax 裝飾圖片組件 (如果需要的話) -->
    <ParallaxDecorations
      v-if="!isDesktop && enableMobileParallax"
      :decorations="mobileDecorations"
      :is-loaded="isImageSmallLoaded"
      :show-parallax="isImageSmallLoaded"
      :max-offset="15"
      class="sm:hidden"
    />

    <!-- 小螢幕熱氣球 - 左側 -->
    <img src="@/assets/ballon-left-S.svg" alt="Hot Air Balloon Left"
      class="sm:hidden absolute top-[18%] left-[10%] w-[8%] h-auto floating-balloon-left transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }" />

    <!-- 小螢幕熱氣球 - 右側 -->
    <img src="@/assets/ballon-right-S.svg" alt="Hot Air Balloon Right"
      class="sm:hidden absolute top-[15%] right-[6%] w-[15%] h-auto floating-balloon-right transition-opacity duration-500"
      :class="{ 'opacity-0': !isImageSmallLoaded, 'opacity-100': isImageSmallLoaded }" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ParallaxDecorations from '@/components/ParallaxDecorations.vue'

const imageLoaded = ref<Array<'heroImage' | 'heroImageSmall'>>([])

const isDesktop = ref(true)
const enableMobileParallax = ref(true) // 控制是否在小螢幕啟用 Parallax

// 大螢幕裝飾圖片配置
const desktopDecorations = [
  {
    src: '/src/assets/deco-intro-03.png',
    alt: 'Decoration 3',
    speed: 0.3, // 最快移動
    duration: '500ms',
    className: 'w-[1201px]'
  },
  {
    src: '/src/assets/deco-intro-02.png',
    alt: 'Decoration 2',
    speed: 0.5, // 中等速度
    duration: '700ms',
    className: 'w-[1201px]'
  },
  {
    src: '/src/assets/deco-intro-01.png',
    alt: 'Decoration 1',
    speed: 0.7, // 最慢移動
    duration: '1000ms',
    className: 'w-[1201px]'
  }
]

// 小螢幕裝飾圖片配置 (可選)
const mobileDecorations = [
  {
    src: '/src/assets/sm-deco-1.png',
    alt: 'machine image',
    speed: 0.3,
    duration: '500ms',
    className: 'w-full max-w-[360px]'
  },
  {
    src: '/src/assets/sm-deco-2.png',
    alt: 'Lucky seven image',
    speed: 0.5,
    duration: '700ms',
    className: 'w-full max-w-[171px] pb-[270px]'
  },
  {
    src: '/src/assets/sm-deco-3.png',
    alt: 'Text image',
    speed: 0.7,
    duration: '1000ms',
    className: 'w-full max-w-[278px] pb-[170px]'
  },
]

const isImageLoaded = computed(() => {
  return imageLoaded.value.includes('heroImage')
})

const isImageSmallLoaded = computed(() => {
  return imageLoaded.value.includes('heroImageSmall')
})

// 檢測螢幕尺寸
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 640 // sm breakpoint
}

// 預載入關鍵圖片到記憶體
onMounted(() => {
  // 註冊螢幕尺寸變化監聽器 for responsive design
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  const preloadImages = [
    '/src/assets/bg-intro.png',
    '/src/assets/deco-intro-01.png',
    '/src/assets/deco-intro-02.png',
    '/src/assets/deco-intro-03.png',
    '/src/assets/sm-intro.png',
    '/src/assets/sm-deco-1.png',
    '/src/assets/sm-deco-2.png',
    '/src/assets/sm-deco-3.png',
    '/src/assets/ballon-left-B.svg',
    '/src/assets/ballon-right-B.svg',
    '/src/assets/ballon-left-S.svg',
    '/src/assets/ballon-right-S.svg',
  ]

  preloadImages.forEach((src) => {
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
  animation: float-right 3.5s ease-in-out infinite 0.5s;
  /* 延遲0.5秒開始 */
}

@keyframes float-left {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes float-right {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}
</style>
