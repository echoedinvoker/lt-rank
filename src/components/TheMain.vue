<template>
  <main class="bg-custom-bg lg:pt-[81px] flex flex-col space-y-7 xs:space-y-12 xxs:space-y-18 sm:space-y-24">
    <HeroSection />

    <LazySection :delay="0">
      <SummarySection />
    </LazySection>

    <LazySection :delay="0">
      <CTASection class="-mt-[130px] xs:-mt-[150px] xxs:-mt-[170px] sm:-mt-[250px] lg:-mt-[300px]" />
    </LazySection>

    <LazySection :delay="100">
      <SchoolSection />
    </LazySection>


    <LazySection :delay="200">
      <SearchSection />
    </LazySection>

    <LazySection :delay="300">
      <PersonalSection />
    </LazySection>

    <LazySection :delay="400">
      <AwardSection />
    </LazySection>

    <LazySection :delay="500">
      <CTASection />
    </LazySection>

    <LazySection :delay="600">
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
