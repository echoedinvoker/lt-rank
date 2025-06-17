<template>
  <div class="relative w-full max-w-md">

    <!-- label -->
    <div class="absolute w-10 sm:w-14 h-5 -top-2.5 sm:-top-4 left-3 sm:left-3.5 bg-[#fce8c2] z-10">
      <div class="text-sm sm:text-xl text-center font-noto-sans-tc font-normal text-primary tracking-[0] leading-normal">
        {{ label }}
      </div>
    </div>

    <!-- select -->
    <select v-model="selectedItem"
      class="w-full h-full pl-2.5 pr-7 sm:px-5 sm:pr-12 pt-2 pb-1.5 sm:py-3 border border-solid
      border-primary rounded-md font-noto-sans-tc text-base sm:text-[28px] text-primary
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent appearance-none cursor-pointer flex items-center">
      <option v-for="item in options" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>

    <!-- custom arrow -->
    <div class="absolute inset-y-0 right-2 sm:right-4 flex items-center pointer-events-none">
      <svg class="w-4 h-4 sm:w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  id: number
  name: string
}

interface Props {
  label: string
  options: SelectOption[]
  modelValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number],
}>()

// 雙向綁定的計算屬性
const selectedItem = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:modelValue', value)
  }
})
</script>
