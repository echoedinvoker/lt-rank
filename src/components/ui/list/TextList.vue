<template>
  <ul class="list-disc pl-6 sm:pl-16 sm:pr-8 text-[#711F11] space-y-12 leading-7 sm:leading-10">
    <li v-for="(content, index) in contents" :key="index">
      <span class="text-black whitespace-pre-line">{{ content }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
  contents: {
    type: Array as () => string[],
    default: [
      '第 1 週：07/10 (四) 中午12:00:00 - 07/16 (三) 中午11:59:59；',
      '第 2 週：07/17 (四) 中午12:00:00 - 07/23 (三) 中午11:59:59；',
      '第 3 週：07/24 (四) 中午12:00:00 - 07/30 (三) 中午11:59:59；',
      '第 4 週：07/31 (四) 中午12:00:00 - 08/06 (三) 中午11:59:59；',
      '第 5 週：08/07 (四) 中午12:00:00 - 08/13 (三) 中午11:59:59；',
      '第 6 週：08/14 (四) 中午12:00:00 - 08/20 (三) 中午11:59:59；',
      '第 7 週：08/21 (四) 中午12:00:00 - 08/27 (三) 中午11:59:59；',
    ]
  },
})
</script>
