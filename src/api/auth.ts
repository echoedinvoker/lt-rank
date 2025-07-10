import { apiClient } from './index'

export interface LoginRequest {
  account: string
  password: string
  [key: string]: unknown
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

  async socialLogin(provider: 'google' | 'line' | 'facebook'): Promise<LoginResponse> {
    // 根據不同 provider 導向對應的 OAuth 流程
    const authUrl = this.getSocialAuthUrl(provider)

    // 開啟新視窗進行 OAuth 認證
    const authWindow = window.open(authUrl, 'socialAuth', 'width=500,height=600')

    return new Promise((resolve, reject) => {
      // 監聽認證結果
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed)
          reject(new Error('認證視窗已關閉'))
        }
      }, 1000)

      // 監聽來自認證視窗的訊息
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data.type === 'SOCIAL_AUTH_SUCCESS') {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          authWindow?.close()
          resolve(event.data.result)
        } else if (event.data.type === 'SOCIAL_AUTH_ERROR') {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          authWindow?.close()
          reject(new Error(event.data.error))
        }
      }

      window.addEventListener('message', messageHandler)
    })
  },

  // 取得社群登入 URL
  getSocialAuthUrl(provider: 'google' | 'line' | 'facebook'): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    return `${baseUrl}/auth/${provider}`
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
