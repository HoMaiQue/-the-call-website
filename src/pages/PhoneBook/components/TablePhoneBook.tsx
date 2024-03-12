import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import { blue, green, grey, red } from '@mui/material/colors'
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, MuiEvent } from '@mui/x-data-grid'
import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalConfirm from './ModalConfirm'
import { useMutation } from '@tanstack/react-query'
import { phoneBookApi } from '~/apis/phonebook.api'
import { LIMIT } from '~/constants/page'
import { AppContext } from '~/contexts/app.context'
const CallRow = ({ label }: { label: string }) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}>
      <LocalPhoneIcon fontSize='small' sx={{ backgroundColor: blue[700], borderRadius: 1, color: 'white' }} />
      {label}
    </Box>
  )
}
const getPrivacyStrategies: any = {
  public: 'Quyền công khai',
  private: 'Quyền riêng tư'
}
interface DataTableProps {
  onToggle: () => void
}
const TablePhoneBook: React.FC<DataTableProps> = ({ onToggle }) => {
  const { phoneBookList, setPhoneBookList, setPageCount, pageCount, setContactId } = useContext(AppContext)

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const phoneBook = useMutation({
    mutationFn: (body: { offset: string; limit: string }) => phoneBookApi.getPhoneBook(body)
  })

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = () => {
    setOpen((value) => !value)
  }

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const page = newPage
    setPage(page)
    const filterNew = {
      limit: rowsPerPage.toString(),
      offset: (page * rowsPerPage).toString()
    }
    phoneBook.mutate(filterNew, {
      onSuccess: (data) => {
        setPhoneBookList(data.data.data.response.data)
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
    phoneBook.mutate(filter, {
      onSuccess: (data) => {
        setPhoneBookList(data.data.data.response.data)
      }
    })
  }

  const handleDelete = (id: string) => {
    handleToggle()
    setContactId(id)
  }

  const handleRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => {
    console.log(params)
    onToggle()
  }
  const columns: GridColDef[] = [
    {
      field: 'full_name',
      headerName: 'Họ tên',
      width: 200,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid'
    },
    {
      field: 'number_phone',
      headerName: 'Số điện thoại',
      width: 160,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid',
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        return <CallRow label={params.row.number_phone}></CallRow>
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid',
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        return <Typography>{params.row.email ? params.row.email : '-----'}</Typography>
      }
    },
    {
      field: 'privacy',
      headerName: 'Chính sách',
      width: 120,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid',
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        return <Typography>{getPrivacyStrategies[params.row.privacy]}</Typography>
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Tác vụ',
      sortable: false,
      width: 170,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-table-grid',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<LocalPhoneIcon />}
            label='Play'
            sx={{
              color: green[500]
            }}
            // onClick={handleClickPlay(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Play'
            sx={{
              color: red[500]
            }}
            onClick={() => handleDelete(id as string)}
          />
        ]
      }
    }
  ]

  return (
    <Box
      sx={{
        width: 'auto',
        height: (theme) =>
          `calc(100vh - ${theme.webRtc.titleHeight} - ${theme.webRtc.searchHeight} - ${theme.spacing(16)})`,
        '& .header-table-grid ': { backgroundColor: grey[200] }
      }}
    >
      <DataGrid
        sx={{ '& .MuiDataGrid-selectedRowCount': { visibility: 'hidden' } }}
        disableColumnMenu
        rows={phoneBookList}
        columns={columns}
        hideFooter
        getRowId={(row) => row?.contact_id}
        onRowClick={handleRowClick}
      />
      <TablePagination
        labelRowsPerPage={'Số hàng mỗi trang'}
        component='div'
        count={pageCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          {
            return `${from}–${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`
          }
        }}
      />
      <ModalConfirm open={open} onToggle={handleToggle} />
    </Box>
  )
}
export default TablePhoneBook
