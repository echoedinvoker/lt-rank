<template>
  <main class="bg-custom-bg lg:pt-[81px] flex flex-col space-y-7 xs:space-y-12 xxs:space-y-18
    sm:space-y-24 prevent-overscroll min-h-screen">
    <HeroSection ref="heroSection" />

    <LazySection>
      <SummarySection />
    </LazySection>

    <LazySection>
      <CTASection class="-mt-[130px] xs:-mt-[150px] xxs:-mt-[170px] sm:-mt-[250px] lg:-mt-[300px]" />
    </LazySection>

    <LazySection ref="schoolSectionRef">
      <SchoolSection id="school-section" />
    </LazySection>

    <LazySection>
      <SearchSection />
    </LazySection>

    <LazySection ref="personalSectionRef">
      <PersonalSection id="personal-section" />
    </LazySection>

    <LazySection ref="awardSectionRef">
      <AwardSection id="award-section" />
    </LazySection>

    <LazySection>
      <CTASection />
    </LazySection>

    <LazySection ref="ruleSectionRef">
      <RuleSection id="rule-section" />
    </LazySection>

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
import LazySection from '@/components/LazySection.vue'
import { onMounted, ref, type ComponentPublicInstance } from 'vue'
import { useMainComponent } from '@/composables/useMainComponent'

const heroSection = ref<ComponentPublicInstance | null>(null)

// 定義 LazySection 的類型
interface LazySectionInstance extends ComponentPublicInstance {
  forceShow: () => void
}

// LazySection refs for sections that need scrollTo functionality
const schoolSectionRef = ref<LazySectionInstance | null>(null)
const personalSectionRef = ref<LazySectionInstance | null>(null)
const awardSectionRef = ref<LazySectionInstance | null>(null)
const ruleSectionRef = ref<LazySectionInstance | null>(null)

// 暴露給外部使用的方法
const forceShowSection = (sectionId: string) => {
  const sectionRefMap = {
    'school-section': schoolSectionRef.value,
    'personal-section': personalSectionRef.value,
    'award-section': awardSectionRef.value,
    'rule-section': ruleSectionRef.value,
  }

  const sectionRef = sectionRefMap[sectionId as keyof typeof sectionRefMap]

  if (sectionRef) {
    sectionRef.forceShow()
  }
}

defineExpose({
  forceShowSection
})

// 註冊到全域狀態
const { registerMainComponent } = useMainComponent()

onMounted(() => {
  registerMainComponent({
    forceShowSection
  })
})
</script>

<style scoped>
/* 防止移動端過度滾動產生白色區域 */
.prevent-overscroll {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}
</style>
