<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold text-center mb-8">
        shadcn-vue 組件測試
      </h1>

      <!-- Button 測試 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Button 組件測試</h2>
        <div class="flex gap-4 flex-wrap">
          <Button variant="default" @click="showAlert('Default Button')">
            Default Button
          </Button>
          <Button variant="secondary" @click="showAlert('Secondary Button')">
            Secondary Button
          </Button>
          <Button variant="outline" @click="showAlert('Outline Button')">
            Outline Button
          </Button>
          <Button variant="destructive" @click="showAlert('Destructive Button')">
            Destructive Button
          </Button>
        </div>
      </div>

      <!-- Card 測試 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Card 組件測試</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title 1</CardTitle>
              <CardDescription>
                這是一個簡單的 Card 組件測試
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card 內容區域，可以放置任何內容。</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Card Action
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Title 2</CardTitle>
              <CardDescription>
                另一個 Card 組件範例
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>這裡展示了 Card 組件的靈活性。</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Dialog 測試 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Dialog 組件測試</h2>
        <Dialog v-model:open="isDialogOpen">
          <DialogTrigger as-child>
            <Button @click="isDialogOpen = true">
              打開 Dialog
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Dialog 標題</DialogTitle>
              <DialogDescription>
                這是一個 Dialog 組件的測試範例。你可以在這裡放置任何內容。
              </DialogDescription>
            </DialogHeader>
            <div class="py-4">
              <p>Dialog 主要內容區域</p>
            </div>
            <DialogFooter class="flex gap-2">
              <Button variant="outline" @click="isDialogOpen = false">
                取消
              </Button>
              <Button @click="handleDialogConfirm">
                確認
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Button 組件
import { Button } from '@/components/ui/button'
// Card 組件
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// Dialog 組件
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// 響應式數據
const isDialogOpen = ref(false)

// 事件處理函數
const showAlert = (message: string) => {
  alert(`點擊了: ${message}`)
}

const handleDialogConfirm = () => {
  alert('Dialog 確認按鈕被點擊!')
  isDialogOpen.value = false
}
</script>
