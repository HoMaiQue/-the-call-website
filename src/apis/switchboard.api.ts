import { CallHistoryResQuest, GetRecordResponse } from '~/types/switchboard.type'
import { CallHistoryResponse } from '~/types/switchboard.type'
import { SuccessResponse } from '~/types/utils.type'
import http from '~/utils/http'
const URL_CALL = '/call'
const URL_CALL_HISTORY = `${URL_CALL}/find`
const URL_RECORD = `${URL_CALL}/media`

export const switchboardApi = {
  callHistory(body: CallHistoryResQuest) {
    return http.post<SuccessResponse<CallHistoryResponse[]>>(URL_CALL_HISTORY, body)
  },

  getRecord(body: { callid: string }) {
    return http.post<SuccessResponse<GetRecordResponse>>(URL_RECORD, body)
  },
  searchHistory(body: { phone: string }) {
    return http.post<SuccessResponse<CallHistoryResponse[]>>(URL_CALL_HISTORY, body)
  }
}
