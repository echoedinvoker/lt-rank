<template>
  <!-- Main Content -->
  <div
    class="flex flex-col items-center space-y-1.5 sm:space-y-8 lg:px-28 py-16 pb-8 pt-12 sm:pt-28 sm:pb-32 lg:pb-16"
  >
    <p class="font-noto-sans-tc font-base text-white sm:hidden">選擇週次</p>

    <AwardTabs />

    <!-- Week Info -->
    <p class="font-noto-sans-tc font-normal text-white text-base sm:text-[28px] text-center">
      {{ selectedWeekText }}
    </p>

    <AwardCardInfo />

  </div>
</template>

<script setup lang="ts">
import AwardCardInfo from '@/components/AwardCardInfo.vue'
import AwardTabs from '@/components/AwardTabs.vue'
import { useActivityWeeks } from '@/composables/useActivityWeeks'

const { selectedWeekText } = useActivityWeeks()
</script>
