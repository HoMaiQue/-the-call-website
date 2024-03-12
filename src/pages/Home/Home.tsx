import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { grey, purple, red } from '@mui/material/colors'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMutation } from '@tanstack/react-query'
import { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { authApi } from '~/apis/auth.api'
import { switchboardApi } from '~/apis/switchboard.api'
import { CallHistoryResQuest, CallHistoryResponse } from '~/types/switchboard.type'
import { convertDateFormat } from '~/utils/format'
import TableCallHistory from './components/TableCallHistory'
import { LIMIT } from '~/constants/page'
import theme from '~/theme'
import { useNavigate } from 'react-router-dom'
const bodyLogin = {
  api_key: import.meta.env.VITE_API_KEY as string,
  api_secert: import.meta.env.VITE_API_SECERT as string
}
const Home = () => {
  const [callHistoryData, setCallHistoryData] = useState<CallHistoryResponse[]>([])
  const [filter, setFilter] = useState<CallHistoryResQuest>({
    limit: LIMIT,
    offset: '0'
  })
  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: { api_key: string; api_secert: string }) => authApi.login(body)
  })
  const callHistory = useMutation({
    mutationFn: (body: CallHistoryResQuest) => switchboardApi.callHistory(body)
  })

  useEffect(() => {
    loginMutation.mutate(bodyLogin)

    callHistory.mutate(filter, {
      onSuccess: (data) => {
        const totalData = data.data.data.response.meta.total

        setCallHistoryData(data.data.data.response.data)
        setPageCount(totalData )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = (event.target as HTMLInputElement).value
    setFilter((data) => ({ ...data, type }))
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const status = event.target.value
    setFilter((data) => ({ ...data, status }))
  }

  const handleClickFilter = () => {
    callHistory.mutate(filter, {
      onSuccess: (data) => {
        setCallHistoryData(data.data.data.response.data)
      }
    })
  }

  const handleClearFilter = () => {
    setFilter({ limit: rowsPerPage.toString(), offset: '0' })
    callHistory.mutate(
      { limit: rowsPerPage.toString(), offset: '0' },
      {
        onSuccess: (data) => {
          setCallHistoryData(data.data.data.response.data)
        }
      }
    )
  }

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const page = newPage
    setPage(page)
    const filterNew = {
      ...filter,
      limit: rowsPerPage.toString(),
      offset: (page * rowsPerPage).toString()
    }
    callHistory.mutate(filterNew, {
      onSuccess: (data) => {
        setCallHistoryData(data.data.data.response.data)
      }
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    const filter = {
      limit: event.target.value,
      offset: '0'
    }
    callHistory.mutate(filter, {
      onSuccess: (data) => {
        setCallHistoryData(data.data.data.response.data)
      }
    })
  }
  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 'bold', color: grey[500], height: theme.webRtc.titleHeight }}
          variant='h1'
        >
          Lịch sử cuộc gọi
        </Typography>
        <Button variant='contained' onClick={() => navigate('/phone-book')}>
          Danh bạ
        </Button>
      </Box>
      <Box
        sx={{
          mt: 2,
          border: '2px solid transparent',
          boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
          p: 3,
          borderRadius: '20px',
          height: theme.webRtc.filterHeight
        }}
      >
        <Box>
          <Button variant='contained' startIcon={<FilterAltIcon />} sx={{ backgroundColor: purple[500] }}>
            Bộ lọc
          </Button>
        </Box>
        <Box sx={{ display: 'flex ', columnGap: '20px', pb: 2, alignItems: 'center' }}>
          <DatePicker
            // value={dayjs()}
            disableFuture
            slotProps={{
              textField: {
                size: 'small'
              }
            }}
            sx={{
              '& .MuiButtonBase-root': {
                color: 'primary.main'
              },
              mt: 3,
              width: '200px'
            }}
            label='Ngày bắt đầu'
            format='DD-MM-YYYY'
            onChange={(value: Dayjs | null) => {
              const date_start = convertDateFormat(value?.toISOString() as string)
              setFilter((data) => ({ ...data, date_start }))
            }}
          />

          <DatePicker
            // value={dayjs()}
            disableFuture
            slotProps={{
              textField: {
                size: 'small'
              }
            }}
            sx={{
              '& .MuiButtonBase-root': {
                color: 'primary.main'
              },
              mt: 3,
              width: '200px'
            }}
            label='Ngày kết thúc'
            format='DD-MM-YYYY'
            onChange={(value: Dayjs | null) => {
              const date_end = convertDateFormat(value?.toISOString() as string)
              setFilter((data) => ({ ...data, date_end }))
            }}
          />

          <FormControl sx={{ mt: 'auto' }}>
            <RadioGroup
              value={filter.type || ''}
              onChange={handleChangeRadio}
              row
              aria-labelledby='demo-radio-buttons-group-label'
              name='radio-buttons-group'
            >
              <FormControlLabel value='inbound' control={<Radio />} label='Cuộc gọi đến' />
              <FormControlLabel value='outbound' control={<Radio />} label='Cuộc gọi đi' />
            </RadioGroup>
          </FormControl>

          <Box sx={{ marginTop: 'auto', minWidth: 200 }}>
            <FormControl fullWidth>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={filter.status || ''}
                onChange={handleChangeSelect}
                size='small'
                sx={{ '& legend': { display: 'none' } }}
              >
                <MenuItem value={'ANSWERED'}>Đã nhận</MenuItem>
                <MenuItem value={'NO ANSWER'}>Không nghe máy</MenuItem>
                <MenuItem value={'MISSED'}>Gọi nhỡ</MenuItem>
                <MenuItem value={'FAILED'}>Gọi lỗi</MenuItem>
                <MenuItem value={'BUSY'}> Máy bận</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', columnGap: 2 }}>
          <Button variant='contained' startIcon={<SearchIcon />} onClick={handleClickFilter}>
            Tìm kiếm
          </Button>
          <Button variant='contained' sx={{ backgroundColor: red[500] }} onClick={handleClearFilter}>
            Xóa Bộ lọc
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 3
        }}
      >
        <TableCallHistory
          callHistoryList={callHistoryData}
          rowCount={pageCount}
          onPageChange={handleChangePage}
          page={page}
          onRowPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default Home
