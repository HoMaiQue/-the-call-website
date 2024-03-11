import { useRoutes } from 'react-router-dom'
import EmptyLayout from '~/components/layouts/EmptyLayout'
import Home from '~/pages/Home/Home'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: (
        <EmptyLayout>
          <Home />
        </EmptyLayout>
      )
    }
  ])
  return routeElements
}
