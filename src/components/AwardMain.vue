<template>
  <!-- Main Content -->
  <div
    class="flex flex-col items-center space-y-1.5 sm:space-y-8 lg:px-28 py-16 pb-8 pt-12 sm:pt-28 sm:pb-32 lg:pb-16"
  >
    <p class="font-noto-sans-tc font-base text-white sm:hidden">選擇週次</p>
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

    <!-- Week Info -->
    <p class="font-noto-sans-tc font-normal text-white text-base sm:text-[28px] text-center">
      {{ selectedWeekText }}
    </p>

    <!-- Award Cards -->
    <TransitionGroup
      :name="shouldUseTransition ? 'award-layout' : 'award-layout-lg'"
      tag="div"
      class="grid grid-cols-[min-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-1.5 sm:gap-4 w-full relative max-w-[270px] sm:max-w-[480px] lg:max-w-[1098px] items-center"
    >
      <div
        key="school-rank"
        class="text-card"
        :class="{ 'blur-sm': selectedWeekSchoolLV === null || !authStore.isAuthenticated }"
      >
        {{ `No.${selectedWeekSchoolLV}` }}
      </div>

      <div key="school-name" class="text-card" :class="{ 'blur-sm': !selfSchool }">
        {{ selfSchool || '學校名稱' }}
      </div>

      <AwardResult key="school-award" :condition="hasSelectedWeekSchoolBonus" />

      <AlreadyTaken key="school-taken" :condition="hasSelectedWeekSchoolBonus" />

      <div
        key="personal-bonus"
        class="text-card col-span-2 mt-6 lg:mt-0"
        :class="{ 'blur-sm': selectedWeekSchoolLV === null || !authStore.isAuthenticated }"
      >
        每週個人500紅利
      </div>

      <AwardResult key="personal-award" :condition="hasSelectedWeekPersonalBonus" />

      <AlreadyTaken key="personal-taken" :condition="hasSelectedWeekPersonalBonus" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import TabButton from '@/components/ui/button/TabButton.vue'
import AwardResult from '@/components/AwardResult.vue'
import AlreadyTaken from '@/components/AlreadyTaken.vue'
import { useActivityWeeks, type WeekConfig } from '@/composables/useActivityWeeks'
import { useSelfBonusInfo } from '@/composables/useSelfBonusInfo'
import { useSelfSchool } from '@/composables/useSelfSchool'
import { useAuthStore } from '@/stores/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 檢測是否為小螢幕（上到下排列）
const shouldUseTransition = ref(false)

const checkScreenSize = () => {
  // lg 斷點是 1024px，小於此值時使用 TransitionGroup
  shouldUseTransition.value = window.innerWidth < 1024
}

const { selectedWeek, selectedWeekText, activityWeeks } = useActivityWeeks()
const { data: bonusInfo } = useSelfBonusInfo()
const { data: selfSchool } = useSelfSchool()
const authStore = useAuthStore()

const hasSelectedWeekPersonalBonus = computed(() => {
  if (!bonusInfo.value || !bonusInfo.value.status || !bonusInfo.value.data) return null
  return !!bonusInfo.value.data.user[selectedWeek.value.week.toString()]
})

const hasSelectedWeekSchoolBonus = computed(() => {
  if (!bonusInfo.value || !bonusInfo.value.status || !bonusInfo.value.data) return null
  return !!bonusInfo.value.data.school[selectedWeek.value.week.toString()]
})

const selectedWeekSchoolLV = computed(() => {
  if (!bonusInfo.value || !bonusInfo.value.status || !bonusInfo.value.data) return null
  return bonusInfo.value.data.schoolLV[selectedWeek.value.week.toString()] ?? null
})

const handleClick = (weekConfig: WeekConfig) => {
  selectedWeek.value = weekConfig
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
/* TransitionGroup 動畫 */
.award-layout-move,
.award-layout-enter-active,
.award-layout-leave-active {
  transition: all 0.3s ease;
}

.award-layout-enter-from,
.award-layout-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.award-layout-leave-active {
  position: absolute;
}

/* TransitionGroup 動畫 */
.award-layout-lg-move,
.award-layout-lg-enter-active,
.award-layout-lg-leave-active {
  transition: all 0.3s ease;
}

.award-layout-lg-enter-from,
.award-layout-lg-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
