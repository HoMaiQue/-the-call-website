import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { grey, purple } from '@mui/material/colors'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { phoneBookApi } from '~/apis/phonebook.api'
import { LIMIT } from '~/constants/page'
import { AppContext } from '~/contexts/app.context'
import theme from '~/theme'
import Search from './components/Search'
import TablePhoneBook from './components/TablePhoneBook'
import DrawerPhoneBook from './components/DrawerPhoneBook'
import PhoneBookForm from './components/PhoneBookForm'
const PhoneBook = () => {
  const { setPhoneBookList, setPageCount } = useContext(AppContext)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const phoneBook = useMutation({
    mutationFn: (body: { offset: string; limit: string }) => phoneBookApi.getPhoneBook(body)
  })
  const searchPhoneBook = useMutation({
    mutationFn: (body: { phone: string }) => phoneBookApi.searchPhoneBook(body)
  })
  const handleToggle = () => {
    setOpen((value) => !value)
  }
  const handleChangeSearchInput = (value: string) => {
    if (value === '') {
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
    }
    setPhoneNumber(value)
  }
  const handleSearchInput = () => {
    searchPhoneBook.mutate(
      { phone: phoneNumber },
      {
        onSuccess: (data) => {
          setPhoneBookList([data.data.data.response.data])
        }
      }
    )
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold', color: grey[500], height: theme.webRtc.titleHeight }}
          variant='h1'
        >
          Danh bạ
        </Typography>
        <Button variant='contained' onClick={() => navigate('/')}>
          Lịch sử cuộc gọi
        </Button>
      </Box>

      <Box
        sx={{
          mt: 2,
          border: '2px solid transparent',
          p: 3,
          borderRadius: '20px',
          height: theme.webRtc.searchHeight
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' startIcon={<AddIcon />} sx={{ backgroundColor: purple[500] }}>
            Thêm danh bạ
          </Button>
        </Box>
        <Box
          sx={{ display: 'flex ', columnGap: '20px', justifyContent: 'flex-end', pb: 2, alignItems: 'center', mt: 2 }}
        >
          <Search onChange={handleChangeSearchInput} />
          <Box sx={{ display: 'flex', columnGap: 2 }}>
            <Button variant='contained' startIcon={<SearchIcon />} onClick={handleSearchInput}>
              Tìm kiếm
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 3
        }}
      >
        <TablePhoneBook onToggle={handleToggle}/>
        <DrawerPhoneBook anchor={open} onToggle={handleToggle}>
          <PhoneBookForm />
        </DrawerPhoneBook>
      </Box>
    </Box>
  )
}

export default PhoneBook
