<template>
  <button
    @click="handleClick"
    :disabled="loading || !authStore.isAuthenticated"
    :class="`bg-primary text-white font-noto-sans-tc w-full rounded-md cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center
    justify-center gap-2 py-1.5 ${loading ? 'text-lg sm:text-[26px]' : 'text-lg sm:text-[28px]'}
    ${isClicked ? 'scale-95 bg-primary/80' : 'hover:bg-primary/90'}`"
  >
    <!-- 載入動畫 -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <!-- 按鈕文字 -->
    {{ loading ? loadingText : buttonText }}
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

interface Props {
  loading?: boolean
  buttonText?: string
  loadingText?: string
}

interface Emits {
  (e: 'click'): void
}

// 定義 props 與預設值
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  buttonText: '查詢',
  loadingText: '查詢中',
})

const authStore = useAuthStore()
const emit = defineEmits<Emits>()

// 點擊效果狀態
const isClicked = ref(false)

// 處理點擊事件
const handleClick = () => {
  if (!props.loading) {
    // 觸發點擊效果
    isClicked.value = true

    // 150ms 後重置效果
    setTimeout(() => {
      isClicked.value = false
    }, 150)

    emit('click')
  }
}
</script>
