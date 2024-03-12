import { useRoutes } from 'react-router-dom'
import EmptyLayout from '~/components/layouts/EmptyLayout'
import Home from '~/pages/Home/Home'
import PhoneBook from '~/pages/PhoneBook/PhoneBook'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: (
        <EmptyLayout>
          <Home />
        </EmptyLayout>
      )
    },
    {
      path: '/phone-book',
      element: (
        <EmptyLayout>
          <PhoneBook />
        </EmptyLayout>
      )
    }
  ])
  return routeElements
}
