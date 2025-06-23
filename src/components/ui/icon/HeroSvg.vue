<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 800 400"
    xmlns="http://www.w3.org/2000/svg"
    class="hero-svg"
  >
    <!-- 你的 SVG 內容 -->
  </svg>
</template>

<script setup lang="ts">
interface Props {
  width?: string | number
  height?: string | number
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
})
</script>
