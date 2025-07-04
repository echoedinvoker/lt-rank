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
  week?: string
  [key: string]: unknown
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
  [key: string]: unknown
}

export interface BonusByUserResponse {
  status: boolean
  data: {
    data: Record<string, number> // { "1": 0, "2": 0, ... }
    now: string // 當前週數 ex. "2"
  }
  message: string
}

// 紅利發放請求參數
export interface GetBonusInfoRequest {
  uid: number
  [key: string]: unknown
}
// 每週紅利資料結構
export interface WeeklyBonusData {
  [week: string]: 0 | 1
}
// 紅利發放回應資料
export interface GetBonusInfoResponse {
  status: boolean
  data: {
    user: WeeklyBonusData // 用戶各週紅利狀態
    school: WeeklyBonusData // 學校各週紅利狀態
    schoolLV: WeeklyBonusData // 學校各週排名
  }
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
    return apiClient.post<BonusBySchoolResponse, BonusBySchoolRequest>(
      '/point/getBonusBySchoolByWeek',
      params,
    )
  },

  // 根據用戶獲取各週積分
  async getBonusByUserByWeek(params: BonusByUserRequest): Promise<BonusByUserResponse> {
    return apiClient.post<BonusByUserResponse, BonusByUserRequest>(
      '/point/getBonusByUserByWeek',
      params,
    )
  },

  // 獲取紅利發放資訊
  async getBonusInfo(params: GetBonusInfoRequest): Promise<GetBonusInfoResponse> {
    return apiClient.post<GetBonusInfoResponse, GetBonusInfoRequest>('/point/getBonusInfo', params)
  },
}
