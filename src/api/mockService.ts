import type { LoginResponse } from './auth'
import type {
  NewRecordResponse,
  LastWeekRecordResponse,
  BonusBySchoolResponse,
  BonusByUserResponse,
  GetBonusInfoResponse,
} from './point'

// 生成隨機整數的輔助函數 (0~1999)
const generateRandomBonus = () => Math.floor(Math.random() * 2000)

interface SchoolData {
  name: string
  baseBonus: number
}

// Mock 資料定義
const mockSchoolData: SchoolData[] = [
  { name: '竹南高中', baseBonus: 2450 },
  { name: '花蓮中學', baseBonus: 1800 },
  { name: '大溪高中', baseBonus: 1200 },
  { name: '泰山高中', baseBonus: 950 },
  { name: '景文高中', baseBonus: 800 },
  { name: '台北第一高中', baseBonus: 3200 },
  { name: '建國中學', baseBonus: 2800 },
  { name: '北一女中', baseBonus: 2600 },
  { name: '師大附中', baseBonus: 2100 },
  { name: '成功高中', baseBonus: 1900 },
]

// 模擬用戶學校對應 (uid -> school_name)
const mockUserSchools: Record<string, string> = {
  '87': '竹南高中',
  '88': '台北第一高中',
  '89': '建國中學',
}

// 靜態 mock 資料
const staticMockData: Record<
  string,
  LoginResponse | NewRecordResponse | LastWeekRecordResponse | BonusByUserResponse
> = {
  '/login': {
    status: true,
    data: {
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE3NDk2OTQzNzcsImV4cCI6MTc0OTc4MDc3NywiZGF0YSI6eyJpZCI6Ijg3IiwiZW1haWwiOiJrZW43NjA3MTdAZ21haWwuY29tIiwibmFtZSI6ImtlbiJ9fQ.jSdEgvCNfJp5eqg1zggTHst_bcLyNwKHW_wnwrGGUZU',
      uid: '87',
    },
    message: 'success',
  },
  '/point/getNewRecord': {
    status: true,
    data: {
      record: [
        { school_name: '竹南高中', BONUS: '2450' },
        { school_name: '花蓮中學', BONUS: '100' },
      ],
      startTime: '2025-06-11 12:00:00',
      endTime: '2025-06-18 11:59:59',
    },
    message: 'success',
  },
  '/point/getLastWeekRecord': {
    status: true,
    data: {
      record: [
        { school_name: '竹南高中', BONUS: '500' },
        { school_name: '大溪高中', BONUS: '100' },
        { school_name: '泰山高中', BONUS: '100' },
        { school_name: '景文高中', BONUS: '100' },
      ],
      startTime: '2025-06-04 12:00:00',
      endTime: '2025-06-11 11:59:59',
    },
    message: 'success',
  },
  '/point/getBonusByUserByWeek': {
    status: true,
    data: {
      // 每次呼叫都會產生新的隨機數值 (0~1999)
      '1': generateRandomBonus(),
      '2': generateRandomBonus(),
      '3': generateRandomBonus(),
      '4': generateRandomBonus(),
      '5': generateRandomBonus(),
      '6': generateRandomBonus(),
      '7': generateRandomBonus(),
    },
    message: 'success',
  },
}

// 動態生成學校積分資料的邏輯
const generateSchoolBonusResponse = (data: {
  uid?: string | number
  schoolName?: string
  week?: number
}): BonusBySchoolResponse => {
  const { uid, schoolName, week } = data || {}

  // 根據 uid 查詢用戶學校
  if (uid && week && !schoolName) {
    const userSchool = mockUserSchools[uid.toString()]
    if (userSchool) {
      const schoolData = mockSchoolData.find((s) => s.name === userSchool)
      if (schoolData) {
        // 根據週次調整積分 (模擬不同週次的變化)
        const weekMultiplier = 1 + (week - 1) * 0.15
        const bonus = Math.floor(schoolData.baseBonus * weekMultiplier)

        return {
          status: true,
          data: { school_name: userSchool, BONUS: bonus },
          message: 'success',
        }
      }
    }

    // 找不到用戶學校時的預設回應
    return {
      status: true,
      data: { school_name: '未知學校', BONUS: 0 },
      message: 'success',
    }
  }

  // 根據學校名稱查詢
  if (schoolName) {
    const schoolData = mockSchoolData.find(
      (s) => s.name.includes(schoolName) || schoolName.includes(s.name),
    )

    if (schoolData) {
      const weekMultiplier = week ? 1 + (week - 1) * 0.15 : 1
      const bonus = Math.floor(schoolData.baseBonus * weekMultiplier)

      return {
        status: true,
        data: { school_name: schoolData.name, BONUS: bonus },
        message: 'success',
      }
    } else {
      return {
        status: false,
        data: { school_name: '', BONUS: 0 },
        message: '查無此學校資料',
      }
    }
  }

  // 預設回應
  return {
    status: true,
    data: { school_name: '台北第一高中', BONUS: 1999 },
    message: 'success',
  }
}

// 生成紅利發放資訊的邏輯
const generateBonusInfoResponse = (): GetBonusInfoResponse => {
  // 生成隨機的週次紅利狀態 (0: 未發放, 1: 已發放)
  const generateWeeklyBonusData = (probability: number = 0.6) => {
    const weeklyData: Record<string, 0 | 1> = {}
    for (let week = 1; week <= 7; week++) {
      // 根據機率決定是否已發放紅利
      weeklyData[week.toString()] = Math.random() < probability ? 1 : 0
    }
    return weeklyData
  }

  return {
    status: true,
    data: {
      // 用戶各週紅利狀態 (較高的發放率)
      user: generateWeeklyBonusData(0.7),
      // 學校各週紅利狀態 (中等發放率)
      school: generateWeeklyBonusData(0.5),
      // 學校各週排名 (較低的高排名率，模擬排名競爭)
      schoolLV: generateWeeklyBonusData(0.3),
    },
    message: 'success',
  }
}

// 主要的 mock 回應生成器
export const generateMockResponse = (endpoint: string, data?: Record<string, unknown>) => {
  switch (endpoint) {
    case '/point/getBonusBySchoolByWeek':
      return generateSchoolBonusResponse(
        data as { uid?: string | number; schoolName?: string; week?: number },
      )
    case '/point/getBonusInfo':
      return generateBonusInfoResponse()
    default:
      return staticMockData[endpoint]
  }
}

// 模擬網路延遲
export const mockDelay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms))
