import { Suspense, useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material'
import { ConfigProvider } from 'antd'

import routes from './router/index'
import { useAppDispatch, useAppSelector, shallowEqualApp } from './store'
import { changeOpen } from './store/modules/main'

function App() {
  const { alertConfig, currentUrl } = useAppSelector(
    (state) => ({
      alertConfig: state.main.alertConfig,
      currentUrl: state.main.currentUrl
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUrl === '') return

    navigate(currentUrl, { replace: true })
  }, [])

  const setOpen = (flag: boolean) => {
    dispatch(changeOpen({ open: flag }))
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b'
          }
        }}
      >
        <Suspense fallback="loading">{useRoutes(routes)}</Suspense>
      </ConfigProvider>

      {/* 全局消息条 */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertConfig.open}
        autoHideDuration={alertConfig.autoHideDuration}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={alertConfig.type}>
          {alertConfig.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
