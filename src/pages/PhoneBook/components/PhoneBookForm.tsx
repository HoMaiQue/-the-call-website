import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { phoneBookApi } from '~/apis/phonebook.api'
import { switchboardApi } from '~/apis/switchboard.api'
import Input from '~/components/Input'
import { LIMIT } from '~/constants/page'
import { AppContext } from '~/contexts/app.context'
import { CreatePhoneBookRequest, UpdatePhoneBookRequest } from '~/types/phonebook.type'
import { CallHistoryResponse } from '~/types/switchboard.type'
import { Schema, schema } from '~/utils/rules'
import CallHistoryDetail from './CallHistoryDetail'

type FormData = Pick<Schema, 'full_name' | 'number_phone'>
const loginSchema = schema.pick(['full_name', 'number_phone'])
interface PhoneBookFormProps {
  onToggle: () => void
  isUpdate: boolean
}
const PhoneBookForm: React.FC<PhoneBookFormProps> = ({ onToggle, isUpdate }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const { setPhoneBookList, setPageCount, phoneBook } = useContext(AppContext)
  const [callHistoryUser, setCallHistoryUser] = useState<CallHistoryResponse[]>([])

  const callHistoryByPhoneBookId = useMutation({
    mutationFn: (body: { phone: string }) => switchboardApi.searchHistory(body)
  })
  const createPhoneBook = useMutation({
    mutationFn: (body: CreatePhoneBookRequest) => phoneBookApi.createPhoneBook(body)
  })
  const phoneBookMutation = useMutation({
    mutationFn: (body: { offset: string; limit: string }) => phoneBookApi.getPhoneBook(body)
  })
  const updatePhoneBook = useMutation({
    mutationFn: (body: UpdatePhoneBookRequest) => phoneBookApi.updatePhoneBook(body)
  })

  useEffect(() => {
    if (phoneBook?.number_phone) {
      callHistoryByPhoneBookId.mutate(
        { phone: phoneBook?.number_phone as string },
        {
          onSuccess: (data) => {
            const dataList = data.data.data.response.data
            if (dataList) {
              setCallHistoryUser(dataList)
            }
          }
        }
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isUpdate) {
      setValue('full_name', phoneBook?.full_name as string)
      setValue('number_phone', phoneBook?.number_phone as string)
    }

    return () => {
      setValue('full_name', '')
      setValue('number_phone', '')
    }
  }, [isUpdate, phoneBook?.full_name, phoneBook?.number_phone, setValue])
  const onSubmit = handleSubmit((data) => {
    if (isUpdate) {
      const newData = {
        ...data,
        contact_id: phoneBook?.contact_id as string
      }
      updatePhoneBook.mutate(newData, {
        onSuccess: (_) => {
          phoneBookMutation.mutate(
            { limit: LIMIT, offset: '0' },
            {
              onSuccess: (data) => {
                const totalData = data.data.data.response.meta.total
                setPhoneBookList(data.data.data.response.data)
                setPageCount(totalData)
              }
            }
          )
          toast.success('Cập nhật danh bạ thành công')
          onToggle()
        }
      })
      return
    }
    createPhoneBook.mutate(data, {
      onSuccess: (data) => {
        const status = data.data.data.response.status
        if (+status === 2151) {
          setError('number_phone' as keyof FormData, {
            message: data.data.data.response.message,
            type: 'server'
          })
          return
        }
        if (+status === 1000) {
          phoneBookMutation.mutate(
            { limit: LIMIT, offset: '0' },
            {
              onSuccess: (data) => {
                const totalData = data.data.data.response.meta.total
                setPhoneBookList(data.data.data.response.data)
                setPageCount(totalData)
              }
            }
          )
          toast.success('Thêm danh bạ thành công')
          onToggle()
        }
      }
    })
  })

  return (
    <Box mt={4} sx={{ display: 'flex', gap: 2, height: '100%', overflow: 'hidden' }}>
      <form style={{ width: '400px' }} onSubmit={onSubmit}>
        <Input name='full_name' label='Họ tên' register={register} errorMessage={errors.full_name?.message} />
        <Input
          name='number_phone'
          label='Số điện thoại'
          register={register}
          errorMessage={errors.number_phone?.message}
        />
        <Input name='email' label='Email' />

        <Button
          type='submit'
          variant='contained'
          size='large'
          // disabled={loginMutation.isLoading || isFetching}
          sx={{
            mt: 4,
            fontWeight: '700',
            backgroundColor: 'primary.main',
            '&.Mui-disabled': {
              color: 'white',
              backgroundColor: 'primary.300',
              cursor: 'not-allowed',
              pointerEvents: 'unset'
            },
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
          fullWidth
        >
          {!isUpdate ? 'Thêm danh bạ' : 'Cập nhật danh bạ'}
        </Button>
      </form>

      {isUpdate ? (
        <Box sx={{ overflow: 'auto' }}>
          {callHistoryUser.map((history) => (
            <CallHistoryDetail callHistory={history} key={history.callid} />
          ))}
          :
        </Box>
      ) : null}
    </Box>
  )
}
export default PhoneBookForm
