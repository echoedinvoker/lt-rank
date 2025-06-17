<template>
  <section class="w-full sm:px-9 mt-12 sm:mt-48 mb-4">
    <div class="bg-award px-12 sm:px-14 py-16 max-w-[1198px] mx-auto relative">
      <!-- Absolute Header Image -->
      <div class="absolute top-0 left-1/2 bg-award-title w-[285px] h-[137px] sm:w-[488px] sm:h-[235px]
        lg:w-[691px] lg:h-[332px] transform -translate-x-1/2 -translate-y-1/4 sm:-translate-y-1/3 lg:-translate-y-1/2">
      </div>
      <!-- Main Content -->
      <div class="flex flex-col items-center space-y-1.5 sm:space-y-8 lg:px-28 py-16 pb-8 pt-12 sm:pt-28
        sm:pb-32 lg:pb-16">
        <p class="font-noto-sans-tc font-base text-white sm:hidden">選擇週次</p>
        <!-- Tab Buttons -->
        <div class="flex justify-center gap-1 sm:gap-4 max-w-7/8 sm:flex-wrap w-full">
          <template v-for="weekConfig in activityWeeks" :key="weekConfig.week">
            <div>
              <TabButton class="hidden lg:block text-[30px] font-bold px-10 py-3 !rounded-2xl"
                :label="`第${weekConfig.week}週`"
                :variant="selectedWeek.week === weekConfig.week ? 'primary' : 'secondary'"
                @click="handleClick(weekConfig)" />
              <button
                @click="handleClick(weekConfig)"
                :class="`lg:hidden w-7.5 h-7.5 sm:w-16 sm:h-16  rounded flex items-center justify-center
                border-2 sm:border-3 sm:text-lg
                ${selectedWeek.week === weekConfig.week
                  ? 'bg-white text-black border-black'
                  : 'bg-black text-white border-white cursor-pointer hover:bg-gray-800 active:bg-gray-700'
                }`">{{ weekConfig.week.toString() }}</button>
            </div>
          </template>
        </div>
        <!-- Week Info -->
        <p class="font-noto-sans-tc font-normal text-white text-base sm:text-[28px] text-center">
          {{ selectedWeekText }}
        </p>
        <!-- Award Cards -->
        <div class="grid grid-cols-[min-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr]
          gap-1.5 sm:gap-4 w-full relative max-w-[270px] sm:max-w-[480px] lg:max-w-[1098px]
          items-center">
          <div class="text-card">No.1</div>
          <div class="text-card">龍騰高中</div>
          <div class="border-3 border-white rounded-md text-center text-base sm:text-3xl font-bold
            font-noto-sans-tc py-1 sm:py-4 px-6
            bg-[#FFFF00] col-span-2 lg:col-span-1 text-nowrap">
            達成!!
          </div>
          <div class="golden-text-card flex items-center justify-center gap-2 col-span-2
            lg:col-span-1 py-4 sm:py-6 lg:py-4 mt-1.5 lg:mt-0">
            <span class="text-[22px] sm:text-[30px]">領取紅利</span>
            <span class="font-monda text-[24px] sm:text-[38px]">500</span>
          </div>

          <div class="lg:hidden golden-text-card-bw flex items-center justify-center gap-2
            col-span-2 py-4 sm:py-6 lg:py-4
            mt-1.5 lg:mt-0
            lg:col-span-1">
            <span class="text-[22px] sm:text-[30px]">已領取紅利</span>
            <span class="font-monda text-[24px] sm:text-[38px]">500</span>
          </div>

          <div class="text-card col-span-2 mt-8 lg:mt-0">每週個人500紅利</div>
          <div class="border-3 border-white rounded-md text-center text-base sm:text-3xl font-bold font-noto-sans-tc py-1 sm:py-4 px-6
            bg-white text-[#FF0000] col-span-2 lg:col-span-1 text-nowrap">
            達成!!
          </div>

          <!-- 額外的黑白卡片，絕對定位超出容器 -->
          <div class="hidden absolute top-0 -right-4 translate-x-full ml-4 w-auto golden-text-card-bw
            items-center justify-center gap-2"> <!-- 會往右推開畫面, 暫時移除 lg:flex -->
            <span class="text-[30px]">已領取紅利</span>
            <span class="font-monda">500</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TabButton from '@/components/ui/button/TabButton.vue'
import { useActivityWeeks, type WeekConfig } from '@/composables/useActivityWeeks'

const { selectedWeek, selectedWeekText, activityWeeks } = useActivityWeeks()

const handleClick = (weekConfig: WeekConfig) => {
  selectedWeek.value = weekConfig
}
</script>

<style scoped>
.bg-award {
  background-image: url('@/assets/bg-award-sm.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.bg-award-title {
  background-image: url('@/assets/bg-title-award.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media (min-width: 890px) {
  .bg-award {
    background-image: url('@/assets/bg-award.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
