<template>
  <header
    class="header fixed w-full h-[65px] lg:h-[81px] top-0 left-0 bg-white flex items-center justify-between px-6 lg:px-10 z-50 space-x-2 shadow-lg sm:shadow-none transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full': isHeaderHidden }"
  >
    <LogoButton />

    <NavButtons />

    <MobileHamburger />

    <LoginDialog />
  </header>
  <MobileHamburgerMenu />
</template>

<script setup lang="ts">
import LoginDialog from '@/components/LoginDialog.vue'
import NavButtons from '@/components/NavButtons.vue'
import LogoButton from '@/components/LogoButton.vue'
import MobileHamburgerMenu from '@/components/MobileHamburgerMenu.vue'
import MobileHamburger from '@/components/MobileHamburger.vue'
import { useMobileHamburger } from '@/composables/useMobileHamburger'
import { useScrollHideHeader } from '@/composables/useScrollHideHeader'

const { isMobileMenuOpen } = useMobileHamburger()

// 使用滾動隱藏 header 的 composable
const { isHeaderHidden } = useScrollHideHeader(isMobileMenuOpen)
</script>
