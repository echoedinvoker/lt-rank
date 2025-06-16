import { generateMockResponse, mockDelay } from './mockService'

interface ApiClient {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data?: any): Promise<T>
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const getToken = (): string | null => localStorage.getItem('auth_token')

export const apiClient: ApiClient = {
  async get<T>(endpoint: string): Promise<T> {
    if (USE_MOCK) {
      await mockDelay()
      return generateMockResponse(endpoint) as T
    }

    const token = getToken()
    const headers: Record<string, string> = {}

    if (token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },

  async post<T>(endpoint: string, data?: any): Promise<T> {
    if (USE_MOCK) {
      await mockDelay()
      return generateMockResponse(endpoint, data) as T
    }

    const token = getToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (token && endpoint !== '/login') headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return response.json()
  },
}
