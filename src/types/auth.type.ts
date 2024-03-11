import { SuccessResponse } from './utils.type'

export type AuthResponsive = SuccessResponse<{
  IsToken: string
  Createat: string
  Expried: string
  IsLonglive: boolean
}>
