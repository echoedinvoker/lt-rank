<template>
  <main class="bg-custom-bg pt-[81px] flex flex-col space-y-24">
    <HeroSection />

    <LazySection>
      <SummarySection />
    </LazySection>

    <LazySection>
      <SchoolSection />
    </LazySection>

    <LazySection>
      <SearchSection />
    </LazySection>

    <LazySection>
      <PersonalSection />
    </LazySection>

    <LazySection>
      <AwardSection />
    </LazySection>

    <LazySection>
      <CTASection />
    </LazySection>

    <LazySection>
      <RuleSection />
    </LazySection>
  </main>
</template>

<script setup lang="ts">
import LazySection from '@/components/LazySection.vue'
import HeroSection from '@/components/HeroSection.vue'
import SummarySection from '@/components/SummarySection.vue'
import SchoolSection from '@/components/SchoolSection.vue'
import SearchSection from '@/components/SearchSection.vue'
import PersonalSection from '@/components/PersonalSection.vue'
import AwardSection from '@/components/AwardSection.vue'
import CTASection from '@/components/CTASection.vue'
import RuleSection from '@/components/RuleSection.vue'
</script>
