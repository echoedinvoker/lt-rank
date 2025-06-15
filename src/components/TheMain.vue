<template>
  <main class="bg-custom-bg pt-[81px] flex flex-col space-y-24">
    <HeroSection />
    <SummarySection />
    <SchoolSection />
    <SearchSection />
    <PersonalSection />
    <AwardSection />
    <CTASection />
    <RuleSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import SummarySection from '@/components/SummarySection.vue'
import SchoolSection from '@/components/SchoolSection.vue'
import SearchSection from '@/components/SearchSection.vue'
import PersonalSection from '@/components/PersonalSection.vue'
import AwardSection from '@/components/AwardSection.vue'
import CTASection from '@/components/CTASection.vue'
import RuleSection from '@/components/RuleSection.vue'
</script>
