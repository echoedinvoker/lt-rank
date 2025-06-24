import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const schoolName = ref('') // 學校名稱
  const selectedWeek = ref(1) // 選擇的週次
  const schoolNameSearch = ref('') // 學校名稱搜索
  const selectedWeekSearch = ref(1) // 選擇的週次搜索

  const handleSearch = () => {
    schoolNameSearch.value = schoolName.value
    selectedWeekSearch.value = selectedWeek.value
  }

  return {
    schoolName,
    selectedWeek,
    schoolNameSearch,
    selectedWeekSearch,
    handleSearch,
  }
})
