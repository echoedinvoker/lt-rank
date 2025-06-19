<template>
  <div
    class="border-3 border-white rounded-md text-center text-base sm:text-3xl font-bold font-noto-sans-tc py-1 sm:py-4 px-6 bg-[#FFFF00] col-span-2 lg:col-span-1 text-nowrap"
    :class="{
      'bg-white text-[#FF0000]': condition === false,
      'opacity-0': condition === null
    }"
  >
    {{ condition === false ? '加油!!' : '達成!!' }}
  </div>
</template>

<script setup lang="ts">

defineProps<{
  condition: boolean | null
}>()

</script>
