import { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import TextField, { StandardTextFieldProps } from '@mui/material/TextField'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import React, { useState } from 'react'
interface InputProps extends StandardTextFieldProps {
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: SxProps<Theme> | undefined
  classNameError?: string
  name?: string
  type?: string
  label?: string
  size?: 'small' | 'medium'
}

const Input: React.FC<InputProps> = ({
  errorMessage,
  classNameInput,
  name,
  register,
  rules,
  type = 'text',
  label,
  size,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const registerResult = register && name ? register(name, rules) : null

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <Box sx={{ mt: 3, flex: 1 }}>
      <TextField
        type={type === 'text' ? type : showPassword ? 'text' : 'password'}
        name={name}
        fullWidth
        label={label}
        error={errorMessage ? true : false}
        helperText={errorMessage}
        size={size}
        sx={classNameInput}
        InputProps={{
          endAdornment:
            type === 'password' ? (
              <InputAdornment position='end'>
                <IconButton
                  sx={{ color: 'primary.main' }}
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              <></>
            )
        }}
        {...registerResult}
        {...rest}
      />
    </Box>
  )
}

export default Input
