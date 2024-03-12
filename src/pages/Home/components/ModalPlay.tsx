import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import * as React from 'react'
import ReactAudioPlayer from 'react-audio-player'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
interface ModalPlayProps {
  open: boolean
  onToggle: () => void
  recordUrl: string
}
const ModalPlay: React.FC<ModalPlayProps> = ({ open, onToggle, recordUrl }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onToggle}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <ReactAudioPlayer src={recordUrl} autoPlay controls />
        </Box>
      </Modal>
    </div>
  )
}
export default ModalPlay
