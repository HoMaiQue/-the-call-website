import { AuthResponsive } from '~/types/auth.type'
import { httpAuth } from '~/utils/http'

export const URL_LOGIN = '/api/token'
export const authApi = {
  login(body: { api_key: string; api_secert: string }) {
    return httpAuth.post<AuthResponsive>(URL_LOGIN, body)
  }
}
