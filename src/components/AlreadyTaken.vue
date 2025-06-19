<template>
  <div
    class="golden-text-card-bw flex flex-wrap items-center justify-center gap-1 col-span-2 lg:col-span-1 py-4
    sm:py-6 lg:py-4 mt-1.5 lg:mt-0 transition-all duration-300 ease-in-out"
    :class="{
      'opacity-0': !authStore.isAuthenticated || !condition,
    }"
  >
    <span class="text-[22px] sm:text-[26px] text-nowrap">已領取紅利</span>
    <span class="font-monda text-[24px] sm:text-[34px]">500</span>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

defineProps<{
  condition: boolean | null
}>()
</script>
