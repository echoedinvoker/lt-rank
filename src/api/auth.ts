import { apiClient } from './index'

export interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  status: boolean
  data: {
    token: string
    uid: string
  }
  message: string
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse, LoginRequest>('/login', credentials)
  },

  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_uid')
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  async validateToken(): Promise<boolean> {
    try {
      await apiClient.get('/point/getNewRecord')
      return true
    } catch {
      return false
    }
  },
}
