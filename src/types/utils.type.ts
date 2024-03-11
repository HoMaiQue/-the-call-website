export interface SuccessResponse<Data> {
  error: string
  data: {
    status: number
    message: string
    response: {
      status: string
      message: string
      data: Data
    }
  }
}

export interface ErrorResponse {
  error: { code: number; message: string }
  trace_id: string
}
