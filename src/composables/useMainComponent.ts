import { ref, type Ref } from 'vue'

// TheMain 組件的類型定義
interface TheMainInstance {
  forceShowSection: (sectionId: string) => void
}

// 全域的 TheMain 組件實例
const mainComponentInstance: Ref<TheMainInstance | null> = ref(null)

export function useMainComponent() {
  // 註冊 TheMain 組件實例
  const registerMainComponent = (instance: TheMainInstance) => {
    mainComponentInstance.value = instance
  }

  // 強制顯示指定 section
  const forceShowSection = (sectionId: string) => {
    if (mainComponentInstance.value) {
      mainComponentInstance.value.forceShowSection(sectionId)
    }
  }

  return {
    registerMainComponent,
    forceShowSection,
    mainComponentInstance: mainComponentInstance.value
  }
}
