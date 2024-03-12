import { GetPhoneBookResponse } from '~/types/phonebook.type'
import { SuccessResponse } from '~/types/utils.type'
import http from '~/utils/http'
const URL_PHONE_BOOK = '/phonebook'
const URL_GET_PHONE_BOOK = `${URL_PHONE_BOOK}/find`
const URL_SEARCH = `${URL_PHONE_BOOK}/findone`
const URL_DELETE = `${URL_PHONE_BOOK}/delete`
export const phoneBookApi = {
  getPhoneBook(body: { offset: string; limit: string }) {
    return http.post<SuccessResponse<GetPhoneBookResponse[]>>(URL_GET_PHONE_BOOK, body)
  },

  searchPhoneBook(body: { phone: string }) {
    return http.post<SuccessResponse<GetPhoneBookResponse>>(URL_SEARCH, body)
  },
  deletePhoneBook(body: { contact_id: string }) {
    return http.post<SuccessResponse<any>>(URL_DELETE, body)
  }
}
