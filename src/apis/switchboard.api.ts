import { CallHistoryResQuest } from './../types/switchboard.type';
import { CallHistoryResponse } from '~/types/switchboard.type'
import { SuccessResponse } from '~/types/utils.type'
import http from '~/utils/http'
const URL_CALL_HISTORY = '/call/find'
export const switchboardApi = {
  callHistory(body: CallHistoryResQuest) {
    return http.post<SuccessResponse<CallHistoryResponse[]>>(URL_CALL_HISTORY, body)
  }
}
