import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material'

import routes from './router/index'
import { useAppDispatch, useAppSelector } from './store'
import { shallowEqualApp } from './store/index'
import { changeOpen } from './store/modules/main'

function App() {
  const { alertConfig } = useAppSelector(
    (state) => ({
      alertConfig: state.main.alertConfig
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()

  const setOpen = (flag: boolean) => {
    dispatch(changeOpen({ open: flag }))
  }

  return (
    <>
      <Suspense fallback="loading">{useRoutes(routes)}</Suspense>
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
