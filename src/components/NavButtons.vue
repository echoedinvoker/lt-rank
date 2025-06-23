<template>
  <nav class="flex space-x-2 lg:space-x-[23px] lg:-mr-4">
    <UiButton
      v-for="(button, index) in visibleNavButtons"
      :key="index"
      :variant="button.variant"
      :size="'lg'"
      :class="`h-8 lg:h-11 lg:w-[141px] rounded-[30.5px] ${button.color} text-white text-[16px] lg:text-[22px] hidden
        sm:block font-['Inter'] cursor-pointer`"
      @click="handleNavClick(button.text)"
    >
      {{ button.text }}
    </UiButton>
  </nav>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/button/UiButton.vue'
import { useMobileHamburger } from '@/composables/useMobileHamburger'

const { visibleNavButtons, handleNavClick } = useMobileHamburger()
</script>
