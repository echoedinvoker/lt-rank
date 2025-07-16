import { computed, ref } from "vue";
import { activityWeeks, useActivityWeeks, type WeekConfig } from "./useActivityWeeks";

const currentSchoolWeek = ref<WeekConfig | undefined>(activityWeeks.value[0]);

export function useSchool() {
  const { formatWeekText } = useActivityWeeks();

  const currentSchoolWeekIndex = computed(() => {
    if (!currentSchoolWeek.value) {
      return -1; // 如果當前學校週未定義，返回 -1
    } else {
      return activityWeeks.value.findIndex((weekConfig) => {
        return weekConfig.week === currentSchoolWeek.value!.week;
      });
    }
  })

  const currentSchoolWeekText = computed(() => {
    if (currentSchoolWeekIndex.value === -1) {
      // return '活動尚未開始或已結束';
      return '';
    }
    return formatWeekText(activityWeeks.value[currentSchoolWeekIndex.value]);
  })

  const lastSchoolWeekText = computed(() => {
    const index = currentSchoolWeekIndex.value - 1;
    if (index < 0) {
      // return '尚無上週戰績';
      return '';
    }
    return formatWeekText(activityWeeks.value[index]);
  })

  return {
    currentSchoolWeekIndex,
    currentSchoolWeek,
    currentSchoolWeekText,
    lastSchoolWeekText,
  }
}
