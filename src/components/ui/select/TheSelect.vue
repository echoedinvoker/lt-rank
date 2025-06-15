<template>
  <div class="relative w-full max-w-md">

    <!-- label -->
    <div class="absolute w-14 h-5 -top-4 left-3.5 bg-[#fce8c2] z-10">
      <div class="text-xl text-center font-noto-sans-tc font-normal text-primary tracking-[0] leading-normal">
        {{ label }}
      </div>
    </div>

    <!-- select -->
    <select v-model="selectedItem"
      class="w-full h-full py-[12px] px-[18px] border border-solid border-primary rounded-md
      font-noto-sans-tc text-[28px] text-primary focus:outline-none focus:ring-2
      focus:ring-primary focus:border-transparent appearance-none cursor-pointer flex items-center bg-transparent">
      <option v-for="item in options" :key="item.id" :value="item.name">
        {{ item.name }}
      </option>
    </select>

    <!-- custom arrow -->
    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
      <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  id: string | number
  name: string
}

interface Props {
  label: string
  options: SelectOption[]
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 雙向綁定的計算屬性
const selectedItem = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  }
})

// 處理選擇變更事件
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}
</script>
