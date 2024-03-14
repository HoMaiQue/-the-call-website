export interface GetPhoneBookResponse {
  full_name: string
  number_phone: string
  email: string
  privacy: string
  type_phone: string
  contact_id: 'string'
}
export interface CreatePhoneBookRequest {
  full_name: string
  number_phone: string
  email?: string
}
export interface UpdatePhoneBookRequest {
  contact_id: string
  email?: string
  full_name?: string
  number_phone?: string
}
