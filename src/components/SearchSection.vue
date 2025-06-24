<template>
  <section class="w-full mt-6 px-5 sm:px-9">
    <div class="bg-primary rounded-xl p-2 sm:p-4 max-w-[1098px] mx-auto">
      <div class="bg-[#F7A238] rounded sm:rounded-md w-full px-5 sm:px-10 py-4 sm:py-9">
        <div
          class="bg-[#FCE8C2] w-full flex flex-col px-4 sm:px-9 pt-4 pb-6 sm:py-11 gap-3 sm:gap-10 lg:gap-12 items-center"
        >
          <h2
            class="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-noto-sans-tc text-primary py-4 flex justify-center gap-3.5 sm:gap-5 lg:gap-10 items-center w-full"
          >
            <div>校</div>
            <div>際</div>
            <div>戰</div>
            <div>績</div>
          </h2>

          <!-- 未登入提示區域 -->
          <div
            v-if="!authStore.isAuthenticated"
            class="w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[800px] bg-orange-100 border-l-4 border-orange-400 p-4 rounded-md"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-orange-700 font-noto-sans-tc">請先登入以查看校際戰績資訊</p>
              </div>
            </div>
          </div>

          <!-- 錯誤訊息顯示區域 -->
          <div
            v-if="error"
            class="w-full max-w-[320px] sm:max-w-[600px] lg:max-w-[800px] bg-red-100 border-l-4 border-red-400 p-4 rounded-md"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 font-noto-sans-tc">{{ error }}</p>
              </div>
            </div>
          </div>
          <!-- 搜尋表單區域 -->
          <div
            class="md:grid md:grid-cols-[8fr_6fr_3fr] md:gap-5 space-y-5 sm:space-y-7 w-full justify-items-center max-w-[320px] sm:max-w-[600px] lg:max-w-[800px]"
          >
            <TheInput v-model="searchStore.schoolName" label="學校" placeholder="請輸入學校名稱" />
            <TheSelect v-model="searchStore.selectedWeek" label="週次" :options="selectableWeeks" />
            <QueryButton
              :loading="isLoading"
              @click="searchHandler()"
            />

            <p
              class="font-noto-sans-tc text-base sm:text-2xl lg:text-[28px] text-primary col-span-3 text-center sm:text-left md:-mt-8"
            >
              {{ weekText }}
            </p>
          </div>

          <!-- 結果顯示區域 -->
          <div
            class="grid grid-cols-[min-content_1fr] md:grid-cols-[8fr_3fr_6fr] gap-2 sm:gap-5 w-full items-center justify-items-center max-w-[320px] sm:max-w-[600px] lg:max-w-[800px]"
          >
            <div
              class="col-span-2 md:col-span-1 text-card border-[#5B0E11] smooth-transition"
              :class="{ 'blur-sm': !data || !authStore.isAuthenticated }"
            >
              {{ schoolNameResult }}
            </div>
            <div class="bold-text text-primary px-0 sm:px-2 leading-4.5 sm:leading-8 text-center">
              <span class="text-nowrap">累積</span>
              <span class="text-nowrap">紅利</span>
            </div>
            <div
              class="golden-text-card smooth-transition"
              :class="{ 'blur-sm': !data || !authStore.isAuthenticated }"
            >
              {{ bonusResult }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TheSelect from '@/components/ui/select/TheSelect.vue'
import TheInput from '@/components/ui/input/TheInput.vue'
import QueryButton from '@/components/ui/button/QueryButton.vue'
import { useBonusBySchoolByWeek } from '@/composables/useBonusBySchoolByWeek'
import { useSearchStore } from '@/stores/search'
import { useAuthStore } from '@/stores/auth' // 新增 auth store

const searchStore = useSearchStore()
const authStore = useAuthStore() // 新增 auth store 實例
const { data, schoolNameResult, bonusResult, searchHandler, isLoading, weekText, selectableWeeks, error } = useBonusBySchoolByWeek()
</script>
