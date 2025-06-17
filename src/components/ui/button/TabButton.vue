<template>
  <button
    :class="[
      'w-full flex items-center justify-center px-2 py-1 sm:p-4 text-base sm:text-3xl font-noto-sans-tc tracking-widest font-semibold rounded-xl sm:rounded-lg transition-all duration-200 border-3 transform-gpu text-nowrap',
      variants[variant] ?? variants.primary
    ]"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'secondaryNotBtn';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary'
});

const emit = defineEmits<{ click: [] }>();

const variants = {
  primary: 'bg-white text-black border-black',
  secondary: 'bg-black text-white border-white hover:scale-105 active:scale-95 hover:bg-gray-800 active:bg-gray-700 hover:shadow-lg active:shadow-inner active:transition-none cursor-pointer',
  secondaryNotBtn: 'bg-black text-white border-white'
};

// 添加觸覺反饋（如果支援）
const handleClick = () => {
  // 添加輕微的觸覺反饋
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }

  emit('click');
};
</script>
