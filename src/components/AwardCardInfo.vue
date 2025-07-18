<template>
  <TransitionGroup
    :name="shouldUseTransition ? 'award-layout' : 'award-layout-lg'"
    tag="div"
    class="grid grid-cols-[100px_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-1.5 sm:gap-4 w-full relative max-w-[270px] sm:max-w-[480px] lg:max-w-[1098px] items-center"
  >
    <div
      key="school-rank"
      class="text-card text-nowrap lg:w-36"
      :class="{ 'blur-sm': selectedWeekSchoolLV === null || !authStore.isAuthenticated }"
    >
      {{ selectedWeekSchoolLV === 0 ? `無排名` : `No.${selectedWeekSchoolLV}` }}
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
</template>

<script setup lang="ts">
import AwardResult from '@/components/AwardResult.vue'
import AlreadyTaken from '@/components/AlreadyTaken.vue'
import { useActivityWeeks } from '@/composables/useActivityWeeks'
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

const { selectedWeek } = useActivityWeeks()
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
