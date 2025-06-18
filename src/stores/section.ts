import { defineStore } from 'pinia'
import { ref, type ComponentPublicInstance } from 'vue'

export const useSectionStore = defineStore('section', () => {
  const heroSection = ref<ComponentPublicInstance | null>(null)
  const schoolSection = ref<ComponentPublicInstance | null>(null)
  const personalSection = ref<ComponentPublicInstance | null>(null)
  const awardSection = ref<ComponentPublicInstance | null>(null)
  const ruleSection = ref<ComponentPublicInstance | null>(null)

  return {
    heroSection,
    schoolSection,
    personalSection,
    awardSection,
    ruleSection,
  }
})
