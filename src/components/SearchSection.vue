<template>
  <section class="w-full px-12">
    <div class="bg-primary rounded-xl px-[16px] py-[15px] max-w-[1098px] mx-auto">
      <div class="bg-[#F7A238] rounded-md w-full px-[40px] py-[38px]">
        <div class="bg-[#FCE8C2] w-full flex flex-col py-[45px] gap-12 items-center px-9">
          <h2 class="text-6xl font-black font-noto-sans-tc text-primary py-4 flex justify-between items-center max-w-[384px] w-full">
            <div>校</div>
            <div>際</div>
            <div>戰</div>
            <div>績</div>
          </h2>

          <div class="grid grid-cols-[8fr_6fr_3fr] gap-5 w-full">
            <TheInput v-model="searchStore.schoolName" label="學校" placeholder="請輸入學校名稱" />
            <TheSelect v-model="searchStore.selectedWeek" label="週次" :options="selectableWeeks" />
            <QueryButton
              :loading="loading"
              @click="searchHandler(searchStore.selectedWeek, searchStore.schoolName)"
            />

            <p class="font-noto-sans-tc text-[28px] text-primary col-span-3">
              {{ weekText }}
            </p>
          </div>

          <div class="grid grid-cols-[8fr_3fr_6fr] gap-5 w-full items-center justify-items-center">
            <div class="text-card border-[#5B0E11]"
              :class="{ 'blur-sm': !hasBonusData }">{{ hasBonusData ? searchStore.bonusData?.school_name : '學校名稱' }}</div>
            <div class="bold-text text-primary px-2">累積紅利</div>
            <div class="golden-text-card"
              :class="{ 'blur-sm': !hasBonusData }"
              >{{ hasBonusData ? Number(searchStore.bonusData?.BONUS).toLocaleString() : '19,999,999' }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TheSelect from '@/components/ui/select/TheSelect.vue'
import TheInput from '@/components/ui/input/TheInput.vue'
import QueryButton from '@/components/ui/button/QueryButton.vue'
import { computed } from 'vue'
import { useBonusBySchoolByWeek } from '@/composables/useBonusBySchoolByWeek'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const { searchHandler, loading, weekText, selectableWeeks } = useBonusBySchoolByWeek()
const hasBonusData = computed(() => searchStore.bonusData)




</script>
