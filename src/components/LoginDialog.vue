<template>
  <div
    v-if="showLoginModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
    @click="closeLoginDialog"
  >
    <div class="bg-white rounded-lg p-8 w-96 max-w-[90vw]" @click.stop>
      <h2 class="text-2xl font-bold mb-6 text-center">登入</h2>

      <form @submit.prevent="handleLogin">
        <!-- 帳號輸入 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">帳號</label>
          <input
            v-model="loginForm.account"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="請輸入帳號"
            required
          />
        </div>

        <!-- 密碼輸入 -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">密碼</label>
          <input
            v-model="loginForm.password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="請輸入密碼"
            required
          />
        </div>

        <!-- 錯誤訊息 -->
        <div v-if="loginError" class="mb-4 text-red-500 text-sm text-center">
          {{ loginError }}
        </div>

        <!-- 按鈕區域 -->
        <div class="flex space-x-3">
          <UiButton type="button" variant="outline" class="flex-1" @click="closeLoginDialog">
            取消
          </UiButton>
          <UiButton type="submit" class="flex-1" :disabled="isLoading">
            {{ isLoading ? '登入中...' : '登入' }}
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/button/UiButton.vue'
import { useLoginDialog } from '@/composables/useLoginDialog'

const { showLoginModal, loginError, loginForm, isLoading, closeLoginDialog, handleLogin } =
  useLoginDialog()
</script>
