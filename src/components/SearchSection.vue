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
            <TheSelect v-model="selectedSchool" label="學校" :options="schools" @change="handleSchoolChange" />
            <TheSelect v-model="selectedWeek" label="週次" :options="weeks" @change="handleWeekChange" />
            <button class="bg-primary text-white font-noto-sans-tc text-[28px] w-full rounded-md cursor-pointer">
              查詢
            </button>
            <p class="font-noto-sans-tc text-[28px] text-primary col-span-3">
              第2週 07/17(四) 中午12:00 ~ 07/23(三) 中午11:59 止
            </p>
          </div>

          <div class="grid grid-cols-[8fr_3fr_6fr] gap-5 w-full items-center justify-items-center">
            <div class="text-card border-[#5B0E11]">龍騰高中</div>
            <div class="bold-text text-primary px-2">累積紅利</div>
            <div class="golden-text-card">19,999,999</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheSelect from '@/components/ui/select/TheSelect.vue'

const schools = [
  { id: 1, name: '龍來龍去高中' },
  { id: 2, name: '第二高中' },
  { id: 3, name: '第三高中' },
]

const weeks = [
  { id: 1, name: '第1週' },
  { id: 2, name: '第2週' },
  { id: 3, name: '第3週' },
]

const selectedSchool = ref(schools[0].name)
const selectedWeek = ref(weeks[0].name)

const handleSchoolChange = (schoolName: string) => {
  console.log('選擇的學校:', schoolName)
}
const handleWeekChange = (weekName: string) => {
  console.log('選擇的週次:', weekName)
}
</script>
