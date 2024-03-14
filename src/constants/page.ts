import { green, grey, purple, red, yellow } from '@mui/material/colors'

export const LIMIT = '10' as const
export const getStatusStrategies: any = {
  ANSWERED: 'Trả lời',
  'NO ANSWER': 'Không trả lời',
  MISSED: 'Gọi nhỡ',
  FAILED: 'Gọi lỗi',
  BUSY: 'Máy bận'
}
export const getColorStrategies: any = {
  ANSWERED: green[500],
  'NO ANSWER': grey[500],
  MISSED: red[500],
  FAILED: purple[500],
  BUSY: yellow[500]
}
