<template>
  <div
    ref="targetRef"
    :class="[
      'transition-all duration-700 ease-out',
      isVisible || forceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { ref, watch, nextTick } from 'vue'

interface Props {
  delay?: number // 初始延遲時間
  forceVisible?: boolean // 強制顯示
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  forceVisible: false,
})

const { isVisible, targetRef } = useIntersectionObserver(0.1, '0px 0px -50px 0px', props.delay)
const forceVisible = ref(props.forceVisible)

// 監聽 props 變化
watch(
  () => props.forceVisible,
  (newVal) => {
    forceVisible.value = newVal
  },
)

const forceShow = async () => {
  forceVisible.value = true
  // 等待 DOM 更新
  await nextTick()
}

defineExpose({
  forceShow,
})
</script>
