import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import { blue, grey, purple, red } from '@mui/material/colors'
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { switchboardApi } from '~/apis/switchboard.api'
import { getColorStrategies, getStatusStrategies } from '~/constants/page'
import { CallHistoryResponse } from '~/types/switchboard.type'
import { convertSecondsToHHMMSS, formatDate } from '~/utils/format'
import ModalPlay from './ModalPlay'
import { CustomNoRowsOverlay } from '~/components/Overlay/Overlay'

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

interface DataTableProps {
  callHistoryList: CallHistoryResponse[]
  rowCount: number
  page: number
  rowsPerPage: number
  // eslint-disable-next-line no-unused-vars
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  // eslint-disable-next-line no-unused-vars
  onRowPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const TableCallHistory: React.FC<DataTableProps> = ({
  callHistoryList,
  rowCount,
  onPageChange,
  page,
  onRowPerPageChange,
  rowsPerPage
}) => {
  const [open, setOpen] = useState(false)
  const [recordUrl, setRecordUrl] = useState('')
  const handleToggle = () => {
    setOpen((value) => !value)
  }
  const record = useMutation({
    mutationFn: (body: { callid: string }) => switchboardApi.getRecord(body)
  })
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
      align: 'left',
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
      align: 'left',
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
      headerName: 'Thời lượng',
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
      field: 'actions',
      type: 'actions',
      headerName: 'Tác vụ',
      sortable: false,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid',
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<PlayArrowIcon />}
            label='Play'
            sx={{
              color: red[500]
            }}
            onClick={handleClickPlay(id)}
          />
        ]
      }
    }
  ]
  const handleClickPlay = (id: GridRowId) => () => {
    record.mutate(
      { callid: id as string },
      {
        onSuccess: (data) => {
          const url = data.data.data.response.data?.data.ogg as string
          if (!url) {
            toast.warning('Không có ghi âm')
            return
          }
          setRecordUrl(url)
          handleToggle()
        }
      }
    )
  }
  return (
    <Box
      sx={{
        width: 'auto',
        height: (theme) =>
          `calc(100vh - ${theme.webRtc.titleHeight} - ${theme.webRtc.filterHeight} - ${theme.spacing(16)})`,
        '& .header-table-grid ': { backgroundColor: grey[200] }
      }}
    >
      <DataGrid
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{ '& .MuiDataGrid-selectedRowCount': { visibility: 'hidden' } }}
        disableColumnMenu
        rows={callHistoryList}
        columns={columns}
        hideFooter
        getRowId={(row) => row?.callid}
      />
      <TablePagination
        labelRowsPerPage={'Số hàng mỗi trang'}
        component='div'
        count={rowCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowPerPageChange}
        labelDisplayedRows={({ from, to, count }) => {
          {
            return `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
        }}
      />

      <ModalPlay onToggle={handleToggle} open={open} recordUrl={recordUrl} />
    </Box>
  )
}
export default TableCallHistory
