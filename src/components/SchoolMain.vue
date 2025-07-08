<template>
  <div
    class="flex items-center justify-around w-full gap-2 sm:gap-8 relative z-10 max-w-[320px] sm:max-w-[1098px]"
  >
    <TabButton
      @click="selectedTab = 'new'"
      :variant="selectedTab === 'new' ? 'primary' : 'secondary'"
      >最新戰績</TabButton
    >
    <TabButton
      @click="selectedTab = 'last'"
      :variant="selectedTab === 'last' ? 'primary' : 'secondary'"
      >上週戰績
    </TabButton>
  </div>
  <p class="font-noto-sans-tc font-bold text-[#ffff00] text-base sm:text-3xl text-center sm:pb-3">
    {{ selectedTab === 'new' ? currentSchoolWeekText : lastSchoolWeekText }}
  </p>
  <template v-for="(record, index) in displayedRecord" :key="index">
    <div
      class="grid grid-cols-[1fr_3fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3 sm:gap-4 justify-items-center items-center w-full max-w-[270px] sm:max-w-[480px] lg:max-w-[1098px]"
    >
      <div class="text-card">{{ `No.${index + 1}` }}</div>
      <div class="text-card">{{ record.school_name }}</div>
      <div class="bold-text px-2 leading-4.5 sm:leading-8 text-center">累積紅利</div>
      <div class="golden-text-card">{{ Number(record.BONUS).toLocaleString() }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TabButton from '@/components/ui/button/TabButton.vue'
import { useNewRecord } from '@/composables/useNewRecord'
import { useLastWeekRecord } from '@/composables/useLastWeekRecord'
import { useSchool } from '@/composables/useSchool'

const { data: newRecord } = useNewRecord()
const { data: lastWeekRecord } = useLastWeekRecord()
const { currentSchoolWeekText, lastSchoolWeekText } = useSchool()

const selectedTab = ref<'new' | 'last'>('new')

const displayedRecord = computed(() =>
  selectedTab.value === 'new'
    ? (newRecord.value?.data?.record ?? [])
    : (lastWeekRecord.value?.data?.record ?? []),
)
</script>
