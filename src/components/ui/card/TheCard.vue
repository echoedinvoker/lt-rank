<template>
  <div
    class="bg-gradient-to-b from-[#FC9E00] to-[#D66B11] rounded-md px-4 sm:px-14 py-3 sm:py-12 max-w-[1098px] mx-auto relative"
  >
    <slot name="header" />
    <div
      class="flex flex-col items-center justify-center space-y-6 sm:space-y-8 rounded-lg bg-lines-pattern px-7 py-6 sm:px-12 sm:py-16 pb-12 responsive-box-shadow"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.bg-lines-pattern {
  background-image:
    url('@/assets/bg-lines-2.svg'), linear-gradient(to bottom, #d66b11 0%, #932c11 100%);
  background-blend-mode: multiply;
  background-size:
    100% 100%,
    cover;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
}
</style>

<style scoped>
/* 響應式 box-shadow */
.responsive-box-shadow {
  box-shadow: inset 0 0 0 12px rgba(77, 17, 17, 0.9); /* 小螢幕預設 8px */
}

/* 大螢幕時使用 16px */
@media (min-width: 640px) {
  .responsive-box-shadow {
    box-shadow: inset 0 0 0 24px rgba(77, 17, 17, 0.9);
  }
}
</style>
