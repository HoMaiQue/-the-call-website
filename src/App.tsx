import { LocalizationProvider } from '@mui/x-date-pickers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import useRouteElements from '~/hooks/useRouteElement'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'react-toastify/dist/ReactToastify.css'
import { Voip24hModule } from 'voip24h-sip-gateway'
import { useEffect } from 'react'

const void24 = Voip24hModule.getInstance()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // default: true
    }
  }
})
function App() {
  useEffect(() => {
    void24.initializeModule().then(() => {
      {
        void24.registerSip('203.162.56.226:5999', '847', 'haiphong@1543')
      }
    })
  }, [])
  const routeElement = useRouteElements()
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>{routeElement}</LocalizationProvider>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
