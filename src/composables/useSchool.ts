import { computed, ref } from "vue";
import { activityWeeks, useActivityWeeks, type WeekConfig } from "./useActivityWeeks";

const currentSchoolWeek = ref<WeekConfig>(activityWeeks.value[0]);

export function useSchool() {
  const { formatWeekText } = useActivityWeeks();

  const currentSchoolWeekIndex = computed(() => {
    return activityWeeks.value.findIndex((weekConfig) => {
      return weekConfig.week === currentSchoolWeek.value.week;
    });
  })

  const currentSchoolWeekConfig = computed(() => {
    if (currentSchoolWeekIndex.value === -1) {
      return activityWeeks.value[0]; // 返回第一週作為預設值
    }
    return activityWeeks.value[currentSchoolWeekIndex.value];
  })

  const currentSchoolWeekText = computed(() => {
    if (currentSchoolWeekIndex.value === -1) {
      return '活動尚未開始或已結束';
    }
    return formatWeekText(currentSchoolWeekConfig.value);
  })

  const lastSchoolWeekText = computed(() => {
    const index = currentSchoolWeekIndex.value - 1;
    if (index < 0) {
      return '尚無上週戰績';
    }
    return formatWeekText(activityWeeks.value[index]);
  })

  return {
    currentSchoolWeek,
    currentSchoolWeekText,
    lastSchoolWeekText,
  }
}
