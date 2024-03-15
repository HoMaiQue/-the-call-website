import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EventSipGateway, Voip24hModule } from 'voip24h-sip-gateway'
import useRouteElements from '~/hooks/useRouteElement'
import { AppContext } from './contexts/app.context'
import ModalCall from './pages/PhoneBook/components/ModalCall'

const void24 = Voip24hModule.getInstance()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
})

function App() {
  const { openCall, handleToggleCall } = useContext(AppContext)
  useEffect(() => {
    void24.initializeModule().then(() => {
      {
        void24.registerSip('203.162.56.226:5999', '847', 'haiphong@1543')
      }
    })
  }, [])

  useEffect(() => {
    void24.pushEventToSide({
      onmessageOutSide: function (event: any, _: any) {
        if (event === EventSipGateway.Incomingcall) {
          handleToggleCall()
        }
      }
    })
  }, [handleToggleCall])

  const routeElement = useRouteElements()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {routeElement}
        {openCall && <ModalCall open={openCall} onToggle={handleToggleCall} />}
      </LocalizationProvider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
