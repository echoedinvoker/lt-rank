<template>
  <section class="w-full mt-6 px-5 sm:px-9">
    <div class="bg-primary rounded-xl p-2 sm:p-4 max-w-[1098px] mx-auto">
      <div class="bg-[#F7A238] rounded sm:rounded-md w-full px-5 sm:px-10 py-4 sm:py-9">
        <div class="bg-[#FCE8C2] w-full flex flex-col px-4 sm:px-9 pt-4 pb-6 sm:py-11 gap-3 sm:gap-10 lg:gap-12 items-center">
          <h2 class="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-noto-sans-tc text-primary py-4 flex
            justify-center gap-3.5 sm:gap-5 lg:gap-10 items-center w-full">
            <div>校</div>
            <div>際</div>
            <div>戰</div>
            <div>績</div>
          </h2>

          <div class="md:grid md:grid-cols-[8fr_6fr_3fr] md:gap-5 space-y-5 sm:space-y-7 w-full">
            <TheInput v-model="searchStore.schoolName" label="學校" placeholder="請輸入學校名稱" />
            <TheSelect v-model="searchStore.selectedWeek" label="週次" :options="selectableWeeks" />
            <QueryButton :loading="loading" @click="searchHandler(searchStore.selectedWeek, searchStore.schoolName)" />

            <p class="font-noto-sans-tc text-base sm:text-2xl lg:text-[28px] text-primary col-span-3
            text-center">
              {{ weekText }}
            </p>
          </div>

          <div
            class="grid grid-cols-[min-content_1fr] sm:grid-cols-[8fr_3fr_6fr] gap-2 sm:gap-5 w-full items-center justify-items-center">
            <div class="col-span-2 sm:col-span-1 text-card border-[#5B0E11] smooth-transition"
              :class="{ 'blur-sm': !hasBonusData }">{{ hasBonusData ? searchStore.bonusData?.school_name : '學校名稱' }}
            </div>
            <div class="bold-text text-primary px-0 sm:px-2 leading-4.5 sm:leading-8 text-center">
              <span class="text-nowrap">累積</span>
              <span class="text-nowrap">紅利</span>
            </div>
            <div class="golden-text-card smooth-transition" :class="{ 'blur-sm': !hasBonusData }">{{ hasBonusData ?
              Number(searchStore.bonusData?.BONUS).toLocaleString() : '19,999,999' }}</div>
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
