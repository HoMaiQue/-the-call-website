import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { grey, purple } from '@mui/material/colors'
import { useMutation } from '@tanstack/react-query'
import search from 'approx-string-match'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { phoneBookApi } from '~/apis/phonebook.api'
import { LIMIT } from '~/constants/page'
import { AppContext } from '~/contexts/app.context'
import theme from '~/theme'
import { GetPhoneBookResponse } from '~/types/phonebook.type'
import DrawerPhoneBook from './components/DrawerPhoneBook'
import PhoneBookForm from './components/PhoneBookForm'
import Search from './components/Search'
import TablePhoneBook from './components/TablePhoneBook'

const PhoneBook = () => {
  const { setPhoneBookList, setPageCount, phoneBookList, setSearchPhoneBook } = useContext(AppContext)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [open, setOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [keySearch, setKeySearch] = useState<string>('')
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
  const handleChangeSearchName = (value: string) => {
    if (value === '') {
      phoneBook.mutate(
        { limit: LIMIT, offset: '0' },
        {
          onSuccess: (data) => {
            const totalData = data.data.data.response.meta.total
            setPhoneBookList(data.data.data.response.data)
            setPageCount(totalData)
            setIsSearch(false)
          }
        }
      )
    }
    setKeySearch(value)
  }

  const handleSearchInput = () => {
    if (phoneNumber) {
      searchPhoneBook.mutate(
        { phone: phoneNumber },
        {
          onSuccess: (data) => {
            const dataSearch = data.data.data.response.data
            if (dataSearch) {
              setPhoneBookList([dataSearch])
            } else {
              setPhoneBookList([])
            }
          }
        }
      )
      return
    }
    if (keySearch) {
      const newSearchMatch: any = []
      const phoneListClone = [...phoneBookList]
      for (let i = 0; i < phoneListClone.length; i++) {
        const searchMatch = search(phoneListClone[i].full_name, keySearch, 2)
        if (searchMatch.length === 0) {
          continue
        }
        const searchInfo = { index: i, point: searchMatch.length }
        newSearchMatch.push(searchInfo)
      }
      const sortList: { index: number; point: number }[] = newSearchMatch.sort(
        (a: { index: number; point: number }, b: { index: number; point: number }) => a.point - b.point
      )

      const searchFinal: GetPhoneBookResponse[] = []
      sortList.forEach((element) => {
        searchFinal.push(phoneBookList[element.index])
      })
      setSearchPhoneBook([...searchFinal])
      setIsSearch(true)
    }
  }
  const handleClickAdd = () => {
    handleToggle()
    setIsUpdate(false)
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
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            sx={{ backgroundColor: purple[500] }}
            onClick={handleClickAdd}
          >
            Thêm danh bạ
          </Button>
        </Box>
        <Box
          sx={{ display: 'flex ', columnGap: '20px', justifyContent: 'flex-end', pb: 2, alignItems: 'center', mt: 2 }}
        >
          <Search onChange={handleChangeSearchInput} />
          <Search onChange={handleChangeSearchName} placeholder='Họ tên' />
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
        <TablePhoneBook onToggle={handleToggle} setIsUpdate={setIsUpdate} isSearch={isSearch} />
        <DrawerPhoneBook anchor={open} onToggle={handleToggle}>
          <PhoneBookForm onToggle={handleToggle} isUpdate={isUpdate} />
        </DrawerPhoneBook>
      </Box>
    </Box>
  )
}

export default PhoneBook
