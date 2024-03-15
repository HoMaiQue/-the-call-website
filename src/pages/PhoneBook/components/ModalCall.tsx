import CallEndIcon from '@mui/icons-material/CallEnd'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import PhonePausedIcon from '@mui/icons-material/PhonePaused'
import SendIcon from '@mui/icons-material/Send'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { blue, green, red } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { EventSipGateway, Voip24hModule } from 'voip24h-sip-gateway'
import PhoneImage from '~/assets/images/phone.avif'
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
  const [isTransfer, setIsTransfer] = useState(false)
  // const [isSendDtfm, setSendDtmf] = useState(false)
  const [number, setNumber] = useState('')
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
        if (event === EventSipGateway.EmployerHangup) {
          onToggle()
        }
        if (event === EventSipGateway.Hangup) {
          onToggle()
        }

        if (event === EventSipGateway.holding) {
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`
  }
  const handleHangUp = () => {
    if (voip24.isRegistered()) {
      voip24.hangUp()
      onToggle()
    }
  }
  const handleAccepted = () => {
    if (voip24.isRegistered()) {
      voip24.answer()
    }
  }
  const handleHold = () => {
    if (voip24.isRegistered()) {
      setIsStartCount(true)
      voip24.toggleHold()
    }
  }
  const handleForwarded = () => {
    setIsTransfer(true)
    // setSendDtmf(false)
  }
  // const handleSendDtmf = () => {
  //   setIsTransfer(false)
  //   setSendDtmf(true)
  // }
  const handleActionSubmit = () => {
    setIsTransfer(false)
    // setSendDtmf(true)
    if (isTransfer) {
      voip24.transfer(number)
    }

    // if (isSendDtfm) {
    //   voip24.sendDtmf(2)
    // }
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNumber(e.target.value)
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            {!isStartCount && (
              <IconButton onClick={handleAccepted} size='large' sx={{ backgroundColor: green[500], mt: 2 }}>
                <LocalPhoneIcon fontSize='inherit' />
              </IconButton>
            )}

            {isStartCount && (
              <IconButton
                onClick={handleHold}
                aria-label='delete'
                size='large'
                sx={{ backgroundColor: red[500], mt: 2 }}
              >
                <PhonePausedIcon fontSize='inherit' />
              </IconButton>
            )}
            {isStartCount && (
              <IconButton
                onClick={handleForwarded}
                aria-label='delete'
                size='large'
                sx={{ backgroundColor: red[500], mt: 2 }}
              >
                <PhoneForwardedIcon fontSize='inherit' />
              </IconButton>
            )}
            {/* {isStartCount && (
              <IconButton
                onClick={handleSendDtmf}
                aria-label='delete'
                size='large'
                sx={{ backgroundColor: red[500], mt: 2 }}
              >
                <PinchIcon fontSize='inherit' />
              </IconButton>
            )} */}
            <IconButton
              onClick={handleHangUp}
              aria-label='delete'
              size='large'
              sx={{ backgroundColor: red[500], mt: 2 }}
            >
              <CallEndIcon fontSize='inherit' />
            </IconButton>
          </Box>

          {isTransfer && (
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1.5, justifyContent: 'center', gap: 1 }}>
              <TextField
                onChange={handleChangeInput}
                size='small'
                sx={{ '& legend': { display: 'none' } }}
                id='outlined-basic'
                variant='outlined'
              />
              <Box sx={{ height: '100%' }}>
                <IconButton onClick={handleActionSubmit} sx={{ backgroundColor: blue[400], color: 'white' }}>
                  <SendIcon fontSize='small' />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  )
}
export default ModalCall
