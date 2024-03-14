import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from '~/constants/httpCodeStatus.enum'
import { URL_LOGIN } from '~/apis/auth.api'
import { AuthResponsive } from '~/types/auth.type'
import { getAccessTokenFromLS, setAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor(isAuthUrl?: boolean) {
    this.instance = axios.create({
      baseURL: isAuthUrl ? import.meta.env.VITE_AUTH_URL : import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.accessToken = getAccessTokenFromLS()

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN) {
          const data = response.data as AuthResponsive
          this.accessToken = data.data.response.data.IsToken
          setAccessTokenToLS(this.accessToken)
        }

        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export const httpAuth = new Http(true).instance
export default http
