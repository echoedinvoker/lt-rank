<template>
  <section class="w-full sm:px-9 mt-12 sm:mt-48 mb-4">
    <div class="bg-award px-12 sm:px-14 py-16 max-w-[1198px] mx-auto relative">
      <!-- Absolute Header Image -->
      <div class="absolute top-0 left-1/2 bg-award-title w-[285px] h-[137px] sm:w-[488px] sm:h-[235px]
        lg:w-[691px] lg:h-[332px] transform -translate-x-1/2 -translate-y-1/4 sm:-translate-y-1/3 lg:-translate-y-1/2">
      </div>

      <AwardMain />
    </div>
  </section>
</template>

<script setup lang="ts">
import AwardMain from '@/components/AwardMain.vue'
</script>

<style scoped>
.bg-award {
  background-image: url('@/assets/bg-award-sm.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.bg-award-title {
  background-image: url('@/assets/bg-title-award.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media (min-width: 890px) {
  .bg-award {
    background-image: url('@/assets/bg-award.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
