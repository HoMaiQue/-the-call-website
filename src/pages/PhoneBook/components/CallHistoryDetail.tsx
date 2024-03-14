import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { grey, red } from '@mui/material/colors'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { toast } from 'react-toastify'
import { switchboardApi } from '~/apis/switchboard.api'
import { getColorStrategies, getStatusStrategies } from '~/constants/page'
import { CallHistoryResponse } from '~/types/switchboard.type'
import { convertSecondsToHHMMSS } from '~/utils/format'
interface CallHistoryDetailProps {
  callHistory: CallHistoryResponse
}
const textBold = {
  fontWeight: 'bold'
}
const CallHistoryDetail: React.FC<CallHistoryDetailProps> = ({ callHistory }) => {
  const [isPlay, setIsPlay] = useState(false)
  const [recordUrl, setRecordUrl] = useState('')

  const record = useMutation({
    mutationFn: (body: { callid: string }) => switchboardApi.getRecord(body)
  })

  const handleToggle = () => {
    setIsPlay((value) => !value)
  }

  const handlePlay = () => {
    handleToggle()
    if (!isPlay) {
      record.mutate(
        { callid: callHistory.callid as string },
        {
          onSuccess: (data) => {
            const url = data.data.data.response.data?.data.ogg as string
            if (!url) {
              toast.warning('Không có ghi âm')
              return
            }
            setRecordUrl(url)
          }
        }
      )
    }
  }
  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonthIcon />
          <Typography sx={textBold}>Ngày gọi:</Typography>
          <Typography>{callHistory.calldate}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon />
          <Typography sx={textBold}>Thời lượng:</Typography>
          <Typography>{convertSecondsToHHMMSS(callHistory.duration)}</Typography>
        </Box>
        <Typography sx={{ color: getColorStrategies[callHistory.status] }}>
          {getStatusStrategies[callHistory.status]}
        </Typography>
      </Box>
      <Box
        mt={1}
        sx={{
          borderRadius: 2,
          backgroundColor: grey[100],
          display: 'flex',
          gap: '5px',
          p: 2,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button variant='contained' color='error'>
            Gọi ra
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={textBold}>Gọi từ: </Typography>
            <Typography>{callHistory.caller}</Typography>
          </Box>
          <Divider orientation='vertical' variant='middle' flexItem />
          <Box sx={{ display: 'flex' }}>
            <Typography>Gọi đến:</Typography>
            <Typography>{callHistory.callee}</Typography>
          </Box>
        </Box>

        <IconButton onClick={handlePlay} aria-label='delete' sx={{ color: 'white', backgroundColor: red[400] }}>
          <VolumeUpIcon />
        </IconButton>
      </Box>
      {isPlay && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
          <ReactAudioPlayer style={{ backgroundColor: 'white' }} src={recordUrl} autoPlay controls />
        </Box>
      )}
    </Box>
  )
}

export default CallHistoryDetail
