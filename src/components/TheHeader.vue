<template>
  <header
    class="fixed w-full h-[81px] top-0 left-0 bg-white flex items-center justify-between px-10 z-50"
  >
    <!-- Logo section -->
    <div class="flex items-center h-[34px]">
      <LogoIcon class="cursor-pointer transition hover:scale-105 active:scale-95" />
    </div>

    <!-- Navigation buttons -->
    <nav class="flex space-x-4">
      <Button
        v-for="(button, index) in navButtons"
        :key="index"
        :variant="button.variant"
        :size="'lg'"
        :class="`h-11 w-[141px] rounded-[30.5px] ${button.color} text-white text-[22px]
        font-['Inter'] cursor-pointer`"
        @click="handleNavClick(button.text)"
      >
        {{ button.text }}
      </Button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { LogoIcon } from '@/components/ui/icon'

const navButtons = [
  { text: '校際戰績', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '個人成就', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '紅利領取', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '活動辦法', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '登入', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
]

const handleNavClick = (buttonText: string) => {
  console.log(`Clicked: ${buttonText}`)
}
</script>
