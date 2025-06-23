<template>
  <!-- Tab Buttons -->
  <div class="flex justify-center gap-1 sm:gap-4 max-w-7/8 sm:flex-wrap w-full">
    <template v-for="weekConfig in activityWeeks" :key="weekConfig.week">
      <div>
        <TabButton
          class="hidden lg:block text-[30px] font-bold px-10 py-3 !rounded-2xl"
          :label="`第${weekConfig.week}週`"
          :variant="selectedWeek.week === weekConfig.week ? 'primary' : 'secondary'"
          @click="handleClick(weekConfig)"
        />
        <button
          @click="handleClick(weekConfig)"
          :class="`lg:hidden w-7.5 h-7.5 sm:w-16 sm:h-16  rounded flex items-center justify-center
                border-2 sm:border-3 sm:text-lg
                ${
                  selectedWeek.week === weekConfig.week
                    ? 'bg-white text-black border-black'
                    : 'bg-black text-white border-white cursor-pointer hover:bg-gray-800 active:bg-gray-700'
                }`"
        >
          {{ weekConfig.week.toString() }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import TabButton from '@/components/ui/button/TabButton.vue'
import { useActivityWeeks, type WeekConfig } from '@/composables/useActivityWeeks'

const { selectedWeek, activityWeeks } = useActivityWeeks()

const handleClick = (weekConfig: WeekConfig) => {
  selectedWeek.value = weekConfig
}
</script>
