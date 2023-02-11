import { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

const SignIn = lazy(() => import('@/pages/signin'))
const Main = lazy(() => import('@/pages/main'))
const Users = lazy(() => import('@/pages/main/c-pages/user'))
const Goods = lazy(() => import('@/pages/main/c-pages/goods'))
const Order = lazy(() => import('@/pages/main/c-pages/order'))
const Evaluate = lazy(() => import('@/pages/main/c-pages/evaluate'))

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
