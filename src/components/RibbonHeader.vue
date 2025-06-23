<template>
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4/9 lg:-translate-y-1/3 w-[105%] h-48 sm:h-92 z-10 bg-center bg-no-repeat flex items-start justify-between px-[27px]"
    :style="{
      backgroundImage: `url(${title === 'school' ? bgTitleSchoolFullSvg : bgTitlePersonalFullSvg})`,
      backgroundSize: '100% 100%',
    }"
  ></div>
</template>

<script setup lang="ts">
import bgTitleSchoolFullSvg from '@/assets/bg-title-school-full.svg'
import bgTitlePersonalFullSvg from '@/assets/bg-title-personal-full.svg'

defineProps({
  title: {
    type: String,
    default: 'school',
  },
})
</script>
