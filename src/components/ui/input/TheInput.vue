<template>
  <div class="relative w-full max-w-md">
    <!-- label -->

    <!-- input -->
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full h-full pl-2.5 pr-7 sm:px-5 sm:pr-12 pt-2 pb-1.5 sm:py-3 border border-solid border-primary rounded-md
      font-noto-sans-tc text-base sm:text-[28px] text-primary focus:outline-none focus:ring-2
      focus:ring-primary focus:border-transparent bg-transparent"
    />

    <!-- pencil icon -->
    <div class="absolute inset-y-0 right-2 sm:right-4 flex items-center pointer-events-none">
      <svg class="w-4 h-4 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
        </path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  modelValue?: string
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 雙向綁定的計算屬性
const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  }
})
</script>
