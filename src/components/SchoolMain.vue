<template>
  <div class="flex items-center justify-around w-full gap-8 relative z-10">
    <TabButton>校際戰績</TabButton>
    <TabButton variant="secondary">上週戰績</TabButton>
  </div>
  <p class="font-noto-sans-tc font-bold text-[#ffff00] text-3xl text-center pb-3">
    第2週 07/17(四) 中午12:00 ~ 07/23(三) 中午11:59 止
  </p>
  <div class="grid grid-cols-[max-content_1fr_max-content_1fr] gap-4 justify-items-center items-center w-full">
    <template v-for="item in items" :key="item.id">
      <div class="text-card">{{ item.rank }}</div>
      <div class="text-card">{{ item.school }}</div>
      <div class="bold-text px-2">累積紅利</div>
      <div class="golden-text-card">{{ item.grade }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabButton from '@/components/ui/button/TabButton.vue'

const items = ref([
  { id: 1, rank: 'No.1', school: '龍騰高中', grade: '19,999,999' },
  { id: 2, rank: 'No.2', school: '鳳凰高中', grade: '19,999,999' },
  { id: 3, rank: 'No.3', school: '白鷺高中', grade: '19,999,999' },
  { id: 4, rank: 'No.4', school: '黑豹高中', grade: '19,999,999' },
])
</script>

<style scoped>
.bg-lines-pattern {
  background-image:
    url('@/assets/bg-lines-2.svg'), linear-gradient(to bottom, #d66b11 0%, #932c11 100%);
  background-blend-mode: overlay;
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
}
</style>
