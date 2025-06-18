<template>
  <main class="bg-custom-bg lg:pt-[81px] flex flex-col space-y-7 xs:space-y-12 xxs:space-y-18 sm:space-y-24">
    <HeroSection ref="heroSection" />

    <div>
      <SummarySection />
    </div>

    <div>
      <CTASection class="-mt-[130px] xs:-mt-[150px] xxs:-mt-[170px] sm:-mt-[250px] lg:-mt-[300px]" />
    </div>

    <div>
      <SchoolSection id="school-section" />
    </div>

    <div>
      <SearchSection />
    </div>

    <div>
      <PersonalSection id="personal-section" />
    </div>

    <div>
      <AwardSection id="award-section" />
    </div>

    <div>
      <CTASection />
    </div>

    <div>
      <RuleSection id="rule-section" />
    </div>

    <!-- 回到頂部按鈕 -->
    <ScrollToTop :section="heroSection" />
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
import ScrollToTop from '@/components/ScrollToTop.vue'
import { ref, type ComponentPublicInstance } from 'vue'

const heroSection = ref<ComponentPublicInstance | null>(null)

</script>
