import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { grey, purple, red } from '@mui/material/colors'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMutation } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { authApi } from '~/apis/auth.api'
import DataTable from '../components/Table'
import { CallHistoryResQuest, CallHistoryResponse } from '~/types/switchboard.type'
import { switchboardApi } from '~/apis/switchboard.api'
const bodyLogin = {
  api_key: import.meta.env.VITE_API_KEY as string,
  api_secert: import.meta.env.VITE_API_SECERT as string
}
const Home = () => {
  const [callHistoryData, setCallHistoryData] = useState<CallHistoryResponse[]>([])

  const loginMutation = useMutation({
    mutationFn: (body: { api_key: string; api_secert: string }) => authApi.login(body)
  })
  const callHistory = useMutation({
    mutationFn: (body: CallHistoryResQuest) => switchboardApi.callHistory(body)
  })

  useEffect(() => {
    loginMutation.mutate(bodyLogin, {
      onSuccess: (data) => {
        console.log(data)
      }
    })
    callHistory.mutate(
      { limit: '10', offset: '0' },
      {
        onSuccess: (data) => {
          console.log('this is data for call history', data)
          setCallHistoryData(data.data.data.response.data)
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: grey[500] }} variant='h1'>
        Lịch sử cuộc gọi
      </Typography>
      <Box
        sx={{
          mt: 3,
          border: '2px solid transparent',
          boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
          p: 3,
          borderRadius: '20px'
        }}
      >
        <Box>
          <Button variant='contained' startIcon={<FilterAltIcon />} sx={{ backgroundColor: purple[500] }}>
            Bộ lọc
          </Button>
        </Box>
        <Box sx={{ display: 'flex ', columnGap: '20px', pb: 2, alignItems: 'center' }}>
          <DatePicker
            value={dayjs('2000-08-18')}
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
            onChange={(newValue: Dayjs | null) => {
              if (newValue?.isValid()) {
                // field.onChange(newValue?.toISOString())
              } else {
                // field.onChange('')
              }
            }}
          />

          <DatePicker
            value={dayjs('2000-08-18')}
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
            onChange={(newValue: Dayjs | null) => {
              if (newValue?.isValid()) {
                // field.onChange(newValue?.toISOString())
              } else {
                // field.onChange('')
              }
            }}
          />

          <FormControl sx={{ mt: 'auto' }}>
            <RadioGroup row aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
              <FormControlLabel value='inbound' control={<Radio />} label='Cuộc gọi đến' />
              <FormControlLabel value='outbound' control={<Radio />} label='Cuộc gọi đi' />
            </RadioGroup>
          </FormControl>

          <Box sx={{ marginTop: 'auto', minWidth: 200 }}>
            <FormControl fullWidth>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={age}
                label='Age'
                // onChange={handleChange}
                size='small'
                sx={{ '& legend': { display: 'none' } }}
              >
                <MenuItem value={'ANSWERED '}>Đã nhận</MenuItem>
                <MenuItem value={'NO ANSWER '}>Không nghe máy</MenuItem>
                <MenuItem value={'MISSED  '}>Gọi nhỡ</MenuItem>
                <MenuItem value={'FAILED '}>Gọi lỗi</MenuItem>
                <MenuItem value={'BUSY '}> Máy bận</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', columnGap: 2 }}>
          <Button variant='contained' startIcon={<SearchIcon />}>
            Tìm kiếm
          </Button>
          <Button variant='contained' sx={{ backgroundColor: red[500] }}>
            Xóa Bộ lọc
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <DataTable callHistoryList={callHistoryData} />
      </Box>
    </Box>
  )
}

export default Home
