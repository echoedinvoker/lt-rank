<template>
  <!-- Mobile Hamburger Menu -->
  <div class="sm:hidden relative">
    <!-- Hamburger Button -->
    <button @click="toggleMobileMenu"
      class="flex z-50 flex-col justify-center items-center w-8 h-8 space-y-1.5 border-1 border-[#38A1DB] rounded lg:hidden w-[40px] h-[33px]"
      :class="{ open: isMobileMenuOpen }">
      <!-- 三條線，使用 #38A1DB 顏色 -->
      <span class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
        :class="{ 'rotate-45 translate-y-[7px]': isMobileMenuOpen }"></span>
      <span class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
        :class="{ 'opacity-0': isMobileMenuOpen }"></span>
      <span class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
        :class="{ '-rotate-45 -translate-y-[7px]': isMobileMenuOpen }"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMobileHamburger } from '@/composables/useMobileHamburger';

const {
  toggleMobileMenu,
  isMobileMenuOpen
} = useMobileHamburger()
</script>
