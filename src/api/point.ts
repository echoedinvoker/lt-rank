import { apiClient } from './index'

export interface SchoolRecord {
  school_name: string
  BONUS: string
}

export interface NewRecordResponse {
  status: boolean
  data: {
    record: SchoolRecord[]
    startTime: string
    endTime: string
  }
  message: string
}

export interface LastWeekRecordResponse {
  status: boolean
  data: {
    record: SchoolRecord[]
    startTime: string
    endTime: string
  }
  message: string
}

export interface BonusBySchoolRequest {
  uid: number
  schoolName?: string
  week?: number
}

export interface BonusBySchoolResponse {
  status: boolean
  data: {
    school_name: string
    BONUS: number
  }
  message: string
}

export interface BonusByUserRequest {
  uid: number
}

export interface BonusByUserResponse {
  status: boolean
  data: Record<string, number> // { "1": 0, "2": 0, ... }
  message: string
}

export const pointApi = {
  // 獲取本週新紀錄
  async getNewRecord(): Promise<NewRecordResponse> {
    return apiClient.get<NewRecordResponse>('/point/getNewRecord')
  },

  // 獲取上週紀錄
  async getLastWeekRecord(): Promise<LastWeekRecordResponse> {
    return apiClient.get<LastWeekRecordResponse>('/point/getLastWeekRecord')
  },

  // 根據學校和週數獲取積分
  async getBonusBySchoolByWeek(params: BonusBySchoolRequest): Promise<BonusBySchoolResponse> {
    return apiClient.post<BonusBySchoolResponse>('/point/getBonusBySchoolByWeek', params)
  },

  // 根據用戶獲取各週積分
  async getBonusByUserByWeek(params: BonusByUserRequest): Promise<BonusByUserResponse> {
    return apiClient.post<BonusByUserResponse>('/point/getBonusByUserByWeek', params)
  }
}
