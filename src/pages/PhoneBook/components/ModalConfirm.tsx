import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { phoneBookApi } from '~/apis/phonebook.api'
import { LIMIT } from '~/constants/page'
import { AppContext } from '~/contexts/app.context'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}
interface ModalConfirmProps {
  open: boolean
  onToggle: () => void
}
const ModalConfirm: React.FC<ModalConfirmProps> = ({ open, onToggle }) => {
  const { setPhoneBookList, setPageCount, contactId } = useContext(AppContext)

  const deletePhoneBook = useMutation({
    mutationFn: (body: { contact_id: string }) => phoneBookApi.deletePhoneBook(body)
  })
  const phoneBook = useMutation({
    mutationFn: (body: { offset: string; limit: string }) => phoneBookApi.getPhoneBook(body)
  })

  const handleClickYes = () => {
    deletePhoneBook.mutate(
      { contact_id: contactId },
      {
        onSuccess: (data) => {
          const status = data.data.data.response.status
          if (+status === 1000) {
            phoneBook.mutate(
              { limit: LIMIT, offset: '0' },
              {
                onSuccess: (data) => {
                  const totalData = data.data.data.response.meta.total
                  setPhoneBookList(data.data.data.response.data)
                  setPageCount(totalData)
                }
              }
            )
            onToggle()
            toast.success('Xóa thành công')
          }
        }
      }
    )
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onToggle}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography>Bạn có muốn xóa không ? </Typography>
          <Box sx={{ display: 'flex', columnGap: 3, mt: 2 }}>
            <Button variant='contained' onClick={handleClickYes}>
              Có
            </Button>
            <Button sx={{ backgroundColor: red[500] }} variant='contained' onClick={onToggle}>
              Không
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
export default ModalConfirm
