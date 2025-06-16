import { ref, onMounted, computed } from 'vue'
import { usersApi, type User } from '@/api/point'

// 全域狀態 - 所有元件共享同一份資料
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useUsers() {
  // 取得所有使用者
  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      users.value = await usersApi.getUsers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  // 取得排行榜
  const fetchUsersRanking = async () => {
    loading.value = true
    error.value = null

    try {
      users.value = await usersApi.getUsersRanking()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch ranking'
      console.error('Error fetching ranking:', err)
    } finally {
      loading.value = false
    }
  }

  // 根據學校篩選使用者
  const fetchUsersBySchool = async (school: string) => {
    loading.value = true
    error.value = null

    try {
      users.value = await usersApi.getUsersBySchool(school)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users by school'
      console.error('Error fetching users by school:', err)
    } finally {
      loading.value = false
    }
  }

  // 計算屬性 - 取得前 10 名使用者
  const topUsers = computed(() =>
    users.value
      .filter(user => user.score !== undefined)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10)
  )

  // 計算屬性 - 取得所有學校列表
  const schools = computed(() =>
    [...new Set(users.value.map(user => user.school).filter(Boolean))]
  )

  // 根據 ID 尋找使用者
  const findUserById = (id: number) =>
    users.value.find(user => user.id === id)

  // 初始載入資料
  onMounted(() => {
    if (users.value.length === 0) {
      fetchUsers()
    }
  })

  return {
    // 響應式資料
    users,
    loading,
    error,

    // 計算屬性
    topUsers,
    schools,

    // 方法
    fetchUsers,
    fetchUsersRanking,
    fetchUsersBySchool,
    findUserById
  }
}
