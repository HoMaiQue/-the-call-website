import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '~/components/Input'
import { Schema, schema } from '~/utils/rules'

type FormData = Pick<Schema, 'full_name' | 'number_phone'>
const loginSchema = schema.pick(['full_name', 'number_phone'])
interface PhoneBookFormProps {
  
}
const PhoneBookForm: React.FC<PhoneBookFormProps> = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit((data) => {
    // loginMutation.mutate(data, {
    //   onSuccess: (data) => {
    //     setIsAuthenticated(true)
    //     router.push(path.home)
    //   },
    //   onError: (error) => {
    //     if (isAxiosUnprocessableEntityError<ErrorResponse<UnprocessAbleResponse>>(error)) {
    //       const formError = error.response?.data.errors
    //       if (formError) {
    //         Object.keys(formError).forEach((key) => {
    //           setError(key as keyof FormData, {
    //             message: formError[key as keyof FormData].msg,
    //             type: formError[key as keyof FormData].type
    //           })
    //         })
    //       }
    //     }
    //   }
    // })
  })

  return (
    <Box mt={4}>
      <form onSubmit={onSubmit}>
        <Input name='full_name' label='Họ tên' register={register} errorMessage={errors.full_name?.message} />
        <Input
          name='number_phone'
          label='Số điện thoại'
          register={register}
          errorMessage={errors.number_phone?.message}
        />
        <Input name='email' label='Email' register={register} errorMessage={errors.number_phone?.message} />

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
          Login
          {/* {loginMutation.isLoading ||
            (isFetching && (
              <CircularProgress
                sx={{
                  color: 'white',

                  width: '25px !important',
                  height: '25px !important'
                }}
              />
            ))} */}
        </Button>
      </form>
    </Box>
  )
}
export default PhoneBookForm
