<template>
  <section class="w-full px-9 mt-12 sm:mt-24 lg:mt-48">
    <TheCard>
      <template #header>
        <RibbonHeader title="個人成就" />
      </template>
      <template #content>
        <div class="flex flex-col items-center gap-4 mb-6">
          <div
            class="grid grid-cols-[min-content_1fr] lg:grid-cols-[min-content_1fr_1fr] justify-items-center items-center gap-2 sm:gap-8"
          >
            <UserIcon class="w-11 h-11 sm:w-24 sm:h-24" />
            <h2 class="bold-text text-center">本週任務紅利已累積</h2>
            <div
              class="golden-text-card justify-self-end smooth-transition col-start-2 col-end-3 lg:col-span-1 transform -translate-y-1/6 lg:translate-y-0 -translate-x-[3%] lg:translate-x-0 scale-x-105 lg:scale-x-100"
              :class="{ 'blur-sm': !isDataLoaded }"
            >
              {{ totalBonus }}
            </div>
          </div>
        </div>

        <div
          class="hidden md:block bg-[#932C11] w-full rounded-lg p-2.5 drop-shadow-[0_8px_0_#4D1111]"
        >
          <div
            class="bg-lines-sm-pattern w-full rounded-2xl flex items-center justify-center overflow-hidden"
          >
            <h2
              class="text-[50px] tracking-widest font-black font-noto-sans-tc text-white p-5 grid grid-cols-[1fr_repeat(6,min-content)_1fr] gap-4 items-center"
            >
              <div></div>
              <template v-for="(char, ind) in title.split('')" :key="ind">
                <div>{{ char }}</div>
              </template>
              <div></div>
            </h2>
          </div>
        </div>

        <div
          class="w-full grid grid-cols-[repeat(2,minmax(0,max-content))_1fr] lg:grid-cols-[repeat(2,minmax(0,max-content))_1fr_repeat(2,minmax(0,max-content))_1fr] items-center justify-items-center gap-3 sm:gap-6 sm:mt-6 max-w-[270px] sm:max-w-[550px] lg:max-w-[1098px]"
        >
          <template v-for="item in weeklyBonus" :key="item.week">
            <div class="text-card font-normal">{{ item.week }}</div>
            <div class="bold-text">紅利</div>
            <div class="golden-text-card smooth-transition" :class="{ 'blur-sm': !isDataLoaded }">
              {{ item.bonus }}
            </div>
          </template>
        </div>
      </template>
    </TheCard>
  </section>
</template>

<script setup lang="ts">
import RibbonHeader from '@/components/RibbonHeader.vue'
import UserIcon from '@/components/ui/icon/UserIcon.vue'
import TheCard from '@/components/ui/card/TheCard.vue'
import { useBonusByUser } from '@/composables/useBonusByUser'
import { computed } from 'vue'

const { data } = useBonusByUser()

const title = '每週任務紅利'

const defaultWeeklyBonus = [
  { week: '第1週', bonus: '1,999', numBonus: 1999 },
  { week: '第2週', bonus: '1,999', numBonus: 1999 },
  { week: '第3週', bonus: '1,999', numBonus: 1999 },
  { week: '第4週', bonus: '1,999', numBonus: 1999 },
  { week: '第5週', bonus: '1,999', numBonus: 1999 },
  { week: '第6週', bonus: '1,999', numBonus: 1999 },
  { week: '第7週', bonus: '1,999', numBonus: 1999 },
]

const isDataLoaded = computed(() => {
  return data.value && data.value.status
})

const weeklyBonus = computed(() => {
  if (!data.value || !data.value.status) {
    return defaultWeeklyBonus
  }
  return Object.values(data.value.data).map((bonus, index) => {
    return {
      week: defaultWeeklyBonus[index].week,
      bonus: Number(bonus).toLocaleString(),
      numBonus: bonus,
    }
  })
})

const totalBonus = computed(() => {
  if (!data.value || !data.value.status) {
    return '19,999,999'
  }
  return Number(
    weeklyBonus.value.reduce((acc, curr) => {
      return acc + Number(curr.numBonus)
    }, 0),
  ).toLocaleString()
})
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

.bg-lines-sm-pattern {
  background-image:
    url('@/assets/bg-lines-sm.svg'), linear-gradient(to bottom, #fc9e00 0%, #d66b11 100%);
  background-blend-mode: multiply;
  background-size:
    105% 105%,
    cover;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
}
</style>
