<template>
  <div class="bg-gradient-to-b from-[#FC9E00] to-[#D66B11] rounded-md px-14 py-12 max-w-[1098px] mx-auto relative">
    <slot name="header" />
    <div class="flex flex-col items-center justify-center space-y-8 rounded-lg bg-lines-pattern
      px-12 py-16"
      style="box-shadow: inset 0 0 0 24px rgba(77, 17, 17, 0.7)">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.bg-lines-pattern {
  background-image:
    url('@/assets/bg-lines-2.svg'), linear-gradient(to bottom, #d66b11 0%, #932c11 100%);
  background-blend-mode: multiply;
  background-size: 100% 100%, cover;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
}
</style>
