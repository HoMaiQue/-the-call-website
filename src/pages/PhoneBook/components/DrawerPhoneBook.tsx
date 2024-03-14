import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import * as React from 'react'
interface DrawerAuthProps {
  anchor: boolean
  onToggle: () => void
  children: React.ReactNode
}
const DrawerPhoneBook: React.FC<DrawerAuthProps> = ({ anchor, onToggle, children }) => {
  return (
    <Drawer anchor='right' open={anchor} onClose={onToggle}>
      <Box
        sx={{
          mt: 'auto',
          p: 8,
          display: 'flex',
          flexDirection: 'column',

          height: '100%',
          width: 'auto',
          backgroundColor: 'white'
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
