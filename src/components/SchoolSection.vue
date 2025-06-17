<template>
  <section class="w-full px-7">
    <TheCard>
      <template #header>
        <RibbonHeader title="school" />
      </template>
      <template #content>
        <SchoolMain />
      </template>
    </TheCard>
  </section>
</template>

<script setup lang="ts">
import RibbonHeader from '@/components/RibbonHeader.vue'
import SchoolMain from '@/components/SchoolMain.vue'
import TheCard from '@/components/ui/card/TheCard.vue'
</script>
