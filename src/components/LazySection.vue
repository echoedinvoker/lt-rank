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

interface Props {
  delay?: number // 初始延遲時間
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0
})

const { isVisible, targetRef } = useIntersectionObserver(0.1, '0px 0px -50px 0px', props.delay)
</script>
