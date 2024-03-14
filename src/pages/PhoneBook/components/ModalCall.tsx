import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import { red } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { EventSipGateway } from 'voip24h-sip-gateway'
import PhoneImage from '~/assets/images/phone.avif'
import { Voip24hModule } from 'voip24h-sip-gateway'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingBottom: '10px'
}
interface ModalCall {
  open: boolean
  onToggle: () => void
}
const voip24 = Voip24hModule.getInstance()
const ModalCall: React.FC<ModalCall> = ({ open, onToggle }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isStartCount, setIsStartCount] = useState(false)

  useEffect(() => {
    voip24.pushEventToSide({
      onmessageOutSide: function (event: any, _: any) {
        if (event === EventSipGateway.Accepted) {
          setIsStartCount(true)
          setInterval(() => {
            setTime((prevTime) => {
              const newSeconds = prevTime.seconds + 1
              const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60)
              const newHours = prevTime.hours + Math.floor(newMinutes / 60)
              return {
                hours: newHours,
                minutes: newMinutes % 60,
                seconds: newSeconds % 60
              }
            })
          }, 1000)
        }
        if (event === EventSipGateway.CustomerHangup) {
          onToggle()
        }
      }
    })
  }, [onToggle])

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`
  }
  const handleHangUp = () => {
    if (voip24.isRegistered()) {
      voip24.hangUp()
      onToggle()
    }
  }
  return (
    <div>
      <Modal
        open={open}
        // onClose={onToggle}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            component='img'
            sx={{
              height: '100%',
              width: '100%',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px'
            }}
            alt='phone'
            src={PhoneImage}
          />
          {isStartCount && (
            <Typography>
              {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
            </Typography>
          )}
          <IconButton onClick={handleHangUp} aria-label='delete' size='large' sx={{ backgroundColor: red[500], mt: 2 }}>
            <LocalPhoneIcon fontSize='inherit' />
          </IconButton>
        </Box>
      </Modal>
    </div>
  )
}
export default ModalCall
