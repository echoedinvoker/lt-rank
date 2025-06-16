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
        v-for="(button, index) in visibleNavButtons"
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
