import { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

import Users from '@/pages/main/c-pages/user'
import Goods from '@/pages/main/c-pages/goods'
import Order from '@/pages/main/c-pages/order'
import Evaluate from '@/pages/main/c-pages/evaluate'

const SignIn = lazy(() => import('@/pages/signin'))
const Main = lazy(() => import('@/pages/main'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/main/user" />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/user',
        element: <Users />
      },
      {
        path: '/main/goods',
        element: <Goods />
      },
      {
        path: '/main/order',
        element: <Order />
      },
      {
        path: '/main/evaluate',
        element: <Evaluate />
      }
    ]
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '*',
    element: <Navigate to="/main/user" />
  }
] as Array<RouteObject>

export default routes
