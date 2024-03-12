import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.ts'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { AppProvider } from './contexts/app.context.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <App />
        </AppProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
