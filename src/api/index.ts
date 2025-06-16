interface ApiClient {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data?: any): Promise<T>
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const getToken = (): string | null => localStorage.getItem('auth_token')

const mockData: Record<string, any> = {
  '/login': {
    status: true,
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE3NDk2OTQzNzcsImV4cCI6MTc0OTc4MDc3NywiZGF0YSI6eyJpZCI6Ijg3IiwiZW1haWwiOiJrZW43NjA3MTdAZ21haWwuY29tIiwibmFtZSI6ImtlbiJ9fQ.jSdEgvCNfJp5eqg1zggTHst_bcLyNwKHW_wnwrGGUZU",
      uid: "87"
    },
    message: "success"
  },
  '/point/getNewRecord': {
    status: true,
    data: {
      record: [
        { school_name: "竹南高中", BONUS: "2450" },
        { school_name: "花蓮中學", BONUS: "100" }
      ],
      startTime: "2025-06-11 12:00:00",
      endTime: "2025-06-18 11:59:59"
    },
    message: "success"
  },
  '/point/getLastWeekRecord': {
    status: true,
    data: {
      record: [
        { school_name: "竹南高中", BONUS: "500" },
        { school_name: "大溪高中", BONUS: "100" },
        { school_name: "泰山高中", BONUS: "100" },
        { school_name: "景文高中", BONUS: "100" }
      ],
      startTime: "2025-06-04 12:00:00",
      endTime: "2025-06-11 11:59:59"
    },
    message: "success"
  },
  '/point/getBonusBySchoolByWeek': {
    status: true,
    data: {
      school_name: "台北第一高中",
      BONUS: 1999
    },
    message: "success"
  },
  '/point/getBonusByUserByWeek': {
    status: true,
    data: {
      "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0
    },
    message: "success"
  }
}

export const apiClient: ApiClient = {
  async get<T>(endpoint: string): Promise<T> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return mockData[endpoint] as T
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      return mockData[endpoint] as T
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
