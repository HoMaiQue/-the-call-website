import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { CallHistoryResponse } from '~/types/switchboard.type'

import Button from '@mui/material/Button'
import { blue, green, grey, purple, red, yellow } from '@mui/material/colors'
import Box from '@mui/material/Box'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { convertSecondsToHHMMSS, formatDate } from '~/utils/format'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
const getStatusStrategies: any = {
  ANSWERED: 'Đã nhận',
  'NO ANSWER': 'Không nghe máy',
  MISSED: 'Gọi nhỡ',
  FAILED: 'Gọi lỗi',
  BUSY: 'Máy bận'
}
const getColorStrategies: any = {
  ANSWERED: green[500],
  'NO ANSWER': grey[500],
  MISSED: red[500],
  FAILED: purple[500],
  BUSY: yellow[500]
}
const getColorTypeStrategies: any = {
  inbound: red[500],
  outbound: purple[500]
}
const getTypeStrategies: any = {
  inbound: 'Cuộc gọi đến',
  outbound: 'Cuộc gọi đi'
}
const CallRow = ({ label }: { label: string }) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}>
      <LocalPhoneIcon fontSize='small' sx={{ backgroundColor: blue[700], borderRadius: 1, color: 'white' }} />
      {label}
    </Box>
  )
}
const columns: GridColDef[] = [
  {
    field: 'calldate',
    headerName: 'Ngày gọi',
    width: 200,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <Typography>{formatDate(params.row.calldate)}</Typography>
    }
  },
  {
    field: 'caller',
    headerName: 'Số gọi',
    width: 160,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <CallRow label={params.row.caller}></CallRow>
    }
  },
  {
    field: 'callee',
    headerName: 'Số nhận',
    width: 150,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <CallRow label={params.row.callee ? params.row.callee : '-----'}></CallRow>
    }
  },
  {
    field: 'did',
    headerName: 'Đầu số',
    width: 120,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid'
  },
  {
    field: 'extension',
    headerName: 'Nhánh',
    sortable: false,
    width: 100,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <Typography>{params.row.extension ? params.row.extension : '----'}</Typography>
    }
  },
  {
    field: 'type',
    headerName: 'Loại',
    sortable: false,
    width: 160,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return (
        <Typography sx={{ color: getColorTypeStrategies[params.row.type] }}>
          {getTypeStrategies[params.row.type]}
        </Typography>
      )
    }
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return (
        <strong>
          <Button variant='contained' size='small' style={{ backgroundColor: getColorStrategies[params.row.status] }}>
            {getStatusStrategies[params.row.status]}
          </Button>
        </strong>
      )
    },
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid'
  },
  {
    field: 'duration',
    headerName: 'Thường lượng',
    sortable: false,
    width: 130,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <Typography>{convertSecondsToHHMMSS(params.row.duration)}</Typography>
    }
  },
  {
    field: 'billsec',
    headerName: 'Thời gian đàm thoại',
    sortable: false,
    width: 150,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      return <Typography>{convertSecondsToHHMMSS(params.row.billsec)}</Typography>
    }
  },
  {
    field: '-',
    headerName: 'Tác vụ',
    sortable: false,
    width: 150,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header-table-grid',
    flex: 1,
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      const callId = params.row.callid
      console.log(callId)
      return (
        <IconButton aria-label='delete' size='small' sx={{ backgroundColor: red[500], color: 'white' }}>
          <PlayArrowIcon fontSize='small' />
        </IconButton>
      )
    }
  }
]

interface DataTableProps {
  callHistoryList: CallHistoryResponse[]
}
const DataTable: React.FC<DataTableProps> = ({ callHistoryList }) => {
  return (
    <Box sx={{ width: 'auto', height: 400, '& .header-table-grid ': { backgroundColor: grey[200] } }}>
      <DataGrid
        sx={{ '& .MuiDataGrid-selectedRowCount': { visibility: 'hidden' } }}
        disableColumnMenu
        rows={callHistoryList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        getRowId={(row) => row?.callid}
        pageSizeOptions={[5, 10]}
        slotProps={{ pagination: { labelRowsPerPage: 'Số hàng mỗi trang' } }}
      />
    </Box>
  )
}
export default DataTable
