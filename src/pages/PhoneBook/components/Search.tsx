import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import React from 'react'

const SearchWrap = styled('div')(() => ({
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: 'white',
  marginLeft: 0,
  width: '300px',
  border: '2px solid ',
  borderColor: grey[500]
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',

  '& .MuiInputBase-input': {
    color: '#333',
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}))
interface SearchProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (keySearch: string) => void
  placeholder?: string
}
export const Search: React.FC<SearchProps> = ({ onChange, placeholder = 'Số điện thoại...' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value)
  }
  return (
    <SearchWrap>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase onChange={handleChange} placeholder={placeholder} inputProps={{ 'aria-label': 'search' }} />
    </SearchWrap>
  )
}
export default Search
