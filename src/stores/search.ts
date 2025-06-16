import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type BonusBySchoolResponse } from '@/api/point'

export const useSearchStore = defineStore('search', () => {
  const schoolName = ref('') // 學校名稱
  const selectedWeek = ref(1) // 選擇的週次

  const bonusData = ref<BonusBySchoolResponse['data'] | null>(null)

  return {
    schoolName,
    selectedWeek,
    bonusData,
  }
})
