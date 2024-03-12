export interface CallHistoryResponse {
  calldate: string
  caller: string
  callee: string
  did: string
  extension: string
  type: string
  status: string
  callid: string
  duration: number
  billsec: number
}

export interface CallHistoryResQuest {
  date_start?: string
  date_end?: string
  type?: string
  status?: string
  limit: string
  offset: string
}

export type GetRecordResponse = {
  data: { ogg: string; wav: string }
} | null
