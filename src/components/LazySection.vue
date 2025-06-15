<template>
  <div
    ref="targetRef"
    :class="[
      'transition-all duration-700 ease-out',
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-8'
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const { isVisible, targetRef } = useIntersectionObserver()
</script>
