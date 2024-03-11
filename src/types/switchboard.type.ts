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
  type?: 'outbound' | 'inbound'
  status?: 'ANSWERED' | 'NO ANSWER' | 'MISSED' | 'FAILED' | 'BUSY'
  limit: string 
  offset: string 
}
