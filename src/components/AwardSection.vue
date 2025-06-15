<template>
  <section class="w-full px-12 mt-48">
    <div class="bg-award px-14 py-12 max-w-[1198px] mx-auto relative">
      <!-- Absolute Header Image -->
      <div class="absolute top-0 left-1/2 bg-award-title w-[691px] h-[332px] transform -translate-x-1/2 -translate-y-1/2"></div>
      <!-- Main Content -->
      <div class="flex flex-col items-center space-y-8 px-28 py-16 pt-28">
        <!-- Tab Buttons -->
        <div class="flex justify-center gap-4 max-w-7/8 flex-wrap">
          <tempalte v-for="week in weeks" :key="week.id">
            <TabButton
              class="text-[30px] font-bold px-10 py-3 !rounded-2xl"
              :label="week.label"
              :variant="selectedWeek === week.id ? 'primary' : 'secondary'"
              @click="selectedWeek = week.id"
            />
          </tempalte>
        </div>
        <!-- Week Info -->
        <p class="font-noto-sans-tc font-normal text-white text-[28px] text-center">
          第2週 07/17(四) 中午12:00 ~ 07/23(三) 中午11:59 止
        </p>
        <!-- Award Cards -->
        <div class="grid grid-cols-[max-content_1fr_max-content_1fr] gap-4 w-full relative">
          <div class="text-card">No.1</div>
          <div class="text-card">龍騰高中</div>
          <div class="border-3 border-white rounded-md text-3xl font-bold font-noto-sans-tc py-4
            px-6 bg-[#FFFF00]">達成!!</div>
          <div class="golden-text-card flex items-center justify-center gap-2">
            <span class="text-[30px]">領取紅利</span>
            <span class="font-monda">500</span>
          </div>
          <div class="text-card col-span-2">每週個人500紅利</div>
          <div class="border-3 border-white rounded-md text-3xl font-bold font-noto-sans-tc py-4
            px-6 bg-white text-[#FF0000]">達成!!</div>
          <!-- 額外的黑白卡片，絕對定位超出容器 -->
          <div class="absolute top-0 -right-4 translate-x-full ml-4 w-auto golden-text-card-bw flex items-center justify-center gap-2">
            <span class="text-[30px]">已領取紅利</span>
            <span class="font-monda">500</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabButton from '@/components/ui/button/TabButton.vue'

const selectedWeek = ref(1)
const weeks = [
  { id: 1, label: '第1週' },
  { id: 2, label: '第2週' },
  { id: 3, label: '第3週' },
  { id: 4, label: '第4週' },
  { id: 5, label: '第5週' },
  { id: 6, label: '第6週' },
  { id: 7, label: '第7週' },
]

</script>

<style scoped>
.bg-award {
  background-image: url('@/assets/bg-award.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center
}
.bg-award-title {
  background-image: url('@/assets/bg-title-award.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center
}
</style>
