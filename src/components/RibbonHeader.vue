<template>
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 w-[120%] h-72 z-10 bg-center bg-no-repeat flex items-start justify-between px-[27px]"
    :style="{
      backgroundImage: `url(${ribbonSvg})`,
      backgroundSize: '100% 100%',
    }">
    <div class="transform -translate-y-[80px] ml-[64px] relative">
      <img :src="leftBuildingShadowSvg" alt="Left Building shadow"
        class="absolute -right-[32px] bottom-0 h-[12px] object-right object-cover overflow-visible opacity-20 z-0" />
      <img :src="leftBuildingNoShadowImg" alt="Left Building"
        class="h-[158px] object-right object-cover overflow-visible relative z-10" />
    </div>
    <h2 class="z-10 text-6xl font-black font-noto-sans-tc text-white mt-8 flex justify-evenly items-center grow">
      <div></div>
      <template v-for="(char, ind) in title.split('')" :key="ind">
        <div>{{ char }}</div>
      </template>
      <div></div>
    </h2>
    <div class="h-[158px] transform -translate-y-[38px] mr-[64px] flex justify-start">
      <img :src="rightBuildingImg" alt="Right Building" class="h-[158px] object-left object-cover overflow-visible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ribbonSvg from '@/assets/ribbon.svg'
import rightBuildingImg from '@/assets/img-building-right.png'
import leftBuildingNoShadowImg from '@/assets/left-building-no-shadow.png'
import leftBuildingShadowSvg from '@/assets/left-building-shadow.svg'

defineProps({
  title: {
    type: String,
    default: '校際戰績',
  },
})
</script>
