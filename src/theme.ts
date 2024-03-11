import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// Create a theme instance.

const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-track': {
            background: 'white'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#778180'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'capitalize'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          // Some CSS
          fontSize: '0.875rem',
          color: theme.palette.primary.main,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    }
  }
})

export default theme
