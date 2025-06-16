<template>
  <div class="flex items-center justify-around w-full gap-8 relative z-10">
    <TabButton
      @click="selectedTab = 'new'"
      :variant="selectedTab === 'new' ? 'primary' : 'secondary'"
    >校際戰績</TabButton>
    <TabButton
      @click="selectedTab = 'last'"
      :variant="selectedTab === 'last' ? 'primary' : 'secondary'"
    >上週戰績</TabButton>
  </div>
  <p class="font-noto-sans-tc font-bold text-[#ffff00] text-3xl text-center pb-3">
    {{ selectedTab === 'new' ? currentWeekText : lastWeekText }}
  </p>
  <div class="grid grid-cols-[max-content_1fr_max-content_1fr] gap-4 justify-items-center items-center w-full">
    <template v-for="record, index in displayedRecord" :key="index">
      <div class="text-card">{{ `No.${index + 1}` }}</div>
      <div class="text-card">{{ record.school_name }}</div>
      <div class="bold-text px-2">累積紅利</div>
      <div class="golden-text-card">{{ Number(record.BONUS).toLocaleString() }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TabButton from '@/components/ui/button/TabButton.vue'
import { useNewRecord } from '@/composables/useNewRecord'
import { useLastWeekRecord } from '@/composables/useLastWeekRecord'
import { useActivityWeeks } from '@/composables/useActivityWeeks'

const { data: newRecord } = useNewRecord()
const { data: lastWeekRecord } = useLastWeekRecord()
const { currentWeekText, lastWeekText } = useActivityWeeks()

const selectedTab = ref<'new' | 'last'>('new')

const displayedRecord = computed(() =>
  selectedTab.value === 'new'
    ? newRecord.value?.data.record ?? []
    : lastWeekRecord.value?.data.record ?? []
)
</script>
