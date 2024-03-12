import * as yup from 'yup'

export const schema = yup.object({
  full_name: yup.string().trim().required('Họ tên là bắt buộc'),
  number_phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^\d{10}$/, 'Không đúng định dạng')
})

export type Schema = yup.InferType<typeof schema>
