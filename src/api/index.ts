import { generateMockResponse, mockDelay } from './mockService'

interface ApiClient {
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T>
  post<T, U>(endpoint: string, data?: U): Promise<T>
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const getToken = (): string | null => localStorage.getItem('auth_token')

export const apiClient: ApiClient = {
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    // 建構完整的 URL，包含查詢參數
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value))
      })
      url += `?${searchParams.toString()}`
    }

    if (USE_MOCK) {
      await mockDelay()
      return generateMockResponse(url) as T
    }

    const token = getToken()
    const headers: Record<string, string> = {}

    if (token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${API_BASE_URL}${url}`, { headers })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },

  async post<T, U>(endpoint: string, data?: U): Promise<T> {
    if (USE_MOCK) {
      await mockDelay()
      return generateMockResponse(endpoint, data) as T
    }

    const token = getToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token && endpoint !== '/login') headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },
}
