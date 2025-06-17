<template>
  <header
    class="fixed w-full h-[65px] lg:h-[81px] top-0 left-0 bg-white flex items-center justify-between px-6 lg:px-10 z-50 space-x-2 shadow-lg sm:shadow-none"
  >
    <!-- Logo section -->
    <div class="flex items-center smooth-transition">
      <LogoIcon class="cursor-pointer transition hover:scale-105 active:scale-95" />
    </div>

    <!-- Navigation buttons -->
    <nav class="flex space-x-2 lg:space-x-4">
      <Button
        v-for="(button, index) in visibleNavButtons"
        :key="index"
        :variant="button.variant"
        :size="'lg'"
        :class="`h-8 px-4 lg:h-11 rounded-[30.5px] ${button.color} text-white text-[16px] lg:text-[22px] hidden
        sm:block font-['Inter'] cursor-pointer`"
        @click="handleNavClick(button.text)"
      >
        {{ button.text }}
      </Button>
    </nav>

    <!-- Mobile Hamburger Menu -->
    <div class="sm:hidden">
      <!-- Hamburger Button -->
      <button
        @click="toggleMobileMenu"
        class="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 border-1
        border-[#38A1DB] rounded lg:hidden w-[40px] h-[33px]"
        :class="{ 'open': isMobileMenuOpen }"
      >
        <!-- 三條線，使用 #38A1DB 顏色 -->
        <span
          class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
          :class="{ 'rotate-45 translate-y-[7px]': isMobileMenuOpen }"
        ></span>
        <span
          class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
          :class="{ 'opacity-0': isMobileMenuOpen }"
        ></span>
        <span
          class="block lg:hidden w-1/2 h-[1px] rounded bg-[#38A1DB] transition-all duration-300 ease-in-out"
          :class="{ '-rotate-45 -translate-y-[7px]': isMobileMenuOpen }"
        ></span>
      </button>

    </div>

    <LoginDialog />

  </header>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { LogoIcon } from '@/components/ui/icon'
import LoginDialog from '@/components/LoginDialog.vue'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { ref } from 'vue'

// 手機選單狀態
const isMobileMenuOpen = ref(false)

const navButtons = [
  { text: '校際戰績', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '個人成就', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '紅利領取', color: 'bg-[#38a1db]', variant: 'default' as const },
  { text: '活動辦法', color: 'bg-[#38a1db]', variant: 'default' as const },
]

const authButtons = {
  login: { text: '登入', color: 'bg-[#c92a2e]', variant: 'destructive' as const },
  logout: { text: '登出', color: 'bg-[#c92a2e]', variant: 'destructive' as const }
}

const authStore = useAuthStore()
const { openLoginDialog } = useLoginDialog()

// 根據登入狀態決定顯示的按鈕
const visibleNavButtons = computed(() => {
  const authButton = authStore.isAuthenticated ? authButtons.logout : authButtons.login
  return [...navButtons, authButton]
})

// 切換手機選單顯示狀態
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleNavClick = (buttonText: string) => {
  if (buttonText === '登入') {
    openLoginDialog()
  } else if (buttonText === '登出') {
    authStore.clearAuth()
    // 可選：重新導向到首頁或顯示登出成功訊息
  } else {
    console.log(`Clicked: ${buttonText}`)
  }
}
</script>
