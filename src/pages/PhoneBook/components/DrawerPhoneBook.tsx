import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import * as React from 'react'
interface DrawerAuthProps {
  anchor: boolean
  onToggle: () => void
  children: React.ReactNode
  isLogin: boolean
  onToggleIsLogin: () => void
}
const DrawerPhoneBook: React.FC<DrawerAuthProps> = ({ anchor, onToggle, children, isLogin, onToggleIsLogin }) => {
  return (
    <Drawer anchor='right' open={anchor} onClose={onToggle}>
      <Box
        sx={{
          mt: 'auto',
          p: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          width: '600px',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                color: 'black',
                fontSize: 25,
                fontWeight: 'bold'
              }}
            >
              Thông tin chung
            </Typography>
            
          </Box>
        </Box>
        {children}
      </Box>
    </Drawer>
  )
}

export default DrawerPhoneBook
